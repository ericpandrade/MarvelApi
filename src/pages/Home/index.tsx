/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable array-callback-return */
import styles from "./style.module.scss";

import logoMarvel from "../../assets/LogoMarvel.png";
import loadingScreen from "../../assets/LoadingScreen.gif";

import { Button } from "../../components/Button";
import { useEffect, useState } from "react";

import md5 from "md5";
import { useAuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";

import { signOut, getAuth } from "firebase/auth";

import logoutButton from "../../assets/Icons/logout.svg";
import { Footer } from "../../components/Footer";

type ThumbnailTypes = {
  path: string;
  extension: string;
};

type CharactersType = {
  name: string;
  description: string;
  id: number;

  thumbnail: ThumbnailTypes;
};

export function Home() {
  const { routeState, setRouteState } = useAuthContext();

  const [characters, setCharacters] = useState<CharactersType[]>([]);
  const [totalPersonagens, setTotalPersonagens] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user, username } = useAuthContext();

  const time = Number(new Date());
  const publicKey = "45b5a372d9773e34fb55e54a1620bf20";
  const privateKey = "e4ed3d43b182142dbb4a5df9cc08f2c5f74024f7";

  const hash = md5(time + privateKey + publicKey);

  useEffect(() => {
    try {
      fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${time}&apikey=${publicKey}&hash=${hash}&limit=${totalPersonagens}`
      )
        .then((response) => response.json())
        .then((getDataApi) => getDataApi.data)
        .then((data) => setCharacters(data.results));
      setTimeout(() => {
        setLoading(true);
      }, 1500);
    } catch (err) {
      console.log(err);
    }

    !routeState && navigate("/");
  }, [totalPersonagens, routeState]);

  function carregarMais() {
    setTotalPersonagens(totalPersonagens + 10);
  }

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => window.alert("Deslogado com sucesso!"))
      .catch((err) => err);

    setRouteState(!routeState);
    location.reload();
  }

  return (
    <>
      <Footer />
      {!loading ? (
        <div className={styles.loadingScreen}>
          <img src={loadingScreen} alt="Marvel Gif" />
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className={styles.HomeContainer}>
          <header className={styles.HeaderContainer}>
            <div className={styles.Profile}>
              {user.avatar ? (
                <img
                  className={styles.ProfileImage}
                  src={user.avatar}
                  alt="Image Profile"
                />
              ) : (
                <img
                  className={styles.ProfileImage}
                  src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2021/01/14/captain-america-the-first-avenger-6.jpg"
                  alt=""
                />
              )}
              <span>{user.name ? user.name : username}</span>
            </div>
            <button className={styles.logoutButton} onClick={logout}>
              <img src={logoutButton} alt="" />
            </button>

            <img
              src={logoMarvel}
              alt="Marvel Logo"
              className={styles.logoMarvel}
            />

            <div className={styles.SearchContainer}>
              <input
                type="text"
                placeholder="Search for a Character..."
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </header>
          <div className={styles.CardsContainer}>
            {characters
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((characters) => (
                <div key={characters.id} className={styles.CardContainer}>
                  <img
                    src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`}
                    alt="Heroes Image"
                  />
                  <button className={styles.DescriptionCharacters}>
                    <span>
                      {characters.description
                        ? characters.description
                        : "This character doesn't have a description"}
                    </span>
                  </button>

                  <div className={styles.CardName}>
                    <span>{characters.name}</span>
                  </div>
                </div>
              ))}
          </div>
          <Button onClick={carregarMais} className={styles.loadMore}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
