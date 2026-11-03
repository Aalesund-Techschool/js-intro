# Oppgave 5 - Events: reagere på brukeren

## Mål med oppgave 5

Etter denne oppgaven skal du kunne:

- Lytte på hendelser (events) med `addEventListener`
- Bruke event-objektet til å finne ut hva som skjedde
- Lage et søkefelt som filtrerer en liste mens du skriver
- Håndtere innsending av skjema med `preventDefault`
- Forklare event bubbling, og bruke det til å lytte på mange elementer med én lytter (event delegation)

## 5.0 - Oppsett

:pencil2: Lag en ny mappe `oppgave-5` i mappen din fra oppgave 1 (for eksempel `js-workshop/oppgave-5`). Kopier `index.html`, `style.css` og `script.js` fra `oppgave-5/start` i dette repoet inn i den nye mappen. Har du ikke klonet repoet, kan du åpne filene på GitHub og kopiere innholdet.

:pencil2: Åpne `index.html` fra din egen mappe i nettleseren, og `script.js` i editoren. Det er her du skal skrive koden din.

Startkoden inneholder `languages`-listen og en enkel versjon av `renderLanguages` fra oppgave 4. Siden har fått noen nye elementer: en knapp, et søkefelt og et skjema. Ingen av dem gjør noe ennå.

:bulb: Ble du ikke ferdig med oppgave 4? Ikke noe problem, alt du trenger ligger i startkoden.

## 5.1 - Ditt første event

Nettleseren sender ut en *event* hver gang noe skjer: brukeren klikker, skriver, scroller, trykker på en tast osv. Med `addEventListener` gir du nettleseren en callback som den kaller hver gang eventen skjer.

:pencil2: Få knappen til å telle antall klikk:

```js
const button = document.querySelector("#click-button");
const clickCount = document.querySelector("#click-count");
let clicks = 0;

button.addEventListener("click", () => {
  clicks = clicks + 1;
  clickCount.textContent = clicks;
});
```

:bulb: Legg merke til at vi *ikke* kaller funksjonen selv. Vi gir den til nettleseren, og nettleseren kaller den senere, hver gang noen klikker. Det er dette som er callbacks fra oppgave 3 i praksis.

:pencil2: Callbacken får et *event-objekt* som argument. Endre koden så den tar imot `event`, og skriv det ut:

```js
button.addEventListener("click", (event) => {
  console.log(event);
  // ...
});
```

:pencil2: Klikk på knappen og utforsk objektet i konsollen. Finn `type`, `target`, `clientX` og `clientY`. Hva betyr de?

## 5.2 - Søk mens du skriver

Eventen `input` skjer hver gang innholdet i et tekstfelt endres.

:pencil2: Lytt på `input` på søkefeltet, og skriv ut verdien hver gang den endres:

```js
const search = document.querySelector("#search");

search.addEventListener("input", () => {
  console.log(search.value);
});
```

:pencil2: Bruk `filter` til å vise bare språkene der navnet inneholder søketeksten. Kall `renderLanguages` med den filtrerte listen.

:bulb: Søket bør ikke skille mellom store og små bokstaver. Bruk `toLowerCase()` på både navnet og søketeksten, og `includes()` til å sjekke om navnet inneholder søketeksten.

## 5.3 - Skjema

:pencil2: Lytt på eventen `submit` på skjemaet, og skriv ut noe i konsollen:

```js
const form = document.querySelector("#add-form");

form.addEventListener("submit", (event) => {
  console.log("The form was submitted!");
});
```

:pencil2: Fyll ut skjemaet og trykk `Add`. Se nøye på konsollen og adressefeltet. Hva skjedde?

:bulb: Når et skjema sendes inn, er standardoppførselen til nettleseren å laste en ny side med skjemadataene i adressen (`?name=...&year=...`). Siden lastes på nytt, og alt JavaScript har gjort med DOMen forsvinner, akkurat som i oppgave 1.3.

:pencil2: Stopp standardoppførselen med `event.preventDefault()` øverst i callbacken. Prøv igjen.

:pencil2: Les ut verdiene fra skjemaet. Elementene i et skjema er tilgjengelige via `form.elements` og `name`-attributtet:

