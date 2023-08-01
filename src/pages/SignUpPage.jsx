import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../assets/css/signup-login.css";

export default function SignUpPage({
  setUserToken,
  visibleSignModal,
  setVisibleSignModal,
  closeModalSign,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const [picture, setPicture] = useState({});
  const [previewPicture, setPreviewPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleName = (event) => {
    setErrorMessage(() => "");
    setName(() => event.target.value);
  };

  const handleMail = (event) => {
    setErrorMessage(() => "");
    setEmail(() => event.target.value);
  };

  const handlePassword = (event) => {
    setErrorMessage(() => "");
    setPassword(() => event.target.value);
  };

  const handleFile = (event) => {
    setPicture(event[0]);

    setPreviewPicture(URL.createObjectURL(event[0]));
  };

  const handleNewsletter = (event) => {
    setErrorMessage(() => "");
    setNewsLetter(() => event.target.checked);
  };

  // This function send the information to the server for create an account
  const setDataForm = async (data) => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--fwddjdqr85yq.code.run/user/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Cookies.set("token", response.data.token, { expires: 1 });
      setUserToken(() => response.data.token);
      if (visibleSignModal) setVisibleSignModal(() => false);
      setName(() => "");
      setEmail(() => "");
      setPassword(() => "");
      setNewsLetter(() => "");
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage("L'adresse mail est déjà utilisée.");
    }
  };

  // This function send a mail to the administrator
  const setMailAdmin = async (data) => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--fwddjdqr85yq.code.run/admin/form",
        data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email && password) {
      const formData = new FormData();
      console.log(name, picture, email, newsletter, password);
      formData.append("picture", picture);
      formData.append("username", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("newsletter", newsletter);

      setDataForm(formData);
      setMailAdmin({ username: name, email: email, newsletter: newsletter });
    }
  };

  return (
    <main className={visibleSignModal ? "form-bloc" : "form-bloc wrapper"}>
      <h2>S'inscrire</h2>
      <form
        // action="https://site--backend-vinted--fwddjdqr85yq.code.run/user/signup"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nom d'utilisateur"
            onChange={handleName}
            value={name}
            required={true}
          />
        </label>

        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleMail}
            value={email}
            required={true}
          />
        </label>

        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            minLength="6"
            onChange={handlePassword}
            value={password}
            required={true}
          />
        </label>

        <Dropzone onDrop={handleFile}>
          {({ getRootProps, getInputProps }) => (
            <section className="section-drop">
              {previewPicture && (
                <button
                  type="button"
                  className="remove-picture"
                  onClick={() => {
                    setPreviewPicture(null);
                    setPicture({});
                  }}
                >
                  Delete
                </button>
              )}
              <div className="div-drop" {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="p-drop">
                  {previewPicture ? (
                    <>
                      <img src={previewPicture} alt="" />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon className="text-drop-size" icon="plus" />
                      <span>Ajouter une photo</span>
                    </>
                  )}
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <div className="form-bloc-down">
          <div className="newsletter-item">
            <label htmlFor="newsletter">
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                onChange={handleNewsletter}
              />
              S'inscrire à la newsletter
            </label>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button>S'inscrire</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Link to="/user/login" onClick={visibleSignModal && closeModalSign}>
            <span className="question-user">
              Tu as déjà un compte ? Connecte-toi !
            </span>
          </Link>
        </div>
      </form>
    </main>
  );
}
