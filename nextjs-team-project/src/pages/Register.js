import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function SlotPropsSignUp() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Family_Name, setFamilyName] = useState("");
  const [Firma, setFirma] = useState("");
  const [Adresse, setAdresse] = useState("");

  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [ShowPassword, setShowPassword] = useState("password");
  const [message, setMessage] = useState("");
  const messageExist = useRef(null);
  const navigate = useNavigate();
  // ------------------------------------------------------

  useEffect(() => {
    if (message !== "") {
      messageExist.current.style.display = "block";
      messageExist.current.style.marginTop = "0";
    }
  }, [message]);

  // ------------------------------------------------------

  async function handleRegister(e) {
    e.preventDefault();

    if (
      typeof Name !== "string" ||
      !/^[a-zA-Z]+$/.test(Name) ||
      typeof Family_Name !== "string" ||
      !/^[a-zA-Z]+$/.test(Family_Name)
    ) {
      setMessage("Vorname und/oder Nachname darf nicht Leer sein");
      return;
    }

    if (Password !== ConfirmPassword) {
      setMessage("Passwörter stimmen nicht überein");
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?!-])[A-Za-z\d?!-]{8,}$/;

    if (Password.length < 8 || !passwordPattern.test(Password)) {
      setMessage(
        "Das Passwort muss mindestens 8 Zeichen, 1 Klein-, 1 Großbuchstaben, 1 Zahl und 1 Sonderzeichen (! oder ?) haben."
      );
      return;
    }

    try {
      let response = await axios.post("http://localhost:5000/register", {
        Name,
        Family_Name,
        Firma,
        Adresse,
        Password,
        Email,
      });

      console.log(response);
      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
      return;
    }
  }
  // ------------------------------------------------------

  return (
    <>
      <div id="Main_Container_Registry">
        <div id="Registry_Container">
          <form action="" id="Registry_Form" onSubmit={handleRegister}>
            <h1 id="Registry_Title">Registrierung</h1>
            <input
              type="text"
              name="name"
              className="input_registry"
              placeholder="Vorname"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="family_name"
              className="input_registry"
              placeholder="Nachname"
              value={Family_Name}
              onChange={(e) => setFamilyName(e.target.value)}
            />
            <input
              type="text"
              name="Adresse"
              className="input_registry"
              placeholder="Adresse"
              value={Adresse}
              onChange={(e) => setAdresse(e.target.value)}
            />
            <input
              type="text"
              name="Firma"
              className="input_registry"
              placeholder="Firma"
              value={Firma}
              onChange={(e) => setFirma(e.target.value)}
            />
            <input
              type="text"
              name="Email"
              className="input_registry"
              placeholder="E-mail"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="password_container">
              <input
                type={ShowPassword}
                name="password"
                className="input_registry"
                placeholder="Passwort"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div id="password_container">
              <input
                type={ShowPassword}
                name="confirm password"
                className="input_registry"
                placeholder="Passwort Bestätigen"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div id="Submit_Btn_DIV">
              <button id="Submit_Btn" ref={messageExist}>
                Absenden
              </button>
            </div>

            <div>
              <p id="error_message" >{message}</p>
            </div>
            <div>
              <div id="Navigate_To_LoginDIV">
                <Link to={"/login"} id="Sign_In">
                  Jetzt einloggen
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}