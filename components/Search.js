import { useState } from "react";
import { languages } from "../utils";

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
export default Search;
