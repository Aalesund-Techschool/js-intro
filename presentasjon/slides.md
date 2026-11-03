---
theme: default
title: Introduksjon til JavaScript
colorSchema: dark
fonts:
  sans: JetBrains Mono
  mono: JetBrains Mono
layout: cover
---

<!-- TODO: legg inn dato for workshopen i undertittelen -->
<div class="terminal">
  <div class="terminal-bar">
    <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
    <span class="terminal-title">DevTools — Console</span>
  </div>
  <div class="terminal-body">
    <div class="cmd"><span class="prompt">&gt;</span> document.title = "Introduksjon til JavaScript"</div>
    <h1>Introduksjon til JavaScript</h1>
    <p class="subtitle">// HTML, DOM og nettleseren · Ålesund Techschool</p>
  </div>
</div>

---

# Ålesund Techschool

- Forskjellige fagfolk fra IT-bransjen i Ålesund som ønsker å dele
- Knytte bro mellom de som skal inn i IT-bransjen og de som jobber der. Bli kjent med fremtidens kollegaer, bli kjent med arbeidsmetodikk ++
- Arena for nettverk og læring
- Representert p.t:
  - NTNU
  - Boitano
  - Reknes
  - Solwr
  - Twoday
  - Kystverket

**Discord**

---

# Hvem er vi

<!-- TODO: legg til medforelesere -->
- Marius Kalvø (Kystverket)

---

# Agenda

- HTML, CSS og JavaScript
- Hva skjer når nettleseren åpner en side
- DOMen
- Events og callbacks
- DevTools
- Oppgaver: språket og DOMen
- Oppgaver: bygg en app med data fra Kystverket

---

# HTML, CSS og JavaScript

- **HTML** beskriver innholdet og strukturen
- **CSS** bestemmer utseendet
- **JavaScript** står for oppførselen

```html
<h1 class="title">Hello!</h1>                     <!-- HTML -->

<style> .title { color: rebeccapurple; } </style> <!-- CSS -->

<script>                                          <!-- JavaScript -->
  document.querySelector(".title").textContent = "Hello from JS!";
</script>
```

---

# JavaScript

- Laget på rundt ti dager i 1995 for nettleseren Netscape
- Har ingenting med Java å gjøre, bortsett fra navnet
- Det eneste språket som kjører direkte i alle nettlesere
- Kjører i dag også på servere (Node.js), i apper og i verktøy
- Dynamisk typet: variabler har ingen fast type
- Standardiseres som ECMAScript, med en ny versjon hvert år
- TypeScript = JavaScript med typer, som kompileres til JavaScript

---
layout: two-cols-header
---

# JavaScript på én slide

Det du trenger for å lese koden i oppgavene

::left::

```js
const name = "Ada"; // can't be reassigned
let count = 0;      // can be reassigned
count = count + 1;

if (count === 1) {
  console.log(`Hello, ${name}!`);
}

function add(a, b) {
  return a + b;
}

const square = (x) => x * x;
```

::right::

```js
const languages = [
  { name: "C", year: 1972 },
  { name: "Rust", year: 2015 },
];

languages[0].name; // "C"

// Functions are values, and can be passed
// into other functions (callbacks)
const names = languages.map((l) => l.name);
const modern = languages.filter(
  (l) => l.year > 2000,
);
```

---

# Wat

Fra foredraget «Wat» av Gary Bernhardt (Destroy All Software, 2012)

<!-- Each example takes two clicks: first the expression, then the answer -->
<div class="wat">
  <code v-click>[] + []</code>
  <code v-click>""</code>
  <code v-click>[] + {}</code>
  <code v-click>"[object Object]"</code>
  <code v-click>Array(16).join("wat" - 1) + " Batman!"</code>
  <code v-click>"NaNNaNNaN...NaN Batman!"</code>
  <code v-click>"b" + "a" + +"a" + "a"</code>
  <code v-click>"baNaNa"</code>
  <code v-click>[10, 1, 3].sort()</code>
  <code v-click>[1, 10, 3]</code>
  <code v-click>[] == ![]</code>
  <code v-click>true</code>
