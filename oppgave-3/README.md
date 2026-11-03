# Oppgave 3 - Objekter, arrays og funksjoner som verdier

## Mål med oppgave 3

Etter denne oppgaven skal du kunne:

- Lage og bruke objekter og arrays
- Forstå at funksjoner er verdier som kan sendes inn i andre funksjoner (callbacks)
- Bruke `forEach`, `map`, `filter` og `find` til å jobbe med lister
- Forklare forskjellen på å kopiere en verdi og å kopiere en referanse

## 3.0 - Oppsett

:pencil2: Lag en ny fil `lists.js` i mappen din, og bytt script-taggen i `index.html` til å peke på den.

## 3.1 - Objekter

Et objekt samler data som hører sammen, som par av *nøkkel* og *verdi*.

```js
const language = {
  name: "JavaScript",
  year: 1995,
  creator: "Brendan Eich",
};

console.log(language.name);
console.log(language["year"]);

language.runsInBrowser = true;
console.log(language);
```

:pencil2: Skriv koden over. Legg merke til at du kan legge til nye nøkler på et objekt etter at det er laget.

:pencil2: 🤔 `language` er laget med `const`. Hvorfor får vi lov til å legge til `runsInBrowser`?

:bulb: `const` betyr at *variabelen* ikke kan pekes til et nytt objekt. Selve objektet kan fortsatt endres. `language = {}` gir feil, men `language.year = 1996` er lov.

## 3.2 - Arrays

En array er en ordnet liste med verdier.

```js
const numbers = [3, 7, 1];

numbers.push(10); // adds to the end
console.log(numbers);
console.log(numbers.length);
console.log(numbers[0]); // first element
console.log(numbers[numbers.length - 1]); // last element
console.log(numbers.includes(7));
```

:pencil2: Skriv koden over, og se hva hver linje gir.

Nå lager vi en liste med objekter. Denne bruker vi i resten av oppgaven, og i oppgave 4 og 5.

:pencil2: Legg inn denne listen i `lists.js`:

```js
const languages = [
  { name: "C", year: 1972 },
  { name: "Python", year: 1991 },
  { name: "Java", year: 1995 },
  { name: "JavaScript", year: 1995 },
  { name: "Go", year: 2009 },
  { name: "Kotlin", year: 2011 },
  { name: "TypeScript", year: 2012 },
  { name: "Rust", year: 2015 },
];
```

:pencil2: Skriv ut navnet på det tredje språket i listen.

## 3.3 - Funksjoner er verdier

I JavaScript er en funksjon en verdi på lik linje med et tall eller en tekst. Du kan lagre den i en variabel, og sende den inn som argument til en annen funksjon.

```js
function doTwice(fn) {
  fn();
  fn();
}

doTwice(() => console.log("Hello!"));
```

:pencil2: 🤔 Hva skrives ut? Prøv.

En funksjon som sendes inn til en annen funksjon kalles en **callback**. Dette er et av de viktigste mønstrene i JavaScript. Når vi senere skal reagere på klikk eller hente data fra nettet, gir vi nettleseren en callback som den kaller når noe skjer.

:pencil2: Skriv en funksjon `repeat(n, fn)` som kaller `fn` `n` ganger, og sender med hvilken gang det er som argument:

```js
repeat(3, (i) => console.log(`This is time number ${i}`));
// This is time number 1
// This is time number 2
// This is time number 3
```

## 3.4 - Jobbe med lister: `forEach`, `map`, `filter` og `find`

Arrays har innebygde metoder som tar en callback og kaller den for hvert element. Disse brukes hele tiden i moderne JavaScript.

| Metode | Hva den gjør | Returnerer |
|--------|--------------|------------|
| `forEach` | Kjører callbacken for hvert element | Ingenting |
| `map` | Gjør om hvert element til noe nytt | Ny array, like lang |
| `filter` | Beholder elementene der callbacken returnerer `true` | Ny array, like lang eller kortere |
| `find` | Finner det første elementet der callbacken returnerer `true` | Ett element, eller `undefined` |

Eksempel:

```js
languages.forEach((language) => {
  console.log(`${language.name} was released in ${language.year}`);
});

const names = languages.map((language) => language.name);
console.log(names);
```

:pencil2: Skriv koden over.

:pencil2: Bruk `filter` til å lage en liste med språkene som kom i år 2000 eller senere. Skriv den ut.

:pencil2: Bruk `find` til å finne objektet for `"Rust"`. Hva skjer hvis du leter etter et språk som ikke finnes i listen?

:pencil2: Bruk `map` til å lage en liste med tekster på formen `"Python (1991)"`.

:pencil2: Kombiner `filter` og `map` til å lage en liste med *navnene* på språkene som kom før 2000. Du kan kjede metodene etter hverandre:

```js
const oldLanguages = languages
  .filter(/* ... */)
  .map(/* ... */);
```

:bulb: `map` og `filter` endrer ikke den opprinnelige listen. De lager alltid en ny. Det gjør koden enklere å forstå, fordi du vet at dataene dine ikke endres i det skjulte.

## 3.5 - Verdi og referanse

:pencil2: 🤔 Hva skriver denne koden ut?

```js
let a = 1;
let b = a;
b = 2;
console.log(a, b);

const list1 = [1, 2, 3];
const list2 = list1;
list2.push(4);
console.log(list1, list2);
```

:bulb: Tall, tekst og boolske verdier kopieres når du tilordner dem til en ny variabel. Objekter og arrays gjør *ikke* det. Variabelen inneholder bare en **referanse** (en peker) til objektet. `list1` og `list2` peker på nøyaktig samme array.

Vil du ha en ekte kopi, kan du bruke spread-syntaksen `...`:

```js
const list3 = [...list1];
list3.push(5);
console.log(list1, list3);

const original = { name: "Go", year: 2009 };
const copy = { ...original, year: 2012 };
console.log(original, copy);
```

:pencil2: Skriv koden over og bekreft at `list1` og `original` ikke endres.

:exclamation: Dette er en vanlig kilde til feil: du sender en array inn i en funksjon, funksjonen endrer den, og plutselig er dataene endret et helt annet sted i koden.

## 🌶️ Ekstra

- Skriv din egen versjon av `map` som en vanlig funksjon `myMap(list, fn)`, uten å bruke den innebygde `map`. Gjør det samme for `filter`.
- Bruk `reduce` til å regne ut gjennomsnittlig år for språkene i listen.
- Sorter språkene etter navn. 🤔 Bruk `sort` og skriv ut den opprinnelige listen etterpå. Hva har skjedd? Se på `toSorted` som et alternativ.
- Lag et objekt som teller hvor mange språk som kom i hvert tiår, for eksempel `{ 1970: 1, 1990: 3, 2000: 1, 2010: 3 }`.
- **Destrukturering:** Hva gjør disse linjene? (Vi legger dem i en egen blokk `{ }`, fordi `name` allerede kan være brukt som variabelnavn tidligere i filen.)

  ```js
  {
    const { name, year } = languages[0];
    console.log(name, year);
    const [first, second, ...rest] = languages;
    console.log(first, second, rest);
    languages.forEach(({ name }) => console.log(name));
  }
  ```

---

[:arrow_right: Gå til neste oppgave](../oppgave-4/README.md)
