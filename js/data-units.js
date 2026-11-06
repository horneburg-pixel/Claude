/* Lerninhalte: 12 Einheiten für Urlaub, Smalltalk und Alltag (britisches Englisch, Niveau A2 → B1).
 * Aufbau je Einheit:
 *   vocab:   Wörter  {en, de, ex}            ex = Beispielsatz (Englisch)
 *   phrases: Sätze   {en, de}
 *   grammar: {title, text (HTML, Deutsch), examples [{en, de}]}
 *   gaps:    Lückensätze {s, o: Optionen, a: Index der Lösung, w: Erklärung (Deutsch)}
 */
window.UNITS = [
  {
    id: 'meet', title: 'Kennenlernen', en: 'Meeting people',
    vocab: [
      { en: 'surname', de: 'Nachname', ex: "What's your surname?" },
      { en: 'neighbour', de: 'Nachbar/in', ex: 'My neighbour is very friendly.' },
      { en: 'colleague', de: 'Kollege / Kollegin', ex: 'She is a colleague from work.' },
      { en: 'retired', de: 'im Ruhestand', ex: 'My father is retired.' },
      { en: 'married', de: 'verheiratet', ex: 'Are you married?' },
      { en: 'hometown', de: 'Heimatstadt', ex: 'My hometown is near Hamburg.' },
      { en: 'flat', de: 'Wohnung', ex: 'We live in a small flat.' },
      { en: 'to be from', de: 'kommen aus', ex: "I'm from Germany." },
      { en: 'job', de: 'Beruf, Job', ex: 'I like my job.' },
      { en: 'nice', de: 'nett, schön', ex: 'It was nice to meet you.' }
    ],
    phrases: [
      { en: 'Nice to meet you.', de: 'Freut mich, dich kennenzulernen.' },
      { en: 'Where are you from?', de: 'Woher kommst du?' },
      { en: 'What do you do for a living?', de: 'Was machst du beruflich?' },
      { en: 'Is this your first time in London?', de: 'Bist du zum ersten Mal in London?' },
      { en: "I'm here on holiday with my family.", de: 'Ich bin mit meiner Familie im Urlaub hier.' },
      { en: 'How long are you staying?', de: 'Wie lange bleibst du?' }
    ],
    grammar: {
      title: 'to be: am, is, are',
      text: '<p><b>I am</b> (I\'m) · <b>you / we / they are</b> (you\'re …) · <b>he / she / it is</b> (he\'s …)</p>' +
        '<p><b>Frage:</b> Das Verb kommt nach vorne – ohne <i>do</i>: <i>Are you married? Is she here?</i></p>' +
        '<p><b>Verneinung:</b> I\'m not · he isn\'t · they aren\'t.</p>' +
        '<p>Im Gespräch benutzt man fast immer die Kurzformen: <i>I\'m, you\'re, it\'s</i>.</p>',
      examples: [
        { en: "I'm from Cologne.", de: 'Ich komme aus Köln.' },
        { en: 'Are you here on holiday?', de: 'Bist du im Urlaub hier?' },
        { en: "My husband isn't retired yet.", de: 'Mein Mann ist noch nicht im Ruhestand.' }
      ]
    },
    gaps: [
      { s: 'I ___ from Germany.', o: ['am', 'is', 'are'], a: 0, w: 'Bei „I“ steht immer „am“.' },
      { s: 'My wife ___ a teacher.', o: ['are', 'is', 'am'], a: 1, w: '„My wife“ = she → is.' },
      { s: '___ you married?', o: ['Is', 'Do', 'Are'], a: 2, w: 'Fragen mit „be“ brauchen kein „do“: Are you …?' },
      { s: 'We ___ here on holiday.', o: ['are', 'is', 'be'], a: 0, w: 'we → are.' },
      { s: 'My children ___ at school.', o: ['is', 'are', 'am'], a: 1, w: '„My children“ = they (Mehrzahl) → are.' },
      { s: 'She ___ from here.  (verneint)', o: ["isn't", "doesn't", "aren't"], a: 0, w: 'Verneinung von „is“ → isn\'t. „doesn\'t“ gehört zu normalen Verben (She doesn\'t live here).' }
    ]
  },
  {
    id: 'airport', title: 'Am Flughafen', en: 'At the airport',
    vocab: [
      { en: 'flight', de: 'Flug', ex: 'Our flight leaves at nine.' },
      { en: 'boarding pass', de: 'Bordkarte', ex: 'Can I see your boarding pass, please?' },
      { en: 'luggage', de: 'Gepäck', ex: 'Where can I collect my luggage?' },
      { en: 'hand luggage', de: 'Handgepäck', ex: 'I only have hand luggage.' },
      { en: 'gate', de: 'Flugsteig, Gate', ex: 'The flight leaves from gate 12.' },
      { en: 'delay', de: 'Verspätung', ex: 'There is a two-hour delay.' },
      { en: 'departure', de: 'Abflug, Abfahrt', ex: 'Check the departure board.' },
      { en: 'arrival', de: 'Ankunft', ex: 'What is the arrival time?' },
      { en: 'passport', de: 'Reisepass', ex: "Don't forget your passport!" },
      { en: 'to check in', de: 'einchecken', ex: 'We need to check in two hours early.' }
    ],
    phrases: [
      { en: 'Where can I check in my luggage?', de: 'Wo kann ich mein Gepäck aufgeben?' },
      { en: 'My flight has been delayed.', de: 'Mein Flug hat Verspätung.' },
      { en: 'Could you help me with my suitcase, please?', de: 'Könnten Sie mir bitte mit meinem Koffer helfen?' },
      { en: "I'd like a window seat, please.", de: 'Ich hätte gern einen Fensterplatz.' },
      { en: "My suitcase hasn't arrived.", de: 'Mein Koffer ist nicht angekommen.' },
      { en: 'How long does it take to get to the city centre?', de: 'Wie lange braucht man bis ins Stadtzentrum?' }
    ],
    grammar: {
      title: 'Höfliche Bitten: can, could, would you mind',
      text: '<p><b>Can I …?</b> – Kann/Darf ich …? (neutral)</p>' +
        '<p><b>Could you …?</b> – Könnten Sie …? (höflicher, bei Fremden ideal)</p>' +
        '<p><b>Would you mind + -ing?</b> – Würde es Ihnen etwas ausmachen …?</p>' +
        '<p>Nach <i>can / could</i> steht die Grundform <b>ohne to</b>: <i>Could you help me?</i> (nicht: to help).</p>' +
        '<p><b>Achtung:</b> Auf <i>Would you mind …?</i> antwortet man mit <i>No, not at all</i>, wenn man gerne hilft – wörtlich „Nein, es macht mir nichts aus“.</p>',
      examples: [
        { en: 'Can I pay by card?', de: 'Kann ich mit Karte zahlen?' },
        { en: 'Could you tell me where gate 12 is?', de: 'Könnten Sie mir sagen, wo Gate 12 ist?' },
        { en: 'Would you mind watching my bag?', de: 'Würden Sie kurz auf meine Tasche aufpassen?' }
      ]
    },
    gaps: [
      { s: 'Could you ___ me, please?', o: ['help', 'to help', 'helping'], a: 0, w: 'Nach „could“ steht die Grundform ohne „to“.' },
      { s: 'Would you mind ___ the window?', o: ['open', 'opening', 'to open'], a: 1, w: 'Nach „would you mind“ folgt das Verb mit -ing.' },
      { s: '___ I pay by card?', o: ['Can', 'Do', 'Am'], a: 0, w: 'Bitte um Erlaubnis: Can I …?' },
      { s: 'I have too much ___.', o: ['luggages', 'luggage', 'a luggage'], a: 1, w: '„luggage“ ist unzählbar: kein -s und kein „a“. Ein Koffer = a suitcase / a bag.' },
      { s: 'Excuse me, ___ you tell me where the toilets are?', o: ['could', 'are', 'do'], a: 0, w: '„Could you tell me …?“ ist die höfliche Standardfrage.' },
      { s: 'Would you mind waiting a moment? – No, ___.', o: ['not at all', 'yes', 'please'], a: 0, w: '„No, not at all“ = Kein Problem. Ein „Yes“ hieße: Ja, das stört mich!' }
    ]
  },
  {
    id: 'hotel', title: 'Im Hotel', en: 'At the hotel',
    vocab: [
      { en: 'booking', de: 'Buchung, Reservierung', ex: 'I have a booking for three nights.' },
      { en: 'double room', de: 'Doppelzimmer', ex: "We'd like a double room." },
      { en: 'key card', de: 'Schlüsselkarte', ex: "My key card doesn't work." },
      { en: 'lift', de: 'Aufzug', ex: 'The lift is on the left.' },
      { en: 'reception', de: 'Rezeption', ex: 'Please leave the key at reception.' },
      { en: 'towel', de: 'Handtuch', ex: 'Could I have another towel?' },
      { en: 'breakfast included', de: 'mit Frühstück', ex: 'Is breakfast included?' },
      { en: 'floor', de: 'Etage, Stock', ex: 'Your room is on the third floor.' },
      { en: 'to check out', de: 'auschecken', ex: 'What time do we have to check out?' },
      { en: 'noisy', de: 'laut', ex: 'The room is very noisy.' }
    ],
    phrases: [
      { en: 'I have a booking under the name Müller.', de: 'Ich habe eine Reservierung auf den Namen Müller.' },
      { en: 'What time is breakfast?', de: 'Wann gibt es Frühstück?' },
      { en: "The air conditioning isn't working.", de: 'Die Klimaanlage funktioniert nicht.' },
      { en: 'Could I have some extra towels, please?', de: 'Könnte ich bitte noch ein paar Handtücher bekommen?' },
      { en: "What's the Wi-Fi password?", de: 'Wie lautet das WLAN-Passwort?' },
      { en: 'Can I leave my luggage here after check-out?', de: 'Kann ich mein Gepäck nach dem Auschecken hier lassen?' }
    ],
    grammar: {
      title: "I'd like / Would you like …? · there is / there are",
      text: '<p><b>I\'d like</b> = I would like = ich hätte gern / ich möchte. Höflicher als <i>I want</i>.</p>' +
        '<p>I\'d like + Nomen: <i>I\'d like a coffee.</i> – I\'d like + <b>to</b> + Verb: <i>I\'d like to book a room.</i></p>' +
        '<p><b>Would you like …?</b> = Möchten Sie …? Antwort: <i>Yes, please. / No, thank you.</i></p>' +
        '<p><b>Achtung:</b> <i>I like</i> = ich mag (allgemein) – <i>I\'d like</i> = ich möchte (jetzt).</p>' +
        '<p><b>Es gibt</b> = <i>there is</i> (Einzahl) / <i>there are</i> (Mehrzahl). Frage: <i>Is there a lift?</i></p>',
      examples: [
        { en: "I'd like to check in, please.", de: 'Ich möchte bitte einchecken.' },
        { en: 'Would you like a room with a view?', de: 'Möchten Sie ein Zimmer mit Aussicht?' },
        { en: 'There are no towels in my room.', de: 'In meinem Zimmer gibt es keine Handtücher.' }
      ]
    },
    gaps: [
      { s: "I'd like ___ a room for two nights.", o: ['book', 'to book', 'booking'], a: 1, w: "Nach „I'd like“ folgt „to“ + Verb." },
      { s: '___ you like a wake-up call?', o: ['Do', 'Would', 'Are'], a: 1, w: 'Angebot = „Would you like …?“ (Möchten Sie …?). „Do you like“ heißt „Magst du …?“.' },
      { s: 'I ___ a double room, please.', o: ["'d like", 'like', 'am wanting'], a: 0, w: "Wunsch im Moment: „I'd like“. „I like“ = ich mag (allgemein)." },
      { s: 'There ___ no towels in my room.', o: ['is', 'are', 'be'], a: 1, w: '„towels“ ist Mehrzahl → there are.' },
      { s: 'Is ___ a lift in the hotel?', o: ['it', 'there', 'here'], a: 1, w: '„Gibt es …?“ = Is there …?' },
      { s: 'Would you like some tea? – Yes, ___.', o: ['please', 'I like', 'I would'], a: 0, w: 'Kurze, höfliche Antwort: „Yes, please.“ / „No, thank you.“' }
    ]
  },
  {
    id: 'food', title: 'Restaurant & Café', en: 'Eating out',
    vocab: [
      { en: 'menu', de: 'Speisekarte', ex: 'Could we see the menu, please?' },
      { en: 'bill', de: 'Rechnung', ex: 'Could we have the bill, please?' },
      { en: 'starter', de: 'Vorspeise', ex: "I'll have the soup as a starter." },
      { en: 'main course', de: 'Hauptgericht', ex: 'The main course was delicious.' },
      { en: 'dessert', de: 'Nachtisch', ex: 'Would you like a dessert?' },
      { en: 'tap water', de: 'Leitungswasser', ex: 'A jug of tap water, please.' },
      { en: 'tip', de: 'Trinkgeld', ex: 'We left a ten per cent tip.' },
      { en: 'vegetarian', de: 'vegetarisch', ex: 'Do you have any vegetarian dishes?' },
      { en: 'allergic to', de: 'allergisch gegen', ex: "I'm allergic to nuts." },
      { en: 'to order', de: 'bestellen', ex: 'Are you ready to order?' }
    ],
    phrases: [
      { en: 'Could we have a table for two, please?', de: 'Könnten wir bitte einen Tisch für zwei haben?' },
      { en: "I'll have the fish and chips, please.", de: 'Ich nehme bitte Fish and Chips.' },
      { en: "I'm allergic to nuts.", de: 'Ich bin allergisch gegen Nüsse.' },
      { en: 'What do you recommend?', de: 'Was empfehlen Sie?' },
      { en: 'Could we have the bill, please?', de: 'Könnten wir bitte die Rechnung haben?' },
      { en: 'Is service included?', de: 'Ist die Bedienung inklusive?' }
    ],
    grammar: {
      title: 'some / any · much / many',
      text: '<p><b>some</b>: in positiven Sätzen und bei Bitten oder Angeboten – <i>Could I have some water? Would you like some bread?</i></p>' +
        '<p><b>any</b>: in Fragen und Verneinungen – <i>Do you have any vegetarian dishes? We don\'t have any fish.</i></p>' +
        '<p><b>much</b> bei Unzählbarem (<i>much water, much time</i>), <b>many</b> bei Zählbarem (<i>many people</i>).</p>' +
        '<p>In positiven Sätzen klingt <b>a lot of</b> natürlicher: <i>There were a lot of people.</i></p>',
      examples: [
        { en: 'Could I have some more bread, please?', de: 'Könnte ich bitte noch etwas Brot haben?' },
        { en: "Sorry, we haven't got any tables left.", de: 'Tut mir leid, wir haben keine Tische mehr frei.' },
        { en: "We don't have much time.", de: 'Wir haben nicht viel Zeit.' }
      ]
    },
    gaps: [
      { s: 'Could I have ___ water, please?', o: ['some', 'any', 'many'], a: 0, w: 'Bei Bitten steht „some“ – auch wenn es eine Frage ist.' },
      { s: 'Do you have ___ vegetarian dishes?', o: ['some', 'any', 'much'], a: 1, w: 'Echte Frage → any.' },
      { s: "We don't have ___ time.", o: ['many', 'much', 'some'], a: 1, w: '„time“ ist unzählbar → much (in Verneinungen).' },
      { s: 'There were ___ people in the restaurant.', o: ['much', 'a lot of', 'any'], a: 1, w: 'Positiver Satz → „a lot of“ klingt natürlich.' },
      { s: "I'll ___ the chicken, please.", o: ['have', 'take to', 'having'], a: 0, w: "„I'll have …“ ist die typische Formel beim Bestellen." },
      { s: 'Can we have the ___, please?', o: ['bill', 'invoice', 'account'], a: 0, w: 'Im Restaurant sagt man in Großbritannien „the bill“ (USA: the check).' }
    ]
  },
  {
    id: 'directions', title: 'Wege & Verkehr', en: 'Directions & transport',
    vocab: [
      { en: 'to turn left', de: 'links abbiegen', ex: 'Turn left at the church.' },
      { en: 'to go straight on', de: 'geradeaus gehen', ex: 'Go straight on for 200 metres.' },
      { en: 'traffic lights', de: 'Ampel', ex: 'Turn right at the traffic lights.' },
      { en: 'corner', de: 'Ecke', ex: "It's on the corner." },
      { en: 'opposite', de: 'gegenüber', ex: 'The bank is opposite the station.' },
      { en: 'next to', de: 'neben', ex: 'The café is next to the museum.' },
      { en: 'return ticket', de: 'Hin- und Rückfahrkarte', ex: 'A return ticket to York, please.' },
      { en: 'platform', de: 'Bahnsteig, Gleis', ex: 'The train leaves from platform 4.' },
      { en: 'the Underground', de: 'die U-Bahn (London: the Tube)', ex: "Let's take the Underground." },
      { en: 'bus stop', de: 'Bushaltestelle', ex: 'Where is the nearest bus stop?' }
    ],
    phrases: [
      { en: 'Excuse me, how do I get to the station?', de: 'Entschuldigung, wie komme ich zum Bahnhof?' },
      { en: 'Is it far from here?', de: 'Ist es weit von hier?' },
      { en: "It's about ten minutes on foot.", de: 'Es sind etwa zehn Minuten zu Fuß.' },
      { en: 'Take the second street on the left.', de: 'Nehmen Sie die zweite Straße links.' },
      { en: 'A return ticket to Brighton, please.', de: 'Eine Hin- und Rückfahrkarte nach Brighton, bitte.' },
      { en: 'Which platform does the train leave from?', de: 'Von welchem Gleis fährt der Zug ab?' }
    ],
    grammar: {
      title: 'Imperativ & Präpositionen des Ortes',
      text: '<p><b>Wegbeschreibung</b> im Imperativ – Grundform ohne Subjekt: <i>Turn left. Go straight on. Take the bus.</i> Verneint: <i>Don\'t cross here.</i></p>' +
        '<p><b>Ort:</b> next to (neben) · opposite (gegenüber, <b>ohne</b> of) · between (zwischen) · in front of (vor) · behind (hinter) · on the corner (an der Ecke) · at the traffic lights (an der Ampel)</p>' +
        '<p><b>Verkehrsmittel:</b> <i>by bus, by train, by car</i> – ohne Artikel. Aber: <i>on foot</i> (zu Fuß).</p>',
      examples: [
        { en: 'Go straight on and turn right at the traffic lights.', de: 'Gehen Sie geradeaus und biegen Sie an der Ampel rechts ab.' },
        { en: 'The museum is opposite the park.', de: 'Das Museum ist gegenüber dem Park.' },
        { en: "We came by train.", de: 'Wir sind mit dem Zug gekommen.' }
      ]
    },
    gaps: [
      { s: '___ left at the traffic lights.', o: ['Turn', 'You turning', 'To turn'], a: 0, w: 'Imperativ = Grundform am Satzanfang.' },
      { s: 'The bank is ___ the supermarket.', o: ['opposite', 'opposite of', 'in front'], a: 0, w: '„opposite“ steht ohne „of“. „in front“ bräuchte „of“.' },
      { s: 'We went there ___ foot.', o: ['by', 'on', 'with'], a: 1, w: 'Zu Fuß = on foot.' },
      { s: "Let's go ___ train.", o: ['with the', 'by', 'on'], a: 1, w: 'Verkehrsmittel: by + ohne Artikel (by train, by bus).' },
      { s: "The chemist's is ___ the bank and the post office.", o: ['between', 'among', 'next'], a: 0, w: 'Zwischen zwei Dingen = between.' },
      { s: "___ cross the road here. It's dangerous.", o: ["Don't", 'Not', 'No'], a: 0, w: 'Verneinter Imperativ: Don\'t + Grundform.' }
    ]
  },
  {
    id: 'shopping', title: 'Einkaufen', en: 'Shopping',
    vocab: [
      { en: 'price', de: 'Preis', ex: 'The price is too high.' },
      { en: 'receipt', de: 'Kassenbon, Quittung', ex: 'Can I have a receipt, please?' },
      { en: 'cash', de: 'Bargeld', ex: 'Can I pay in cash?' },
      { en: 'size', de: 'Größe', ex: 'What size are you?' },
      { en: 'to try on', de: 'anprobieren', ex: 'Can I try this on?' },
      { en: 'changing room', de: 'Umkleidekabine', ex: 'The changing rooms are over there.' },
      { en: 'expensive', de: 'teuer', ex: 'London is very expensive.' },
      { en: 'in the sale', de: 'im Angebot, reduziert', ex: 'This jacket was in the sale.' },
      { en: "chemist's", de: 'Apotheke / Drogerie', ex: "I need to go to the chemist's." },
      { en: 'queue', de: 'Warteschlange', ex: 'There was a long queue.' }
    ],
    phrases: [
      { en: 'How much is this?', de: 'Wie viel kostet das?' },
      { en: 'Can I try it on?', de: 'Kann ich es anprobieren?' },
      { en: 'Do you have this in a smaller size?', de: 'Haben Sie das in einer kleineren Größe?' },
      { en: "I'm just looking, thanks.", de: 'Ich schaue mich nur um, danke.' },
      { en: 'Can I pay by card?', de: 'Kann ich mit Karte zahlen?' },
      { en: 'Are you in the queue?', de: 'Stehen Sie an?' }
    ],
    grammar: {
      title: 'Steigerung: cheaper, more expensive, the best',
      text: '<p><b>Kurze Adjektive:</b> + <i>-er</i> / <i>the -est</i>: cheap → cheaper → the cheapest; big → bigger → the biggest.</p>' +
        '<p><b>Lange Adjektive</b> (meist ab 3 Silben): <i>more / the most</i>: expensive → more expensive → the most expensive.</p>' +
        '<p><b>Unregelmäßig:</b> good → better → the best · bad → worse → the worst.</p>' +
        '<p><b>als</b> = <i>than</i> (nicht <i>then</i>!): <i>This one is cheaper than that one.</i> · <b>so … wie</b> = <i>as … as</i>.</p>',
      examples: [
        { en: 'This one is cheaper than the blue one.', de: 'Das hier ist billiger als das blaue.' },
        { en: "It's the most expensive shop in town.", de: 'Es ist der teuerste Laden der Stadt.' },
        { en: 'These shoes are better than my old ones.', de: 'Diese Schuhe sind besser als meine alten.' }
      ]
    },
    gaps: [
      { s: 'This shirt is ___ than that one.', o: ['cheaper', 'more cheap', 'cheapest'], a: 0, w: 'Kurzes Adjektiv + -er.' },
      { s: "It's the ___ shop in town.", o: ['most expensive', 'expensivest', 'more expensive'], a: 0, w: 'Langes Adjektiv: the most + Adjektiv.' },
      { s: 'These shoes are ___ than my old ones.', o: ['gooder', 'better', 'more good'], a: 1, w: 'good → better → the best (unregelmäßig).' },
      { s: 'London is bigger ___ Brighton.', o: ['as', 'than', 'then'], a: 1, w: '„als“ beim Vergleich = than. „then“ heißt „dann“.' },
      { s: 'This jacket is as nice ___ the blue one.', o: ['as', 'than', 'like'], a: 0, w: 'so … wie = as … as.' },
      { s: 'How ___ are these apples?', o: ['many', 'much', 'cost'], a: 1, w: 'Nach dem Preis fragt man immer mit „How much …?“.' }
    ]
  },
  {
    id: 'past', title: 'Urlaubserlebnisse', en: 'Holiday stories',
    vocab: [
      { en: 'trip', de: 'Reise, Ausflug', ex: 'We went on a day trip to Bath.' },
      { en: 'beach', de: 'Strand', ex: 'We spent the whole day on the beach.' },
      { en: 'sightseeing', de: 'Besichtigungen', ex: 'We did a lot of sightseeing.' },
      { en: 'to stay', de: 'wohnen, übernachten', ex: 'We stayed in a small hotel.' },
      { en: 'view', de: 'Aussicht', ex: 'The view from our room was amazing.' },
      { en: 'to rent', de: 'mieten', ex: 'We rented a car for a week.' },
      { en: 'amazing', de: 'toll, unglaublich', ex: 'The food was amazing.' },
      { en: 'crowded', de: 'überfüllt', ex: 'The museum was very crowded.' },
      { en: 'souvenir', de: 'Andenken, Souvenir', ex: 'I bought a souvenir for my mum.' },
      { en: 'weather', de: 'Wetter', ex: 'The weather was lovely.' }
    ],
    phrases: [
      { en: 'How was your holiday?', de: 'Wie war dein Urlaub?' },
      { en: 'We stayed in a small hotel near the beach.', de: 'Wir haben in einem kleinen Hotel am Strand gewohnt.' },
      { en: 'The weather was lovely.', de: 'Das Wetter war herrlich.' },
      { en: 'We went on a boat trip.', de: 'Wir haben eine Bootstour gemacht.' },
      { en: "I didn't like the food very much.", de: 'Das Essen hat mir nicht so gut geschmeckt.' },
      { en: 'Did you go anywhere nice?', de: 'Wart ihr irgendwo Schönes?' }
    ],
    grammar: {
      title: 'Past Simple (Vergangenheit)',
      text: '<p>Für <b>abgeschlossene</b> Ereignisse, oft mit Zeitangabe: <i>yesterday, last week, in 2019, two days ago</i>.</p>' +
        '<p><b>Regelmäßig:</b> + -ed: visit → visited, stay → stayed.</p>' +
        '<p><b>Wichtige unregelmäßige:</b> go → went · see → saw · have → had · eat → ate · take → took · buy → bought · be → was/were.</p>' +
        '<p><b>Verneinung:</b> didn\'t + Grundform (<i>I didn\'t go</i>). <b>Frage:</b> Did + Grundform (<i>Did you see …?</i>).</p>' +
        '<p><b>Typischer Fehler:</b> Deutsch erzählt oft im Perfekt („Ich bin gefahren“). Englisch nimmt hier das Past Simple: <i>I went</i>.</p>',
      examples: [
        { en: 'Last summer we went to Cornwall.', de: 'Letzten Sommer sind wir nach Cornwall gefahren.' },
        { en: "We didn't see the castle.", de: 'Wir haben die Burg nicht gesehen.' },
        { en: 'Did you have a good time?', de: 'Hattet ihr eine schöne Zeit?' }
      ]
    },
    gaps: [
      { s: 'Last summer we ___ to Scotland.', o: ['go', 'went', 'have gone'], a: 1, w: '„last summer“ ist abgeschlossen → Past Simple.' },
      { s: '___ you enjoy the trip?', o: ['Did', 'Do', 'Were'], a: 0, w: 'Frage in der Vergangenheit: Did + Grundform.' },
      { s: "I didn't ___ the castle.", o: ['saw', 'see', 'seen'], a: 1, w: 'Nach „didn\'t“ immer die Grundform.' },
      { s: 'We ___ in a lovely cottage.', o: ['stayed', 'stood', 'stay'], a: 0, w: 'stay → stayed (wohnen). „stood“ kommt von „stand“ (stehen).' },
      { s: 'The beach ___ very crowded.', o: ['were', 'was', 'did'], a: 1, w: '„The beach“ = it → was.' },
      { s: 'Two days ago I ___ a souvenir.', o: ['buyed', 'bought', 'have bought'], a: 1, w: 'buy → bought (unregelmäßig). „ago“ verlangt Past Simple.' }
    ]
  },
  {
    id: 'plans', title: 'Pläne & Zukunft', en: 'Plans & the future',
    vocab: [
      { en: 'weekend', de: 'Wochenende', ex: 'What are you doing at the weekend?' },
      { en: 'probably', de: 'wahrscheinlich', ex: "I'll probably stay at home." },
      { en: 'maybe', de: 'vielleicht', ex: 'Maybe we can meet tomorrow.' },
      { en: 'invitation', de: 'Einladung', ex: 'Thanks for the invitation!' },
      { en: 'to book', de: 'buchen', ex: "We've booked a table for eight." },
      { en: 'to look forward to', de: 'sich freuen auf', ex: "I'm looking forward to the trip." },
      { en: 'tomorrow', de: 'morgen', ex: 'See you tomorrow!' },
      { en: 'next week', de: 'nächste Woche', ex: "I'm going to London next week." },
      { en: 'free time', de: 'Freizeit', ex: "I don't have much free time." },
      { en: 'to decide', de: 'sich entscheiden', ex: "We haven't decided yet." }
    ],
    phrases: [
      { en: 'What are you doing this weekend?', de: 'Was machst du dieses Wochenende?' },
      { en: "I'm going to visit my sister.", de: 'Ich werde meine Schwester besuchen.' },
      { en: "I think it'll rain tomorrow.", de: 'Ich glaube, morgen regnet es.' },
      { en: "I'll call you later.", de: 'Ich rufe dich später an.' },
      { en: "I'm looking forward to seeing you.", de: 'Ich freue mich darauf, dich zu sehen.' },
      { en: 'Shall we meet at seven?', de: 'Wollen wir uns um sieben treffen?' }
    ],
    grammar: {
      title: 'Zukunft: going to oder will?',
      text: '<p><b>going to</b>: Plan oder Absicht, vorher entschieden – <i>I\'m going to visit Rome next year.</i></p>' +
        '<p><b>will</b>: spontane Entscheidung (<i>I\'ll take the red one!</i>), Angebot/Versprechen (<i>I\'ll help you.</i>), Vermutung (<i>I think it will rain.</i>)</p>' +
        '<p><b>Feste Verabredung</b> mit anderen: Present Continuous – <i>I\'m meeting Tom at eight.</i></p>' +
        '<p><b>Falscher Freund:</b> englisch <i>will</i> = „werden“. Deutsch „ich will“ = <i>I want to</i>.</p>' +
        '<p><i>look forward to</i> + -ing: <i>I\'m looking forward to meeting you.</i></p>',
      examples: [
        { en: "We're going to rent a car.", de: 'Wir werden ein Auto mieten. (geplant)' },
        { en: "It's cold. I'll close the window.", de: 'Es ist kalt. Ich mache das Fenster zu. (spontan)' },
        { en: 'I want to learn English.', de: 'Ich will Englisch lernen.' }
      ]
    },
    gaps: [
      { s: "We've booked the flights. We ___ visit Malta in May.", o: ['will', 'are going to', 'go'], a: 1, w: 'Schon geplant und gebucht → going to.' },
      { s: 'The phone is ringing. – I ___ get it!', o: ["'ll", "'m going to", 'get'], a: 0, w: 'Spontane Entscheidung im Moment → will.' },
      { s: 'I think it ___ be sunny tomorrow.', o: ['will', 'is going', 'shall'], a: 0, w: 'Vermutung mit „I think“ → will.' },
      { s: "I'm looking forward to ___ you.", o: ['see', 'seeing', 'saw'], a: 1, w: '„look forward to“ + -ing. Das „to“ ist hier eine Präposition.' },
      { s: 'I ___ buy a new car.  (= Ich will …)', o: ['will', 'want to', 'wanting'], a: 1, w: '„Ich will“ = I want to. „I will“ heißt „ich werde“.' },
      { s: '___ we meet at the station?', o: ['Shall', 'Will', 'Do'], a: 0, w: 'Vorschlag: „Shall we …?“ (Wollen wir …?)' }
    ]
  },
  {
    id: 'experience', title: 'Erfahrungen', en: 'Experiences',
    vocab: [
      { en: 'ever', de: 'jemals', ex: 'Have you ever been to Ireland?' },
      { en: 'never', de: 'nie', ex: "I've never been to Scotland." },
      { en: 'already', de: 'schon', ex: "We've already eaten." },
      { en: 'yet', de: 'schon / noch (Frage, Verneinung)', ex: "I haven't finished yet." },
      { en: 'just', de: 'gerade eben', ex: "I've just arrived." },
      { en: 'abroad', de: 'im Ausland, ins Ausland', ex: 'Have you ever lived abroad?' },
      { en: 'to try', de: 'probieren', ex: 'You should try the local beer.' },
      { en: 'experience', de: 'Erfahrung, Erlebnis', ex: 'It was a great experience.' },
      { en: 'twice', de: 'zweimal', ex: "I've been there twice." },
      { en: 'since', de: 'seit (Zeitpunkt)', ex: "I've lived here since 2015." }
    ],
    phrases: [
      { en: 'Have you ever been to England?', de: 'Warst du schon einmal in England?' },
      { en: "I've never tried fish and chips.", de: 'Ich habe noch nie Fish and Chips probiert.' },
      { en: "I've been here for three days.", de: 'Ich bin seit drei Tagen hier.' },
      { en: 'Have you seen the new film yet?', de: 'Hast du den neuen Film schon gesehen?' },
      { en: "I've just arrived.", de: 'Ich bin gerade angekommen.' },
      { en: "We've already had lunch.", de: 'Wir haben schon zu Mittag gegessen.' }
    ],
    grammar: {
      title: 'Present Perfect',
      text: '<p><b>Form:</b> have / has + 3. Form (been, seen, done, eaten, tried).</p>' +
        '<p><b>Wann?</b> Erfahrungen ohne genaue Zeit (<i>Have you ever …?</i>) · Ergebnis ist jetzt wichtig (<i>I\'ve lost my key.</i>) · Zeitraum bis jetzt mit <i>for / since</i>.</p>' +
        '<p><b>Typischer Fehler:</b> „Ich wohne seit 10 Jahren hier“ = <i>I have lived here for 10 years</i> – <b>nicht</b> <i>I live here since …</i></p>' +
        '<p><b>for</b> = Dauer (for two weeks) · <b>since</b> = Startpunkt (since Monday).</p>' +
        '<p>Mit genauer Vergangenheit (<i>yesterday, last year, ago</i>) → Past Simple.</p>',
      examples: [
        { en: "I've been to London twice.", de: 'Ich war schon zweimal in London.' },
        { en: "We've been married for twenty years.", de: 'Wir sind seit zwanzig Jahren verheiratet.' },
        { en: "Have you finished yet?", de: 'Bist du schon fertig?' }
      ]
    },
    gaps: [
      { s: '___ you ever been to Ireland?', o: ['Did', 'Have', 'Are'], a: 1, w: 'Erfahrung ohne Zeitangabe: Have you ever …?' },
      { s: 'I ___ here since 2018.', o: ['live', 'have lived', 'am living'], a: 1, w: '„seit“ bis heute → Present Perfect (nicht Present Simple wie im Deutschen).' },
      { s: "We've been married ___ twenty years.", o: ['since', 'for', 'from'], a: 1, w: 'Zeitdauer → for.' },
      { s: "I ___ my passport! I can't find it.", o: ['have lost', 'lose', 'am losing'], a: 0, w: 'Ergebnis ist jetzt wichtig → Present Perfect.' },
      { s: 'I saw that film ___.', o: ['yet', 'last week', 'ever'], a: 1, w: '„saw“ ist Past Simple und braucht eine abgeschlossene Zeit wie „last week“.' },
      { s: 'Has she arrived ___?', o: ['already', 'yet', 'since'], a: 1, w: 'In Fragen am Satzende: yet (schon).' }
    ]
  },
  {
    id: 'health', title: 'Gesundheit & Notfall', en: 'Health & emergencies',
    vocab: [
      { en: 'headache', de: 'Kopfschmerzen', ex: "I've got a headache." },
      { en: 'sore throat', de: 'Halsschmerzen', ex: 'I have a sore throat.' },
      { en: 'temperature', de: 'Fieber (BrE)', ex: "I think I've got a temperature." },
      { en: 'painkiller', de: 'Schmerzmittel', ex: 'Can I have some painkillers?' },
      { en: 'prescription', de: 'Rezept (Arzt)', ex: 'You need a prescription for this.' },
      { en: 'appointment', de: 'Termin', ex: "I'd like to make an appointment." },
      { en: 'to hurt', de: 'wehtun', ex: 'My knee hurts.' },
      { en: 'emergency', de: 'Notfall', ex: 'In an emergency, call 999.' },
      { en: 'insurance', de: 'Versicherung', ex: 'Do you have travel insurance?' },
      { en: 'to feel sick', de: 'sich übel fühlen', ex: 'I feel sick.' }
    ],
    phrases: [
      { en: "I don't feel well.", de: 'Mir geht es nicht gut.' },
      { en: "I've got a terrible headache.", de: 'Ich habe furchtbare Kopfschmerzen.' },
      { en: 'My back hurts.', de: 'Mein Rücken tut weh.' },
      { en: "Where is the nearest chemist's?", de: 'Wo ist die nächste Apotheke?' },
      { en: 'I need to see a doctor.', de: 'Ich muss zum Arzt.' },
      { en: 'Please call an ambulance!', de: 'Bitte rufen Sie einen Krankenwagen!' }
    ],
    grammar: {
      title: 'should, must, have to',
      text: '<p><b>should</b> = solltest (Rat): <i>You should drink more water.</i></p>' +
        '<p><b>must</b> = muss (eigene Überzeugung, Regeln): <i>I must call my mum.</i></p>' +
        '<p><b>have to</b> = muss (Notwendigkeit von außen): <i>I have to take this medicine twice a day.</i></p>' +
        '<p><b>Achtung:</b> <i>mustn\'t</i> = darf nicht! (<i>You mustn\'t smoke here.</i>) · <i>don\'t have to</i> = muss nicht (<i>You don\'t have to pay.</i>)</p>' +
        '<p>Nach <i>should / must</i> steht die Grundform <b>ohne to</b>; <i>have to</i> hat das to schon.</p>',
      examples: [
        { en: 'You should stay in bed.', de: 'Du solltest im Bett bleiben.' },
        { en: "You mustn't drive after taking this.", de: 'Sie dürfen danach nicht Auto fahren.' },
        { en: "You don't have to wait.", de: 'Sie müssen nicht warten.' }
      ]
    },
    gaps: [
      { s: 'You ___ see a doctor.  (Rat)', o: ['should', 'must to', 'have'], a: 0, w: 'Rat = should + Grundform.' },
      { s: 'You ___ smoke in the hospital.  (verboten)', o: ["don't have to", "mustn't", "shouldn't to"], a: 1, w: '„mustn\'t“ = darf nicht. „don\'t have to“ = muss nicht.' },
      { s: "It's free. You ___ pay.", o: ["mustn't", "don't have to", "haven't"], a: 1, w: 'Keine Pflicht = don\'t have to.' },
      { s: 'I ___ take these tablets twice a day.', o: ['have to', 'must to', 'should to'], a: 0, w: '„have to“ + Grundform. Nach must/should kein „to“.' },
      { s: 'My leg ___.', o: ['hurts', 'makes pain', 'does pain'], a: 0, w: '„Es tut weh“ = it hurts. „makes pain“ gibt es nicht.' },
      { s: "I've got a ___ throat.", o: ['sore', 'pain', 'hurting'], a: 0, w: 'Halsschmerzen = a sore throat.' }
    ]
  },
  {
    id: 'phone', title: 'Telefon & Termine', en: 'Phone calls & appointments',
    vocab: [
      { en: 'to ring', de: 'anrufen (BrE)', ex: "I'll ring you tomorrow." },
      { en: 'to hold on', de: 'dranbleiben, warten', ex: 'Hold on a moment, please.' },
      { en: 'message', de: 'Nachricht', ex: 'Can I leave a message?' },
      { en: 'to cancel', de: 'absagen, stornieren', ex: 'I need to cancel my appointment.' },
      { en: 'to arrange', de: 'vereinbaren', ex: "Let's arrange a time." },
      { en: 'available', de: 'verfügbar, frei', ex: 'Is the doctor available on Friday?' },
      { en: 'to postpone', de: 'verschieben', ex: 'Can we postpone the meeting?' },
      { en: 'fortnight', de: 'zwei Wochen (BrE)', ex: "I'm on holiday for a fortnight." },
      { en: 'mobile', de: 'Handy (BrE)', ex: "What's your mobile number?" },
      { en: 'engaged', de: 'besetzt (Telefon, BrE)', ex: 'The line is engaged.' }
    ],
    phrases: [
      { en: 'Hello, this is Anna speaking.', de: 'Hallo, hier spricht Anna.' },
      { en: 'Could I speak to Mr Smith, please?', de: 'Könnte ich bitte Herrn Smith sprechen?' },
      { en: 'Could you say that again, please?', de: 'Könnten Sie das bitte wiederholen?' },
      { en: 'Could you speak more slowly, please?', de: 'Könnten Sie bitte langsamer sprechen?' },
      { en: "I'd like to make an appointment.", de: 'Ich möchte einen Termin vereinbaren.' },
      { en: 'Does Tuesday at three suit you?', de: 'Passt Ihnen Dienstag um drei?' }
    ],
    grammar: {
      title: 'Zeitangaben: at, on, in',
      text: '<p><b>at</b> + Uhrzeit: <i>at 3 o\'clock, at noon, at night, at the weekend</i> (BrE)</p>' +
        '<p><b>on</b> + Tag / Datum: <i>on Monday, on 5th May, on Friday evening</i></p>' +
        '<p><b>in</b> + Monat / Jahr / Jahreszeit / Tageszeit: <i>in May, in 2025, in summer, in the morning</i></p>' +
        '<p><b>Keine</b> Präposition vor <i>next, last, this, every</i>: <i>next Monday, this morning</i>.</p>' +
        '<p>„in drei Tagen“ = <i>in three days</i>.</p>',
      examples: [
        { en: 'Can we meet on Thursday at ten?', de: 'Können wir uns am Donnerstag um zehn treffen?' },
        { en: "I'm free in the afternoon.", de: 'Nachmittags habe ich Zeit.' },
        { en: "I'll call you next week.", de: 'Ich rufe dich nächste Woche an.' }
      ]
    },
    gaps: [
      { s: 'The meeting is ___ Monday.', o: ['in', 'on', 'at'], a: 1, w: 'Wochentag → on.' },
      { s: "Let's meet ___ half past six.", o: ['at', 'on', 'in'], a: 0, w: 'Uhrzeit → at.' },
      { s: 'My birthday is ___ July.', o: ['on', 'in', 'at'], a: 1, w: 'Monat → in.' },
      { s: "I'll see you ___ next week.", o: ['on', 'in', '— (nichts)'], a: 2, w: 'Vor next / last / this steht keine Präposition.' },
      { s: 'I usually work ___ the morning.', o: ['at', 'on', 'in'], a: 2, w: 'Tageszeit → in the morning / afternoon / evening (aber: at night).' },
      { s: "Could you ___ on, please? I'll put you through.", o: ['hold', 'wait', 'stay'], a: 0, w: 'Am Telefon: „Hold on, please.“ = Bleiben Sie dran.' }
    ]
  },
  {
    id: 'hobbies', title: 'Hobbys & Alltag', en: 'Hobbies & daily life',
    vocab: [
      { en: 'hiking', de: 'Wandern', ex: 'We love hiking in the mountains.' },
      { en: 'gardening', de: 'Gartenarbeit', ex: 'My wife enjoys gardening.' },
      { en: 'to cook', de: 'kochen', ex: 'I cook every evening.' },
      { en: 'usually', de: 'normalerweise', ex: 'I usually get up at seven.' },
      { en: 'often', de: 'oft', ex: 'We often eat out.' },
      { en: 'sometimes', de: 'manchmal', ex: 'Sometimes I go swimming.' },
      { en: 'rarely', de: 'selten', ex: 'I rarely watch TV.' },
      { en: 'to relax', de: 'entspannen', ex: 'I relax with a good book.' },
      { en: 'to enjoy', de: 'genießen, gern tun', ex: 'I enjoy cooking for friends.' },
      { en: 'at the moment', de: 'im Moment', ex: "I'm very busy at the moment." }
    ],
    phrases: [
      { en: 'What do you do in your free time?', de: 'Was machst du in deiner Freizeit?' },
      { en: 'I love going for walks.', de: 'Ich gehe sehr gern spazieren.' },
      { en: 'I usually go swimming on Sundays.', de: 'Sonntags gehe ich normalerweise schwimmen.' },
      { en: "I'm reading a great book at the moment.", de: 'Ich lese gerade ein tolles Buch.' },
      { en: "I'm not really into football.", de: 'Fußball ist nicht so meins.' },
      { en: 'How often do you play tennis?', de: 'Wie oft spielst du Tennis?' }
    ],
    grammar: {
      title: 'Present Simple oder Present Continuous?',
      text: '<p><b>Present Simple</b>: Gewohnheiten und Fakten – <i>I play tennis every week.</i> Bei he/she/it ein <b>-s</b>: <i>She works.</i></p>' +
        '<p>Frage und Verneinung mit <b>do / does</b>: <i>Does he cook? I don\'t drink coffee.</i></p>' +
        '<p><b>Present Continuous</b> (am/is/are + -ing): passiert gerade oder vorübergehend – <i>I\'m cooking at the moment.</i></p>' +
        '<p><b>Häufigkeitswörter</b> (always, usually, often, sometimes, never) stehen <b>vor</b> dem Vollverb, aber <b>nach</b> „be“: <i>I often go … / I\'m often tired.</i></p>' +
        '<p>Nach <i>love / like / enjoy</i> folgt meist -ing: <i>I enjoy cooking.</i></p>',
      examples: [
        { en: 'My husband works in a bank.', de: 'Mein Mann arbeitet in einer Bank.' },
        { en: "Look, it's raining!", de: 'Schau, es regnet!' },
        { en: 'We usually have breakfast at eight.', de: 'Wir frühstücken normalerweise um acht.' }
      ]
    },
    gaps: [
      { s: 'She ___ in a bank.', o: ['work', 'works', 'working'], a: 1, w: 'he / she / it → Verb + -s.' },
      { s: "Look! It ___.", o: ['rains', 'is raining', 'rain'], a: 1, w: 'Passiert gerade jetzt → Present Continuous.' },
      { s: 'I ___ to the gym on Mondays.', o: ['usually go', 'go usually', 'am usually going'], a: 0, w: 'Häufigkeitswort steht vor dem Vollverb; Gewohnheit → Present Simple.' },
      { s: '___ your husband like cooking?', o: ['Do', 'Does', 'Is'], a: 1, w: 'he / she / it → Does …?' },
      { s: 'I enjoy ___ in the garden.', o: ['work', 'working', 'to working'], a: 1, w: 'enjoy + -ing.' },
      { s: 'What ___ you doing at the moment?', o: ['do', 'are', 'does'], a: 1, w: '„at the moment“ + -ing → are you doing.' }
    ]
  }
];
