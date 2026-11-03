// let, because we will replace the list with a new one in 5.4
let languages = [
  { name: "C", year: 1972 },
  { name: "Python", year: 1991 },
  { name: "Java", year: 1995 },
  { name: "JavaScript", year: 1995 },
  { name: "Go", year: 2009 },
  { name: "Kotlin", year: 2011 },
  { name: "TypeScript", year: 2012 },
  { name: "Rust", year: 2015 },
];

const list = document.querySelector("#language-list");

function renderLanguages(languagesToShow) {
  list.replaceChildren();

  languagesToShow.forEach((language) => {
    const item = document.createElement("li");
    item.textContent = `${language.name} (${language.year})`;
    item.dataset.name = language.name;
    list.append(item);
  });
}

renderLanguages(languages);

// 5.1 - Your first event
const button = document.querySelector("#click-button");
const clickCount = document.querySelector("#click-count");
let clicks = 0;

button.addEventListener("click", (event) => {
  console.log(event.type, event.target, event.clientX, event.clientY);
  clicks = clicks + 1;
  clickCount.textContent = clicks;
});

// 5.2 and 5.3 - Search and form share the same update function,
// so the list is always drawn from the data and the current search
const search = document.querySelector("#search");

function update() {
  const query = search.value.toLowerCase();
  const filtered = languages.filter((language) =>
    language.name.toLowerCase().includes(query),
  );
  renderLanguages(filtered);
}

search.addEventListener("input", update);

// 5.3 - Form
const form = document.querySelector("#add-form");

form.addEventListener("submit", (event) => {
  // Without this the browser reloads the page and everything we did is lost
  event.preventDefault();

  const name = form.elements.name.value;
  const year = Number(form.elements.year.value);

  languages.push({ name, year });
  update();
  form.reset();
});

// 5.4 - Event delegation: one listener on the list handles clicks on every item
list.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) {
    return;
  }

  const name = item.dataset.name;
  languages = languages.filter((language) => language.name !== name);
  update();
});
