import styles from "./style.module.scss";

import logoMarvel from "../../assets/LogoMarvel.png";
import searchButton from "../../assets/Icons/SetaParaDireita.png";

import { Button } from "../../components/Button";
import { useEffect, useState } from "react";

type ThumbnailTypes = {
  path: string;
  extension: string;
};

type CharactersType = {
  name: string;
  description?: string;
  id: number;

  thumbnail: ThumbnailTypes;
};

export function Home() {
  const [characters, setCharacters] = useState<CharactersType[]>([]);
  const [totalPersonagens, setTotalPersonagens] = useState(10);

  useEffect(() => {
    try {
      fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=1642793139&apikey=45b5a372d9773e34fb55e54a1620bf20&hash=23b40c9aff111a342f634ec16831a614&limit=${totalPersonagens}`
      )
        .then((response) => response.json())
        .then((getDataApi) => getDataApi.data)
        .then((data) => setCharacters(data.results));
    } catch (err) {
      console.log(err);
    }
  }, [totalPersonagens]);

  function carregarMais() {
    setTotalPersonagens(totalPersonagens + 10);
  }

  return (
    <div className={styles.HomeContainer}>
      <header className={styles.HeaderContainer}>
        <div className={styles.Profile}>
          <img
            className={styles.ProfileImage}
            src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2021/01/14/captain-america-the-first-avenger-6.jpg"
            alt=""
          />
          <span>Eric Pereira Andrade</span>
        </div>

        <img
          src={logoMarvel}
          alt="Logo da Marvel"
          className={styles.logoMarvel}
        />

        <div className={styles.SearchContainer}>
          <input type="text" placeholder="Pesquise um personagem" />
          <Button className={styles.searchButton}>
            <img src={searchButton} alt="Seta para direita" />
          </Button>
        </div>
      </header>
      <div className={styles.CardsContainer}>
        {characters.map((characters) => (
          <div key={characters.id} className={styles.CardContainer}>
            <img
              src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`}
              alt=""
            />
            <div className={styles.CardName}>
              <span>{characters.name}</span>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={carregarMais} className={styles.loadMore}>
        Carregar mais
      </Button>
    </div>
  );
}
