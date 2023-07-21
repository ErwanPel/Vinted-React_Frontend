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

  // This function return the result of the offer by ID
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

  const intl = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

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
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
            >
              {data.product_image.map((picture, index) => {
                return (
                  <div key={index} className="bloc-img-offer">
                    <img src={picture.secure_url} alt="" />
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
                  console.log(Object.keys(element), Object.values(element));
                  return (
                    <div key={index + element}>
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
                <span>{data.product_name}</span>
                <span>{data.product_description}</span>
                <span>{data.owner.account.username}</span>
              </div>
              <button className="sell-button">Acheter</button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
