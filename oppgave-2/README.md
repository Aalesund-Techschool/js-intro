# Oppgave 2 - Grunnleggende JavaScript

## Mål med oppgave 2

Etter denne oppgaven skal du kunne:

- Lage variabler med `let` og `const`, og vite når du bruker hvilken
- Kjenne til de vanligste datatypene, og sjekke typen med `typeof`
- Forklare hvorfor vi bruker `===` i stedet for `==`
- Vite hva *truthy* og *falsy* betyr
- Bygge tekst med template literals
- Skrive egne funksjoner

## 2.0 - Oppsett

Vi fortsetter i mappen fra oppgave 1.

:pencil2: Lag en ny fil `basics.js` og bytt ut `script.js` med `basics.js` i script-taggen i `index.html`. Ha `Console` åpen, og last siden på nytt hver gang du har lagret.

## 2.1 - Variabler

Vi lager variabler med `let` og `const`.

```js
let age = 25;
age = 26; // OK, a let variable can be reassigned

const name = "Ada";
console.log(name, age);
```

:pencil2: Skriv koden over i `basics.js`. Legg deretter til linjen `name = "Grace";` nederst. Hva sier konsollen?

:bulb: `const` kan ikke tilordnes på nytt. Bruk `const` som standard, og `let` bare når du vet at verdien skal endres. Da er det lettere å lese koden, fordi du ser med en gang hvilke verdier som kan endre seg.

:exclamation: I eldre kode ser du ofte `var`. Den har noen overraskende regler for hvor variabelen er synlig, så i ny kode bruker vi alltid `let` eller `const`.

:pencil2: Fjern linjen med `name = "Grace";` før du går videre.

## 2.2 - Datatyper

JavaScript er *dynamisk typet*. Du skriver ikke typen når du lager en variabel, men verdiene har likevel en type. Du kan sjekke den med `typeof`.

```js
console.log(typeof 42);
console.log(typeof 3.14);
console.log(typeof "hello");
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof { name: "Ada" });
console.log(typeof [1, 2, 3]);
console.log(typeof null);
```

:bulb: Legg merke til:

- Det finnes bare én talltype, `number`, for både heltall og desimaltall.
- Arrays (lister) er egentlig objekter. Bruk `Array.isArray(value)` for å sjekke om noe er en array.
- `typeof null` gir `"object"`. Dette er en kjent feil i språket fra 1995 som aldri har blitt rettet, fordi det ville ødelagt eksisterende nettsider.
- `undefined` betyr «har ingen verdi ennå», for eksempel en variabel som ikke er satt. `null` brukes når vi med vilje sier «ingen verdi».

## 2.3 - Sammenligning og automatisk typekonvertering

JavaScript prøver å være hjelpsom og konverterer verdier mellom typer når du blander dem. Det er ikke alltid like hjelpsomt.

:pencil2: 🤔 Hva tror du hver linje skriver ut? Kjør koden og sjekk.

```js
console.log("5" + 3);
console.log("5" - 3);
console.log("5" * "2");
console.log(5 == "5");
console.log(5 === "5");
console.log(0 == "");
console.log(null == undefined);
console.log(null === undefined);
```

:bulb: `+` betyr både addisjon og å slå sammen tekst. Er én av verdiene en tekst, blir resultatet tekst. `-` og `*` fungerer bare på tall, så der blir tekst gjort om til tall.

:bulb: `==` konverterer verdiene før den sammenligner, mens `===` krever at både verdi og type er like.

:exclamation: Bruk alltid `===` og `!==`. Da slipper du overraskelser som at `0 == ""` er `true`.

## 2.4 - Truthy og falsy

I en `if` kan du bruke hvilken som helst verdi, ikke bare `true` og `false`. Verdien blir da tolket som enten *truthy* eller *falsy*.

Det finnes bare noen få falsy verdier: `false`, `0`, `""` (tom tekst), `null`, `undefined` og `NaN`. **Alt annet er truthy.**

:pencil2: Kjør koden og sammenlign resultatet med listen over falsy verdier.

