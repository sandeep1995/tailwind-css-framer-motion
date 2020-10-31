import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Search from "../components/Search";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";

import { getUsersURL, userDetailsURL } from "../utils";

import { languages } from "../utils";

function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState(languages[0]);
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    const endPoint = getUsersURL(location, language);
    setLoading(true);
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.items);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location, language]);

  const handleCardClick = (login) => {
    console.log("Fetching ", login);
    setUserLoading(true);
    fetch(`${userDetailsURL}/${login}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

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

      {false && (
        <div className="flex justify-center items-center bg-white">
          <div className="absolute mt-40  h-64 w-64 ">
            <img className="" src={user.avatar_url} />
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
          </div>
        </div>
      )}

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
                handleCardClick={handleCardClick}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
