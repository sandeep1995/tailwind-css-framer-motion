import { useEffect, useState } from "react";

function Nav() {
  return (
    <div className="flex justify-between items-center px-2 py-2 bg-purple-600">
      <div className="pl-3">
        <h2 className="text-white">fronten.dev</h2>
      </div>
      <div className="flex">
        {/* <a className="px-3 py-1 text-white text-sm cursor-pointer hover:bg-purple-400 rounded-md">
          Pricing
        </a> */}
        <a className="px-3 py-1 text-white text-sm cursor-pointer hover:bg-purple-400 rounded-md">
          About Us
        </a>
      </div>
    </div>
  );
}

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

function Search({ setLocation, setLanguage, loading }) {
  const [location, setLoc] = useState("");
  const [language, setLang] = useState("");
  const [open, setOpen] = useState(false);

  const handleLang = (e) => {
    setLang(e.target.value);
    setOpen(false);
  };

  const handleLoc = (e) => {
    setLoc(e.target.value);
  };

  const handleSubmit = () => {
    if (!language && !location) return;
    setLanguage(language);
    setLocation(location);
  };

  return (
    <div className="flex flex-wrap items-center justify-center mt-8">
      <div>
        <input
          className="relative mt-2 py-3 px-4 ml-0 w-64 text-sm text-gray-900 rounded-xl focus:outline-none shadow-md"
          type="text"
          value={language}
          placeholder="Language"
          onChange={handleLang}
          onFocus={() => {
            setOpen(true);
          }}
        />
        {open ? (
          <div className="absolute w-64 mt-1 bg-white rounded-xl shadow-md">
            {languages.map((lang, i) => {
              return (
                <div
                  key={i}
                  className="px-4 py-2 text-gray-800 text-sm hover:bg-purple-600 hover:text-white rounded-md cursor-pointer mt-1"
                  onClick={() => {
                    setLang(lang);
                    setOpen(false);
                  }}
                >
                  {lang}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <input
        className="mt-2 py-3 px-4 ml-4 w-64 text-sm text-gray-900 rounded-xl focus:outline-none shadow-md"
        type="text"
        placeholder="Location"
        onChange={handleLoc}
      />
      <button
        disabled={loading}
        className={`mt-2 flex items-center justify-center ml-4 ${
          loading ? "bg-purple-700" : "bg-purple-600"
        } px-4 h-10 text-sm text-white rounded-xl focus:outline-none shadow-md hover:bg-purple-500`}
        type="button"
        onClick={handleSubmit}
      >
        <svg
          className="h-4"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="9.76663"
            cy="9.76657"
            r="8.98856"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.0183 16.4851L19.5423 20"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="ml-1 text-sm font-bold uppercase leading-snug">
          {loading ? "Please wait" : "Search"}
        </span>
      </button>
    </div>
  );
}

function UserCard(user, key) {
  return (
    <div className="flex items-center ml-4 mt-4 bg-white w-64 shadow-md hover:shadow-xl rounded-xl cursor-pointer overflow-hidden">
      <img
        className="w-24 h-24 object-cover object-center"
        src={user.cardImg}
      />
      <a
        href={user.html_url}
        className="text-sm ml-3 text-blue-600 hover:text-blue-800 truncate"
      >
        {user.login}
      </a>
    </div>
  );
}

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

function Loader() {
  return (
    <svg
      className="h-20 w-20"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor="#805AD5" stopOpacity="0" offset="0%" />
          <stop stopColor="#805AD5" stopOpacity=".631" offset="63.146%" />
          <stop stopColor="#805AD5" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.7s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#805AD5" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.7s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}

function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (!location && !language) return;
    const endPoint = getUsersURL(location, language);
    setLoading(true);
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.items);
        setLoading(false);
      });
  }, [location, language]);

  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-gray-100">
      <Nav />
      <div className="flex justify-center mt-6">
        <h1 className="text-2xl text-gray-800 leading-none">
          Search developers around the world
        </h1>
      </div>
      <Search
        setLanguage={setLanguage}
        setLocation={setLocation}
        loading={loading}
      />
      <div
        className={`flex flex-wrap ${
          loading ? "justify-center" : "justify-around"
        }`}
      >
        {loading ? (
          <div className="mt-24">
            <Loader />
          </div>
        ) : (
          users &&
          users.map((user, i) => {
            return (
              <UserCard
                cardImg={user.avatar_url}
                login={user.login}
                html_url={user.html_url}
                key={i}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
