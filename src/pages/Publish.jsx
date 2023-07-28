import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/publish.css";

export default function Publish({ userToken }) {
  const [picture, setPicture] = useState([]);
  const [previewPicture, setPreviewPicture] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);

  const navigate = useNavigate();

  const handleFiles = (event) => {
    let filesList = [...picture];
    let previewList = [...previewPicture];
    console.log(previewPicture);
    for (let i = 0; i < event.length; i++) {
      filesList.push(event[i]);

      previewList.push(URL.createObjectURL(event[i]));
    }
    setPicture(filesList);
    setPreviewPicture(previewList);
    console.log(previewPicture);
  };

  const setData = async (formData) => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--fwddjdqr85yq.code.run/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log("la", picture);
    for (let i = 0; i < picture.length; i++) {
      formData.append("picture", picture[i]);
    }
    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("price", price);
    formData.append("exchange", exchange);

    setData(formData);
  };

  const deletePict = (event) => {
    let index = parseInt(event.target.id);
    let preview = [...previewPicture];
    let newtab = [];
    for (let i = 0; i < preview.length; i++) {
      if (i === index) {
        console.log("picture remove", preview[index]);
      } else {
        newtab.push(preview[i]);
      }
    }

    setPreviewPicture(newtab);
  };

  return (
    <main className="publish">
      <form action="" className="publish-form wrapper " onSubmit={handleSubmit}>
        <p>Vends ton article</p>
        <Dropzone onDrop={handleFiles}>
          {({ getRootProps, getInputProps }) => (
            <section className="section-drop">
              <div className="div-drop" {...getRootProps()}>
                <input {...getInputProps()} multiple />
                <>
                  <p className="p-drop">
                    <FontAwesomeIcon className="text-drop-size" icon="plus" />
                    <span>Ajoutez une/des image(s)</span>
                  </p>
                </>
              </div>
              <div className="pict-view-bloc-publish">
                {previewPicture &&
                  previewPicture.map((pict, index) => {
                    console.log("map", pict);
                    return (
                      <div className="pict-view-card" key={index + pict}>
                        <img className="pict-view" src={pict} alt="" />
                        <button
                          type="button"
                          className="delete-picture"
                          id={index}
                          onClick={deletePict}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
              </div>
              {previewPicture.length > 0 && (
                <button
                  type="button"
                  className="remove-picture"
                  onClick={() => {
                    setPreviewPicture([]);
                    setPicture([]);
                  }}
                >
                  Delete all picture
                </button>
              )}
            </section>
          )}
        </Dropzone>
        <div>
          <div>
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="ex: Chemise Celio verte"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required={true}
            />
          </div>
          <div>
            <label htmlFor="description">Décris ton article</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="ex: porté quelquefois, taille correctement, ..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required={true}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="marque">Marque</label>
            <input
              type="text"
              name="marque"
              id="marque"
              placeholder="ex: Zara"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              required={true}
            />
          </div>
          <div>
            <label htmlFor="taille">Taille</label>
            <input
              type="text"
              name="taille"
              id="taille"
              placeholder="ex: L/ 40 / 12"
              value={size}
              onChange={(event) => setSize(event.target.value)}
              required={true}
            />
          </div>
          <div>
            <label htmlFor="couleur">Couleur</label>
            <input
              type="text"
              name="couleur"
              id="couleur"
              placeholder="ex: Fushia"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              required={true}
            />
          </div>
          <div>
            <label htmlFor="etat">Etat</label>
            <input
              type="text"
              name="etat"
              id="etat"
              placeholder="ex: Neuf avec etiquette"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              required={true}
            />
          </div>
          <div>
            {" "}
            <label htmlFor="lieu">Lieu</label>
            <input
              type="text"
              name="lieu"
              id="lieu"
              placeholder="ex: Paris"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required={true}
            />
          </div>
        </div>
        <div>
          <div className="price-field">
            <label htmlFor="price">Prix</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="ex: 0,00 €"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required={true}
            />
          </div>
          <div className="exchange-field">
            <label htmlFor="exchange">
              <input
                type="checkbox"
                name="exchange"
                id="exchange"
                checked={exchange}
                onChange={() => setExchange(!exchange)}
              />
              Je suis intéressé(e) par les échanges
            </label>
          </div>
        </div>

        <button className="sell-button">Ajouter</button>
      </form>
    </main>
  );
}
