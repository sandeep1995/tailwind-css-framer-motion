import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Search from "../components/Search";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";

import { getUsersURL } from "../utils";

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
