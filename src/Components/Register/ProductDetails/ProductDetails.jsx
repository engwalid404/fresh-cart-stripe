import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

const ProductDetails = () => {

  const { addProductToCart } = useContext(cartContext);
  const { id } = useParams(); // Get the product ID from the route parameters
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProductDetails = (productId) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("success", response.data.data);
        setProductDetails(response.data.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false); // Stop loading in case of error
      });
  };

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

  useEffect(() => {
    if (id) {
      getProductDetails(id); // Call the function with the valid product ID
    }
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          visible={true}
        />
      </div>
    ); // Show a loading indicator while fetching data
  }

  if (!productDetails) {
    return <div>No product details available</div>; // Show a message if no product details are found
  }

  return (
    <div className="container mt-5 text-center">
      <div className="row  align-items-center justify-content-center">
        <div className="col-md-3">
          <figure>
            <img
              className="w-100"
              src={productDetails.images[0]}
              alt="product"
            />
          </figure>
        </div>
        <div className="col-md-9">
          <h1>{productDetails.title}</h1>
          <p>{productDetails.description}</p>

          <p>Category: {productDetails.category.name}</p>
          <p>Brand: {productDetails.brand.name}</p>
          <p>Sold: {productDetails.sold}</p>
          <p>Rating: {productDetails.ratingsAverage}</p>
          <br />
          <p>Price: {productDetails.price} EGP</p>
           
          <button onClick={()=> addProduct(productDetails.id)} className="btn btn-success w-100"> + Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
