import "./style.scss";

import githubIcon from "../../assets/Icons/github.svg";
import linkedinIcon from "../../assets/Icons/mail.svg";
import mailIcon from "../../assets/Icons/linkedin.svg";
import phoneIcon from "../../assets/Icons/phone.svg";

export function Footer() {
  return (
    <footer className="ContactFooter">
      <button>
        <a
          href="https://www.linkedin.com/in/eric-andrade-872a01210/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="" />
        </a>
      </button>
      <button>
        <a
          href="https://github.com/ericpandrade"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedinIcon} alt="" />
        </a>
      </button>
      <button>
        <a
          href="mailto:ericpandrade@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={mailIcon} alt="" />
        </a>
      </button>
      <button>
        <a
          href="https://api.whatsapp.com/send?phone=+5585989828188&text=Olá! Gostaria de entrar em contato."
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={phoneIcon} alt="" />
        </a>
      </button>
    </footer>
  );
}
