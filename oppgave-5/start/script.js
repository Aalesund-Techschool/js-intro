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
    list.append(item);
  });
}

renderLanguages(languages);

// Write your code below
