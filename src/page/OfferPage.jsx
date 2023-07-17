import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import "../css/offerPage.css";

export default function OfferPage() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--backend-vinted--fwddjdqr85yq.code.run/offer/${id}`
      );
      console.log("offer", response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("useEffect Offer");
    fetchData();
  }, []);

  const intl = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  console.log(data);

  return (
    <div>
      {isLoading ? (
        <p>Downloading...</p>
      ) : (
        <div className="wrapper offer-single">
          {console.log(data.product_image)}

          <div>
            {data.product_image.length < 2 ? (
              <img src={data.product_image[0].secure_url} alt="" />
            ) : (
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
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
              >
                {data.product_image.map((picture, index) => {
                  return (
                    <div key={index}>
                      <img src={picture.secure_url} alt="" />
                    </div>
                  );
                })}
              </Carousel>
            )}
          </div>
          <div className="offer-text">
            <div>
              <p className="price">{intl.format(data.product_price)}</p>
              <div className="offer-details">
                <div>
                  <div>
                    <span>MARQUE</span>
                  </div>
                  <div>
                    <span>{data.product_details[0].BRAND}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>TAILLE</span>
                  </div>
                  <div>
                    {" "}
                    <span>{data.product_details[1].SIZE}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>ETAT</span>
                  </div>
                  <div>
                    {" "}
                    <span>{data.product_details[2].CONDITION}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>COULEUR</span>
                  </div>
                  <div>
                    <span>{data.product_details[3].COLOR}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>EMPLACEMENT</span>
                  </div>
                  <div>
                    {" "}
                    <span>{data.product_details[4].CITY}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="offer-title">
                <span>{data.product_name}</span>
                <span>{data.product_description}</span>
                <span>{data.owner.account.username}</span>
              </div>
              <button className="sell-button">Acheter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
