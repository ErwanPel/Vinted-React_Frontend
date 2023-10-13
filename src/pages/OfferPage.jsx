import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import { uid } from "react-uid";
import intl from "../assets/tools/intl";
import Cookies from "js-cookie";

import "react-multi-carousel/lib/styles.css";
import "../assets/css/offerPage.css";

export default function OfferPage({
  setOnPay,
  userToken,
  visibleModify,
  setVisibleModify,
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  // This function return the result of the offer by ID
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--backend-vinted--fwddjdqr85yq.code.run/offer/${id}`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      setData(response.data);
      console.log("ici", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (data) => {
    try {
      const response = await axios.delete(
        `https://site--backend-vinted--fwddjdqr85yq.code.run/offer/delete?id=${data}`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      alert("l'offre a bien été supprimé");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect Offer");
    fetchData();
    console.log("useEffect", visibleModify);
  }, []);

  const getModifyOffer = () => {
    const cookiesToModify = {
      title: data.product_name,
      description: data.product_description,
      price: data.product_price,
      id: data._id,
    };

    for (let i = 0; i < data.product_details.length; i++) {
      cookiesToModify[Object.keys(data.product_details[i])[0].toLowerCase()] =
        Object.values(data.product_details[i])[0];
    }

    Cookies.set("modifyItem", JSON.stringify(cookiesToModify));

    setVisibleModify(!visibleModify);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // if (data?.bought === true) {
  //   setTimeout(() => navigate("/"), 2000);
  // }

  return (
    <>
      {isLoading ? (
        <p>Downloading...</p>
      ) : (
        <main className="wrapper offer-single">
          <div className="bloc-img-offer">
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={2000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
            >
              {data.product_image.map((picture, index) => {
                return (
                  <div key={uid(picture)} className="bloc-img-offer">
                    <img src={picture?.secure_url} alt="" />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="offer-text">
            <div>
              <p className="price">{intl.format(data.product_price)}</p>
              <div className="offer-details">
                {data.product_details.map((element, index) => {
                  return (
                    <div key={uid(element)}>
                      <div>
                        <span>{Object.keys(element)[0]}</span>
                      </div>
                      <div>
                        <span>{Object.values(element)[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="offer-title">
                {!data.bought ? (
                  <>
                    <span>{data.product_name}</span>
                    <span>{data.product_description}</span>
                    <span>{data.owner.account.username}</span>
                  </>
                ) : (
                  data.seller_connect && (
                    <>
                      <span>{data.owner.account.username}</span>
                    </>
                  )
                )}
              </div>

              {data.bought ? (
                <p className="sold-warn">Déjà vendu !</p>
              ) : data.owner_connect ? (
                <>
                  <button
                    className="blue_button_modify"
                    onClick={() => getModifyOffer()}
                  >
                    Modifier mon offre
                  </button>
                  <button
                    className="red_button_delete"
                    onClick={() => deleteData(data._id)}
                  >
                    Supprimer mon offre
                  </button>
                </>
              ) : (
                <Link
                  to="/payment"
                  state={{
                    price: data.product_price,
                    sellerID: data.owner._id,
                    name: data.product_name,
                    productID: data._id,
                  }}
                >
                  <button className="sell-button">Acheter</button>
                </Link>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
