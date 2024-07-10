import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Cart = () => {
  const {
    removeProductFromCart,
    getUserCart,
    cartProducts,
    clearCartData,
    totalCartPrice,
    numOfCartItems,
    updateProdutCount
  } = useContext(cartContext);

  const [loading, setLoading] = useState(true);
  const deleteProduct = async (id) => {
    try {
      const res = await removeProductFromCart(id);
      if (res.status === "success") {
        toast.success("Product removed successfully");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };
   const updateCount = async (id, count) => {
    const res = await updateProdutCount(id, count)
    if (res.status === "success") {
        toast.success("Product updated successfully");
      }
   }
   const clearCart = async () => {
    try {
      const res = await clearCartData();
      if (res.status === "success") {
        toast.success("Cart cleared successfully");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };
  useEffect(() => {
    getUserCart();
    setLoading(false);  // Ensure loading is set to false once data is fetched
  }, []);
  if (cartProducts === null) {
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
    );
  }
  if (cartProducts.length === 0) {
    return (
      <div className="text-center my-5 p-1"><h1>No products found in your cart <br/><br/>
      <Link style={{ backgroundColor: "#eee", padding: "15px" }} to="/products">GET PRODUCTS NOW ..</Link></h1>
        </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {loading ? (
        <div style={{ backgroundColor: "#eee", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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
          <div className="container py-3">
            <h2 className="text-center mt-5">Your Shopping Cart</h2>
            <h5 className="text-center my-4">Total Price : {totalCartPrice} EGP</h5>
            <div className="text-center my-4">
              <button onClick={clearCart} className="mx-3 btn btn-outline-danger">Clear Cart</button>
              <Link to="/pay" className="mx-3 text-white btn btn-success">Confirm Payment</Link>
            </div>
            {cartProducts.map((product, idx) => (
              <div
                key={idx}
                className="row align-items-center border-3 p-3 border-bottom"
              >
                <div className="col-sm-1">
                  <img
                    className="w-100"
                    src={product?.product?.imageCover}
                    alt="product image"
                  />
                </div>
                <div className="col-sm-9">
                  <h6>Title: {product?.product?.title}</h6>
                  <h5 className="p-2">Item Price : {product?.price} EGP</h5>
                  <button
                    onClick={() => deleteProduct(product?.product?.id)}
                    className="mb-2 btn btn-outline-danger"
                  >
                    Remove
                  </button>
                </div>
                <div className="col-sm-2">
                  <div className="d-flex align-items-center">
                    <button 
                      onClick={() => updateCount(product?.product?.id, product?.count + 1)}
                      className="btn btn-outline-success">+</button>
                    <span className="m-2">{product?.count}</span>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => updateCount(product?.product?.id, product?.count - 1)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
