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

// 4.2 - Finding elements
const heading = document.querySelector("h1");
heading.textContent = "My favourite programming languages";

const intro = document.querySelector(".intro");
intro.textContent = "Some languages worth knowing about.";

const facts = document.querySelectorAll(".fact");
console.log(facts.length);
facts.forEach((fact) => console.log(fact.textContent));

// 4.3 - Changing classes, style and attributes
facts[0].classList.add("highlighted");
facts[facts.length - 1].classList.add("hidden");

heading.style.color = "rebeccapurple";
heading.style.fontStyle = "italic";

const link = document.querySelector("#read-more");
link.textContent = "Read more on MDN";
link.setAttribute("target", "_blank");
console.log(link.href);

// 4.5 and 4.6 - Creating elements from data
const list = document.querySelector("#language-list");
const count = document.createElement("p");
list.after(count);

function renderLanguages(languagesToShow) {
  list.replaceChildren();

  languagesToShow.forEach((language) => {
    const item = document.createElement("li");

    // 🌶️ Structure with separate elements instead of innerHTML
    const name = document.createElement("strong");
    name.textContent = language.name;
    const year = document.createElement("span");
    year.textContent = ` (${language.year})`;
    item.append(name, year);

    // 🌶️ Mark newer languages
    if (language.year >= 2010) {
      item.classList.add("new");
    }

    list.append(item);
  });

  // 🌶️ Show how many languages are listed
  count.textContent = `Showing ${languagesToShow.length} languages`;
}

renderLanguages(languages);

// Try with a filtered list:
// renderLanguages(languages.filter((language) => language.year >= 2010));