```js
const name = form.elements.name.value;
const year = form.elements.year.value;
console.log(name, year, typeof year);
```

:pencil2: 🤔 Hvilken type har `year`? Verdien fra et input-felt er alltid en tekst, selv om feltet har `type="number"`. Gjør det om til et tall med `Number(year)`.

:pencil2: Legg det nye språket til i `languages` med `push`, og kall `renderLanguages(languages)` slik at det dukker opp i listen. Tøm skjemaet med `form.reset()` til slutt.

:pencil2: 🤔 Skriv noe i søkefeltet, og legg deretter til et nytt språk. Hva skjer med søket?

:bulb: Både søket og skjemaet tegner listen, men de vet ikke om hverandre. En god løsning er å lage én funksjon, for eksempel `update()`, som leser søketeksten, filtrerer `languages` og kaller `renderLanguages`. Både søkefeltet og skjemaet kaller `update()` når noe har endret seg.

```js
function update() {
  const query = search.value.toLowerCase();
  // filter languages and call renderLanguages ...
}
```

:pencil2: Skriv `update()` og bruk den i begge lytterne.

:pencil2: Last siden på nytt. Hvor ble språkene du la til av? Det løser vi i appdelen av workshopen.

## 5.4 - Event bubbling og event delegation

Når du klikker på et element, skjer eventen først på selve elementet, og så «bobler» den opp gjennom alle foreldrene helt til `document`.

:pencil2: Legg til denne lytteren, og klikk rundt på forskjellige steder på siden:

```js
document.body.addEventListener("click", (event) => {
  console.log("Click on", event.target);
});
```

:bulb: Lytteren ligger på `<body>`, men `event.target` forteller hvilket element du faktisk klikket på. Fjern lytteren igjen når du har sett hvordan den fungerer.

Nå skal vi kunne fjerne et språk ved å klikke på det. Vi kunne lagt en lytter på hvert `<li>`, men de blir slettet og laget på nytt hver gang `renderLanguages` kjøres. I stedet legger vi **én** lytter på `<ul>`-elementet, og finner ut hvilket `<li>` som ble klikket. Dette kalles *event delegation*.

:pencil2: Lagre navnet på språket på hvert `<li>` med et `data-`-attributt. Legg til denne linjen i `renderLanguages`:

```js
item.dataset.name = language.name;
```

:bulb: Se i `Elements`. Hvert `<li>` har nå et attributt `data-name="..."`. `dataset` er en enkel måte å lagre egne data på et element.

:pencil2: Legg en klikk-lytter på `list`. Bruk `event.target.closest("li")` til å finne listeelementet som ble klikket, og les navnet med `dataset.name`.

:pencil2: Fjern språket fra `languages` med `filter`, og kall `update()`:

```js
languages = languages.filter((language) => language.name !== name);
```

:bulb: Nå har du brukt hele mønsteret som de fleste nettsider er bygget på: **brukeren gjør noe → en event → vi endrer dataene → vi tegner DOMen på nytt fra dataene.**

## 🌶️ Ekstra

- Tøm søkefeltet når brukeren trykker `Escape`. Lytt på `keydown` og sjekk `event.key`.
- Vis en feilmelding under skjemaet hvis språket allerede finnes i listen, i stedet for å legge det til en gang til.
- Legg til knapper for å sortere listen etter navn eller år. Husk at sorteringen må bevares når du søker eller legger til nye språk. Hvor bør du lagre hvilken sortering som er valgt?
- La brukeren markere favoritter ved å dobbeltklikke (`dblclick`) på et språk. Lagre favoritten som en egenskap på objektet i `languages`, ikke bare som en klasse på elementet. Hvorfor er det viktig?
- 🤔 Hva skjer hvis du kaller `event.stopPropagation()` i klikk-lytteren til knappen fra 5.1, samtidig som lytteren på `<body>` fra 5.4 er aktiv?
- Søket kjører for hvert tastetrykk. Skriv en `debounce`-funksjon som venter til brukeren har sluttet å skrive i 300 ms før søket kjøres. Du trenger `setTimeout` og `clearTimeout`.

---

[:arrow_right: Gå til neste oppgave](../oppgave-6/README.md)
