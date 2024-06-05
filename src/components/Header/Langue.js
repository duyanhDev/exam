import { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation, Trans } from "react-i18next";
const Langue = (props) => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "vi" ? "Việt Nam" : "English"}
        id="basic-nav-dropdown2"
        className="languages"
      >
        <NavDropdown.Item
          style={{ color: "red" }}
          onClick={() => handleChangeLanguage("en")}
        >
          English
        </NavDropdown.Item>
        <NavDropdown.Item
          style={{ color: "red" }}
          onClick={() => handleChangeLanguage("vi")}
        >
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Langue;
