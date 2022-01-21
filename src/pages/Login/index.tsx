import styles from "./style.module.scss";

import imgHomePage from "../../assets/HomePageImg.png";
import iconLoginImg from "../../assets/LoginImage.jpg";
import iconGoogle from "../../assets/Icons/IconGoogle.svg";
import imgLogin from "../../assets/Icons/SetaParaDireita.png";

import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  function goToHomePage() {
    navigate("/home");
  }

  return (
    <div className={styles.HomePageContainer}>
      <div className={styles.LoginPageAside}>
        <img src={imgHomePage} alt="Papel de parede de Heróis" />
        <div>
          <h1>Marvel History</h1>
          <p>
            Conheça os personagens da Marvel! <br /> Faça login ao lado e
            aproveite a experiência.
          </p>
        </div>
      </div>
      <div className={styles.LoginPageContainer}>
        <img src={iconLoginImg} alt="Icones de Heróis" />

        <Button onClick={goToHomePage}>
          {" "}
          <img
            src={iconGoogle}
            alt="Icone do Google"
            className={styles.iconGoogle}
          />{" "}
          Faça login com o Google
        </Button>

        <div className={styles.Divider}>ou</div>
        <div className={styles.LoginWithName}>
          <input type="text" placeholder="Digite o seu nome" />
          <Button onClick={goToHomePage} className={styles.LoginButton}>
            <img src={imgLogin} alt="Seta para direita" />
          </Button>
        </div>
      </div>
    </div>
  );
}
