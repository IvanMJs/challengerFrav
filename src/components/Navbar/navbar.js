import React from "react";
import { useTranslation } from "react-i18next";
import "./style.sass";

function Navbar() {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="Navbar">
      <div className="title-navbar">Pokemon API</div>
      <button onClick={() => i18n.changeLanguage("es")}>ES</button>
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
    </div>
  );
}

export default Navbar;
