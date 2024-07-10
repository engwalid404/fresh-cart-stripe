import React, { useEffect, useState } from "react";
import './slider.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Phone from "../Phone/Phone";

const CategorySlider = () => {
  const [categoriesList, setCategoriesList] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000,
    arrows: false,
  };

  const getAllCategories = () => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log("succ categ", response?.data?.data);
        if (response?.data && Array.isArray(response?.data?.data)) {
          setCategoriesList(response?.data?.data);
        } else {
          console.error("Unexpected response structure", response.data);
          setCategoriesList([]);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="parent-slider">
      <h2 className="my-2 pt-5" style={{textAlign:"center",fontStyle:"italic",fontWeight:"bold"}}>Discover Some Categories</h2>
      <Slider {...settings} >
        {categoriesList.map((category, index) => (
          <div key={index} className="my-5" style={{width:"500px", height:"500px"}}>
            <img
            style={{width:"200px", height:"200px", paddingLeft:"10px"}}
              className="img-fluid"
              src={category.image}
              alt="slider-img"
            />
            <h6 className="my-2">{category.name}</h6>
          </div>
        ))}
      </Slider>
      <Phone />
    </div>
  );
};

export default CategorySlider;
