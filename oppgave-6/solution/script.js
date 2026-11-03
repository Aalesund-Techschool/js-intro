// Every endpoint in the API starts with this address
const API_URL = "https://api.coastal-weather.kystverket.cloud/v1";

const stationStatus = document.querySelector("#station-status");
const stationList = document.querySelector("#station-list");
const measurementHeading = document.querySelector("#measurement-heading");
const measurementStatus = document.querySelector("#measurement-status");
const measurementList = document.querySelector("#measurement-list");

// 6.5 - The stations are kept here, so we can look them up by id when one is clicked
let stations = [];

// 6.4 - fetch only fails on network errors, so we check the status code ourselves
async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

// 6.3 - Show the stations
function renderStations(stationsToShow) {
  stationList.replaceChildren();

  stationsToShow.forEach((station) => {
    const item = document.createElement("li");
    // Two stations are called "Gullholmen", so the id is the only safe way to find the right one
    item.dataset.id = station.id;

    const name = document.createElement("strong");
    name.textContent = station.name;

    const owner = document.createElement("span");
    owner.className = `owner ${station.owner}`;
    owner.textContent = station.owner;

    const position = document.createElement("a");
    position.className = "position";
    position.href = `https://www.openstreetmap.org/?mlat=${station.latitude}&mlon=${station.longitude}#map=10/${station.latitude}/${station.longitude}`;
    position.target = "_blank";
    position.textContent = `${station.latitude.toFixed(2)}, ${station.longitude.toFixed(2)}`;

    const types = document.createElement("span");
    types.className = "types";
    types.textContent = station.measurementTypes.join(", ");

    item.append(name, owner, position, types);
    stationList.append(item);
  });

  stationStatus.textContent = `Showing ${stationsToShow.length} stations`;
}

// 6.2 and 6.4 - Fetch the stations, and show a message while we wait or if something fails
async function loadStations() {
  stationStatus.textContent = "Loading stations...";
  stationStatus.classList.remove("error");

  try {
    stations = await getJson(`${API_URL}/stations`);
    renderStations(stations);
  } catch (error) {
    console.error(error);
    stationStatus.textContent = "Could not load the stations. Try again later.";
    stationStatus.classList.add("error");
  }
}

loadStations();

// 6.5 - Show the measurements for one station
const units = {
  celsius: "°C",
  degrees: "°",
  "meters-per-second": "m/s",
  meter: "m",
  knots: "knots",
};

function renderMeasurements(measurements) {
  measurementList.replaceChildren();

  if (measurements.length === 0) {
    measurementStatus.textContent = "This station has no measurements right now.";
    return;
  }

  measurementStatus.textContent = "";

  measurements.forEach((measurement) => {
    const item = document.createElement("li");

    const type = document.createElement("strong");
    type.textContent = measurement.type;

    // Fall back to the unit from the API if it is not in our lookup table
    const unit = units[measurement.unit] ?? measurement.unit;
    const value = document.createElement("span");
    value.className = "value";
    value.textContent = ` ${measurement.value} ${unit}`;

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = new Date(measurement.timestamp).toLocaleString("nb-NO");

    item.append(type, value, time);
    measurementList.append(item);
  });
}

async function loadMeasurements(station) {
  measurementHeading.textContent = station.name;
  measurementStatus.textContent = "Loading measurements...";
  measurementStatus.classList.remove("error");
  measurementList.replaceChildren();

  try {
    const data = await getJson(`${API_URL}/stations/${station.id}/measurements`);
    renderMeasurements(data.measurements);
  } catch (error) {
    console.error(error);
    measurementStatus.textContent = "Could not load the measurements. Try again later.";
    measurementStatus.classList.add("error");
  }
}

// Event delegation, like in 5.4: one listener handles clicks on every station
stationList.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) {
    return;
  }

  // dataset values are always strings, but the ids from the API are numbers
  const id = Number(item.dataset.id);
  const station = stations.find((station) => station.id === id);

  stationList.querySelector(".selected")?.classList.remove("selected");
  item.classList.add("selected");

  loadMeasurements(station);
});
