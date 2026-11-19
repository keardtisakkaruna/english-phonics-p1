(function () {
  'use strict';

  const DATA = window.PHONICS_DATA;
  const LETTER_MAP = {};
  DATA.alphabet.forEach((item) => {
    LETTER_MAP[item.lower] = item;
  });

  /* ==================== SOUND FX (Web Audio API) ==================== */
  const SoundFX = {
    ctx: null,
    enabled: true,
    ensure() {
      if (!this.enabled) return null;
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    },
    pop(freq = 520) {
      const ctx = this.ensure();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.11);
    },
    chime() {
      const ctx = this.ensure();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = ctx.currentTime + i * 0.075;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.14, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      });
    }
  };

  /* ==================== SPEECH ENGINE (Web Speech API) ==================== */
  const Speech = {
    isSlow: false,
    voice: null,
    supported: 'speechSynthesis' in window,

    init() {
      if (!this.supported) return;
      const pickVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || !voices.length) return;
        const preferred = [
          (v) => /google us english/i.test(v.name),
          (v) => /aria|jenny|zira|samantha/i.test(v.name) && /^en/i.test(v.lang),
          (v) => v.lang === 'en-US',
          (v) => /^en/i.test(v.lang)
        ];
        for (const test of preferred) {
          const found = voices.find(test);
          if (found) {
            this.voice = found;
            return;
          }
        }
      };
      pickVoice();
      window.speechSynthesis.onvoiceschanged = pickVoice;
    },

    getRate(multiplier = 1) {
      const base = this.isSlow ? 0.58 : 0.92;
      return Math.max(0.45, Math.min(1.2, base * multiplier));
    },

    stop() {
      if (this.supported) {
        window.speechSynthesis.cancel();
      }
    },

    speak(text, opts = {}) {
      return new Promise((resolve) => {
        if (!this.supported || !text) {
          resolve();
          return;
        }
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        if (this.voice) utter.voice = this.voice;
        utter.rate = opts.rate || this.getRate(opts.rateMult || 1);
        utter.pitch = opts.pitch || 1.05;

        let settled = false;
        const done = () => {
          if (!settled) {
            settled = true;
            resolve();
          }
        };
        utter.onend = done;
        utter.onerror = done;
        // Safety timeout in case a browser drops onend
        setTimeout(done, Math.max(1800, text.length * 160));
        window.speechSynthesis.speak(utter);
      });
    }
  };

  /* ==================== TOAST HELPER ==================== */
  let toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById('appToast');
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2000);
  }

  /* ==================== APP STATE ==================== */
  const state = {
    view: 'az',
    // A-Z
    azIndex: 0,
    azWordIndex: 0,
    azFilter: 'all',
    // Flashcards
    fcDeckKey: 'az',
    fcCards: [],
    fcIndex: 0,
    fcFlipped: false,
    fcQuizMode: false,
    fcAutoTimer: null,
    // CVC Blender
    cvcVowel: 'a',
    cvcWordIndex: 0,
    cvcBlending: false
  };

  /* ==================== VIEW SWITCHING ==================== */
  const modeTabs = document.querySelectorAll('.mode-tab');
  const viewPanels = document.querySelectorAll('.view-panel');

  function switchView(viewName) {
    stopFlashcardAuto();
    Speech.stop();
    state.view = viewName;

    modeTabs.forEach((tab) => {
      const active = tab.dataset.view === viewName;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    viewPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.id === 'view-' + viewName);
    });

    SoundFX.pop(580);
  }

  modeTabs.forEach((tab) => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  /* ==================== UTILITY CONTROLS ==================== */
  const speedToggle = document.getElementById('speedToggle');
  const speedIcon = document.getElementById('speedIcon');
  const speedLabel = document.getElementById('speedLabel');

  speedToggle.addEventListener('click', () => {
    Speech.isSlow = !Speech.isSlow;
    speedToggle.classList.toggle('is-slow', Speech.isSlow);
    speedIcon.textContent = Speech.isSlow ? '🐢' : '🐇';
    speedLabel.textContent = Speech.isSlow ? 'เสียงช้า' : 'เสียงปกติ';
    SoundFX.pop(Speech.isSlow ? 420 : 620);
    showToast(Speech.isSlow ? 'ปรับเป็นเสียงอ่านช้า (0.6x)' : 'ปรับเป็นเสียงอ่านปกติ (1x)');
  });

  const sfxToggle = document.getElementById('sfxToggle');
  const sfxIcon = document.getElementById('sfxIcon');
  sfxToggle.addEventListener('click', () => {
    SoundFX.enabled = !SoundFX.enabled;
    sfxToggle.classList.toggle('is-muted', !SoundFX.enabled);
    sfxIcon.textContent = SoundFX.enabled ? '🔔' : '🔕';
    if (SoundFX.enabled) SoundFX.pop(600);
    showToast(SoundFX.enabled ? 'เปิดเสียงเอฟเฟกต์แล้ว' : 'ปิดเสียงเอฟเฟกต์แล้ว');
  });

  const fullscreenBtn = document.getElementById('fullscreenBtn');
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {
        showToast('กด F11 เพื่อขยายเต็มจอ');
      });
    } else {
      document.exitFullscreen?.();
    }
  });

  /* ==================== VIEW 1: A-Z PHONICS ==================== */
  const azGrid = document.getElementById('azGrid');
  const azStageCard = document.getElementById('azStageCard');
  const azTypePill = document.getElementById('azTypePill');
  const azCounter = document.getElementById('azCounter');
  const azLetterBigBtn = document.getElementById('azLetterBigBtn');
  const azUpper = document.getElementById('azUpper');
  const azLower = document.getElementById('azLower');
  const azEmoji = document.getElementById('azEmoji');
  const azWordText = document.getElementById('azWordText');
  const azThaiRead = document.getElementById('azThaiRead');
  const azMeaning = document.getElementById('azMeaning');
  const drillLetterSub = document.getElementById('drillLetterSub');
  const drillPhonicsSub = document.getElementById('drillPhonicsSub');
  const drillWordSub = document.getElementById('drillWordSub');
  const azWordChips = document.getElementById('azWordChips');

  function highlightTargetLetter(word, targetLetter, isVowel) {
    const lowerTarget = targetLetter.toLowerCase();
    const idx = word.toLowerCase().indexOf(lowerTarget);
    if (idx === -1) return word;
    const cls = isVowel ? 'hl-first' : 'hl-first is-consonant';
    return (
      word.slice(0, idx) +
      `<span class="${cls}">${word[idx]}</span>` +
      word.slice(idx + 1)
    );
  }

  function renderAZGrid() {
    azGrid.innerHTML = '';
    DATA.alphabet.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'az-tile ' + (item.isVowel ? 'is-vowel' : 'is-consonant');
      if (index === state.azIndex) btn.classList.add('is-active');

      const shouldDim =
        (state.azFilter === 'vowel' && !item.isVowel) ||
        (state.azFilter === 'consonant' && item.isVowel);
      if (shouldDim) btn.classList.add('is-dimmed');

      btn.innerHTML = `
        <span class="tile-letters">${item.letter}${item.lower}</span>
        <span class="tile-phonics">${item.phonicsThai.split(' ')[0]}</span>
      `;
      btn.setAttribute('aria-label', `${item.letter} ${item.phonicsThai}`);
      btn.addEventListener('click', () => {
        state.azIndex = index;
        state.azWordIndex = 0;
        SoundFX.pop(item.isVowel ? 660 : 500);
        renderAZStage();
        renderAZGrid();
        speakCurrentPhonics();
      });
      azGrid.appendChild(btn);
    });
  }

  function renderAZStage() {
    const item = DATA.alphabet[state.azIndex];
    const wordObj = item.words[state.azWordIndex] || item.words[0];

    azStageCard.className = 'az-stage-card ' + (item.isVowel ? 'is-vowel' : 'is-consonant');
    azTypePill.className = 'type-pill ' + (item.isVowel ? '' : 'is-consonant');
    azTypePill.textContent = item.isVowel ? 'สระ (Vowel)' : 'พยัญชนะ (Consonant)';
    azCounter.textContent = `${state.azIndex + 1} / ${DATA.alphabet.length}`;

    azLetterBigBtn.className = 'big-letter-tile ' + (item.isVowel ? '' : 'is-consonant');
    azUpper.textContent = item.letter;
    azLower.textContent = item.lower;

    azEmoji.textContent = wordObj.emoji;
    azWordText.innerHTML = highlightTargetLetter(wordObj.word, item.letter, item.isVowel);
    azThaiRead.textContent = wordObj.thaiRead;
    azMeaning.textContent = wordObj.meaning;

    drillLetterSub.textContent = `${item.letter} ${item.lower}`;
    drillPhonicsSub.textContent = `${item.phonicsIpa} ${item.phonicsThai}`;
    drillWordSub.textContent = wordObj.word;

    azWordChips.innerHTML = '';
    item.words.forEach((w, idx) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'word-chip' + (idx === state.azWordIndex ? ' is-selected' : '');
      chip.innerHTML = `
        <span class="word-chip-emoji" aria-hidden="true">${w.emoji}</span>
        <span class="word-chip-meta">
          <span class="word-chip-en">${w.word}</span>
          <span class="word-chip-th">${w.meaning}</span>
        </span>
      `;
      chip.addEventListener('click', () => {
        state.azWordIndex = idx;
        SoundFX.pop(560);
        renderAZStage();
        Speech.speak(w.word);
      });
      azWordChips.appendChild(chip);
    });
  }

  function popBigLetter() {
    azLetterBigBtn.classList.add('is-popping');
    setTimeout(() => azLetterBigBtn.classList.remove('is-popping'), 180);
  }

  function speakCurrentLetterName() {
    const item = DATA.alphabet[state.azIndex];
    popBigLetter();
    Speech.speak(item.letter, { rateMult: 0.95 });
  }

  function speakCurrentPhonics() {
    const item = DATA.alphabet[state.azIndex];
    popBigLetter();
    Speech.speak(item.phonicsSpeak, { rateMult: 0.85 });
  }

  function speakCurrentWord() {
    const item = DATA.alphabet[state.azIndex];
    const wordObj = item.words[state.azWordIndex] || item.words[0];
    Speech.speak(wordObj.word);
  }

  document.getElementById('btnSpeakLetter').addEventListener('click', speakCurrentLetterName);
  document.getElementById('btnSpeakPhonics').addEventListener('click', speakCurrentPhonics);
  document.getElementById('btnSpeakWord').addEventListener('click', speakCurrentWord);
  azLetterBigBtn.addEventListener('click', speakCurrentPhonics);

  const azWordVisual = document.getElementById('azWordVisual');
  azWordVisual.addEventListener('click', () => {
    SoundFX.pop(580);
    speakCurrentWord();
  });
  azWordVisual.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      speakCurrentWord();
    }
  });

  function stepAZ(delta) {
    state.azIndex = (state.azIndex + delta + DATA.alphabet.length) % DATA.alphabet.length;
    state.azWordIndex = 0;
    SoundFX.pop(520);
    renderAZStage();
    renderAZGrid();
    speakCurrentPhonics();
  }

  document.getElementById('azPrevBtn').addEventListener('click', () => stepAZ(-1));
  document.getElementById('azNextBtn').addEventListener('click', () => stepAZ(1));

  document.querySelectorAll('.board-filter-bar .filter-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.azFilter = btn.dataset.filter;
      document.querySelectorAll('.board-filter-bar .filter-pill').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
      });
      SoundFX.pop(540);
      renderAZGrid();
    });
  });

  /* ==================== VIEW 2: PICTURE FLASHCARDS ==================== */
  const fcCard = document.getElementById('fcCard');
  const fcFrontBadge = document.getElementById('fcFrontBadge');
  const fcCountFront = document.getElementById('fcCountFront');
  const fcCountBack = document.getElementById('fcCountBack');
  const fcEmoji = document.getElementById('fcEmoji');
  const fcFrontWord = document.getElementById('fcFrontWord');
  const fcBackWord = document.getElementById('fcBackWord');
  const fcPhonicsTag = document.getElementById('fcPhonicsTag');
  const fcThaiRead = document.getElementById('fcThaiRead');
  const fcThaiMeaning = document.getElementById('fcThaiMeaning');
  const fcQuizToggle = document.getElementById('fcQuizToggle');
  const fcQuizLabel = document.getElementById('fcQuizLabel');
  const fcAutoBtn = document.getElementById('fcAutoBtn');
  const fcAutoLabel = document.getElementById('fcAutoLabel');

  function buildFlashcardDeck(deckKey) {
    if (deckKey === 'az') {
      return DATA.alphabet.map((item) => ({
        badge: `${item.letter} ${item.lower}`,
        emoji: item.words[0].emoji,
        word: item.words[0].word,
        phonics: `${item.phonicsIpa} ${item.phonicsThai}`,
        thaiRead: item.words[0].thaiRead,
        meaning: item.words[0].meaning
      }));
    }
    const vowel = deckKey.replace('cvc-', '');
    const fam = DATA.cvcFamilies[vowel];
    return fam.words.map((w) => ({
      badge: `ผสมคำ ${w.family}`,
      emoji: w.emoji,
      word: w.word,
      phonics: w.letters.join(' - '),
      thaiRead: w.thaiRead,
      meaning: w.meaning
    }));
  }

  function loadFlashcardDeck(deckKey) {
    stopFlashcardAuto();
    state.fcDeckKey = deckKey;
    state.fcCards = buildFlashcardDeck(deckKey);
    state.fcIndex = 0;
    state.fcFlipped = false;
    renderFlashcard();
  }

  function renderFlashcard() {
    const card = state.fcCards[state.fcIndex];
    if (!card) return;
    const countStr = `${state.fcIndex + 1} / ${state.fcCards.length}`;

    fcCard.classList.toggle('is-flipped', state.fcFlipped);
    fcFrontBadge.textContent = card.badge;
    fcCountFront.textContent = countStr;
    fcCountBack.textContent = countStr;
    fcEmoji.textContent = card.emoji;

    if (state.fcQuizMode) {
      fcFrontWord.textContent = 'คำนี้คืออะไรเอ่ย? (แตะดูเฉลย)';
      fcFrontWord.classList.add('is-hidden-quiz');
    } else {
      fcFrontWord.textContent = card.word;
      fcFrontWord.classList.remove('is-hidden-quiz');
    }

    fcBackWord.textContent = card.word;
    fcPhonicsTag.textContent = card.phonics;
    fcThaiRead.textContent = `อ่านว่า: ${card.thaiRead}`;
    fcThaiMeaning.textContent = card.meaning;
  }

  function flipFlashcard() {
    state.fcFlipped = !state.fcFlipped;
    SoundFX.pop(state.fcFlipped ? 640 : 480);
    renderFlashcard();
    if (state.fcFlipped) {
      const card = state.fcCards[state.fcIndex];
      if (card) Speech.speak(card.word);
    }
  }

  function stepFlashcard(delta, autoSpeak = true) {
    state.fcIndex = (state.fcIndex + delta + state.fcCards.length) % state.fcCards.length;
    state.fcFlipped = false;
    SoundFX.pop(520);
    renderFlashcard();
    if (autoSpeak && !state.fcQuizMode) {
      const card = state.fcCards[state.fcIndex];
      if (card) Speech.speak(card.word);
    }
  }

  function stopFlashcardAuto() {
    if (state.fcAutoTimer) {
      clearInterval(state.fcAutoTimer);
      state.fcAutoTimer = null;
      fcAutoBtn.classList.remove('is-on');
      fcAutoLabel.textContent = 'เล่นอัตโนมัติ';
    }
  }

  fcCard.addEventListener('click', flipFlashcard);
  fcCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flipFlashcard();
    }
  });
  document.getElementById('fcFlipBtn').addEventListener('click', flipFlashcard);
  document.getElementById('fcPrevBtn').addEventListener('click', () => {
    stopFlashcardAuto();
    stepFlashcard(-1);
  });
  document.getElementById('fcNextBtn').addEventListener('click', () => {
    stopFlashcardAuto();
    stepFlashcard(1);
  });
  document.getElementById('fcSpeakBtn').addEventListener('click', () => {
    const card = state.fcCards[state.fcIndex];
    if (card) Speech.speak(card.word);
  });

  fcQuizToggle.addEventListener('click', () => {
    state.fcQuizMode = !state.fcQuizMode;
    fcQuizToggle.classList.toggle('is-on', state.fcQuizMode);
    fcQuizLabel.textContent = state.fcQuizMode ? 'โหมดทายคำ: เปิด' : 'โหมดทายคำ: ปิด';
    state.fcFlipped = false;
    SoundFX.pop(560);
    renderFlashcard();
    showToast(state.fcQuizMode ? 'ซ่อนคำศัพท์ด้านหน้าแล้ว — พร้อมทายคำ!' : 'แสดงคำศัพท์ด้านหน้าตามปกติ');
  });

  document.getElementById('fcShuffleBtn').addEventListener('click', () => {
    stopFlashcardAuto();
    for (let i = state.fcCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.fcCards[i], state.fcCards[j]] = [state.fcCards[j], state.fcCards[i]];
    }
    state.fcIndex = 0;
    state.fcFlipped = false;
    SoundFX.pop(660);
    renderFlashcard();
    showToast('สลับลำดับบัตรคำเรียบร้อย!');
  });

  fcAutoBtn.addEventListener('click', () => {
    if (state.fcAutoTimer) {
      stopFlashcardAuto();
      showToast('หยุดเล่นอัตโนมัติแล้ว');
      return;
    }
    fcAutoBtn.classList.add('is-on');
    fcAutoLabel.textContent = 'หยุดเล่น';
    const current = state.fcCards[state.fcIndex];
    if (current) Speech.speak(current.word);

    state.fcAutoTimer = setInterval(() => {
      stepFlashcard(1, true);
    }, Speech.isSlow ? 4200 : 3200);
    showToast('เริ่มเล่นบัตรคำอัตโนมัติ');
  });

  document.querySelectorAll('#fcDeckPills .filter-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#fcDeckPills .filter-pill').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
      });
      SoundFX.pop(540);
      loadFlashcardDeck(btn.dataset.deck);
    });
  });

  /* ==================== VIEW 3: CVC WORD BLENDER ==================== */
  const cvcTrack = document.getElementById('cvcTrack');
  const cvcTiles = [
    document.getElementById('cvcTile0'),
    document.getElementById('cvcTile1'),
    document.getElementById('cvcTile2')
  ];
  const cvcBlendBtn = document.getElementById('cvcBlendBtn');
  const cvcWholeWordBtn = document.getElementById('cvcWholeWordBtn');
  const cvcResultCard = document.getElementById('cvcResultCard');
  const cvcResultEmoji = document.getElementById('cvcResultEmoji');
  const cvcResultWord = document.getElementById('cvcResultWord');
  const cvcResultThai = document.getElementById('cvcResultThai');
  const cvcResultMeaning = document.getElementById('cvcResultMeaning');
  const cvcWordStrip = document.getElementById('cvcWordStrip');

  function getCurrentCVCWord() {
    const fam = DATA.cvcFamilies[state.cvcVowel];
    return fam.words[state.cvcWordIndex] || fam.words[0];
  }

  function renderCVCStage() {
    const w = getCurrentCVCWord();
    cvcTrack.classList.remove('is-blended');
    cvcResultCard.classList.remove('is-celebrating');

    w.letters.forEach((ch, idx) => {
      const tile = cvcTiles[idx];
      const info = LETTER_MAP[ch];
      const isVowel = info ? info.isVowel : idx === 1;
      tile.className = 'cvc-tile ' + (isVowel ? 'is-vowel' : 'is-consonant');
      tile.querySelector('.cvc-char').textContent = ch;
      tile.querySelector('.cvc-cue').textContent = info ? info.phonicsThai.split(' ')[0] : '';
    });

    cvcResultEmoji.textContent = w.emoji;
    cvcResultWord.innerHTML =
      `<span style="color:var(--consonant)">${w.letters[0]}</span>` +
      `<span style="color:var(--vowel)">${w.letters[1]}</span>` +
      `<span style="color:var(--consonant)">${w.letters[2]}</span>`;
    cvcResultThai.textContent = w.thaiRead;
    cvcResultMeaning.textContent = w.meaning;
  }

  function renderCVCStrip() {
    const fam = DATA.cvcFamilies[state.cvcVowel];
    cvcWordStrip.innerHTML = '';
    fam.words.forEach((w, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cvc-word-btn' + (idx === state.cvcWordIndex ? ' is-active' : '');
      btn.innerHTML = `
        <span class="cvc-word-btn-emoji" aria-hidden="true">${w.emoji}</span>
        <span class="cvc-word-btn-text">
          <span class="cvc-word-btn-en">${w.word}</span>
          <span class="cvc-word-btn-th">${w.meaning}</span>
        </span>
      `;
      btn.addEventListener('click', () => {
        if (state.cvcBlending) return;
        state.cvcWordIndex = idx;
        SoundFX.pop(540);
        renderCVCStage();
        renderCVCStrip();
      });
      cvcWordStrip.appendChild(btn);
    });
  }

  // Tap individual CVC tile to hear its phonics sound
  cvcTiles.forEach((tile, idx) => {
    tile.addEventListener('click', () => {
      if (state.cvcBlending) return;
      const w = getCurrentCVCWord();
      const ch = w.letters[idx];
      const info = LETTER_MAP[ch];
      tile.classList.add('is-speaking');
      SoundFX.pop(idx === 1 ? 660 : 500);
      Speech.speak(info ? info.phonicsSpeak : ch, { rateMult: 0.85 }).then(() => {
        tile.classList.remove('is-speaking');
      });
    });
  });

  function wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function runBlendSequence() {
    if (state.cvcBlending) return;
    state.cvcBlending = true;
    cvcBlendBtn.disabled = true;
    cvcTrack.classList.remove('is-blended');
    cvcResultCard.classList.remove('is-celebrating');

    const w = getCurrentCVCWord();
    const gapMs = Speech.isSlow ? 420 : 240;

    for (let i = 0; i < 3; i++) {
      const ch = w.letters[i];
      const info = LETTER_MAP[ch];
      cvcTiles[i].classList.add('is-speaking');
      SoundFX.pop(480 + i * 90);
      await Speech.speak(info ? info.phonicsSpeak : ch, { rateMult: 0.85 });
      cvcTiles[i].classList.remove('is-speaking');
      await wait(gapMs);
    }

    // Slide tiles together!
    cvcTrack.classList.add('is-blended');
    await wait(260);
    SoundFX.chime();
    cvcResultCard.classList.add('is-celebrating');
    await Speech.speak(w.word, { rateMult: 0.92 });

    await wait(600);
    cvcResultCard.classList.remove('is-celebrating');
    state.cvcBlending = false;
    cvcBlendBtn.disabled = false;
  }

  cvcBlendBtn.addEventListener('click', runBlendSequence);
  cvcWholeWordBtn.addEventListener('click', () => {
    if (state.cvcBlending) return;
    const w = getCurrentCVCWord();
    cvcTrack.classList.add('is-blended');
    Speech.speak(w.word);
  });

  document.querySelectorAll('#blenderFamilyBar .vowel-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (state.cvcBlending) return;
      state.cvcVowel = btn.dataset.vowel;
      state.cvcWordIndex = 0;
      document.querySelectorAll('#blenderFamilyBar .vowel-tab').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
      });
      SoundFX.pop(600);
      renderCVCStage();
      renderCVCStrip();
    });
  });

  /* ==================== KEYBOARD SHORTCUTS FOR TEACHERS ==================== */
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (state.view === 'az') {
      if (e.key === 'ArrowRight') { e.preventDefault(); stepAZ(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); stepAZ(-1); }
      else if (e.code === 'Space') { e.preventDefault(); speakCurrentPhonics(); }
    } else if (state.view === 'flashcards') {
      if (e.key === 'ArrowRight') { e.preventDefault(); stopFlashcardAuto(); stepFlashcard(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); stopFlashcardAuto(); stepFlashcard(-1); }
      else if (e.code === 'Space') {
        e.preventDefault();
        const card = state.fcCards[state.fcIndex];
        if (card) Speech.speak(card.word);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        flipFlashcard();
      }
    } else if (state.view === 'blender') {
      if (e.code === 'Space') {
        e.preventDefault();
        runBlendSequence();
      }
    }
  });

  /* ==================== INIT ==================== */
  Speech.init();
  renderAZStage();
  renderAZGrid();
  loadFlashcardDeck('az');
  renderCVCStage();
  renderCVCStrip();
})();