```js
const values = [0, 1, "", "0", " ", null, [], {}, "false"];

for (const value of values) {
  // JSON.stringify shows strings with quotes, so we can tell 0 and "0" apart
  const shown = JSON.stringify(value);
  if (value) {
    console.log(shown, "is truthy");
  } else {
    console.log(shown, "is falsy");
  }
}
```

:bulb: Dette brukes mye i praksis, for eksempel `if (username) { ... }` for å sjekke at brukeren faktisk har skrevet noe.

## 2.5 - Template literals

Med backticks (`` ` ``) kan du sette verdier rett inn i tekst med `${...}`. Det er mye enklere å lese enn å slå sammen tekst med `+`.

```js
const firstName = "Ada";
const birthYear = 1815;

console.log("Hello, " + firstName + "! You were born in " + birthYear + ".");
console.log(`Hello, ${firstName}! You were born in ${birthYear}.`);
console.log(`In ten years it will be ${new Date().getFullYear() + 10}.`);
```

:pencil2: Skriv koden over og se at de to første linjene gir samme resultat. Legg merke til at du kan skrive hele uttrykk inne i `${...}`.

## 2.6 - Funksjoner

Det finnes flere måter å skrive funksjoner på. De to vanligste er *funksjonsdeklarasjon* og *arrow function*:

```js
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => {
  return a * b;
};

// If the body is a single expression, you can drop {} and return
const square = (x) => x * x;

console.log(add(2, 3));
console.log(multiply(2, 3));
console.log(square(4));
```

:pencil2: Skriv en funksjon `greet(name)` som returnerer teksten `"Hello, <name>!"`. Bruk template literal.

:pencil2: Skriv en funksjon `isEven(number)` som returnerer `true` hvis tallet er et partall, og ellers `false`.

:bulb: `%` gir resten ved divisjon. `7 % 2` er `1`, og `8 % 2` er `0`.

:pencil2: Gi parameteren en standardverdi, så `greet()` uten argument returnerer `Hello, you!`:

```js
function greet(name = "you") {
  // ...
}
```

:pencil2: Skriv en funksjon `grade(points)` som tar inn et tall mellom 0 og 100 og returnerer en bokstavkarakter:

| Poeng | Karakter |
|-------|----------|
| 90 - 100 | A |
| 80 - 89 | B |
| 60 - 79 | C |
| 40 - 59 | D |
| 0 - 39 | F |

Test den med `console.log(grade(95), grade(72), grade(12));`

## 🌶️ Ekstra

- **Desimaltall:** `0.1 + 0.2 === 0.3` gir `false`, fordi desimaltall ikke lagres helt nøyaktig. Skriv en funksjon `almostEqual(a, b)` som returnerer `true` hvis forskjellen mellom tallene er mindre enn `Number.EPSILON`. Test med `almostEqual(0.1 + 0.2, 0.3)`.
- **NaN:** Skriv en funksjon `toNumber(text)` som gjør om en tekst til et tall med `Number(text)`, og returnerer `null` hvis det ikke gikk. Bruk `Number.isNaN` til å sjekke, siden `NaN === NaN` er `false`. Test med `toNumber("42")` og `toNumber("abc")`.
- **Closures:** En funksjon husker variablene fra stedet der den ble laget. Skriv en funksjon `createCounter()` som returnerer en ny funksjon. Hver gang du kaller den nye funksjonen, skal den returnere et tall som er én høyere enn forrige gang:

  ```js
  const counter = createCounter();
  console.log(counter()); // 1
  console.log(counter()); // 2
  console.log(counter()); // 3

  const anotherCounter = createCounter();
  console.log(anotherCounter()); // 1
  ```
- **Scope:** 🤔 Hva skriver denne koden ut, og hvorfor?

  ```js
  const x = "global";

  function test() {
    const x = "local";
    if (true) {
      const x = "block";
      console.log(x);
    }
    console.log(x);
  }

  test();
  console.log(x);
  ```

---

[:arrow_right: Gå til neste oppgave](../oppgave-3/README.md)
