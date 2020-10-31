import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { languages } from "../utils";

function Search({ setLocation, setLanguage, loading }) {
  const [location, setLoc] = useState("");
  const [lang, setLang] = useState(languages[0]);

  const handleLang = (value) => {
    setLang(value);
    setLanguage(value);
  };

  const handleLoc = (e) => {
    const val = e.target.value;
    setLoc(val);
    setLocation(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lang && !location) return;
    setLanguage(lang);
    setLocation(location);
  };

  return (
    <form
      className="flex flex-wrap items-center justify-center mt-8"
      onSubmit={handleSubmit}
    >
      <div className="w-64">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xs mx-auto">
            <Listbox
              as="div"
              className="space-y-1"
              value={lang}
              onChange={handleLang}
            >
              {({ open }) => (
                <>
                  <div className="relative">
                    <span className="inline-block w-full rounded-xl shadow-sm">
                      <Listbox.Button className="cursor-default relative w-full rounded-xl border border-gray-300 bg-white py-3 pl-4 text-left focus:outline-none focus:shadow-outline-purple focus:border-purple-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5 shadow-md">
                        <span className="block truncate">{lang}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Listbox.Button>
                    </span>

                    <Transition
                      show={open}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      className="absolute mt-1 w-full rounded-xl bg-white shadow-lg"
                    >
                      <Listbox.Options
                        static
                        className="max-h-64 rounded-xl py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                      >
                        {languages.map((lang) => (
                          <Listbox.Option key={lang} value={lang}>
                            {({ selected, active }) => (
                              <div
                                className={`${
                                  active
                                    ? "text-white bg-purple-600"
                                    : "text-gray-900"
                                } cursor-default select-none relative py-2 pl-4 pr-4`}
                              >
                                <span
                                  className={`${
                                    selected ? "font-semibold" : "font-normal"
                                  } block truncate`}
                                >
                                  {lang}
                                </span>
                                {selected && (
                                  <span
                                    className={`${
                                      active ? "text-white" : "text-purple-600"
                                    } absolute inset-y-0 right-0 flex items-center py-2 pl-4 pr-4`}
                                  >
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
      </div>
      <input
        className="py-3 px-4 ml-4 w-64 rounded-xl border border-gray-300 bg-white text-left focus:outline-none focus:shadow-outline-purple focus:border-purple-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5 shadow-md"
        type="text"
        placeholder="Location"
        onChange={handleLoc}
      />
      <button
        disabled={loading}
        className={`flex items-center justify-center ml-4 ${
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
    </form>
  );
}
export default Search;
