import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import Payement from "./../Payement/Payement";
import { Helmet } from "react-helmet";

const AllOrders = () => {
  const [userOrders, setUserOrders] = useState(null);

  async function getUserOrders(id) {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,

        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log("order suc", response.data);

      setUserOrders(response.data);
    } catch (error) {
      console.error("order err", error); // Log the error
      return { status: "error", message: "Failed to update count from cart" };
    }
  }
  //   *********************
  // if(userOrders === null){
  // return(
  //     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  //     <BallTriangle
  //       height={100}
  //       width={100}
  //       radius={5}
  //       color="#4fa94d"
  //       ariaLabel="ball-triangle-loading"
  //       visible={true}
  //     />
  //   </div>
  // )
  // }
  // ***********************************************************************
  useEffect(() => {
    const res = jwtDecode(localStorage.getItem("token"));
    // console.log("token data", res);
    getUserOrders(res.id);
  }, []);

  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>

      <div className="container">
        <div className="row">
          {userOrders?.map((order, idx) => {
            return (
              <div key={idx} className="col-md-6">
                <div className="order bg-success text-white bg-gradient my-3 p-5 rounded">
                  {/* {order.cartItems?.map((item,index)=>{
                return <div>
                    <h5>Count: {item.count}</h5>
                    <h5>Price: {item.price}</h5>
                </div>
                })} */}
                  <p>
                    Order sent to user with phone :
                    {order.shippingAddress.phone}
                    <br /><br /> with details : {order.shippingAddress.details}
                    at {order.shippingAddress.city}
                    <br /> <br /> payment method : {order.paymentMethodType}
                    <br /><br /> Order Total Price : {order.totalOrderPrice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
