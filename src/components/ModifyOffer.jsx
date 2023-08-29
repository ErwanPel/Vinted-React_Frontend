import "../assets/css/modifyOffer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ModifyOffer({
  userToken,

  setVisibleModify,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("modifyItem")) {
      const cookiesFromOffer = Cookies.get("modifyItem");
      setTitle(JSON.parse(cookiesFromOffer).title);
      setDescription(JSON.parse(cookiesFromOffer).description);
      setPrice(JSON.parse(cookiesFromOffer).price);
      setCity(JSON.parse(cookiesFromOffer).city);
      setBrand(JSON.parse(cookiesFromOffer).brand);
      setColor(JSON.parse(cookiesFromOffer).color);
      setSize(JSON.parse(cookiesFromOffer).size);
      setCondition(JSON.parse(cookiesFromOffer).condition);
      setId(JSON.parse(cookiesFromOffer).id);
    }
  }, []);

  const handleChange = (setState, event) => {
    setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      title ||
      description ||
      price ||
      condition ||
      city ||
      brand ||
      size ||
      color
    ) {
      const fetchModifyData = async (data) => {
        try {
          const response = await axios.put(
            `https://site--backend-vinted--fwddjdqr85yq.code.run/offer/modify`,
            data,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          console.log(response.data);
          alert("l'offre a bien été modifié");
          setVisibleModify(false);
          navigate(0);
        } catch (error) {
          console.log(error);
        }
      };
      const data = { id: id };
      if (title) {
        data["title"] = title;
      }
      if (description) {
        data["description"] = description;
      }
      if (price) {
        data["price"] = price;
      }
      if (condition) {
        data["condition"] = condition;
      }
      if (city) {
        data["city"] = city;
      }
      if (brand) {
        data["brand"] = brand;
      }
      if (size) {
        data["size"] = size;
      }
      if (color) {
        data["color"] = color;
      }

      fetchModifyData(data);
    }
  };

  return (
    <form className="modify-form">
      <h2>Modifier mon offre</h2>
      <div>
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(event) => handleChange(setTitle, event)}
          value={title}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          onChange={(event) => handleChange(setDescription, event)}
          value={description}
        />
      </div>
      <div>
        <label htmlFor="price">Prix</label>
        <input
          type="number"
          name="price"
          id="price"
          onChange={(event) => handleChange(setPrice, event)}
          value={price}
        />
      </div>
      <div>
        <label htmlFor="condition">Etat</label>
        <input
          type="text"
          name="condition"
          id="condition"
          onChange={(event) => handleChange(setCondition, event)}
          value={condition}
        />
      </div>
      <div>
        <label htmlFor="city">Emplacement</label>
        <input
          type="text"
          name="city"
          id="city"
          onChange={(event) => handleChange(setCity, event)}
          value={city}
        />
      </div>
      <div>
        <label htmlFor="brand">Marque</label>
        <input
          type="text"
          name="brand"
          id="brand"
          onChange={(event) => handleChange(setBrand, event)}
          value={brand}
        />
      </div>
      <div>
        <label htmlFor="size">Taille</label>
        <input
          type="text"
          name="size"
          id="size"
          onChange={(event) => handleChange(setSize, event)}
          value={size}
        />
      </div>
      <div>
        <label htmlFor="color">Couleur</label>
        <input
          type="text"
          name="color"
          id="color"
          onChange={(event) => handleChange(setColor, event)}
          value={color}
        />
      </div>
      <button onClick={(event) => handleSubmit(event)}>
        Modifier mon offre
      </button>
    </form>
  );
}
