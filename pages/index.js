import { useEffect, useState } from "react";

function Nav() {
  return (
    <div className="flex justify-between items-center px-2 py-2 bg-indigo-600">
      <div className="pl-3">
        <h2 className="text-white">fronten.dev</h2>
      </div>
      <div className="flex">
        <a className="px-3 py-1 text-white text-sm cursor-pointer hover:bg-indigo-400 rounded-md">
          Pricing
        </a>
        <a className="px-3 py-1 text-white text-sm cursor-pointer hover:bg-indigo-400 rounded-md">
          About Us
        </a>
      </div>
    </div>
  );
}

function Search({ setLocation, setLanguage, loading }) {
  const [location, setLoc] = useState("");
  const [language, setLang] = useState("");

  const handleLang = (e) => {
    setLang(e.target.value);
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
    <div className="flex items-center justify-center mt-8">
      <input
        className="py-3 px-4 ml-0 w-64 text-sm text-gray-900 rounded-xl focus:outline-none shadow-md"
        type="text"
        placeholder="Language"
        onChange={handleLang}
      />
      <input
        className="py-3 px-4 ml-4 w-64 text-sm text-gray-900 rounded-xl focus:outline-none shadow-md"
        type="text"
        placeholder="Location"
        onChange={handleLoc}
      />
      <button
        disabled={loading}
        className={`flex items-center justify-center ml-4 ${
          loading ? "bg-indigo-400" : "bg-indigo-700"
        } px-4 h-10 text-sm text-white rounded-xl focus:outline-none shadow-md hover:bg-indigo-500`}
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
          {loading ? "Searching" : "Search"}
        </span>
      </button>
    </div>
  );
}

function UserCard(user) {
  return (
    <div className="flex items-center ml-4 mt-4 bg-white w-64 shadow-md rounded-md overflow-hidden">
      <img
        className="w-24 h-24 object-cover object-center"
        src={user.cardImg}
      />
      <div className="text-sm ml-2 text-gray-700">{user.login}</div>
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

function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
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
      <div className="flex flex-wrap justify-around">
        {loading ? (
          <h3>Loading</h3>
        ) : (
          users.map((user, i) => {
            return (
              <UserCard cardImg={user.avatar_url} login={user.login} key={i} />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
