# Oppgave 6 - Hente data fra et API

## Mål med oppgave 6

Etter denne oppgaven skal du kunne:

- Lese dokumentasjonen til et REST API, og prøve endepunktene i nettleseren
- Hente data med `fetch`, og vente på svaret med `async` og `await`
- Følge med på forespørslene i `Network`-fanen i DevTools
- Vise en melding mens data lastes, og håndtere feil med `try`/`catch`
- Hente nye data når brukeren klikker på noe

## 6.0 - Oppsett

Nå bygger vi en app som viser værdata fra Kystverket sine værstasjoner langs kysten.

:pencil2: Lag en ny mappe `oppgave-6` i mappen din fra oppgave 1 (for eksempel `js-workshop/oppgave-6`). Kopier `index.html`, `style.css` og `script.js` fra `oppgave-6/start` i dette repoet inn i den nye mappen. Har du ikke klonet repoet, kan du åpne filene på GitHub og kopiere innholdet.

:pencil2: Åpne `index.html` fra din egen mappe i nettleseren, og `script.js` i editoren. Det er her du skal skrive koden din.

Siden har to deler: en tom liste med stasjoner til venstre, og en tom liste med målinger til høyre. I `script.js` finner du konstanten `API_URL`, som er starten på adressen til alle endepunktene i API-et.

## 6.1 - Utforsk API-et

Et API (Application Programming Interface) er en måte for programmer å snakke med hverandre på. Kystvær-API-et svarer med data i formatet **JSON** når vi spør på en bestemt adresse, et *endepunkt*.

