/* Zeitformen-Übersicht und Gesprächsszenarien. */

/* t: Position auf dem Zeitstrahl: 'past' | 'now' | 'past-now' | 'future' */
window.TENSES = [
  {
    id: 'present-simple', name: 'Present Simple', de: 'Gegenwart (einfach)', t: 'now',
    form: ['I work · she work<b>s</b>', "I <b>don't</b> work · she <b>doesn't</b> work", '<b>Do</b> you work? · <b>Does</b> she work?'],
    use: ['Gewohnheiten und Routinen', 'Fakten, die immer gelten', 'Fahrpläne (The train leaves at 8.)'],
    signal: 'always, usually, often, sometimes, never, every day, on Mondays',
    pitfall: 'Das -s bei he / she / it wird am häufigsten vergessen: She lives in Berlin.',
    examples: [
      { en: 'I get up at seven every day.', de: 'Ich stehe jeden Tag um sieben auf.' },
      { en: "My wife doesn't eat meat.", de: 'Meine Frau isst kein Fleisch.' }
    ],
    quiz: [
      { s: 'My brother ___ in Manchester.', o: ['live', 'lives', 'is live'], a: 1, w: 'he → lives.' },
      { s: '___ you often go to the cinema?', o: ['Are', 'Do', 'Does'], a: 1, w: 'Frage im Present Simple mit do.' },
      { s: 'The shop ___ at 9 am.', o: ['opens', 'is opening', 'open'], a: 0, w: 'Feste Zeiten / Fahrpläne → Present Simple.' }
    ]
  },
  {
    id: 'present-continuous', name: 'Present Continuous', de: 'Verlaufsform Gegenwart', t: 'now',
    form: ["I<b>'m</b> work<b>ing</b> · she<b>'s</b> work<b>ing</b>", "I'm <b>not</b> working · she <b>isn't</b> working", '<b>Are</b> you working?'],
    use: ['Passiert genau jetzt', 'Vorübergehend (this week)', 'Feste Verabredung in der Zukunft'],
    signal: 'now, right now, at the moment, today, this week, Look! Listen!',
    pitfall: 'Verben wie like, know, want, need stehen fast nie in der -ing-Form: I know (nicht: I am knowing).',
    examples: [
      { en: "We're waiting for the bus.", de: 'Wir warten auf den Bus.' },
      { en: "I'm meeting my friend tonight.", de: 'Ich treffe heute Abend meine Freundin.' }
    ],
    quiz: [
      { s: "Be quiet! The baby ___.", o: ['sleeps', 'is sleeping', 'sleep'], a: 1, w: 'Passiert gerade → is sleeping.' },
      { s: 'I ___ what you mean.', o: ['know', 'am knowing', 'knowing'], a: 0, w: '„know“ steht nicht in der -ing-Form.' },
      { s: "We ___ dinner with Sue on Friday.", o: ['have', 'are having', 'will having'], a: 1, w: 'Feste Verabredung → Present Continuous.' }
    ]
  },
  {
    id: 'past-simple', name: 'Past Simple', de: 'Vergangenheit', t: 'past',
    form: ['I work<b>ed</b> · I <b>went</b> (unregelmäßig)', "I <b>didn't</b> work / go", '<b>Did</b> you work / go?'],
    use: ['Abgeschlossene Handlung in der Vergangenheit', 'Mit genauer Zeitangabe', 'Erzählen (erst … dann …)'],
    signal: 'yesterday, last week, in 2020, two days ago, when I was young',
    pitfall: 'Im Deutschen erzählt man oft im Perfekt. Englisch: Past Simple, sobald die Zeit abgeschlossen ist.',
    examples: [
      { en: 'We visited Edinburgh last year.', de: 'Wir haben letztes Jahr Edinburgh besucht.' },
      { en: "I didn't sleep well.", de: 'Ich habe nicht gut geschlafen.' }
    ],
    quiz: [
      { s: 'Yesterday I ___ a great film.', o: ['have seen', 'saw', 'see'], a: 1, w: '„yesterday“ → Past Simple.' },
      { s: "We ___ go out last night.", o: ["didn't", "haven't", "weren't"], a: 0, w: 'Verneinung: didn\'t + Grundform.' },
      { s: 'Where ___ you buy that jacket?', o: ['did', 'have', 'were'], a: 0, w: 'Frage in der Vergangenheit: did.' }
    ]
  },
  {
    id: 'past-continuous', name: 'Past Continuous', de: 'Verlaufsform Vergangenheit', t: 'past',
    form: ['I <b>was</b> work<b>ing</b> · they <b>were</b> work<b>ing</b>', "I <b>wasn't</b> working", '<b>Were</b> you working?'],
    use: ['Handlung war gerade im Gange …', '… als etwas anderes passierte (Past Simple)', 'Hintergrund beim Erzählen'],
    signal: 'while, when, at 8 pm yesterday',
    pitfall: 'Die lange Handlung bekommt -ing, die kurze, plötzliche das Past Simple.',
    examples: [
      { en: 'I was having a shower when the phone rang.', de: 'Ich war gerade unter der Dusche, als das Telefon klingelte.' },
      { en: 'It was raining all day.', de: 'Es hat den ganzen Tag geregnet.' }
    ],
    quiz: [
      { s: 'We ___ dinner when you called.', o: ['had', 'were having', 'have'], a: 1, w: 'Laufende Handlung, unterbrochen → were having.' },
      { s: 'While I was walking home, I ___ an old friend.', o: ['met', 'was meeting', 'meet'], a: 0, w: 'Kurze Handlung → Past Simple.' },
      { s: 'What ___ you doing at 8 pm yesterday?', o: ['did', 'were', 'was'], a: 1, w: 'you → were … doing.' }
    ]
  },
  {
    id: 'present-perfect', name: 'Present Perfect', de: 'Vergangenheit mit Bezug zu jetzt', t: 'past-now',
    form: ["I<b>'ve</b> work<b>ed</b> · she<b>'s</b> <b>been</b>", "I <b>haven't</b> seen", '<b>Have</b> you <b>ever</b> been …?'],
    use: ['Erfahrungen ohne Zeitangabe', 'Ergebnis ist jetzt wichtig', 'Von früher bis jetzt (for / since)'],
    signal: 'ever, never, already, yet, just, for, since, so far',
    pitfall: '„seit“ = for / since + Present Perfect: I have lived here for 5 years (nicht: I live here since 5 years).',
    examples: [
      { en: "I've never been to Wales.", de: 'Ich war noch nie in Wales.' },
      { en: "She's worked here since March.", de: 'Sie arbeitet hier seit März.' }
    ],
    quiz: [
      { s: 'I ___ him for ten years.', o: ['know', 'have known', 'knew'], a: 1, w: 'Seit 10 Jahren bis jetzt → have known.' },
      { s: 'Have you ___ been to Spain?', o: ['ever', 'yet', 'since'], a: 0, w: 'Erfahrung: Have you ever …?' },
      { s: 'We ___ to Italy in 2019.', o: ['have been', 'went', 'go'], a: 1, w: '„in 2019“ ist abgeschlossen → Past Simple.' }
    ]
  },
  {
    id: 'going-to', name: 'going to', de: 'Zukunft: Plan / Absicht', t: 'future',
    form: ["I<b>'m going to</b> visit", "I'm <b>not going to</b> visit", '<b>Are</b> you <b>going to</b> visit?'],
    use: ['Plan, schon vorher entschieden', 'Vorhersage mit sichtbarem Anzeichen (Look at those clouds – it\'s going to rain.)'],
    signal: 'next week, tomorrow, this summer, soon',
    pitfall: 'Im Gespräch klingt es oft wie „gonna“ – geschrieben aber immer „going to“.',
    examples: [
      { en: "We're going to stay with friends.", de: 'Wir werden bei Freunden übernachten.' },
      { en: "Look at the sky. It's going to rain.", de: 'Schau dir den Himmel an. Gleich regnet es.' }
    ],
    quiz: [
      { s: "I've decided. I ___ learn to swim.", o: ['am going to', 'will', 'learn'], a: 0, w: 'Bereits entschieden → going to.' },
      { s: 'Watch out! You ___ fall!', o: ['will', 'are going to', 'fall'], a: 1, w: 'Sichtbares Anzeichen → going to.' },
      { s: '___ you going to see the match?', o: ['Do', 'Are', 'Will'], a: 1, w: 'Frage: Are you going to …?' }
    ]
  },
  {
    id: 'will', name: 'will', de: 'Zukunft: spontan / Vermutung', t: 'future',
    form: ["I<b>'ll</b> help · it <b>will</b> rain", "I <b>won't</b> forget", '<b>Will</b> you come?'],
    use: ['Spontane Entscheidung', 'Angebot, Versprechen', 'Vermutung (I think … / probably)'],
    signal: 'I think, probably, maybe, I promise',
    pitfall: 'Englisch „will“ = werden. „Ich will“ = I want to. Verneinung: won\'t (= will not).',
    examples: [
      { en: "I'll carry your bag.", de: 'Ich trage deine Tasche.' },
      { en: "I won't tell anyone.", de: 'Ich sage es niemandem.' }
    ],
    quiz: [
      { s: "It's hot in here. – I ___ open the window.", o: ["'ll", "'m going to", 'open'], a: 0, w: 'Spontan → will.' },
      { s: "Don't worry, I ___ be late.", o: ["won't", "don't", "am not"], a: 0, w: 'Versprechen, verneint → won\'t.' },
      { s: 'I ___ to visit Canada one day.  (Ich will …)', o: ['will', 'want', 'would'], a: 1, w: '„Ich will“ = I want to.' }
    ]
  }
];

