// 3.1 - Objects
const language = {
  name: "JavaScript",
  year: 1995,
  creator: "Brendan Eich",
};

console.log(language.name);
console.log(language["year"]);

// Allowed even though language is const: we change the object, not what the variable points to
language.runsInBrowser = true;
console.log(language);

// 3.2 - Arrays
const numbers = [3, 7, 1];

numbers.push(10);
console.log(numbers); // [3, 7, 1, 10]
console.log(numbers.length); // 4
console.log(numbers[0]); // 3
console.log(numbers[numbers.length - 1]); // 10
console.log(numbers.includes(7)); // true

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

console.log(languages[2].name); // "Java"

// 3.3 - Functions are values
function doTwice(fn) {
  fn();
  fn();
}

doTwice(() => console.log("Hello!"));

function repeat(n, fn) {
  for (let i = 1; i <= n; i++) {
    fn(i);
  }
}

repeat(3, (i) => console.log(`This is time number ${i}`));

// 3.4 - Working with lists
languages.forEach((language) => {
  console.log(`${language.name} was released in ${language.year}`);
});

const names = languages.map((language) => language.name);
console.log(names);

const newLanguages = languages.filter((language) => language.year >= 2000);
console.log(newLanguages);

const rust = languages.find((language) => language.name === "Rust");
console.log(rust); // { name: "Rust", year: 2015 }
console.log(languages.find((language) => language.name === "Cobol")); // undefined

const withYear = languages.map((language) => `${language.name} (${language.year})`);
console.log(withYear);

const oldLanguages = languages
  .filter((language) => language.year < 2000)
  .map((language) => language.name);
console.log(oldLanguages); // ["C", "Python", "Java", "JavaScript"]

// 3.5 - Value and reference
let a = 1;
let b = a;
b = 2;
console.log(a, b); // 1 2

const list1 = [1, 2, 3];
const list2 = list1;
list2.push(4);
console.log(list1, list2); // [1, 2, 3, 4] [1, 2, 3, 4]

const list3 = [...list1];
list3.push(5);
console.log(list1, list3); // [1, 2, 3, 4] [1, 2, 3, 4, 5]

const original = { name: "Go", year: 2009 };
const copy = { ...original, year: 2012 };
console.log(original, copy);

// 🌶️ Extra

function myMap(list, fn) {
  const result = [];
  for (const element of list) {
    result.push(fn(element));
  }
  return result;
}

function myFilter(list, fn) {
  const result = [];
  for (const element of list) {
    if (fn(element)) {
      result.push(element);
    }
  }
  return result;
}

console.log(myMap(languages, (language) => language.name));
console.log(myFilter(languages, (language) => language.year > 2010));

const sumOfYears = languages.reduce((sum, language) => sum + language.year, 0);
console.log(sumOfYears / languages.length);

// sort changes the original list, toSorted returns a new sorted copy
const sorted = languages.toSorted((x, y) => x.name.localeCompare(y.name));
console.log(sorted.map((language) => language.name));
console.log(languages.map((language) => language.name)); // unchanged

const perDecade = {};
for (const language of languages) {
  const decade = Math.floor(language.year / 10) * 10;
  perDecade[decade] = (perDecade[decade] ?? 0) + 1;
}
console.log(perDecade); // { 1970: 1, 1990: 3, 2000: 1, 2010: 3 }

// Destructuring: pick values out of objects and arrays into separate variables
{
  const { name, year } = languages[0];
  console.log(name, year); // "C" 1972
  const [first, second, ...rest] = languages;
  console.log(first, second, rest); // the C object, the Python object, the remaining 6
  languages.forEach(({ name }) => console.log(name));
}