</div>

<v-click>

Nesten alt skyldes automatisk typekonvertering. Bruk `===`, og ikke bland typer.

</v-click>

<style>
.wat {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.6rem 3rem;
  margin: 1.5rem 0;
  font-size: 1.1em;
}
</style>

---

# Document Object Model (DOM)

```mermaid {theme: 'base', scale: 0.9}
flowchart LR
   html[index.html] -- parses --> dom[DOM]
   dom --> render[Render tree]
   css[style.css] --> render
   render --> layout[Layout]
   layout --> paint[Paint]
   js[script.js] -. reads and changes .-> dom
```

- Nettleseren leser HTML ovenfra og ned og bygger DOMen
- JavaScript endrer DOMen, og nettleseren tegner siden på nytt

---
layout: two-cols-header
---

# Document Object Model (DOM)

HTML er tekst. DOMen er et levende tre av objekter som nettleseren bygger fra teksten.

::left::

```html
<body>
  <header>
    <h1>Languages</h1>
    <p class="intro">...</p>
  </header>
  <ul id="list">
    <li>C</li>
    <li>Rust</li>
  </ul>
</body>
```

::right::

```mermaid {theme: 'base', scale: 0.8}
flowchart TD
   body --> header
   body --> ul["ul#list"]
   header --> h1
   header --> p["p.intro"]
   ul --> li1[li]
   ul --> li2[li]
```

---

# Document Object Model (DOM)

- DOMen bygges fra HTML-filen når siden lastes
- JavaScript endrer DOMen, aldri filen
- Last siden på nytt, og alle endringene er borte
- `View source` viser filen. `Elements` i DevTools viser DOMen
- Hvert element er et objekt med egenskaper og metoder
- Bruk `textContent` for tekst fra brukere og API-er. `innerHTML` tolker teksten som HTML, og åpner for XSS

```js
const heading = document.querySelector("h1");
heading.textContent = "New heading";
heading.classList.add("highlighted");

const item = document.createElement("li");
item.textContent = "Kotlin";
document.querySelector("#list").append(item);
```

---

# Events og callbacks

- Nettleseren sender ut **events** når noe skjer: klikk, tastetrykk, skjema, scrolling ...
- Vi gir nettleseren en **callback** som skal kalles når eventen skjer
- Vi kaller aldri funksjonen selv

```js
const button = document.querySelector("#save");

button.addEventListener("click", (event) => {
  console.log("Clicked!", event.target);
});
```

- Dette mønsteret går igjen overalt: klikk, timere, henting av data fra nettet

---

# Data → DOM

```mermaid {theme: 'base', scale: 1.1}
flowchart LR
   user[Brukeren gjør noe] --> event[Event]
   event --> data[Vi endrer dataene]
   data --> render[Vi tegner DOMen<br/>på nytt fra dataene]
   render --> user
```

- Dataene er kilden til sannheten, ikke DOMen
- Dette er ideen bak rammeverk som React, Vue og Angular
- I dag gjør vi det for hånd, slik at du forstår hva rammeverkene gjør for deg

---

# DevTools

- Åpne med `F12` eller `Cmd+Option+I`
- **Console**: kjør JavaScript og se feilmeldinger
- **Elements**: se og endre DOMen
- **Sources**: se koden og sett breakpoints
- **Network**: se alt nettleseren henter

**Når noe ikke fungerer: åpne Console og se etter rødt.**

---
layout: center
---

# Demo

---

# Oppgaver

<!-- TODO: bekreft adressen til repoet -->
- <https://github.com/Aalesund-Techschool/intro-to-js>
- https://discord.gg/wJjYFACUbQ
- Oppgave 1 - 5: språket og DOMen
- Oppgave 6 - 8: bygg en app med data fra Kystverket
- Økende vanskelighetsgrad. Hopp over det du kan, og prøv 🌶️-oppgavene
- Skriv koden selv i stedet for å kopiere
- Spør om du sitter fast, eller vil diskutere
- Har du noe relevant du vil dele?
  Legg inn en melding i **#workshops** på **Discord**
