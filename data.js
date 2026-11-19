// ข้อมูลบทเรียนภาษาอังกฤษ ป.1: A-Z Phonics และคำศัพท์ผสมคำ CVC
// ครูสามารถแก้ไขหรือเพิ่มคำศัพท์ในไฟล์นี้ได้ง่ายๆ

window.PHONICS_DATA = {
  alphabet: [
    {
      letter: 'A', lower: 'a', isVowel: true,
      phonicsIpa: '/æ/', phonicsThai: 'แอะ', phonicsSpeak: 'aa',
      songLine: 'A says /æ/ — Apple!',
      words: [
        { word: 'Apple', emoji: '🍎', thaiRead: 'แอพ-เพิล', meaning: 'แอปเปิล' },
        { word: 'Ant', emoji: '🐜', thaiRead: 'แอนท์', meaning: 'มด' },
        { word: 'Alligator', emoji: '🐊', thaiRead: 'แอล-ลิ-เก-เทอร์', meaning: 'จระเข้' }
      ]
    },
    {
      letter: 'B', lower: 'b', isVowel: false,
      phonicsIpa: '/b/', phonicsThai: 'เบอะ', phonicsSpeak: 'buh',
      songLine: 'B says /b/ — Ball!',
      words: [
        { word: 'Ball', emoji: '⚽', thaiRead: 'บอล', meaning: 'ลูกบอล' },
        { word: 'Bear', emoji: '🐻', thaiRead: 'แบร์', meaning: 'หมี' },
        { word: 'Banana', emoji: '🍌', thaiRead: 'บะ-นา-นะ', meaning: 'กล้วย' }
      ]
    },
    {
      letter: 'C', lower: 'c', isVowel: false,
      phonicsIpa: '/k/', phonicsThai: 'เคอะ', phonicsSpeak: 'kuh',
      songLine: 'C says /k/ — Cat!',
      words: [
        { word: 'Cat', emoji: '🐱', thaiRead: 'แคท', meaning: 'แมว' },
        { word: 'Car', emoji: '🚗', thaiRead: 'คาร์', meaning: 'รถยนต์' },
        { word: 'Cake', emoji: '🎂', thaiRead: 'เค้ก', meaning: 'เค้ก' }
      ]
    },
    {
      letter: 'D', lower: 'd', isVowel: false,
      phonicsIpa: '/d/', phonicsThai: 'เดอะ', phonicsSpeak: 'duh',
      songLine: 'D says /d/ — Dog!',
      words: [
        { word: 'Dog', emoji: '🐶', thaiRead: 'ด็อก', meaning: 'สุนัข' },
        { word: 'Duck', emoji: '🦆', thaiRead: 'ดั๊ก', meaning: 'เป็ด' },
        { word: 'Drum', emoji: '🥁', thaiRead: 'ดรัม', meaning: 'กลอง' }
      ]
    },
    {
      letter: 'E', lower: 'e', isVowel: true,
      phonicsIpa: '/e/', phonicsThai: 'เอะ', phonicsSpeak: 'eh',
      songLine: 'E says /e/ — Egg!',
      words: [
        { word: 'Egg', emoji: '🥚', thaiRead: 'เอก', meaning: 'ไข่' },
        { word: 'Elephant', emoji: '🐘', thaiRead: 'เอล-ลิ-เฟินท์', meaning: 'ช้าง' },
        { word: 'Elf', emoji: '🧝', thaiRead: 'เอลฟ์', meaning: 'ภูตน้อย' }
      ]
    },
    {
      letter: 'F', lower: 'f', isVowel: false,
      phonicsIpa: '/f/', phonicsThai: 'เฟอะ (ฟฟฟ)', phonicsSpeak: 'fff',
      songLine: 'F says /f/ — Fish!',
      words: [
        { word: 'Fish', emoji: '🐟', thaiRead: 'ฟิช', meaning: 'ปลา' },
        { word: 'Frog', emoji: '🐸', thaiRead: 'ฟร็อก', meaning: 'กบ' },
        { word: 'Flower', emoji: '🌸', thaiRead: 'ฟลาว-เออร์', meaning: 'ดอกไม้' }
      ]
    },
    {
      letter: 'G', lower: 'g', isVowel: false,
      phonicsIpa: '/g/', phonicsThai: 'เกอะ', phonicsSpeak: 'guh',
      songLine: 'G says /g/ — Goat!',
      words: [
        { word: 'Goat', emoji: '🐐', thaiRead: 'โกท', meaning: 'แพะ' },
        { word: 'Grapes', emoji: '🍇', thaiRead: 'เกรพส์', meaning: 'องุ่น' },
        { word: 'Gift', emoji: '🎁', thaiRead: 'กิฟท์', meaning: 'ของขวัญ' }
      ]
    },
    {
      letter: 'H', lower: 'h', isVowel: false,
      phonicsIpa: '/h/', phonicsThai: 'เฮอะ', phonicsSpeak: 'huh',
      songLine: 'H says /h/ — Hat!',
      words: [
        { word: 'Hat', emoji: '🎩', thaiRead: 'แฮท', meaning: 'หมวก' },
        { word: 'House', emoji: '🏠', thaiRead: 'เฮาส์', meaning: 'บ้าน' },
        { word: 'Horse', emoji: '🐴', thaiRead: 'ฮอร์ส', meaning: 'ม้า' }
      ]
    },
    {
      letter: 'I', lower: 'i', isVowel: true,
      phonicsIpa: '/ɪ/', phonicsThai: 'อิ', phonicsSpeak: 'ih',
      songLine: 'I says /ɪ/ — Igloo!',
      words: [
        { word: 'Igloo', emoji: '🏠❄️', thaiRead: 'อิก-ลู', meaning: 'บ้านน้ำแข็ง' },
        { word: 'Insect', emoji: '🐞', thaiRead: 'อิน-เซ็กท์', meaning: 'แมลง' },
        { word: 'Ink', emoji: '🖋️', thaiRead: 'อิงค์', meaning: 'น้ำหมึก' }
      ]
    },
    {
      letter: 'J', lower: 'j', isVowel: false,
      phonicsIpa: '/dʒ/', phonicsThai: 'เจอะ', phonicsSpeak: 'juh',
      songLine: 'J says /dʒ/ — Jam!',
      words: [
        { word: 'Jam', emoji: '🍓', thaiRead: 'แจม', meaning: 'แยมผลไม้' },
        { word: 'Juice', emoji: '🧃', thaiRead: 'จูซ', meaning: 'น้ำผลไม้' },
        { word: 'Jellyfish', emoji: '🪼', thaiRead: 'เจล-ลี-ฟิช', meaning: 'แมงกะพรุน' }
      ]
    },
    {
      letter: 'K', lower: 'k', isVowel: false,
      phonicsIpa: '/k/', phonicsThai: 'เคอะ', phonicsSpeak: 'kuh',
      songLine: 'K says /k/ — Kite!',
      words: [
        { word: 'Kite', emoji: '🪁', thaiRead: 'ไคท์', meaning: 'ว่าว' },
        { word: 'King', emoji: '🤴', thaiRead: 'คิง', meaning: 'พระราชา' },
        { word: 'Kangaroo', emoji: '🦘', thaiRead: 'แคง-กะ-รู', meaning: 'จิงโจ้' }
      ]
    },
    {
      letter: 'L', lower: 'l', isVowel: false,
      phonicsIpa: '/l/', phonicsThai: 'เลอะ (ลลล)', phonicsSpeak: 'luh',
      songLine: 'L says /l/ — Lion!',
      words: [
        { word: 'Lion', emoji: '🦁', thaiRead: 'ไล-ออน', meaning: 'สิงโต' },
        { word: 'Lemon', emoji: '🍋', thaiRead: 'เล-มอน', meaning: 'มะนาวเหลือง' },
        { word: 'Leaf', emoji: '🍃', thaiRead: 'ลีฟ', meaning: 'ใบไม้' }
      ]
    },
    {
      letter: 'M', lower: 'm', isVowel: false,
      phonicsIpa: '/m/', phonicsThai: 'เมอะ (มมม)', phonicsSpeak: 'mmm',
      songLine: 'M says /m/ — Monkey!',
      words: [
        { word: 'Monkey', emoji: '🐵', thaiRead: 'มัง-คี', meaning: 'ลิง' },
        { word: 'Moon', emoji: '🌙', thaiRead: 'มูน', meaning: 'พระจันทร์' },
        { word: 'Milk', emoji: '🥛', thaiRead: 'มิลค์', meaning: 'นม' }
      ]
    },
    {
      letter: 'N', lower: 'n', isVowel: false,
      phonicsIpa: '/n/', phonicsThai: 'เนอะ (นนน)', phonicsSpeak: 'nnn',
      songLine: 'N says /n/ — Nest!',
      words: [
        { word: 'Nest', emoji: '🪺', thaiRead: 'เนสท์', meaning: 'รังนก' },
        { word: 'Nose', emoji: '👃', thaiRead: 'โนส', meaning: 'จมูก' },
        { word: 'Nut', emoji: '🥜', thaiRead: 'นัท', meaning: 'ถั่ว' }
      ]
    },
    {
      letter: 'O', lower: 'o', isVowel: true,
      phonicsIpa: '/ɒ/', phonicsThai: 'เอาะ', phonicsSpeak: 'aw',
      songLine: 'O says /ɒ/ — Octopus!',
      words: [
        { word: 'Octopus', emoji: '🐙', thaiRead: 'ออค-โท-พัส', meaning: 'ปลาหมึกยักษ์' },
        { word: 'Orange', emoji: '🍊', thaiRead: 'ออ-เรนจ์', meaning: 'ส้ม' },
        { word: 'Ox', emoji: '🐂', thaiRead: 'ออกซ์', meaning: 'วัวตัวผู้' }
      ]
    },
    {
      letter: 'P', lower: 'p', isVowel: false,
      phonicsIpa: '/p/', phonicsThai: 'เพอะ', phonicsSpeak: 'puh',
      songLine: 'P says /p/ — Pig!',
      words: [
        { word: 'Pig', emoji: '🐷', thaiRead: 'พิก', meaning: 'หมู' },
        { word: 'Panda', emoji: '🐼', thaiRead: 'แพน-ด้า', meaning: 'หมีแพนด้า' },
        { word: 'Pencil', emoji: '✏️', thaiRead: 'เพน-ซิล', meaning: 'ดินสอ' }
      ]
    },
    {
      letter: 'Q', lower: 'q', isVowel: false,
      phonicsIpa: '/kw/', phonicsThai: 'เควอะ', phonicsSpeak: 'kwuh',
      songLine: 'Q says /kw/ — Queen!',
      words: [
        { word: 'Queen', emoji: '👸', thaiRead: 'ควีน', meaning: 'พระราชินี' },
        { word: 'Quilt', emoji: '🛏️', thaiRead: 'ควิลท์', meaning: 'ผ้านวม' },
        { word: 'Question', emoji: '❓', thaiRead: 'เควส-ชัน', meaning: 'คำถาม' }
      ]
    },
    {
      letter: 'R', lower: 'r', isVowel: false,
      phonicsIpa: '/r/', phonicsThai: 'เรอะ (รรร)', phonicsSpeak: 'ruh',
      songLine: 'R says /r/ — Rabbit!',
      words: [
        { word: 'Rabbit', emoji: '🐰', thaiRead: 'แรบ-บิท', meaning: 'กระต่าย' },
        { word: 'Rainbow', emoji: '🌈', thaiRead: 'เรน-โบว์', meaning: 'สายรุ้ง' },
        { word: 'Robot', emoji: '🤖', thaiRead: 'โร-บอท', meaning: 'หุ่นยนต์' }
      ]
    },
    {
      letter: 'S', lower: 's', isVowel: false,
      phonicsIpa: '/s/', phonicsThai: 'เซอะ (ซซซ)', phonicsSpeak: 'sss',
      songLine: 'S says /s/ — Sun!',
      words: [
        { word: 'Sun', emoji: '☀️', thaiRead: 'ซัน', meaning: 'พระอาทิตย์' },
        { word: 'Star', emoji: '⭐', thaiRead: 'สตาร์', meaning: 'ดาว' },
        { word: 'Snake', emoji: '🐍', thaiRead: 'สเนค', meaning: 'งู' }
      ]
    },
    {
      letter: 'T', lower: 't', isVowel: false,
      phonicsIpa: '/t/', phonicsThai: 'เทอะ', phonicsSpeak: 'tuh',
      songLine: 'T says /t/ — Tiger!',
      words: [
        { word: 'Tiger', emoji: '🐯', thaiRead: 'ไท-เกอร์', meaning: 'เสือ' },
        { word: 'Turtle', emoji: '🐢', thaiRead: 'เทอร์-เทิล', meaning: 'เต่า' },
        { word: 'Tree', emoji: '🌳', thaiRead: 'ทรี', meaning: 'ต้นไม้' }
      ]
    },
    {
      letter: 'U', lower: 'u', isVowel: true,
      phonicsIpa: '/ʌ/', phonicsThai: 'อะ', phonicsSpeak: 'uh',
      songLine: 'U says /ʌ/ — Umbrella!',
      words: [
        { word: 'Umbrella', emoji: '☂️', thaiRead: 'อัม-เบรล-ละ', meaning: 'ร่ม' },
        { word: 'Up', emoji: '⬆️', thaiRead: 'อัพ', meaning: 'ขึ้นข้างบน' },
        { word: 'Uncle', emoji: '👨', thaiRead: 'อัง-เคิล', meaning: 'คุณลุง' }
      ]
    },
    {
      letter: 'V', lower: 'v', isVowel: false,
      phonicsIpa: '/v/', phonicsThai: 'เวอะ (ววว)', phonicsSpeak: 'vvv',
      songLine: 'V says /v/ — Van!',
      words: [
        { word: 'Van', emoji: '🚐', thaiRead: 'แวน', meaning: 'รถตู้' },
        { word: 'Violin', emoji: '🎻', thaiRead: 'ไว-โอ-ลิน', meaning: 'ไวโอลิน' },
        { word: 'Volcano', emoji: '🌋', thaiRead: 'วอล-เค-โน', meaning: 'ภูเขาไฟ' }
      ]
    },
    {
      letter: 'W', lower: 'w', isVowel: false,
      phonicsIpa: '/w/', phonicsThai: 'เวอะ', phonicsSpeak: 'wuh',
      songLine: 'W says /w/ — Whale!',
      words: [
        { word: 'Whale', emoji: '🐳', thaiRead: 'เวล', meaning: 'ปลาวาฬ' },
        { word: 'Watch', emoji: '⌚', thaiRead: 'วอทช์', meaning: 'นาฬิกาข้อมือ' },
        { word: 'Watermelon', emoji: '🍉', thaiRead: 'วอ-เทอร์-เม-ลอน', meaning: 'แตงโม' }
      ]
    },
    {
      letter: 'X', lower: 'x', isVowel: false,
      phonicsIpa: '/ks/', phonicsThai: 'คส์ (กซ์)', phonicsSpeak: 'ks',
      songLine: 'X says /ks/ — Box!',
      words: [
        { word: 'Box', emoji: '📦', thaiRead: 'บ็อกซ์', meaning: 'กล่อง' },
        { word: 'Fox', emoji: '🦊', thaiRead: 'ฟ็อกซ์', meaning: 'สุนัขจิ้งจอก' },
        { word: 'X-ray', emoji: '🩻', thaiRead: 'เอกซ์-เรย์', meaning: 'ภาพเอกซเรย์' }
      ]
    },
    {
      letter: 'Y', lower: 'y', isVowel: false,
      phonicsIpa: '/j/', phonicsThai: 'เยอะ', phonicsSpeak: 'yuh',
      songLine: 'Y says /j/ — Yo-yo!',
      words: [
        { word: 'Yo-yo', emoji: '🪀', thaiRead: 'โย-โย่', meaning: 'ลูกดิ่งโยโย่' },
        { word: 'Yellow', emoji: '💛', thaiRead: 'เยล-โลว์', meaning: 'สีเหลือง' },
        { word: 'Yak', emoji: '🐃', thaiRead: 'แยค', meaning: 'จามรี' }
      ]
    },
    {
      letter: 'Z', lower: 'z', isVowel: false,
      phonicsIpa: '/z/', phonicsThai: 'เซอะ (ซซซ สั่นคอ)', phonicsSpeak: 'zzz',
      songLine: 'Z says /z/ — Zebra!',
      words: [
        { word: 'Zebra', emoji: '🦓', thaiRead: 'ซี-บรา', meaning: 'ม้าลาย' },
        { word: 'Zipper', emoji: '🤐', thaiRead: 'ซิป-เพอร์', meaning: 'ซิป' },
        { word: 'Zoo', emoji: '🦒', thaiRead: 'ซู', meaning: 'สวนสัตว์' }
      ]
    }
  ],

  cvcFamilies: {
    a: {
      label: 'สระ a (-แอะ-)',
      vowelSound: 'แอะ',
      words: [
        { letters: ['c', 'a', 't'], word: 'cat', emoji: '🐱', thaiRead: 'แคท', meaning: 'แมว', family: '-at' },
        { letters: ['b', 'a', 't'], word: 'bat', emoji: '🦇', thaiRead: 'แบท', meaning: 'ค้างคาว', family: '-at' },
        { letters: ['h', 'a', 't'], word: 'hat', emoji: '🎩', thaiRead: 'แฮท', meaning: 'หมวก', family: '-at' },
        { letters: ['r', 'a', 't'], word: 'rat', emoji: '🐀', thaiRead: 'แรท', meaning: 'หนู', family: '-at' },
        { letters: ['f', 'a', 'n'], word: 'fan', emoji: '🪭', thaiRead: 'แฟน', meaning: 'พัดลม / พัด', family: '-an' },
        { letters: ['v', 'a', 'n'], word: 'van', emoji: '🚐', thaiRead: 'แวน', meaning: 'รถตู้', family: '-an' },
        { letters: ['b', 'a', 'g'], word: 'bag', emoji: '🎒', thaiRead: 'แบก', meaning: 'กระเป๋า', family: '-ag' },
        { letters: ['m', 'a', 'p'], word: 'map', emoji: '🗺️', thaiRead: 'แมพ', meaning: 'แผนที่', family: '-ap' }
      ]
    },
    e: {
      label: 'สระ e (-เอะ-)',
      vowelSound: 'เอะ',
      words: [
        { letters: ['b', 'e', 'd'], word: 'bed', emoji: '🛏️', thaiRead: 'เบด', meaning: 'เตียงนอน', family: '-ed' },
        { letters: ['r', 'e', 'd'], word: 'red', emoji: '🔴', thaiRead: 'เรด', meaning: 'สีแดง', family: '-ed' },
        { letters: ['h', 'e', 'n'], word: 'hen', emoji: '🐔', thaiRead: 'เฮน', meaning: 'แม่ไก่', family: '-en' },
        { letters: ['p', 'e', 'n'], word: 'pen', emoji: '🖊️', thaiRead: 'เพน', meaning: 'ปากกา', family: '-en' },
        { letters: ['t', 'e', 'n'], word: 'ten', emoji: '🔟', thaiRead: 'เทน', meaning: 'เลขสิบ', family: '-en' },
        { letters: ['n', 'e', 't'], word: 'net', emoji: '🥅', thaiRead: 'เนท', meaning: 'ตาข่าย', family: '-et' },
        { letters: ['p', 'e', 't'], word: 'pet', emoji: '🐕', thaiRead: 'เพท', meaning: 'สัตว์เลี้ยง', family: '-et' },
        { letters: ['w', 'e', 'b'], word: 'web', emoji: '🕸️', thaiRead: 'เวบ', meaning: 'ใยแมงมุม', family: '-eb' }
      ]
    },
    i: {
      label: 'สระ i (-อิ-)',
      vowelSound: 'อิ',
      words: [
        { letters: ['p', 'i', 'g'], word: 'pig', emoji: '🐷', thaiRead: 'พิก', meaning: 'หมู', family: '-ig' },
        { letters: ['b', 'i', 'g'], word: 'big', emoji: '🐘', thaiRead: 'บิก', meaning: 'ใหญ่', family: '-ig' },
        { letters: ['d', 'i', 'g'], word: 'dig', emoji: '⛏️', thaiRead: 'ดิก', meaning: 'ขุด', family: '-ig' },
        { letters: ['p', 'i', 'n'], word: 'pin', emoji: '📌', thaiRead: 'พิน', meaning: 'หมุด', family: '-in' },
        { letters: ['b', 'i', 'n'], word: 'bin', emoji: '🗑️', thaiRead: 'บิน', meaning: 'ถังขยะ', family: '-in' },
        { letters: ['l', 'i', 'p'], word: 'lip', emoji: '👄', thaiRead: 'ลิพ', meaning: 'ริมฝีปาก', family: '-ip' },
        { letters: ['z', 'i', 'p'], word: 'zip', emoji: '🤐', thaiRead: 'ซิพ', meaning: 'รูดซิป', family: '-ip' },
        { letters: ['s', 'i', 'x'], word: 'six', emoji: '6️⃣', thaiRead: 'ซิกซ์', meaning: 'เลขหก', family: '-ix' }
      ]
    },
    o: {
      label: 'สระ o (-เอาะ-)',
      vowelSound: 'เอาะ',
      words: [
        { letters: ['d', 'o', 'g'], word: 'dog', emoji: '🐶', thaiRead: 'ด็อก', meaning: 'สุนัข', family: '-og' },
        { letters: ['l', 'o', 'g'], word: 'log', emoji: '🪵', thaiRead: 'ล็อก', meaning: 'ท่อนซุง', family: '-og' },
        { letters: ['b', 'o', 'x'], word: 'box', emoji: '📦', thaiRead: 'บ็อกซ์', meaning: 'กล่อง', family: '-ox' },
        { letters: ['f', 'o', 'x'], word: 'fox', emoji: '🦊', thaiRead: 'ฟ็อกซ์', meaning: 'สุนัขจิ้งจอก', family: '-ox' },
        { letters: ['p', 'o', 't'], word: 'pot', emoji: '🍲', thaiRead: 'พ็อท', meaning: 'หม้อ', family: '-ot' },
        { letters: ['h', 'o', 't'], word: 'hot', emoji: '🔥', thaiRead: 'ฮ็อท', meaning: 'ร้อน', family: '-ot' },
        { letters: ['m', 'o', 'p'], word: 'mop', emoji: '🧹', thaiRead: 'ม็อพ', meaning: 'ไม้ถูพื้น', family: '-op' },
        { letters: ['t', 'o', 'p'], word: 'top', emoji: '🪀', thaiRead: 'ท็อพ', meaning: 'ลูกข่าง', family: '-op' }
      ]
    },
    u: {
      label: 'สระ u (-อะ-)',
      vowelSound: 'อะ',
      words: [
        { letters: ['s', 'u', 'n'], word: 'sun', emoji: '☀️', thaiRead: 'ซัน', meaning: 'พระอาทิตย์', family: '-un' },
        { letters: ['r', 'u', 'n'], word: 'run', emoji: '🏃', thaiRead: 'รัน', meaning: 'วิ่ง', family: '-un' },
        { letters: ['b', 'u', 'g'], word: 'bug', emoji: '🐞', thaiRead: 'บัก', meaning: 'แมลง', family: '-ug' },
        { letters: ['m', 'u', 'g'], word: 'mug', emoji: '☕', thaiRead: 'มัก', meaning: 'แก้วมีหู', family: '-ug' },
        { letters: ['h', 'u', 'g'], word: 'hug', emoji: '🤗', thaiRead: 'ฮัก', meaning: 'กอด', family: '-ug' },
        { letters: ['c', 'u', 'p'], word: 'cup', emoji: '🥤', thaiRead: 'คัพ', meaning: 'ถ้วย', family: '-up' },
        { letters: ['b', 'u', 's'], word: 'bus', emoji: '🚌', thaiRead: 'บัส', meaning: 'รถบัส', family: '-us' },
        { letters: ['n', 'u', 't'], word: 'nut', emoji: '🥜', thaiRead: 'นัท', meaning: 'ถั่ว', family: '-ut' }
      ]
    }
  }
};
