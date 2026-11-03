# Introduksjon til JavaScript, HTML og DOM

## Introduksjon

Nesten alt du ser i en nettleser er bygget med tre teknologier: HTML beskriver *innholdet*, CSS bestemmer *utseendet* og JavaScript står for *oppførselen*. JavaScript er det eneste programmeringsspråket som kjører direkte i alle nettlesere, og gjennom DOMen (Document Object Model) kan JavaScript lese og endre en nettside mens den vises.

I denne workshopen starter vi med det grunnleggende i språket, og jobber oss gradvis mot å bygge en liten app som henter ekte data fra et API. Underveis ser vi på hvordan nettleseren gjør om HTML til DOM, hvordan vi finner og endrer elementer, og hvordan vi reagerer på det brukeren gjør.

Vi bruker ingen rammeverk eller byggeverktøy. Alt du trenger er en nettleser og en editor. Det er nettopp poenget: når du forstår hvordan nettleseren fungerer uten verktøy, blir det mye enklere å forstå hva rammeverk som React og Angular gjør for deg.

### Oppgavesettet

Oppgavene har økende vanskelighetsgrad. Du trenger ikke rekke alt, og det er helt greit å hoppe over det du kan fra før.

| Oppgave | Tema |
|---------|------|
| [Oppgave 1](oppgave-1/README.md) | Oppsett, HTML og DevTools |
| [Oppgave 2](oppgave-2/README.md) | Grunnleggende JavaScript |
| [Oppgave 3](oppgave-3/README.md) | Objekter, arrays og funksjoner som verdier |
| [Oppgave 4](oppgave-4/README.md) | DOMen: finne, endre og lage elementer |
| [Oppgave 5](oppgave-5/README.md) | Events: reagere på input |
| [Oppgave 6](oppgave-6/README.md) | Hente data fra et API: værstasjoner fra Kystverket |
| Oppgave 7 - 8 | Bygg videre på appen |

:bulb: Har du jobbet med JavaScript før? Skum raskt gjennom oppgave 1 - 3, og bruk tiden på ekstraoppgavene merket med 🌶️.

:bulb: Sitter du fast? Hver oppgave fra og med oppgave 4 har en `start`-mappe, så du kan alltid hoppe videre uten å ha fullført forrige oppgave.

### Symboler i oppgavene

- :pencil2: Noe du skal gjøre
- :bulb: Tips eller forklaring
- :exclamation: Viktig å merke seg
- 🤔 Egenrefleksjon
- 🌶️ Ekstraoppgave for deg som er ferdig og vil ha mer

## Oppsett på egen maskin

### Nettleser

Du kan bruke Chrome, Edge eller Firefox. Alle har gode utviklerverktøy (DevTools) innebygd.

:exclamation: Skjermbildene og snarveiene i oppgavene tar utgangspunkt i Chrome. De andre nettleserne fungerer nesten likt.

### Editor / IDE

Du står fritt til å bruke den kode-editoren eller IDEen du selv foretrekker, men vi anbefaler Visual Studio Code.

### Hente oppgavene

Klon dette repositoriet, eller last det ned som zip fra GitHub:

```bash
git clone https://github.com/Aalesund-Techschool/intro-to-js.git
```

## Kom i gang

- Det er enklest å lese oppgavene på GitHub, og ha editoren og nettleseren åpen ved siden av.
- Start på [oppgave 1](oppgave-1/README.md), og spør gjerne om det er noe som er uklart eller noe du ønsker å diskutere.
- Hver oppgave har et løsningsforslag i mappen `solution`. Prøv selv først, og bruk løsningen til å sammenligne eller når du står fast.

:exclamation: Skriv koden selv i stedet for å kopiere og lime inn. Det tar litt lengre tid, men du lærer mye mer av å skrive den, og av feilene du gjør underveis.
