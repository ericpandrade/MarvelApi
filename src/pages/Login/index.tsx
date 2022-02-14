/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./style.module.scss";

import imgHomePage from "../../assets/HomePageImg.png";
import iconLoginImg from "../../assets/LoginImage.jpg";
import iconGoogle from "../../assets/Icons/IconGoogle.svg";
import imgLogin from "../../assets/Icons/SetaParaDireita.png";

import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authcontext";
import { useEffect } from "react";

import { Footer } from "../../components/Footer";

export function LoginPage() {
  const {
    user,
    signInWithGoogle,
    setRouteState,
    routeState,
    setUsername,
    username,
  } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setRouteState(false);
  }, []);

  async function goToHomePage() {
    user && (await signInWithGoogle());

    setRouteState(!routeState);
    navigate("/home");
  }

  function handleUserNameByInput() {
    if (username.trim() === "") {
      window.alert("Please, enter a name!");
    } else {
      setRouteState(!routeState);
      navigate("/home");
    }
  }

  return (
    <div className={styles.HomePageContainer}>
      <div className={styles.LoginPageAside}>
        <img src={imgHomePage} alt="Heroes wallpaper" />
        <div>
          <h1>Marvel History</h1>
          <p>
            Meet the Marvel characters! <br /> Log in to the side and enjoy the
            experience.
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
          Sign in with Google
        </Button>

        <div className={styles.Divider}>or</div>
        <div className={styles.LoginWithName}>
          <input
            type="text"
            placeholder="Enter your name..."
            onChange={(event) => setUsername(event.target.value)}
            maxLength={30}
          />
          <Button
            onClick={handleUserNameByInput}
            className={styles.LoginButton}
          >
            <img src={imgLogin} alt="Right Arrow" />
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
