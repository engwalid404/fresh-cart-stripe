import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "../../assets/images/14.jpg";
import slider2 from "../../assets/images/12.jpg";
import slider3 from "../../assets/images/13.jpg";

const HomeSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows:false
  };
  return (
    <div >
      <Slider {...settings}>
        <div className="mb-3">
          <img  style={{width:"100%" ,height:"400px"}} className="img-fluid" src={slider1} alt="slider-img"/>
       
        </div>
        <div>
        <img   style={{width:"100%" ,height:"400px"}} className="img-fluid" src={slider2} alt="slider-img"/>

        </div>
        <div>
        <img  style={{width:"100%" ,height:"400px"}}className="img-fluid" src={slider3} alt="slider-img"/>

        </div>
       
        
      </Slider>
    </div>
  );
};

export default HomeSlider;
