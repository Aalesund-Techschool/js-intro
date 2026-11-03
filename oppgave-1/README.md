# Oppgave 1 - Oppsett, HTML og DevTools

## Mål med oppgave 1

Etter denne oppgaven skal du kunne:

- Lage en enkel HTML-side og åpne den i nettleseren
- Åpne utviklerverktøyene (DevTools) og bruke `Console` og `Elements`
- Forklare forskjellen på HTML-filen og DOMen
- Koble en JavaScript-fil til siden og forstå hva `defer` gjør
- Lese en feilmelding i konsollen og finne linjen som feilet

## 1.1 - Din første HTML-side

:pencil2: Opprett en ny tom mappe på maskinen din, for eksempel `js-workshop`, og åpne den i editoren din.

:pencil2: Lag en fil som heter `index.html` med følgende innhold:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JS-workshop</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>This is my first page.</p>
  </body>
</html>
```

:pencil2: Åpne filen i nettleseren. Du kan gjøre det på en av disse måtene:

- Finn filen i filutforskeren (Finder på macOS, Filutforsker på Windows) og dobbeltklikk på den.
- Dra filen fra fillisten i editoren (for eksempel VS Code) og slipp den i et nettleservindu.

:bulb: Dobbeltklikker du på filen inne i VS Code, åpnes den bare i editoren, ikke i nettleseren. I VS Code kan du høyreklikke på filen og velge `Reveal in Finder` (macOS) eller `Reveal in File Explorer` (Windows) for å finne den i filutforskeren.

:bulb: Adressefeltet viser nå noe som starter med `file://`. Nettleseren leser filen rett fra disken din.

## 1.2 - Åpne DevTools

Alle moderne nettlesere har innebygde utviklerverktøy. Dette er det viktigste verktøyet ditt som webutvikler.

:pencil2: Åpne DevTools med `F12`, `Ctrl+Shift+I` (Windows/Linux) eller `Cmd+Option+I` (macOS). Du kan også høyreklikke på siden og velge `Inspiser` / `Inspect`.
:pencil2: Gå til fanen `Console`. Her kan du skrive JavaScript og kjøre det direkte på siden. Prøv:

```js
2 + 2
"workshop".toUpperCase()
Math.random()
alert("Hello from the console!")
```

:bulb: Konsollen er perfekt for å teste små kodebiter. Bruk den mye gjennom hele workshopen.

## 1.3 - HTML-filen vs DOM

Når nettleseren laster `index.html`, leser den teksten og bygger et tre av objekter i minnet. Dette treet kalles **DOM** (Document Object Model). Det er DOMen, ikke HTML-filen, som vises på skjermen, og det er DOMen JavaScript kan endre.

:pencil2: Gå til fanen `Elements` (i Firefox heter den `Inspector`). Det ser ut som HTML-koden din, men det du ser er DOMen.

:pencil2: Dobbeltklikk på teksten `Hello, world!` i `Elements` og endre den til noe annet. Trykk `Enter`. Overskriften på siden endrer seg med en gang.

:pencil2: Åpne `index.html` i editoren. Er teksten endret der?

:pencil2: Last siden på nytt (`F5` / `Cmd+R`). Hva skjedde med endringen din?

:bulb: Endringen forsvant fordi nettleseren bygde DOMen på nytt fra HTML-filen. Det samme gjelder alt JavaScript gjør med siden: endringene lever bare i DOMen så lenge siden er åpen. Dette kommer vi tilbake til senere.

:pencil2: Skriv dette i `Console`:

```js
document.body.style.background = "lightyellow"
```

Se på bakgrunnen på siden. `document` er inngangen til hele DOMen fra JavaScript.

## 1.4 - Koble på en JavaScript-fil

Å skrive kode i konsollen er fint for å teste, men vanligvis legger vi koden i en egen fil.

:pencil2: Lag en fil `script.js` i samme mappe med følgende innhold:

```js
console.log("script.js is loaded!");

const heading = document.querySelector("h1");
console.log(heading);
heading.textContent = "Hello from JavaScript!";
```

:pencil2: Legg til denne linjen i `<head>` i `index.html`, rett under `<title>`:

```html
<script src="script.js"></script>
```

:pencil2: Last siden på nytt og se i `Console`. Hva skjer?

Du skal få en rød feilmelding omtrent som `Cannot set properties of null (setting 'textContent')` (eller en lignende feilmelding, alt etter nettleser) Og `console.log(heading)` skriver ut `null`.

:bulb: Nettleseren leser HTML-en ovenfra og ned. Når den kommer til `<script>`, stopper den, henter skriptet og kjører det *før* den leser resten av siden. På det tidspunktet finnes ikke `<h1>` i DOMen ennå, så `querySelector` finner ingenting og gir `null`.

:pencil2: Legg til `defer` på script-taggen:

```html
<script src="script.js" defer></script>
```

:pencil2: Last siden på nytt. Nå skal overskriften vise `Hello from JavaScript!`.

:bulb: `defer` betyr «last ned skriptet, men vent med å kjøre det til hele HTML-en er lest». Det er den anbefalte måten å laste skript på. Et alternativ du kan se i eldre kode er å legge `<script>` helt nederst i `<body>`.

## 1.5 - Les feilmeldinger

Du kommer til å se mange feilmeldinger. Det er helt normalt, og konsollen er god til å fortelle hva som gikk galt.

:pencil2: Legg til en linje nederst i `script.js` med en skrivefeil:

```js
consol.log("This line has a typo");
```

:pencil2: Last siden på nytt. Les feilmeldingen i `Console`. Til høyre for meldingen står filnavnet og linjenummeret, for eksempel `script.js:7`. Klikk på det.

Du havner i fanen `Sources` (i Firefox heter den `Debugger`), som viser nøyaktig hvilken linje som feilet.

:pencil2: Rett opp skrivefeilen og last siden på nytt.

:exclamation: Når noe ikke fungerer, er det første du alltid skal gjøre å åpne `Console` og se etter røde meldinger.

## 🌶️ Ekstra

- Marker `<h1>` i `Elements`, gå til `Console` og skriv `$0`. Hva får du? Prøv `$0.textContent = "Selected!"`.
- Se i fanen `Network` mens du laster siden på nytt. Hvilke filer henter nettleseren, og i hvilken rekkefølge?
- Hva skjer hvis du lager feil i HTML-en, for eksempel glemmer en lukketagg som `</p>`? Får du en feilmelding? Se i `Elements` hvordan nettleseren har tolket det.

---

[:arrow_right: Gå til neste oppgave](../oppgave-2/README.md)
