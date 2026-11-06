/* Englisch-App – Hauptlogik.
 * Läuft auf zwei Arten:
 *  1) als Claude-Artifact: KI über das Claude-Konto (Capability „sample“), Fortschritt zusätzlich in „db“.
 *  2) als normale Web-App (z. B. GitHub Pages): KI über eigenen API-Key, Fortschritt in localStorage.
 */
(() => {
  'use strict';

  const UNITS = window.UNITS || [];
  const TENSES = window.TENSES || [];
  const SCENARIOS = window.SCENARIOS || [];
  const IN_CLAUDE = !!(window.claude && typeof window.claude.use === 'function');

  /* ---------- Hilfsfunktionen ---------- */
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const DAY = 86400000;
  const todayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pickN = (arr, n) => shuffle(arr).slice(0, n);
  const norm = (s) => String(s || '').toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,!?;:"“”()…–-]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = (s) => norm(s).split(' ').filter(Boolean);
  const unitById = (id) => UNITS.find((u) => u.id === id);
  const fmtDate = (t) => new Date(t).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' });

  function lcsLen(a, b) {
    const m = a.length, n = b.length; const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    return dp[m][n];
  }
  const similarity = (a, b) => { const x = words(a), y = words(b); if (!x.length || !y.length) return 0; return (2 * lcsLen(x, y)) / (x.length + y.length); };
  function levenshtein(a, b) {
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return dp[a.length][b.length];
  }

  /* Wort-Diff: markiert im korrigierten Satz, was neu/anders ist. */
  function diffHtml(orig, corrected) {
    const a = corrected.split(/\s+/).filter(Boolean);
    const bn = words(orig);
    const an = a.map((w) => norm(w));
    const m = an.length, n = bn.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) dp[i][j] = an[i] === bn[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const out = []; let i = 0, j = 0;
    while (i < m) {
      if (j < n && an[i] === bn[j]) { out.push(esc(a[i])); i++; j++; }
      else if (j < n && dp[i][j + 1] >= dp[i + 1][j]) { j++; }
      else { out.push(an[i] ? `<mark>${esc(a[i])}</mark>` : esc(a[i])); i++; }
    }
    return out.join(' ');
  }

  const ICONS = {
    speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    slow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 9.5a3.5 3.5 0 0 1 0 5"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>',
    chev: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
    learn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10 12 5l9 5-9 5-9-5z"/><path d="M7 12v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/></svg>',
    grammar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>',
    talk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9h8M8 12h5"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L19 7"/></svg>'
  };

  let toastTimer;
  function toast(msg) {
    let el = $('#toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 2600);
  }

  /* ---------- Speicher ---------- */
  const LS_STATE = 'englisch-app.state.v1';
  const LS_KEY = 'englisch-app.apikey';
  const LS_UI = 'englisch-app.ui';
  const lsGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* Speicher blockiert */ } };
  const lsDel = (k) => { try { localStorage.removeItem(k); } catch { /* ignorieren */ } };

  const DEFAULT_SETTINGS = { model: 'claude-opus-5-5', rate: 0.9, voice: '', autoSpeak: true };
  function freshState() { return { v: 1, units: {}, words: {}, tenses: {}, days: {}, talks: 0, settings: { ...DEFAULT_SETTINGS }, updatedAt: 0 }; }
  function sanitize(s) {
    const base = freshState();
    if (!s || typeof s !== 'object') return base;
    return {
      v: 1,
      units: s.units && typeof s.units === 'object' ? s.units : {},
      words: s.words && typeof s.words === 'object' ? s.words : {},
      tenses: s.tenses && typeof s.tenses === 'object' ? s.tenses : {},
      days: s.days && typeof s.days === 'object' ? s.days : {},
      talks: Number(s.talks) || 0,
      settings: { ...DEFAULT_SETTINGS, ...(s.settings || {}) },
      updatedAt: Number(s.updatedAt) || 0
    };
  }
  let state = (() => { try { return sanitize(JSON.parse(lsGet(LS_STATE) || 'null')); } catch { return freshState(); } })();

  const Remote = { ref: null, writing: false, pending: false };
  let saveTimer;
  function save() {
    state.updatedAt = Date.now();
    lsSet(LS_STATE, JSON.stringify(state));
    clearTimeout(saveTimer);
    saveTimer = setTimeout(pushRemote, 1500);
  }
  async function pushRemote() {
    if (!Remote.ref) return;
    if (Remote.writing) { Remote.pending = true; return; }
    Remote.writing = true;
    try { await Remote.ref.set(JSON.parse(JSON.stringify(state))); } catch { /* offline oder nicht erlaubt: lokal bleibt erhalten */ }
    Remote.writing = false;
    if (Remote.pending) { Remote.pending = false; pushRemote(); }
  }
  async function initRemote() {
    if (!IN_CLAUDE) return;
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!db || !user) return;
      const id = await user.id();
      if (!id) return;
      Remote.ref = db.collection('data/users/' + id).doc('progress');
      const snap = await Promise.race([Remote.ref.get(), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))]);
      const remote = snap && snap.exists ? sanitize(snap.data()) : null;
      if (remote && remote.updatedAt > state.updatedAt) {
        state = remote; lsSet(LS_STATE, JSON.stringify(state)); render();
      } else if (state.updatedAt > 0) {
        pushRemote();
      }
    } catch { Remote.ref = Remote.ref || null; }
  }

  /* ---------- Lernzeit ---------- */
  let lastActivity = Date.now();
  ['pointerdown', 'keydown'].forEach((ev) => document.addEventListener(ev, () => { lastActivity = Date.now(); }, { passive: true }));
  setInterval(() => {
    if (document.visibilityState !== 'visible' || Date.now() - lastActivity > 90000) return;
    const k = todayKey();
    state.days[k] = (state.days[k] || 0) + 10;
    if (state.days[k] % 60 === 0) save(); else lsSet(LS_STATE, JSON.stringify(state));
    const el = $('#today-min'); if (el) el.textContent = Math.floor(state.days[k] / 60);
    const bar = $('#today-bar'); if (bar) bar.style.width = Math.min(100, state.days[k] / 6) + '%';
  }, 10000);

  /* ---------- Sprache: Vorlesen & Spracherkennung ---------- */
  const Speech = {
    voices: [],
    init() {
      if (!('speechSynthesis' in window)) return;
      const load = () => { this.voices = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang)); };
      load();
      try { speechSynthesis.addEventListener('voiceschanged', load); } catch { speechSynthesis.onvoiceschanged = load; }
    },
    pickVoice() {
      const byName = this.voices.find((v) => v.name === state.settings.voice);
      return byName || this.voices.find((v) => /en[-_]GB/i.test(v.lang)) || this.voices[0] || null;
    },
    say(text, slow = false) {
      if (!('speechSynthesis' in window) || !text) return;
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        const v = this.pickVoice();
        if (v) u.voice = v;
        u.lang = v ? v.lang : 'en-GB';
        u.rate = slow ? 0.65 : state.settings.rate;
        speechSynthesis.speak(u);
      } catch { /* Vorlesen nicht verfügbar */ }
    },
    Rec: window.SpeechRecognition || window.webkitSpeechRecognition || null,
    canListen() { return !IN_CLAUDE && !!this.Rec; },
    active: null,
    listen(onInterim) {
      return new Promise((resolve, reject) => {
        if (!this.canListen()) { reject(new Error('unavailable')); return; }
        const r = new this.Rec();
        r.lang = 'en-GB'; r.interimResults = true; r.maxAlternatives = 1; r.continuous = false;
        let finalText = '';
        r.onresult = (e) => {
          let interim = '';
          for (let i = e.resultIndex; i < e.results.length; i++) {
            if (e.results[i].isFinal) finalText += e.results[i][0].transcript; else interim += e.results[i][0].transcript;
          }
          if (onInterim) onInterim((finalText + ' ' + interim).trim());
        };
        r.onerror = (e) => { this.active = null; reject(new Error(e.error || 'error')); };
        r.onend = () => { this.active = null; resolve(finalText.trim()); };
        this.active = r;
        try { r.start(); } catch (err) { this.active = null; reject(err); }
      });
    },
    stop() { try { this.active && this.active.stop(); } catch { /* ignorieren */ } }
  };
  const micErrorText = (e) => ({
    'not-allowed': 'Kein Zugriff aufs Mikrofon. Erlaube es in den Browser-Einstellungen.',
    'no-speech': 'Ich habe nichts gehört. Versuch es noch einmal.',
    'audio-capture': 'Kein Mikrofon gefunden.',
    'network': 'Spracherkennung braucht eine Internetverbindung.'
  }[e && e.message] || 'Spracherkennung hat nicht geklappt. Versuch es noch einmal oder tippe.');

  /* ---------- KI ---------- */
  const MODELS = [
    { id: 'claude-opus-5-5', label: 'Claude Opus 5.5 – beste Korrekturen' },
    { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5 – sehr gut, etwa halb so teuer' },
    { id: 'claude-haiku-5-5', label: 'Claude Haiku 5.5 – am günstigsten, einfachere Erklärungen' }
  ];
  class AIError extends Error { constructor(msg, code) { super(msg); this.code = code; } }
  const AI = {
    mode: null, sample: null, ready: false,
    async init() {
      if (IN_CLAUDE) {
        try { this.sample = await window.claude.use('sample'); } catch { this.sample = null; }
      }
      this.ready = true;
      this.refresh();
    },
    refresh() { this.mode = this.sample ? 'claude' : (lsGet(LS_KEY) ? 'api' : null); },
    async json(system, user, schema) {
      if (this.mode === 'claude') return this.viaClaude(system, user, schema);
      if (this.mode === 'api') return this.viaApi(system, user, schema);
      throw new AIError('Die KI ist noch nicht eingerichtet. Öffne „Optionen“ und trage deinen API-Key ein.', 'setup');
    },
    async viaClaude(system, user, schema) {
      const input = `${system}\n\n${user}\n\nAnswer with ONLY one JSON object that matches this JSON schema, no other text:\n${JSON.stringify(schema)}`;
      try {
        return await this.sample.json(input, { cache: false });
      } catch (e) {
        const code = e && e.code;
        const map = {
          not_granted: 'Du hast der App die Nutzung von Claude nicht erlaubt. Lade die Seite neu, um erneut gefragt zu werden.',
          rate_limited: 'Gerade zu viele Anfragen. Warte einen Moment und sende dann erneut.',
          sampling_disabled: 'Claude ist für diese Seite gerade nicht verfügbar.',
          session_expired: 'Deine Sitzung ist abgelaufen. Bitte lade die Seite neu.',
          refused: 'Claude hat diese Anfrage abgelehnt. Formuliere den Satz bitte anders.',
          invalid_json: 'Die Antwort war unvollständig. Bitte sende den Satz noch einmal.'
        };
        throw new AIError(map[code] || 'Die KI hat gerade nicht geantwortet. Bitte versuch es noch einmal.', code || 'error');
      }
    },
    async viaApi(system, user, schema) {
      const key = lsGet(LS_KEY);
      const model = state.settings.model || DEFAULT_SETTINGS.model;
      const body = {
        model, max_tokens: 4000, system,
        messages: [{ role: 'user', content: user }],
        output_config: { effort: 'low', format: { type: 'json_schema', schema } }
      };
      const headers = {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2026-10-21',
        'anthropic-dangerous-direct-browser-access': 'true'
      };
      if (model !== 'claude-haiku-5-5') { body.fallbacks = 'default'; headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; }
      let res;
      try { res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body) }); }
      catch { throw new AIError('Keine Verbindung zur KI. Prüfe deine Internetverbindung.', 'network'); }
      let data = null; try { data = await res.json(); } catch { data = null; }
      if (!res.ok) {
        const msg = {
          401: 'Der API-Key ist ungültig. Prüfe ihn unter „Optionen“.',
          403: 'Der API-Key hat keine Berechtigung für dieses Modell.',
          429: 'Zu viele Anfragen oder Guthaben aufgebraucht. Warte kurz oder prüfe dein Guthaben in der Anthropic Console.',
          529: 'Die KI ist gerade überlastet. Versuch es in einer Minute noch einmal.'
        }[res.status] || `Fehler von der KI (${res.status}). ${data && data.error ? data.error.message : ''}`;
        throw new AIError(msg, 'http_' + res.status);
      }
      if (data.stop_reason === 'refusal') throw new AIError('Die KI hat diese Anfrage abgelehnt. Formuliere den Satz bitte anders.', 'refusal');
      if (data.stop_reason === 'max_tokens') throw new AIError('Die Antwort war zu lang und wurde abgeschnitten. Schreib einen kürzeren Satz.', 'max_tokens');
      const text = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
      try { return JSON.parse(text); } catch { throw new AIError('Die Antwort der KI war unlesbar. Bitte noch einmal senden.', 'parse'); }
    }
  };

  const TURN_SCHEMA = {
    type: 'object', additionalProperties: false,
    required: ['status', 'corrected', 'explanation_de', 'natural', 'reply', 'reply_de', 'hint_de', 'new_words'],
    properties: {
      status: { type: 'string', enum: ['correct', 'minor', 'error'] },
      corrected: { type: 'string' },
      explanation_de: { type: 'string' },
      natural: { type: 'string' },
      reply: { type: 'string' },
      reply_de: { type: 'string' },
      hint_de: { type: 'string' },
      new_words: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['en', 'de'], properties: { en: { type: 'string' }, de: { type: 'string' } } } }
    }
  };
  const SUMMARY_SCHEMA = {
    type: 'object', additionalProperties: false,
    required: ['summary_de', 'strengths_de', 'focus', 'next_step_de'],
    properties: {
      summary_de: { type: 'string' },
      strengths_de: { type: 'string' },
      focus: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['topic_de', 'wrong', 'right', 'tip_de'], properties: { topic_de: { type: 'string' }, wrong: { type: 'string' }, right: { type: 'string' }, tip_de: { type: 'string' } } } },
      next_step_de: { type: 'string' }
    }
  };
  function turnSystem(sc) {
    return [
      'You are an English conversation partner and a patient English teacher for a German native speaker at CEFR level A2 who wants to reach B1. Use British English spelling and vocabulary.',
      `ROLE-PLAY: You are ${sc.role}. Setting: ${sc.place}. Stay in character in "reply".`,
      "For the learner's LAST message do two things.",
      '1) Check it carefully: grammar, tense, word order, prepositions, articles, vocabulary, spelling. Ignore missing capital letters and missing final punctuation, because the learner may use speech input. If the learner wrote German or mixed in German words, give the English version in "corrected" and explain in German.',
      '- status "correct": no mistakes and natural English; then corrected = "".',
      '- status "minor": understandable, but a small mistake or unnatural wording.',
      '- status "error": a clear grammar or vocabulary mistake.',
      '- corrected: the full corrected message, keeping the learner\'s meaning and staying as close as possible to their own words.',
      '- explanation_de: simple German, at most 3 short sentences. Say what was wrong and WHY, naming the rule (for example: "Past Simple, weil \'yesterday\' eine abgeschlossene Zeit ist."). If correct, praise briefly and specifically in German.',
      '- natural: optionally, a more natural way a British person would say it; otherwise "".',
      `2) Continue the role-play: "reply" = 1 to 3 short sentences in simple A2–B1 English that end with a question or an invitation to continue. Gently steer towards the learner's goal: ${sc.goal}`,
      'Also return: reply_de (German translation of reply); hint_de (German: one idea for what the learner could say next, with a short English example in quotes); new_words (0 to 3 useful words or phrases from your reply that an A2 learner may not know, each with a German translation).'
    ].join('\n');
  }
  function transcript(chat) {
    return chat.turns.map((t) => (t.who === 'them' ? 'Partner: ' : 'Learner: ') + t.text).join('\n');
  }

  /* ---------- Vokabeltrainer (Leitner, 5 Fächer) ---------- */
  const INTERVALS = [0, 1, 2, 4, 8, 16];
  const wordKey = (unitId, en) => unitId + '|' + en;
  function wordInfo(key) {
    const [uid, en] = key.split('|');
    const entry = state.words[key];
    if (uid === 'talk') return { en, de: entry && entry.de ? entry.de : '', ex: '' };
    const u = unitById(uid); const w = u && u.vocab.find((x) => x.en === en);
    return w ? { en: w.en, de: w.de, ex: w.ex } : { en, de: entry && entry.de ? entry.de : '', ex: '' };
  }
  function addWord(unitId, en, de) {
    const k = wordKey(unitId, en);
    if (!state.words[k]) state.words[k] = { box: 1, due: Date.now() + DAY, ...(unitId === 'talk' ? { de } : {}) };
    return k;
  }
  function gradeWord(key, ok) {
    const w = state.words[key]; if (!w) return;
    if (ok) { w.box = Math.min(5, (w.box || 1) + 1); w.due = Date.now() + INTERVALS[w.box] * DAY - 3600000; }
    else { w.box = 1; w.due = Date.now() + 10 * 60000; }
  }
  const dueKeys = () => Object.keys(state.words).filter((k) => (state.words[k].due || 0) <= Date.now());

  /* ---------- Fortschritt ---------- */
  const unitDone = (id) => Math.min(3, (state.units[id] && state.units[id].done) || 0);
  function nextLesson() {
    for (const u of UNITS) { const d = unitDone(u.id); if (d < 3) return { unit: u, n: d }; }
    return null;
  }
  const totalLessons = () => UNITS.length * 3;
  const doneLessons = () => UNITS.reduce((s, u) => s + unitDone(u.id), 0);

  /* ---------- Darstellung ---------- */
  const app = () => $('#app');
  function route() { return (location.hash || '#lernen').slice(1); }
  function go(hash) { if (location.hash === '#' + hash) render(); else location.hash = hash; }

  function navHtml(active) {
    const items = [
      ['lernen', 'Lernen', ICONS.learn], ['vokabeln', 'Vokabeln', ICONS.cards], ['grammatik', 'Grammatik', ICONS.grammar],
      ['sprechen', 'Sprechen', ICONS.talk], ['optionen', 'Optionen', ICONS.gear]
    ];
    return `<nav class="nav" aria-label="Hauptmenü"><div class="nav-inner">${items.map(([h, l, i]) =>
      `<a href="#${h}" ${active === h ? 'aria-current="page"' : ''}>${i}<span>${l}</span></a>`).join('')}</div></nav>`;
  }
  function header(title, backTo) {
    if (backTo) return `<div class="top"><a class="icon-btn" href="#${backTo}" aria-label="Zurück">${ICONS.back}</a><div class="grow"><h2>${esc(title)}</h2></div></div>`;
    return `<div class="top"><div class="brand"><span class="brand-mark"><span>English</span> for Real Life</span></div><span class="level-pill">A2 → B1</span></div>`;
  }
  const speakBtn = (text, label = 'Vorlesen') => `<button class="icon-btn" data-say="${esc(text)}" aria-label="${esc(label)}">${ICONS.speaker}</button>`;
  function ring(frac) {
    const r = 23, c = 2 * Math.PI * r;
    return `<svg class="ring" viewBox="0 0 52 52" aria-hidden="true"><circle class="track" cx="26" cy="26" r="${r}"/>${frac > 0 ? `<circle class="val" cx="26" cy="26" r="${r}" stroke-dasharray="${(c * frac).toFixed(1)} ${c.toFixed(1)}"/>` : ''}</svg>`;
  }

  function render() {
    if (Runner.open || Chat.open) return;
    const r = route();
    let html = '', nav = 'lernen';
    if (r.startsWith('einheit-')) { html = viewUnit(r.slice(8)); }
    else if (r.startsWith('zeit-')) { html = viewTense(r.slice(5)); nav = 'grammatik'; }
    else if (r === 'vokabeln') { html = viewVocab(); nav = 'vokabeln'; }
    else if (r === 'grammatik') { html = viewGrammar(); nav = 'grammatik'; }
    else if (r === 'sprechen') { html = viewTalk(); nav = 'sprechen'; }
    else if (r === 'optionen') { html = viewOptions(); nav = 'optionen'; }
    else { html = viewHome(); }
    app().innerHTML = `<main class="wrap">${html}</main>${navHtml(nav)}`;
    window.scrollTo(0, 0);
    if (r === 'optionen') fillVoiceSelect();
  }

  function viewHome() {
    const nl = nextLesson();
    const today = state.days[todayKey()] || 0;
    const learned = Object.keys(state.words).length;
    const due = dueKeys().length;
    const pct = Math.round((doneLessons() / totalLessons()) * 100);
    const units = UNITS.map((u, i) => {
      const d = unitDone(u.id);
      const isNext = nl && nl.unit.id === u.id;
      return `<a class="unit ${d === 3 ? 'done' : ''} ${isNext ? 'next' : ''}" href="#einheit-${u.id}" style="text-decoration:none;color:inherit">
        <span class="unit-no">${ring(d / 3)}${d === 3 ? ICONS.check : i + 1}</span>
        <span class="grow"><span class="unit-title">${esc(u.title)}</span><br><span class="unit-sub">${esc(u.grammar.title)}</span></span>
        <span class="row" style="gap:6px">${isNext ? '<span class="tag accent">Als Nächstes</span>' : `<span class="tag ${d === 3 ? 'good' : ''}">${d}/3</span>`}<span class="chev">${ICONS.chev}</span></span></a>`;
    }).join('');
    return `${header()}
      <section class="card stack-lg">
        <div class="row between"><div><p class="eyebrow">Heute</p><p><b id="today-min">${Math.floor(today / 60)}</b> von 10 Minuten</p></div>
        ${due ? `<a class="btn sm" href="#vokabeln">${due} Wörter wiederholen</a>` : ''}</div>
        <div class="bar mark"><i id="today-bar" style="width:${Math.min(100, today / 6)}%"></i></div>
        ${nl ? `<div class="stack"><p class="muted small">Nächste Lektion</p><p><b>${esc(nl.unit.title)}</b> · Lektion ${nl.n + 1} von 3</p>
          <button class="btn primary block" data-act="start-lesson" data-unit="${nl.unit.id}" data-n="${nl.n}">Weiter lernen</button></div>`
          : '<div class="notice good">Alle Lektionen geschafft! Wiederhole Vokabeln oder übe Gespräche.</div>'}
      </section>
      <section class="stats">
        <div class="card flat stat"><b>${pct}%</b><span class="small muted">Kurs</span></div>
        <div class="card flat stat"><b>${learned}</b><span class="small muted">Wörter</span></div>
        <div class="card flat stat"><b>${state.talks}</b><span class="small muted">Gespräche</span></div>
      </section>
      <section class="stack"><h3>Dein Lernpfad</h3><div class="path">${units}</div></section>`;
  }

  function viewUnit(id) {
    const u = unitById(id);
    if (!u) return header('Nicht gefunden', 'lernen') + '<p>Diese Einheit gibt es nicht.</p>';
    const d = unitDone(u.id);
    const lessons = [0, 1, 2].map((n) => {
      const best = state.units[u.id] && state.units[u.id].best ? state.units[u.id].best[n] : null;
      const label = ['Wörter & Sätze 1', 'Wörter & Sätze 2', 'Mix & Schreiben'][n];
      return `<button class="unit ${n < d ? 'done' : ''} ${n === d ? 'next' : ''}" data-act="start-lesson" data-unit="${u.id}" data-n="${n}">
        <span class="unit-no">${n < d ? ICONS.check : n + 1}</span>
        <span class="grow"><span class="unit-title">Lektion ${n + 1}</span><br><span class="unit-sub">${label}${best != null ? ` · beste: ${best}%` : ''}</span></span>
        <span class="chev">${ICONS.chev}</span></button>`;
    }).join('');
    return `${header(u.title, 'lernen')}
      <p class="muted">${esc(u.en)} · ${d}/3 Lektionen</p>
      <div class="path">${lessons}</div>
      <section class="card stack grammar"><p class="eyebrow">Grammatik</p><h3>${esc(u.grammar.title)}</h3>${u.grammar.text}
        <div class="stack">${u.grammar.examples.map((e) => `<div class="row example"><div class="grow"><p><b>${esc(e.en)}</b></p><p class="small muted">${esc(e.de)}</p></div>${speakBtn(e.en)}</div>`).join('')}</div>
        <button class="btn block" data-act="start-gaps" data-unit="${u.id}">Grammatik üben (${u.gaps.length} Sätze)</button></section>
      <section class="card stack"><p class="eyebrow">Wörter</p><div class="list">${u.vocab.map((w) => `<div class="li"><div class="grow"><p>${esc(w.en)} <span class="muted" style="font-weight:400">– ${esc(w.de)}</span></p><p class="ex">${esc(w.ex)}</p></div>${speakBtn(w.en + '. ' + w.ex)}</div>`).join('')}</div></section>
      <section class="card stack"><p class="eyebrow">Wichtige Sätze</p><div class="list">${u.phrases.map((p) => `<div class="li"><div class="grow"><p>${esc(p.en)}</p><p class="small muted">${esc(p.de)}</p></div>${speakBtn(p.en)}</div>`).join('')}</div></section>`;
  }

  function viewVocab() {
    const keys = Object.keys(state.words);
    const due = dueKeys();
    const boxes = [1, 2, 3, 4, 5].map((b) => keys.filter((k) => (state.words[k].box || 1) === b).length);
    const next = keys.length ? Math.min(...keys.map((k) => state.words[k].due || 0)) : null;
    const list = keys.sort((a, b) => (state.words[a].box || 1) - (state.words[b].box || 1)).map((k) => {
      const w = wordInfo(k);
      return `<div class="li"><div class="grow"><p>${esc(w.en)}</p><p class="small muted">${esc(w.de)}</p></div><span class="tag">Fach ${state.words[k].box || 1}</span>${speakBtn(w.en)}</div>`;
    }).join('');
    return `${header('Vokabeltrainer')}
      <section class="card stack-lg">
        <div><p class="eyebrow">Fällig</p><p class="prompt">${due.length} ${due.length === 1 ? 'Wort' : 'Wörter'}</p></div>
        ${due.length ? `<button class="btn primary block" data-act="start-review">Jetzt wiederholen</button>`
          : `<p class="muted">${keys.length ? `Alles wiederholt. Nächste Wiederholung: ${fmtDate(next)}.` : 'Noch keine Wörter. Mach deine erste Lektion – die Wörter landen dann automatisch hier.'}</p>`}
        ${keys.length >= 4 ? '<button class="btn block" data-act="start-review" data-extra="1">Extra üben (10 zufällige Wörter)</button>' : ''}
      </section>
      <section class="stack"><h3>Lernfächer</h3><p class="small muted">Gewusst → ein Fach weiter, Abstand wächst (1, 2, 4, 8, 16 Tage). Nicht gewusst → zurück in Fach 1.</p>
        <div class="boxes">${boxes.map((n, i) => `<div><b>${n}</b><span class="small muted">Fach ${i + 1}</span></div>`).join('')}</div></section>
      ${keys.length ? `<section class="card stack"><p class="eyebrow">Deine Wörter (${keys.length})</p><div class="list">${list}</div></section>` : ''}`;
  }

  function tlHtml(t) {
    const seg = { past: [8, 52], now: [56, 68], 'past-now': [22, 62], future: [66, 94] }[t] || [56, 68];
    return `<div class="timeline" aria-hidden="true"><div class="axis"></div><div class="seg" style="left:${seg[0]}%;width:${seg[1] - seg[0]}%"></div><div class="now"></div>
      <span class="lbl" style="left:0">Vergangenheit</span><span class="lbl" style="right:0">Zukunft</span></div>`;
  }
  function viewGrammar() {
    const ui = uiPref('grammarTab', 'zeiten');
    const tenses = TENSES.map((t) => {
      const best = state.tenses[t.id];
      return `<a class="unit" href="#zeit-${t.id}" style="text-decoration:none;color:inherit;grid-template-columns:minmax(0,1fr) auto">
        <span class="grow"><span class="unit-title">${esc(t.name)}</span><br><span class="unit-sub">${esc(t.de)}</span></span>
        <span class="row" style="gap:6px">${best != null ? `<span class="tag ${best >= 80 ? 'good' : ''}">${best}%</span>` : ''}<span class="chev">${ICONS.chev}</span></span></a>`;
    }).join('');
    const topics = UNITS.map((u) => `<a class="unit" href="#einheit-${u.id}" style="text-decoration:none;color:inherit;grid-template-columns:minmax(0,1fr) auto">
        <span class="grow"><span class="unit-title">${esc(u.grammar.title)}</span><br><span class="unit-sub">Einheit: ${esc(u.title)}</span></span><span class="chev">${ICONS.chev}</span></a>`).join('');
    return `${header('Grammatik')}
      <div class="tabs" role="tablist"><button role="tab" aria-selected="${ui === 'zeiten'}" data-act="gtab" data-tab="zeiten">Zeitformen</button><button role="tab" aria-selected="${ui === 'themen'}" data-act="gtab" data-tab="themen">Alle Themen</button></div>
      ${ui === 'zeiten' ? `<section class="card stack"><p class="eyebrow">Die 7 wichtigsten Zeiten für A2 → B1</p><p class="small muted">Jede Zeitform mit Bildung, Verwendung, Signalwörtern, typischem Fehler für Deutsche und Mini-Quiz.</p></section><div class="path">${tenses}</div>` : `<div class="path">${topics}</div>`}`;
  }
  function viewTense(id) {
    const t = TENSES.find((x) => x.id === id);
    if (!t) return header('Nicht gefunden', 'grammatik');
    return `${header(t.name, 'grammatik')}
      <p class="muted">${esc(t.de)}</p>
      <section class="card stack">${tlHtml(t.t)}</section>
      <section class="card stack"><p class="eyebrow">Bildung</p><div class="form-rows">${t.form.map((f, i) => `<div><span class="muted small">${['positiv', 'verneint', 'Frage'][i]}: </span>${f}</div>`).join('')}</div></section>
      <section class="card stack"><p class="eyebrow">Wann benutzt man sie?</p><ul style="margin:0;padding-left:20px">${t.use.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <p class="small"><b>Signalwörter:</b> ${esc(t.signal)}</p></section>
      <section class="notice"><b>Typischer Fehler:</b> ${esc(t.pitfall)}</section>
      <section class="card stack"><p class="eyebrow">Beispiele</p>${t.examples.map((e) => `<div class="row example"><div class="grow"><p><b>${esc(e.en)}</b></p><p class="small muted">${esc(e.de)}</p></div>${speakBtn(e.en)}</div>`).join('')}</section>
      <button class="btn primary block" data-act="start-tense" data-id="${t.id}">Quiz starten (${t.quiz.length} Fragen)</button>`;
  }

  function viewTalk() {
    let status;
    if (!AI.ready) status = '<div class="notice">KI wird geprüft …</div>';
    else if (AI.mode === 'claude') status = '<div class="notice good">Die KI läuft über dein Claude-Konto. Kein API-Key nötig.</div>';
    else if (AI.mode === 'api') status = '<div class="notice good">KI aktiv über deinen API-Key.</div>';
    else status = '<div class="notice"><b>KI noch nicht eingerichtet.</b> Für Gespräche mit Korrektur brauchst du einen API-Key. <a href="#optionen">Jetzt einrichten</a></div>';
    const micNote = Speech.canListen() ? 'Tippe auf das Mikrofon und sprich – oder schreib.' : 'Sprechen: Nutze das Mikrofon deiner Handy-Tastatur (Diktierfunktion) im Textfeld.';
    return `${header('Sprechen & Gespräche')}
      ${status}
      <p class="small muted">So funktioniert es: Du antwortest auf Englisch. Nach jedem Satz bekommst du eine Korrektur mit Erklärung auf Deutsch, dann antwortet dein Gesprächspartner. ${micNote}</p>
      <div class="path">${SCENARIOS.map((s) => `<button class="unit" data-act="start-chat" data-id="${s.id}" style="grid-template-columns:minmax(0,1fr) auto">
        <span class="grow"><span class="unit-title">${esc(s.title)}</span><br><span class="unit-sub">${esc(s.place)} · ${esc(s.goal)}</span></span><span class="chev">${ICONS.chev}</span></button>`).join('')}</div>`;
  }

  function viewOptions() {
    const hasKey = !!lsGet(LS_KEY);
    const ai = AI.mode === 'claude'
      ? '<div class="notice good">Diese App läuft in Claude. Gespräche nutzen dein Claude-Konto – du brauchst keinen API-Key.</div>'
      : `<div class="field"><label for="apikey">Anthropic API-Key</label>
          <input id="apikey" type="password" autocomplete="off" placeholder="${hasKey ? 'gespeichert – zum Ändern neu eingeben' : 'sk-ant-…'}">
          <p class="small muted">Erstellen unter console.anthropic.com → API Keys. Der Key bleibt nur in diesem Browser gespeichert und geht direkt an Anthropic.</p></div>
        <div class="row"><button class="btn primary" data-act="save-key">Key speichern</button>${hasKey ? '<button class="btn" data-act="test-key">Testen</button><button class="btn ghost" data-act="del-key">Key löschen</button>' : ''}</div>
        <div class="field"><label for="model">Modell</label><select id="model">${MODELS.map((m) => `<option value="${m.id}" ${state.settings.model === m.id ? 'selected' : ''}>${esc(m.label)}</option>`).join('')}</select>
          <p class="small muted">Kosten werden nach Nutzung abgerechnet. Grobe Schätzung bei 10 Minuten Gespräch pro Tag: Opus 5.5 etwa 5–7 €/Monat, Sonnet 5.5 etwa die Hälfte, Haiku 5.5 deutlich unter 1 €.</p></div>`;
    return `${header('Optionen')}
      <section class="card stack-lg"><h3>KI-Gesprächspartner</h3>${ai}</section>
      <section class="card stack-lg"><h3>Aussprache</h3>
        <div class="field"><label for="voice">Stimme</label><select id="voice"><option value="">Automatisch (britisch, falls vorhanden)</option></select></div>
        <div class="field"><label for="rate">Sprechtempo: <span id="rate-val">${state.settings.rate.toFixed(2)}</span></label><input id="rate" type="range" min="0.6" max="1.2" step="0.05" value="${state.settings.rate}"></div>
        <label class="row"><input id="autospeak" type="checkbox" ${state.settings.autoSpeak ? 'checked' : ''}> Antworten im Gespräch automatisch vorlesen</label>
        <button class="btn" data-say="Hello! Lovely to meet you. Would you like a cup of tea?">Stimme testen</button>
        <p class="small muted">${Speech.canListen() ? 'Spracherkennung ist verfügbar.' : 'Spracherkennung ist hier nicht verfügbar. Nutze die Diktierfunktion deiner Tastatur.'}</p></section>
      <section class="card stack-lg"><h3>Fortschritt</h3>
        <p class="small muted">${IN_CLAUDE ? 'Dein Fortschritt wird in deinem Claude-Konto gespeichert und auf deinen Geräten abgeglichen.' : 'Dein Fortschritt liegt nur in diesem Browser. Sichere ihn ab und zu.'}</p>
        <div class="row"><button class="btn" data-act="export">Sicherung kopieren</button><button class="btn" data-act="show-import">Sicherung einfügen</button></div>
        <div id="import-box" class="stack" hidden><textarea id="import-text" class="text-in" rows="4" placeholder="Sicherung hier einfügen"></textarea><button class="btn primary" data-act="do-import">Wiederherstellen</button></div>
        <div id="reset-box" class="stack"><button class="btn ghost" data-act="ask-reset">Fortschritt zurücksetzen …</button></div></section>
      <p class="small muted">Inhalte: 12 Einheiten · ${UNITS.reduce((s, u) => s + u.vocab.length, 0)} Wörter · ${UNITS.reduce((s, u) => s + u.phrases.length, 0)} Sätze · ${TENSES.length} Zeitformen · ${SCENARIOS.length} Gesprächsszenarien.</p>`;
  }
  function fillVoiceSelect() {
    const sel = $('#voice'); if (!sel) return;
    const fill = () => {
      const cur = state.settings.voice;
      sel.innerHTML = '<option value="">Automatisch (britisch, falls vorhanden)</option>' + Speech.voices.map((v) => `<option value="${esc(v.name)}" ${v.name === cur ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('');
    };
    fill();
    if (!Speech.voices.length) setTimeout(fill, 800);
  }
  function uiPref(k, def) { try { const o = JSON.parse(lsGet(LS_UI) || '{}'); return o[k] || def; } catch { return def; } }
  function setUiPref(k, v) { let o = {}; try { o = JSON.parse(lsGet(LS_UI) || '{}'); } catch { o = {}; } o[k] = v; lsSet(LS_UI, JSON.stringify(o)); }

  /* ---------- Übungsläufer (Lektionen, Grammatik, Wiederholung) ---------- */
  const allPhrases = () => UNITS.flatMap((u) => u.phrases);
  const allVocab = () => UNITS.flatMap((u) => u.vocab);
  function distractors(pool, correct, field, n = 3) {
    const seen = new Set([norm(correct[field])]);
    const out = [];
    for (const x of shuffle(pool)) { const v = norm(x[field]); if (!seen.has(v)) { seen.add(v); out.push(x[field]); } if (out.length >= n) break; }
    return out;
  }

  function buildLesson(u, n) {
    const V = u.vocab, P = u.phrases, G = u.gaps;
    const vs = n === 0 ? V.slice(0, 5) : n === 1 ? V.slice(5, 10) : pickN(V, 5);
    const ps = n === 0 ? P.slice(0, 3) : n === 1 ? P.slice(3, 6) : pickN(P, 3);
    const gs = n === 0 ? G.slice(0, 2) : n === 1 ? G.slice(2, 4) : G.slice(4, 6).concat(pickN(G.slice(0, 4), 1));
    const intro = [];
    if (n < 2) intro.push({ type: 'intro', words: vs });
    if (n === 0) intro.push({ type: 'grammar', unit: u });
    const quiz = [];
    vs.forEach((w, i) => {
      const type = n === 2 ? (i < 3 ? 'type' : 'mc_en') : (i % 2 ? 'mc_en' : 'mc_de');
      quiz.push({ type, word: w, unitId: u.id, pool: V.concat(allVocab()) });
    });
    ps.forEach((p, i) => quiz.push({ type: ['listen', 'order', 'speak'][(i + n) % 3], phrase: p, pool: P.concat(allPhrases()) }));
    gs.forEach((g) => quiz.push({ type: 'gap', gap: g }));
    return intro.concat(shuffle(quiz));
  }

  const Runner = {
    open: false, items: [], idx: 0, sel: null, checked: false, graded: 0, correct: 0, ctx: null, tiles: null, typed: '', heard: '', startedAt: 0,
    start(items, ctx) {
      Object.assign(this, { open: true, items: items.map((x) => ({ ...x })), idx: 0, graded: 0, correct: 0, ctx, startedAt: Date.now() });
      this.prep(); this.draw();
    },
    get cur() { return this.items[this.idx]; },
    prep() {
      this.sel = null; this.checked = false; this.typed = ''; this.heard = ''; this.revealed = false;
      const it = this.cur; if (!it) return;
      if (!it.opts) {
        if (it.type === 'mc_de') it.opts = shuffle([it.word.de, ...distractors(it.pool, it.word, 'de')]);
        if (it.type === 'mc_en') it.opts = shuffle([it.word.en, ...distractors(it.pool, it.word, 'en')]);
        if (it.type === 'listen') it.opts = shuffle([it.phrase.en, ...distractors(it.pool, it.phrase, 'en')]);
        if (it.type === 'gap') it.opts = it.gap.o.map((o, i) => ({ o, i }));
      }
      if (it.type === 'order') this.tiles = { pool: shuffle(it.phrase.en.split(' ').map((w, i) => ({ w, i }))), line: [] };
      if (['mc_de', 'listen', 'speak'].includes(it.type)) setTimeout(() => Speech.say(it.type === 'mc_de' ? it.word.en : it.phrase.en), 250);
    },
    close() {
      this.open = false; Speech.stop();
      try { speechSynthesis.cancel(); } catch { /* ignorieren */ }
      const el = $('#runner'); if (el) el.remove();
      render();
    },
    isGraded(it) { return !['intro', 'grammar'].includes(it.type) && !(it.type === 'speak' && !Speech.canListen()) && it.type !== 'flash'; },
    body() {
      const it = this.cur;
      switch (it.type) {
        case 'intro': return `<p class="eyebrow">Neue Wörter</p><h2>Hör zu und präg sie dir ein</h2>
          <div class="card stack"><div class="list">${it.words.map((w) => `<div class="li"><div class="grow"><p>${esc(w.en)} <span class="muted" style="font-weight:400">– ${esc(w.de)}</span></p><p class="ex">${esc(w.ex)}</p></div>${speakBtn(w.en + '. ' + w.ex)}</div>`).join('')}</div></div>`;
        case 'grammar': return `<p class="eyebrow">Grammatik dieser Einheit</p><h2>${esc(it.unit.grammar.title)}</h2>
          <div class="card stack grammar">${it.unit.grammar.text}</div>
          <div class="stack">${it.unit.grammar.examples.map((e) => `<div class="row example"><div class="grow"><p><b>${esc(e.en)}</b></p><p class="small muted">${esc(e.de)}</p></div>${speakBtn(e.en)}</div>`).join('')}</div>`;
        case 'mc_de': return `<p class="eyebrow">Was bedeutet das?</p><div class="row"><p class="prompt grow">${esc(it.word.en)}</p>${speakBtn(it.word.en)}</div>${this.optsHtml(it.opts)}`;
        case 'mc_en': return `<p class="eyebrow">Wie sagt man das auf Englisch?</p><p class="prompt">${esc(it.word.de)}</p>${this.optsHtml(it.opts)}`;
        case 'listen': return `<p class="eyebrow">Hör zu: Welchen Satz hörst du?</p><div class="row"><button class="icon-btn lg accent" data-say="${esc(it.phrase.en)}" aria-label="Nochmal hören">${ICONS.speaker}</button><button class="icon-btn" data-say="${esc(it.phrase.en)}" data-slow="1" aria-label="Langsam hören">${ICONS.slow}</button></div>${this.optsHtml(it.opts)}`;
        case 'gap': {
          const s = esc(it.gap.s).replace('___', `<u>${this.checked ? esc(it.gap.o[it.gap.a]) : (this.sel != null ? esc(it.gap.o[this.sel]) : '?')}</u>`);
          return `<p class="eyebrow">Grammatik: Ergänze den Satz</p><p class="gap-sentence">${s}</p>
            <div class="options">${it.opts.map(({ o, i }) => `<button class="opt ${this.optClass(i, it.gap.a)}" data-act="pick" data-v="${i}" aria-pressed="${this.sel === i}" ${this.checked ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`;
        }
        case 'order': {
          const t = this.tiles;
          return `<p class="eyebrow">Bilde den Satz auf Englisch</p><p class="prompt">${esc(it.phrase.de)}</p>
            <div class="answer-line" aria-label="Deine Antwort">${t.line.map((x, k) => `<button class="tile" data-act="untile" data-k="${k}" ${this.checked ? 'disabled' : ''}>${esc(x.w)}</button>`).join('')}</div>
            <div class="tiles">${t.pool.map((x, k) => `<button class="tile ${t.line.includes(x) ? 'used' : ''}" data-act="tile" data-k="${k}" ${this.checked ? 'disabled' : ''}>${esc(x.w)}</button>`).join('')}</div>`;
        }
        case 'type': return `<p class="eyebrow">Schreib es auf Englisch</p><p class="prompt">${esc(it.word.de)}</p>
          <input id="type-in" class="text-in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Englisch eingeben" value="${esc(this.typed)}" ${this.checked ? 'disabled' : ''}>`;
        case 'speak': return `<p class="eyebrow">Sprich nach</p>
          <div class="card stack"><div class="row"><p class="prompt grow">${esc(it.phrase.en)}</p>${speakBtn(it.phrase.en)}<button class="icon-btn" data-say="${esc(it.phrase.en)}" data-slow="1" aria-label="Langsam hören">${ICONS.slow}</button></div><p class="muted">${esc(it.phrase.de)}</p></div>
          ${Speech.canListen() ? `<div class="speak-box"><button class="icon-btn lg accent" id="mic-btn" data-act="listen" aria-label="Aufnehmen">${ICONS.mic}</button><p class="heard" id="heard">${esc(this.heard || 'Tippe aufs Mikrofon und sprich den Satz.')}</p></div>`
            : '<p class="small muted">Hör dir den Satz an und sprich ihn zwei-, dreimal laut nach. Achte auf Betonung und Satzmelodie.</p>'}`;
        case 'flash': {
          const w = wordInfo(it.key);
          return `<p class="eyebrow">Wiederholung · Fach ${(state.words[it.key] && state.words[it.key].box) || 1}</p>
            <div class="card flash"><div class="stack"><p class="front">${esc(w.de)}</p>
            ${this.revealed ? `<p class="back">${esc(w.en)}</p>${w.ex ? `<p class="ex">${esc(w.ex)}</p>` : ''}<div>${speakBtn(w.en + (w.ex ? '. ' + w.ex : ''))}</div>` : '<p class="muted">Sag oder denk dir das englische Wort – dann aufdecken.</p>'}</div></div>`;
        }
      }
      return '';
    },
    optsHtml(opts) {
      const it = this.cur; const right = it.type === 'mc_de' ? it.word.de : it.type === 'mc_en' ? it.word.en : it.phrase.en;
      return `<div class="options">${opts.map((o, i) => `<button class="opt ${this.checked ? (o === right ? 'right' : (this.sel === i ? 'wrong' : '')) : ''}" data-act="pick" data-v="${i}" aria-pressed="${this.sel === i}" ${this.checked ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`;
    },
    optClass(i, a) { if (!this.checked) return ''; if (i === a) return 'right'; return this.sel === i ? 'wrong' : ''; },
    canCheck() {
      const it = this.cur;
      if (['mc_de', 'mc_en', 'listen', 'gap'].includes(it.type)) return this.sel != null;
      if (it.type === 'order') return this.tiles.line.length > 0;
      if (it.type === 'type') return this.typed.trim().length > 0;
      if (it.type === 'speak') return !!this.heard;
      return true;
    },
    evaluate() {
      const it = this.cur; let ok = false, info = '';
      if (it.type === 'mc_de') { ok = it.opts[this.sel] === it.word.de; info = `${it.word.en} = ${it.word.de}`; }
      if (it.type === 'mc_en') { ok = it.opts[this.sel] === it.word.en; info = `${it.word.de} = ${it.word.en}`; }
      if (it.type === 'listen') { ok = it.opts[this.sel] === it.phrase.en; info = `${it.phrase.en} – ${it.phrase.de}`; }
      if (it.type === 'gap') { ok = this.sel === it.gap.a; info = it.gap.w; }
      if (it.type === 'order') { ok = norm(this.tiles.line.map((x) => x.w).join(' ')) === norm(it.phrase.en); info = it.phrase.en; }
      if (it.type === 'type') {
        const a = norm(this.typed).replace(/^to /, ''), b = norm(it.word.en).replace(/^to /, '');
        const alts = b.split('/').map((s) => s.trim());
        ok = alts.some((x) => x === a); info = `${it.word.en} – z. B. „${it.word.ex}“`;
        if (!ok && alts.some((x) => x.length >= 5 && levenshtein(x, a) === 1)) { ok = true; info = `Fast perfekt – kleiner Tippfehler. Richtig: ${it.word.en}`; }
      }
      if (it.type === 'speak') {
        const sim = similarity(this.heard, it.phrase.en);
        ok = sim >= 0.7; info = ok ? `Gut verständlich (${Math.round(sim * 100)} % Übereinstimmung).` : `Erkannt: „${this.heard}“. Hör noch einmal genau hin und versuch es langsam.`;
      }
      return { ok, info };
    },
    foot() {
      const it = this.cur;
      if (it.type === 'intro' || it.type === 'grammar') return `<div><button class="btn primary block" data-act="next">${it.type === 'intro' ? "Los geht's" : 'Verstanden'}</button></div>`;
      if (it.type === 'flash') {
        if (!this.revealed) return '<div><button class="btn primary block" data-act="reveal">Aufdecken</button></div>';
        return '<div class="row" style="flex-wrap:nowrap"><button class="btn block" data-act="flash-no">Nicht gewusst</button><button class="btn good block" data-act="flash-yes">Gewusst</button></div>';
      }
      if (it.type === 'speak' && !Speech.canListen()) return '<div><button class="btn primary block" data-act="next">Laut nachgesprochen – weiter</button></div>';
      if (!this.checked) return `<div class="row" style="flex-wrap:nowrap">${it.type === 'speak' ? '<button class="btn" data-act="skip">Überspringen</button>' : ''}<button class="btn primary block" data-act="check" ${this.canCheck() ? '' : 'disabled'}>Prüfen</button></div>`;
      const r = this.result;
      return `<div><p class="fb-title">${r.ok ? 'Richtig!' : 'Nicht ganz'}</p><p>${esc(r.info)}</p><button class="btn ${r.ok ? 'good' : 'primary'} block" data-act="next">Weiter</button></div>`;
    },
    draw() {
      let el = $('#runner');
      if (!el) { el = document.createElement('div'); el.id = 'runner'; el.className = 'runner'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); document.body.appendChild(el); }
      if (this.idx >= this.items.length) { el.innerHTML = this.finishHtml(); return; }
      const pct = Math.round((this.idx / this.items.length) * 100);
      const footCls = this.checked ? (this.result.ok ? 'ok' : 'no') : '';
      el.innerHTML = `<div class="runner-head"><button class="icon-btn" data-act="close-runner" aria-label="Beenden">${ICONS.close}</button><div class="bar grow"><i style="width:${pct}%"></i></div></div>
        <div class="runner-body"><div>${this.body()}</div></div>
        <div class="runner-foot ${footCls}">${this.foot()}</div>`;
      const ti = $('#type-in');
      if (ti && !this.checked) { ti.focus(); ti.addEventListener('input', () => { this.typed = ti.value; const b = $('[data-act="check"]', el); if (b) b.disabled = !this.canCheck(); }); ti.addEventListener('keydown', (e) => { if (e.key === 'Enter' && this.canCheck()) this.check(); }); }
    },
    check() {
      if (this.checked || !this.canCheck()) return;
      this.result = this.evaluate(); this.checked = true;
      const it = this.cur;
      if (!it.retry && this.isGraded(it)) { this.graded++; if (this.result.ok) this.correct++; }
      if (!this.result.ok && !it.retry) this.items.push({ ...it, retry: true, opts: it.opts ? shuffle(it.opts) : undefined });
      if (it.type === 'gap' || it.type === 'order' || it.type === 'type') Speech.say(it.type === 'gap' ? it.gap.s.replace('___', it.gap.o[it.gap.a]) : (it.phrase ? it.phrase.en : it.word.en));
      this.draw();
    },
    next() { this.idx++; this.prep(); this.draw(); const b = $('.runner-body'); if (b) b.scrollTop = 0; },
    finishHtml() {
      const ctx = this.ctx; const pct = this.graded ? Math.round((this.correct / this.graded) * 100) : 100;
      const mins = Math.max(1, Math.round((Date.now() - this.startedAt) / 60000));
      let extra = '';
      if (!ctx.saved) {
        ctx.saved = true;
        if (ctx.kind === 'lesson') {
          const u = unitById(ctx.unitId); const rec = state.units[u.id] || (state.units[u.id] = { done: 0, best: [null, null, null] });
          if (!rec.best) rec.best = [null, null, null];
          rec.best[ctx.n] = Math.max(rec.best[ctx.n] || 0, pct);
          rec.done = Math.max(rec.done || 0, ctx.n + 1);
          let added = 0; ctx.words.forEach((w) => { const k = wordKey(u.id, w.en); if (!state.words[k]) { addWord(u.id, w.en); added++; } });
          ctx.added = added;
        }
        if (ctx.kind === 'tense') state.tenses[ctx.id] = Math.max(state.tenses[ctx.id] || 0, pct);
        save();
      }
      if (ctx.kind === 'lesson' && ctx.added) extra = `<p class="muted">${ctx.added} neue Wörter sind jetzt im Vokabeltrainer.</p>`;
      const msg = pct >= 90 ? 'Ausgezeichnet!' : pct >= 70 ? 'Gut gemacht!' : 'Dranbleiben – Wiederholung macht den Meister.';
      const nl = nextLesson();
      return `<div class="runner-head"><div class="grow"></div></div>
        <div class="runner-body"><div><div class="result-hero"><p class="eyebrow">${ctx.kind === 'review' ? 'Wiederholung fertig' : 'Geschafft'}</p>
          ${ctx.kind === 'review' ? `<p class="big-num">${this.correct}/${this.graded || this.items.length}</p><p>gewusst</p>` : `<p class="big-num">${pct}%</p><p>beim ersten Versuch richtig</p>`}
          <h2>${msg}</h2><p class="muted">${mins} ${mins === 1 ? 'Minute' : 'Minuten'} geübt</p>${extra}</div></div></div>
        <div class="runner-foot"><div>${ctx.kind === 'lesson' && nl ? `<button class="btn primary block" data-act="start-lesson" data-unit="${nl.unit.id}" data-n="${nl.n}">Nächste Lektion</button>` : ''}
          <button class="btn block" data-act="close-runner">Fertig</button></div></div>`;
    }
  };

  function startLesson(unitId, n) {
    const u = unitById(unitId); if (!u) return;
    const items = buildLesson(u, n);
    const wordsUsed = items.filter((x) => x.word).map((x) => x.word);
    if (Chat.open) Chat.close(true);
    Runner.start(items, { kind: 'lesson', unitId, n, words: wordsUsed });
  }
  function startReview(extra) {
    let keys = extra ? pickN(Object.keys(state.words), 10) : shuffle(dueKeys()).slice(0, 15);
    if (!keys.length) { toast('Gerade ist nichts fällig.'); return; }
    Runner.start(keys.map((key) => ({ type: 'flash', key })), { kind: 'review' });
  }

  /* ---------- Gespräch ---------- */
  const Chat = {
    open: false, sc: null, turns: [], busy: false, hint: '', listening: false, ctl: null, summary: null,
    start(id) {
      const sc = SCENARIOS.find((s) => s.id === id); if (!sc) return;
      Object.assign(this, { open: true, sc, turns: [{ who: 'them', text: sc.opening, de: sc.openingDe }], busy: false, hint: '', summary: null, counted: false });
      this.draw(true);
      if (state.settings.autoSpeak) setTimeout(() => Speech.say(sc.opening), 300);
    },
    close(silent) {
      this.open = false; Speech.stop();
      try { speechSynthesis.cancel(); } catch { /* ignorieren */ }
      const el = $('#chat'); if (el) el.remove();
      if (!silent) render();
    },
    msgHtml(t, i) {
      if (t.who === 'them') {
        return `<div class="msg them"><div class="bubble">${esc(t.text)}</div>
          <div class="bubble-tools">${speakBtn(t.text)}<button class="icon-btn" data-say="${esc(t.text)}" data-slow="1" aria-label="Langsam vorlesen">${ICONS.slow}</button>
          ${t.de ? `<button class="btn ghost sm" data-act="toggle-de" data-i="${i}">${t.showDe ? 'Übersetzung ausblenden' : 'Übersetzen'}</button>` : ''}</div>
          ${t.showDe ? `<p class="trans">${esc(t.de)}</p>` : ''}</div>`;
      }
      let fix = '';
      if (t.fb) {
        const f = t.fb; const label = { correct: 'Richtig!', minor: 'Fast richtig', error: 'Korrektur' }[f.status] || 'Korrektur';
        const nw = (f.new_words || []).map((w, k) => { const added = !!state.words[wordKey('talk', w.en)]; return `<button class="chip ${added ? 'added' : ''}" data-act="add-word" data-i="${i}" data-k="${k}" ${added ? 'disabled' : ''}>${added ? '✓ ' : '+ '}${esc(w.en)} – ${esc(w.de)}</button>`; }).join('');
        fix = `<div class="fix ${esc(f.status)}"><p class="fix-head">${label}</p>
          ${f.corrected && f.status !== 'correct' ? `<div class="row" style="flex-wrap:nowrap"><p class="corr grow">${diffHtml(t.text, f.corrected)}</p>${speakBtn(f.corrected, 'Korrektur vorlesen')}</div>` : ''}
          ${f.explanation_de ? `<p>${esc(f.explanation_de)}</p>` : ''}
          ${f.natural ? `<p><b>Natürlicher:</b> ${esc(f.natural)}</p>` : ''}
          ${nw ? `<p class="small muted">Neue Wörter für den Trainer:</p><div class="chips">${nw}</div>` : ''}</div>`;
      } else if (t.err) {
        fix = `<div class="fix error"><p>${esc(t.err)}</p><button class="btn sm" data-act="retry-turn" data-i="${i}">Erneut senden</button></div>`;
      }
      return `<div class="msg me"><div class="bubble">${esc(t.text)}</div></div>${fix}`;
    },
    draw(first) {
      let el = $('#chat');
      if (!el) { el = document.createElement('div'); el.id = 'chat'; el.className = 'chat-wrap'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); document.body.appendChild(el); }
      const draft = $('#chat-in') ? $('#chat-in').value : '';
      const learnerTurns = this.turns.filter((t) => t.who === 'me' && t.fb).length;
      const summary = this.summary ? this.summaryHtml() : '';
      el.innerHTML = `<div class="runner-head" style="max-width:640px;margin:0 auto;width:100%;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))">
          <button class="icon-btn" data-act="close-chat" aria-label="Gespräch schließen">${ICONS.close}</button>
          <div class="grow"><p style="font-weight:700">${esc(this.sc.title)}</p><p class="small muted">${esc(this.sc.place)}</p></div>
          <button class="btn sm" data-act="chat-summary" ${learnerTurns < 2 || this.busy ? 'disabled' : ''}>Feedback</button></div>
        <div class="chat-scroll" id="chat-scroll"><div>
          <div class="goal"><b>Deine Aufgabe:</b> ${esc(this.sc.goal)}</div>
          ${this.turns.map((t, i) => this.msgHtml(t, i)).join('')}
          ${this.busy ? '<p class="typing">Schreibt …</p>' : ''}
          ${summary}
        </div></div>
        <div class="chat-foot"><div>
          ${this.hint ? `<div class="hint"><b>Tipp:</b> ${esc(this.hint)}</div>` : ''}
          ${AI.mode ? '' : '<div class="notice">KI nicht eingerichtet. <a href="#optionen" data-act="close-chat">Zu den Optionen</a></div>'}
          <div class="composer">
            <button class="btn ghost sm" data-act="chat-hint" aria-label="Tipp anzeigen">Tipp</button>
            <textarea id="chat-in" rows="1" placeholder="${Speech.canListen() ? 'Schreib oder sprich auf Englisch …' : 'Schreib auf Englisch (oder diktiere über die Tastatur) …'}" ${this.busy ? 'disabled' : ''}>${esc(draft)}</textarea>
            ${Speech.canListen() ? `<button class="icon-btn ${this.listening ? 'rec' : ''}" data-act="chat-mic" aria-label="${this.listening ? 'Aufnahme stoppen' : 'Sprechen'}">${ICONS.mic}</button>` : ''}
            <button class="icon-btn accent" data-act="chat-send" aria-label="Senden" ${this.busy ? 'disabled' : ''}>${ICONS.send}</button>
          </div></div></div>`;
      const ta = $('#chat-in');
      if (ta) {
        const fit = () => { ta.style.height = 'auto'; ta.style.height = Math.min(140, ta.scrollHeight) + 'px'; };
        ta.addEventListener('input', fit); fit();
        ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); } });
        if (!first && !this.busy) ta.focus({ preventScroll: true });
      }
      const sc = $('#chat-scroll'); if (sc) sc.scrollTop = sc.scrollHeight;
    },
    async send(retryIndex) {
      if (this.busy) return;
      let turn;
      if (retryIndex != null) { turn = this.turns[retryIndex]; turn.err = null; }
      else {
        const ta = $('#chat-in'); const text = ta ? ta.value.trim() : '';
        if (!text) return;
        ta.value = '';
        turn = { who: 'me', text }; this.turns.push(turn);
      }
      if (!AI.mode) { turn.err = 'Die KI ist noch nicht eingerichtet. Öffne „Optionen“ und trage deinen API-Key ein.'; this.draw(); return; }
      this.busy = true; this.hint = ''; this.draw();
      const history = this.turns.slice(0, this.turns.indexOf(turn) + 1);
      const user = `Conversation so far:\n${transcript({ turns: history })}\n\nThe learner's last message: "${turn.text}"`;
      try {
        const fb = await AI.json(turnSystem(this.sc), user, TURN_SCHEMA);
        if (!fb || typeof fb.reply !== 'string') throw new AIError('Die Antwort der KI war unvollständig. Bitte noch einmal senden.', 'shape');
        turn.fb = fb;
        this.turns.push({ who: 'them', text: fb.reply, de: fb.reply_de });
        this.hint = '';
        this.lastHint = fb.hint_de || '';
        if (!this.counted) { this.counted = true; state.talks++; save(); }
        if (state.settings.autoSpeak) Speech.say(fb.reply);
      } catch (e) {
        turn.err = e.message || 'Fehler bei der KI.';
      }
      this.busy = false; this.draw();
    },
    async summarize() {
      if (this.busy) return;
      this.busy = true; this.draw();
      const sys = 'You are an English teacher for a German native speaker at CEFR level A2 aiming for B1. Analyse the learner\'s English in this role-play conversation. Write all explanations in simple German. focus: the 1 to 3 most important recurring problems, each with a real example from the learner (wrong), the corrected version (right) and a short tip in German. If there were hardly any mistakes, give useful phrases to sound more natural instead. strengths_de: what the learner did well. next_step_de: one concrete exercise suggestion.';
      const user = `Scenario: ${this.sc.title} (${this.sc.place}).\n\n${transcript(this)}`;
      try { this.summary = await AI.json(sys, user, SUMMARY_SCHEMA); }
      catch (e) { toast(e.message || 'Feedback nicht möglich.'); }
      this.busy = false; this.draw();
    },
    summaryHtml() {
      const s = this.summary;
      return `<section class="card stack"><p class="eyebrow">Feedback zum Gespräch</p><p>${esc(s.summary_de)}</p>
        <p><b>Das war gut:</b> ${esc(s.strengths_de)}</p>
        ${(s.focus || []).map((f) => `<div class="card soft stack"><p><b>${esc(f.topic_de)}</b></p>${f.wrong ? `<p class="small"><span class="del">${esc(f.wrong)}</span></p>` : ''}<p><b>${esc(f.right)}</b></p><p class="small">${esc(f.tip_de)}</p></div>`).join('')}
        <p><b>Nächster Schritt:</b> ${esc(s.next_step_de)}</p></section>`;
    },
    async mic() {
      if (this.listening) { Speech.stop(); return; }
      const ta = $('#chat-in'); const before = ta ? ta.value.trim() : '';
      this.listening = true; this.draw();
      try {
        const text = await Speech.listen((interim) => { const t = $('#chat-in'); if (t) t.value = (before ? before + ' ' : '') + interim; });
        this.listening = false; this.draw();
        const t = $('#chat-in'); if (t && text) t.value = (before ? before + ' ' : '') + text;
      } catch (e) { this.listening = false; this.draw(); toast(micErrorText(e)); }
    }
  };

  /* ---------- Ereignisse ---------- */
  document.addEventListener('click', async (e) => {
    const sayEl = e.target.closest('[data-say]');
    if (sayEl) { Speech.say(sayEl.dataset.say, !!sayEl.dataset.slow); return; }
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const act = el.dataset.act;
    const R = Runner;
    switch (act) {
      case 'start-lesson': startLesson(el.dataset.unit, Number(el.dataset.n)); break;
      case 'start-gaps': { const u = unitById(el.dataset.unit); R.start(shuffle(u.gaps).map((g) => ({ type: 'gap', gap: g })), { kind: 'gaps' }); break; }
      case 'start-tense': { const t = TENSES.find((x) => x.id === el.dataset.id); R.start(t.quiz.map((g) => ({ type: 'gap', gap: g })), { kind: 'tense', id: t.id }); break; }
      case 'start-review': startReview(!!el.dataset.extra); break;
      case 'close-runner': R.close(); break;
      case 'pick': if (!R.checked) { R.sel = Number(el.dataset.v); R.draw(); } break;
      case 'tile': if (!R.checked) { const x = R.tiles.pool[Number(el.dataset.k)]; if (!R.tiles.line.includes(x)) { R.tiles.line.push(x); Speech.say(x.w); } R.draw(); } break;
      case 'untile': if (!R.checked) { R.tiles.line.splice(Number(el.dataset.k), 1); R.draw(); } break;
      case 'check': R.check(); break;
      case 'next': R.next(); break;
      case 'skip': R.next(); break;
      case 'reveal': R.revealed = true; R.draw(); { const w = wordInfo(R.cur.key); Speech.say(w.en); } break;
      case 'flash-yes': case 'flash-no': {
        const ok = act === 'flash-yes';
        gradeWord(R.cur.key, ok); R.graded++; if (ok) R.correct++; save(); R.next(); break;
      }
      case 'listen': {
        const btn = $('#mic-btn'); const heard = $('#heard');
        if (Speech.active) { Speech.stop(); return; }
        if (btn) btn.classList.add('rec');
        try {
          const text = await Speech.listen((t) => { if (heard) heard.textContent = t; });
          R.heard = text; if (btn) btn.classList.remove('rec');
          R.draw(); if (text) R.check();
        } catch (err) { if (btn) btn.classList.remove('rec'); toast(micErrorText(err)); }
        break;
      }
      case 'gtab': setUiPref('grammarTab', el.dataset.tab); render(); break;
      case 'start-chat': Chat.start(el.dataset.id); break;
      case 'close-chat': Chat.close(); break;
      case 'chat-send': Chat.send(); break;
      case 'retry-turn': Chat.send(Number(el.dataset.i)); break;
      case 'chat-mic': Chat.mic(); break;
      case 'chat-hint': Chat.hint = Chat.lastHint || Chat.sc.goal; Chat.draw(); break;
      case 'chat-summary': Chat.summarize(); break;
      case 'toggle-de': { const t = Chat.turns[Number(el.dataset.i)]; t.showDe = !t.showDe; Chat.draw(true); break; }
      case 'add-word': {
        const t = Chat.turns[Number(el.dataset.i)]; const w = t.fb.new_words[Number(el.dataset.k)];
        addWord('talk', w.en, w.de); save(); toast('Zum Vokabeltrainer hinzugefügt'); Chat.draw(true); break;
      }
      case 'save-key': {
        const v = ($('#apikey') || {}).value || '';
        if (!/^sk-ant-/.test(v.trim())) { toast('Das sieht nicht wie ein Anthropic-Key aus (beginnt mit sk-ant-).'); return; }
        lsSet(LS_KEY, v.trim()); AI.refresh(); toast('API-Key gespeichert'); render(); break;
      }
      case 'del-key': lsDel(LS_KEY); AI.refresh(); toast('API-Key gelöscht'); render(); break;
      case 'test-key': {
        el.disabled = true; el.textContent = 'Teste …';
        try {
          const r = await AI.json('You check English sentences. Reply in JSON.', 'Is "I am here since Monday" correct English? Give the corrected sentence.', { type: 'object', additionalProperties: false, required: ['corrected'], properties: { corrected: { type: 'string' } } });
          toast('Funktioniert: „' + r.corrected + '“');
        } catch (err) { toast(err.message); }
        el.disabled = false; el.textContent = 'Testen'; break;
      }
      case 'export': {
        const txt = JSON.stringify(state);
        try { await navigator.clipboard.writeText(txt); toast('Sicherung in die Zwischenablage kopiert'); }
        catch { const box = $('#import-box'); const ta = $('#import-text'); if (box && ta) { box.hidden = false; ta.value = txt; ta.select(); toast('Text markiert – bitte selbst kopieren'); } }
        break;
      }
      case 'show-import': { const b = $('#import-box'); if (b) b.hidden = !b.hidden; break; }
      case 'do-import': {
        try { const s = sanitize(JSON.parse(($('#import-text') || {}).value || '')); state = s; save(); toast('Fortschritt wiederhergestellt'); render(); }
        catch { toast('Die Sicherung ist ungültig.'); }
        break;
      }
      case 'ask-reset': $('#reset-box').innerHTML = '<p class="small"><b>Wirklich alles löschen?</b> Lektionen, Wörter und Lernzeit gehen verloren.</p><div class="row"><button class="btn" data-act="cancel-reset">Abbrechen</button><button class="btn primary" data-act="do-reset">Ja, zurücksetzen</button></div>'; break;
      case 'cancel-reset': render(); break;
      case 'do-reset': { const keep = state.settings; state = freshState(); state.settings = keep; save(); toast('Fortschritt zurückgesetzt'); go('lernen'); break; }
    }
  });
  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.id === 'model') { state.settings.model = t.value; save(); toast('Modell gespeichert'); }
    if (t.id === 'voice') { state.settings.voice = t.value; save(); Speech.say('This is my voice.'); }
    if (t.id === 'autospeak') { state.settings.autoSpeak = t.checked; save(); }
    if (t.id === 'rate') { state.settings.rate = Number(t.value); save(); Speech.say('This is how fast I speak.'); }
  });
  document.addEventListener('input', (e) => { if (e.target.id === 'rate') { const v = $('#rate-val'); if (v) v.textContent = Number(e.target.value).toFixed(2); } });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (Runner.open) Runner.close(); else if (Chat.open) Chat.close(); }
  });
  window.addEventListener('hashchange', () => {
    if (Runner.open) Runner.close();
    if (Chat.open) Chat.close(true);
    render();
  });

  /* ---------- Start ---------- */
  Speech.init();
  render();
  AI.init().then(() => { if (!Runner.open && !Chat.open && ['sprechen', 'optionen'].includes(route())) render(); });
  initRemote();
  if (!IN_CLAUDE && 'serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline-Modus nicht verfügbar */ });
  }
})();
