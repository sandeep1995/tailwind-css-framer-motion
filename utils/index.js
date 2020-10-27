const languages = [
  "JavaScript",
  "PHP",
  "C#",
  "C",
  "C++",
  "Swift",
  "Rust",
  "Go",
];

const searchUsersURL = "https://api.github.com/search/users?q=";
const getUserDetailsURL = "https://api.github.com/users/";

function getUsersURL(location, language) {
  let url;
  if (location && !language) {
    url = `${searchUsersURL}location:${location}`;
  } else if (!location && language) {
    url = `${searchUsersURL}language:${language}`;
  } else {
    url = `${searchUsersURL}location:${location}+language:${language}`;
  }
  return url;
}

export { languages, searchUsersURL, getUserDetailsURL, getUsersURL };