/* Rollenspiele für den Gesprächspartner. */
window.SCENARIOS = [
  {
    id: 'smalltalk', title: 'Smalltalk im Café', place: 'Café in Bath',
    role: 'a friendly retired local called Margaret, sitting at the next table in a café in Bath, who starts a chat with the learner',
    opening: "Lovely weather today, isn't it? Are you here on holiday?",
    openingDe: 'Herrliches Wetter heute, nicht wahr? Sind Sie im Urlaub hier?',
    goal: 'Erzähl, woher du kommst, wie lange du bleibst und was du schon gesehen hast.'
  },
  {
    id: 'hotel', title: 'Check-in im Hotel', place: 'Hotel in Edinburgh',
    role: 'a polite receptionist called James at a small hotel in Edinburgh; the learner is a guest arriving to check in',
    opening: 'Good evening and welcome to the Thistle Hotel. How can I help you?',
    openingDe: 'Guten Abend und willkommen im Thistle Hotel. Wie kann ich Ihnen helfen?',
    goal: 'Checke ein, frag nach Frühstück und WLAN und melde, dass im Zimmer etwas fehlt.'
  },
  {
    id: 'pub', title: 'Essen im Pub', place: 'Pub in London',
    role: 'a cheerful waiter called Tom in a traditional pub in London; the learner wants to eat and drink',
    opening: 'Hi there! Just the one of you, or are you waiting for someone?',
    openingDe: 'Hallo! Nur Sie allein, oder warten Sie noch auf jemanden?',
    goal: 'Bestell Essen und ein Getränk, frag nach einer Empfehlung und bitte am Ende um die Rechnung.'
  },
  {
    id: 'directions', title: 'Nach dem Weg fragen', place: 'Straße in York',
    role: 'a helpful local called Priya in York city centre who sees that the learner looks lost; give clear directions to places the learner asks about',
    opening: 'Hi, you look a bit lost. Can I help you?',
    openingDe: 'Hallo, Sie sehen etwas verloren aus. Kann ich Ihnen helfen?',
    goal: 'Frag, wie du zum Bahnhof und zum Münster kommst und wie lange es zu Fuß dauert.'
  },
  {
    id: 'station', title: 'Fahrkarte kaufen', place: 'Bahnhof in London',
    role: 'a ticket office clerk at King\'s Cross station in London; the learner wants to buy a train ticket',
    opening: 'Next, please! Where would you like to travel to today?',
    openingDe: 'Der Nächste, bitte! Wohin möchten Sie heute fahren?',
    goal: 'Kauf eine Hin- und Rückfahrkarte, frag nach Abfahrtszeit, Gleis und ob du umsteigen musst.'
  },
  {
    id: 'shop', title: 'Kleidung kaufen', place: 'Geschäft in Manchester',
    role: 'a shop assistant called Chloe in a clothes shop in Manchester',
    opening: 'Hello! Are you looking for anything in particular?',
    openingDe: 'Hallo! Suchen Sie etwas Bestimmtes?',
    goal: 'Frag nach einer Jacke in deiner Größe, probier sie an, frag nach dem Preis und bezahle.'
  },
  {
    id: 'chemist', title: 'In der Apotheke', place: 'Apotheke in Brighton',
    role: "a kind pharmacist at a chemist's in Brighton; the learner feels ill on holiday",
    opening: 'Hello, what can I do for you today?',
    openingDe: 'Hallo, was kann ich heute für Sie tun?',
    goal: 'Beschreib deine Beschwerden (z. B. Halsschmerzen, Fieber) und frag, was du nehmen sollst.'
  },
  {
    id: 'phone', title: 'Termin am Telefon', place: 'Zahnarztpraxis',
    role: 'a receptionist called Sarah answering the phone at a dental practice in Oxford; the learner calls to make an appointment',
    opening: 'Good morning, Smile Dental Practice, Sarah speaking. How can I help?',
    openingDe: 'Guten Morgen, Zahnarztpraxis Smile, Sarah am Apparat. Wie kann ich helfen?',
    goal: 'Vereinbare einen Termin, nenne Tag und Uhrzeit und buchstabiere deinen Namen.'
  },
  {
    id: 'story', title: 'Vom Urlaub erzählen', place: 'Bei Freunden',
    role: 'an English friend called Ben who is curious about the learner\'s last holiday and asks follow-up questions (encourage the past simple)',
    opening: "Welcome back! So, how was your holiday? Tell me everything!",
    openingDe: 'Willkommen zurück! Und, wie war dein Urlaub? Erzähl mir alles!',
    goal: 'Erzähl in der Vergangenheit: Wo warst du, was hast du gemacht, wie war das Wetter?'
  },
  {
    id: 'free', title: 'Freies Gespräch', place: 'Beliebiges Thema',
    role: 'a friendly English conversation partner called Emma; talk about any everyday topic the learner chooses',
    opening: 'Hi! Nice to talk to you. What would you like to chat about today?',
    openingDe: 'Hallo! Schön, mit dir zu sprechen. Worüber möchtest du heute plaudern?',
    goal: 'Wähle ein Thema: Familie, Arbeit, Hobbys, Pläne fürs Wochenende …'
  }
];