:pencil2: Åpne dokumentasjonen til API-et: [api.coastal-weather.kystverket.cloud/swagger](https://api.coastal-weather.kystverket.cloud/swagger/index.html). Finn endepunktet `GET /v1/stations`, trykk `Try it out` og deretter `Execute`.

:pencil2: Åpne [api.coastal-weather.kystverket.cloud/v1/stations](https://api.coastal-weather.kystverket.cloud/v1/stations) direkte i en ny fane. Nettleseren viser JSON-dataene, og i Chrome kan du krysse av for `Pretty-print` for å gjøre dem lettere å lese.

:pencil2: Se på den første stasjonen i listen. Hvilke felter har den? Hvor finner du posisjonen, og hvor står det hvilke målinger stasjonen har?

```json
{
  "id": 12475059,
  "name": "Anda fyr",
  "description": "813500 - Datasource: Kystverket",
  "owner": "kystverket",
  "latitude": 69.066442,
  "longitude": 15.17019,
  "measurementTypes": ["wind-speed", "wind-direction", "gust-speed", "gust-direction", "air-temperature"]
}
```

:pencil2: Bytt ut `stations` i adressen med `stations/12475059/measurements`. Nå får du de nyeste målingene fra Anda fyr.

:bulb: JSON ligner veldig på objekter og arrays i JavaScript, men nøklene må ha anførselstegn, og du kan ikke ha funksjoner i JSON. Det er derfor JSON er så enkelt å bruke fra JavaScript.

## 6.2 - Hente data med `fetch`

Med `fetch` kan JavaScript gjøre den samme forespørselen som du nettopp gjorde i adressefeltet.

:pencil2: Skriv dette i `script.js`:

```js
async function loadStations() {
  const response = await fetch(`${API_URL}/stations`);
  const stations = await response.json();
  console.log(stations);
}

loadStations();
```

:pencil2: Last siden på nytt og utforsk listen i `Console`. Hvor mange stasjoner er det?

:pencil2: Åpne `Network`-fanen i DevTools og last siden på nytt. Finn forespørselen til `stations`, og se på `Headers`, `Preview` og `Response`.

:bulb: Det tar tid å hente data over nettet. `fetch` venter ikke på svaret, men returnerer med en gang et *Promise*, et løfte om at svaret kommer senere. `await` pauser funksjonen til løftet er innfridd, uten å stoppe resten av siden. `await` kan bare brukes inne i funksjoner som er merket med `async`.

:bulb: Svaret kommer i to steg. Først kommer `response`, som inneholder blant annet statuskoden. Deretter leser `response.json()` resten av svaret og gjør JSON-teksten om til JavaScript-objekter. Det tar også tid, så den må vi også vente på med `await`.

:pencil2: Legg til `console.log("Before")` rett før og `console.log("After")` rett etter kallet til `loadStations()`. I hvilken rekkefølge kommer meldingene i konsollen?

## 6.3 - Vise stasjonene

:pencil2: Skriv en funksjon `renderStations(stationsToShow)` som lager et `<li>` i `#station-list` for hver stasjon, akkurat som `renderLanguages` i oppgave 4. Kall den fra `loadStations` i stedet for `console.log`.

Hvert listeelement skal vise:

- Navnet på stasjonen i et `<strong>`-element
- Hvem som eier stasjonen (`owner`) i et `<span>` med klassen `owner`
- Posisjonen i et `<span>` med klassen `position`, for eksempel `69.07, 15.17`
- Hvilke målinger stasjonen har (`measurementTypes`) i et `<span>` med klassen `types`, for eksempel `wind-speed, wind-direction, gust-speed`

:bulb: `toFixed(2)` runder av et tall til to desimaler og gjør det om til tekst. `join(", ")` slår sammen en array til én tekst, med `", "` mellom hvert element.

:bulb: Bruk `createElement`, `textContent` og `append`, ikke `innerHTML`. Dataene kommer fra et API, og som vi så i oppgave 4.4, skal vi ikke stole på at tekst utenfra er trygg.

:pencil2: Legg klassen `kystverket` på eier-elementet til stasjonene som eies av Kystverket, slik at de skiller seg ut. Tips: `` owner.className = `owner ${station.owner}`; ``

:pencil2: Skriv ut hvor mange stasjoner som vises i `#station-status`, for eksempel `Showing 160 stations`.

## 6.4 - Lasting og feil

På et tregt nett kan det ta litt tid før stasjonene dukker opp, og noen ganger går det galt. Da skal brukeren få vite hva som skjer.

:pencil2: Sett teksten i `#station-status` til `Loading stations...` øverst i `loadStations`.

:pencil2: Se hvordan det ser ut på et tregt nett. Velg `Slow 4G` eller `3G` i nedtrekkslisten `No throttling` øverst i `Network`-fanen, og last siden på nytt. Husk å skru det av igjen etterpå.

:pencil2: Velg `Offline` i den samme listen og last siden på nytt. Hva skjer i konsollen?

Når `fetch` ikke får kontakt med serveren, *kaster* den en feil. Feil fra `await` fanger du med `try`/`catch`:

```js
async function loadStations() {
  stationStatus.textContent = "Loading stations...";

  try {
    const response = await fetch(`${API_URL}/stations`);
    const stations = await response.json();
    renderStations(stations);
  } catch (error) {
    console.error(error);
    stationStatus.textContent = "Could not load the stations. Try again later.";
  }
}
```

:pencil2: Skriv om `loadStations` slik at den viser en feilmelding i `#station-status` når noe går galt. Legg på klassen `error` for å gjøre meldingen rød. Test med `Offline`.

:pencil2: Skru av `Offline`, og bytt `stations` med `stationz` i adressen. Se på forespørselen i `Network`-fanen. Hvilken statuskode får du?

:exclamation: `fetch` kaster bare en feil når den ikke får svar i det hele tatt. Svarer serveren med en feilkode, som `404 Not Found` eller `500 Internal Server Error`, går alt «bra» fra `fetch` sitt perspektiv. Du må selv sjekke `response.ok`, som er `true` når statuskoden er mellom 200 og 299.

:pencil2: Lag en hjelpefunksjon `getJson(url)` som henter data og kaster en feil hvis `response.ok` er `false`. Bruk den i `loadStations`:

```js
async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}
```

:pencil2: Test igjen med `stationz`. Nå skal feilmeldingen vises på siden. Rett opp adressen når du er ferdig.

## 6.5 - Hente målinger for en stasjon

Nå skal vi vise de nyeste målingene når brukeren klikker på en stasjon. Endepunktet er `GET /v1/stations/{stationId}/measurements`, der `{stationId}` byttes ut med id-en til stasjonen.

:pencil2: Flytt `stations` ut av `loadStations`, slik at resten av koden også kan bruke listen:

```js
let stations = [];

async function loadStations() {
  // ...
  stations = await getJson(`${API_URL}/stations`);
  // ...
}
```

:pencil2: Lagre id-en på hvert `<li>` i `renderStations` med `item.dataset.id = station.id;`.

:bulb: I oppgave 5 brukte vi navnet til å finne igjen et språk. Her går ikke det: to av stasjonene heter `Gullholmen`. Id-en er unik, og er derfor den trygge måten å finne riktig stasjon på.

:pencil2: Legg én klikk-lytter på `#station-list`, slik du gjorde med event delegation i 5.4. Finn stasjonen som ble klikket med `find`:

```js
stationList.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) {
    return;
  }

  const id = Number(item.dataset.id);
  const station = stations.find((station) => station.id === id);
  console.log(station);
});
```

:bulb: Verdier i `dataset` er alltid tekst, mens id-ene fra API-et er tall. Derfor bruker vi `Number`, ellers blir `===` aldri `true`.

:pencil2: Skriv en funksjon `loadMeasurements(station)` som:

1. Setter overskriften `#measurement-heading` til navnet på stasjonen
2. Viser `Loading measurements...` i `#measurement-status`
3. Henter målingene med `getJson`
4. Lager et `<li>` i `#measurement-list` for hver måling i `measurements`. Vis typen i et `<span>` med klassen `label`, og verdien og enheten i et `<span>` med klassen `value`

Kall `loadMeasurements(station)` fra klikk-lytteren.

:bulb: Svaret ser slik ut. Legg merke til at målingene ligger i `measurements`, inne i objektet:

```json
{
  "stationId": 12475059,
  "owner": "kystverket",
  "measurements": [
    { "type": "air-temperature", "unit": "celsius", "timestamp": "2026-11-02T12:59:36Z", "value": 9.1 },
    { "type": "wind-speed", "unit": "meters-per-second", "timestamp": "2026-11-02T12:59:36Z", "value": 17.4 }
  ]
}
```

:pencil2: `meters-per-second` og `gust-direction` er ikke så pene å lese. Lag to objekter som oversetter enhetene og typene, og bruk dem når du viser målingene:

```js
const units = {
  celsius: "°C",
  degrees: "°",
  "meters-per-second": "m/s",
  meter: "m",
  knots: "knots",
};

const measurementNames = {
  "air-temperature": "Air temperature",
  "wind-speed": "Wind speed",
  "wind-direction": "Wind direction",
  "gust-speed": "Gust speed",
  "gust-direction": "Gust direction",
  "wave-height": "Wave height",
};

const unit = units[measurement.unit] ?? measurement.unit;
const name = measurementNames[measurement.type] ?? measurement.type;
```

:bulb: `??` gir verdien til høyre hvis verdien til venstre er `null` eller `undefined`. Finnes ikke enheten eller typen i oppslagsobjektet, viser vi den slik den kom fra API-et.

:pencil2: Noen stasjoner har ingen målinger akkurat nå, og da er `measurements` en tom array. Vis `This station has no measurements right now.` i stedet for en tom liste. Prøv for eksempel stasjonen `Vestfjorden`.

:pencil2: Vis når målingene ble gjort i `#measurement-status`, for eksempel `Updated 03.11.2026, 09:23`. Målingene fra en stasjon er som regel gjort samtidig, så det holder å bruke `timestamp` fra den første målingen. `timestamp` er en tekst i formatet ISO 8601, og tiden er i UTC. Gjør den om til norsk tid slik:

```js
const updated = new Date(measurements[0].timestamp);
updated.toLocaleString("nb-NO", { dateStyle: "short", timeStyle: "short" });
```

:pencil2: Marker stasjonen som er valgt med klassen `selected`. Husk å fjerne klassen fra stasjonen som var valgt før:

```js
stationList.querySelector(".selected")?.classList.remove("selected");
item.classList.add("selected");
```

:bulb: `?.` (optional chaining) stopper uten feil hvis verdien til venstre er `null`. Første gang du klikker, er ingen stasjon valgt ennå, og da finner `querySelector` ingenting.

:pencil2: Klikk på en stasjon med `Network`-fanen åpen. Ser du den nye forespørselen?

## 🌶️ Ekstra

- Legg til et søkefelt som filtrerer stasjonene på navn, slik som i oppgave 5.2.
- Legg til en nedtrekksliste (`<select>`) der brukeren kan velge å vise alle stasjoner, bare Kystverket sine eller bare eksterne.
- Legg til en avkrysningsboks som bare viser stasjoner som måler bølgehøyde (`wave-height`). Tips: `includes`.
- Bruk `measurementNames` til å vise pene navn på målingene i stasjonslisten også. Tips: `map` før `join`.
- Vis vindretningen som en pil. Lag et element med teksten `↑`, og roter det med `` arrow.style.rotate = `${measurement.value + 180}deg`; ``. Vindretning er retningen vinden kommer *fra*, så pilen må snus 180 grader for å vise hvor vinden blåser.
- Legg til en `Refresh`-knapp som henter målingene på nytt for stasjonen som er valgt. Kan du få målingene til å oppdatere seg selv hvert minutt med `setInterval`?
- Klikk raskt på flere stasjoner etter hverandre med `Slow 4G` på. Kan det hende at målingene fra feil stasjon blir vist? Bruk en `AbortController` til å avbryte den forrige forespørselen når brukeren klikker på en ny stasjon.
- Vis stasjonene på et ordentlig kart med biblioteket [Leaflet](https://leafletjs.com/). Lag en markør for hver stasjon med `L.marker([latitude, longitude])`, og hent målingene når brukeren klikker på markøren.
- Sorter stasjonene etter hvor nær de er deg. Hent posisjonen din med `navigator.geolocation.getCurrentPosition`, og regn ut avstanden til hver stasjon.

---

Oppgave 7 kommer snart.
