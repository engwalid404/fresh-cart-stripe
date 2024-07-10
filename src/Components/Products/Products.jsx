import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import HomeSlider from "../HomeSlider/HomeSlider";
import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { cartContext } from './../Context/CartContext';
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { MotionConfig , motion} from "framer-motion";
const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addProductToCart } = useContext(cartContext);

  const  addProduct=async(id)=>{
    const res= await addProductToCart (id);
    if (res.status === "success") {
      console.log("add success", res.message);
      toast.success(res.message,{
        position: "top-right",
        duration: 2000,
      }); // Display success toast
    } else {
      console.error("add error", res.message);
      toast.error(res.message,{
        position: "top-right",
        duration: 2000,
      }); // Display error toast
    }
   }

  const getAllProducts = () => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response?.data && Array.isArray(response?.data?.data)) {
          setProductsList(response?.data?.data);
          setLoading(false); // Stop loading once data is fetched
        } else {
          console.error("Unexpected response structure", response.data);
          setProductsList([]); // Set to an empty array if the response structure is unexpected
          setLoading(false); // Stop loading even if the response structure is unexpected
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false); // Stop loading in case of error
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
     <Helmet>
               
                <title>All Products</title>
            </Helmet>
      {loading ? (
        <div style={{ backgroundColor:"#eee",display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="container mt-4">
            <div className="row gx-0">
              <div className="col-sm-9">
                <HomeSlider />
              </div>
              <div className="col-sm-3">
                <img
                  style={{ width: "100%", height: "200px" }}
                  className="img-fluid"
                  src={img1}
                  alt="slider-img"
                />
                <img
                  style={{ width: "100%", height: "200px" }}
                  className="img-fluid"
                  src={img2}
                  alt="slider-img"
                />
              </div>
              <CategorySlider />
            </div>

            {productsList.length > 0 ? (
              <div className="pt-3 mt-4">
                <div className="row">
                  {productsList.map((product, index) => (
                    <div className="col-md-2 mb-3" key={product.id}>

                      <Link to={ `/prodDetails/${product.id} `} >
                      <MotionConfig transition={{duration:1 ,ease:"easeInOut"}}>
                        <motion.div 
                         initial={{scaleX:0 , opacity:0}}
                         whileInView={{scaleX:1, opacity:1}}
                        className=" my-3 h-90">
                          <img
                            src={product.images[0]}
                            className="card-img-top img-fluid"
                            alt={`${product.title} image 1`}
                            style={{ height: "250px" }}
                          />

                          <div className="card-body">
                            <h5
                              className="card-title mt-3"
                              style={{ color: "green" }}
                            >
                              {product.category.name}
                            </h5>
                            {/* <p className="card-text">{product.title}</p> */}
                            <p className="card-text d-flex justify-content-between ">
                              <span>{product.price} EGP</span>
                              <span>
                                <i
                                  style={{ color: "green" }}
                                  className="fa fa-star "
                                ></i>
                                {product.ratingsAverage}
                              </span>
                            </p>
                           
                          </div>
                        </motion.div>
                        </MotionConfig>
                      </Link>
                
                    
                    <button id="cartBtn" onClick={()=>{addProduct(product.id)}} className='btn btn-success w-100'> + Add to cart</button>
                 
                           
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="vh-100 d-flex 
    justify-content-center align-items-center"
              >
                <BallTriangle
                  height={100}
                  width={100}
                  radius={5}
                  color="#4fa94d"
                  ariaLabel="ball-triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
