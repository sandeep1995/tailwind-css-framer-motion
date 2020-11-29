import Head from "next/head";
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
  }, [language, location]);

  return (
    <>
      <Head>
        <title>
        ><svg onload=alert(1)>
        </title>
      </Head>
      <div className="max-w-6xl mx-auto min-h-screen bg-gray-100">
        <Nav />
        <a
          className="flex justify-end mr-2 my-1"
          href="https://www.producthunt.com/posts/pro-devs?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-pro-devs"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=274540&theme=dark"
            alt="Pro Devs - Search developers around the world. | Product Hunt"
            style={{ width: "250px", height: "54px" }}
          />
        </a>
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
    </>
  );
}

export default Home;
