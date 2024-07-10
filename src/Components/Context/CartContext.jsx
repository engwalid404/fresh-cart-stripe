import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [cartProducts, setCartProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  async function addProductToCart(productId) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log("suc", response.data); // Log the success response
      setNumOfCartItems(response.data?.numOfCartItems);
      setTotalCartPrice(response.data?.data?.totalCartPrice);
      setCartProducts(response.data?.data?.products);

      return response.data;
    } catch (error) {
      console.error("err", error); // Log the error
      return { status: "error", message: "Failed to add product to cart" };
    }
  }

  async function getUserCart() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log("suc", response.data); // Log the success response
      setNumOfCartItems(response.data?.numOfCartItems);
      setTotalCartPrice(response.data?.data?.totalCartPrice);
      setCartProducts(response.data?.data?.products);
      setCartId(response.data?.data?._id)
    } catch (error) {
      console.error("err", error); // Log the error
    }
  }

  async function removeProductFromCart(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log("remove suc", response.data); // Log the success response
      setNumOfCartItems(response.data?.numOfCartItems);
      setTotalCartPrice(response.data?.data?.totalCartPrice);
      setCartProducts(response.data?.data?.products);
      return response.data;
    } catch (error) {
      console.error("remove err", error); // Log the error
      return { status: "error", message: "Failed to remove product from cart" };
    }
  }

  async function updateProdutCount(productId,count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count:count},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log("update suc", response.data); // Log the success response
      setNumOfCartItems(response.data?.numOfCartItems);
      setTotalCartPrice(response.data?.data?.totalCartPrice);
      setCartProducts(response.data?.data?.products);
      return response.data;
    } catch (error) {
      console.error("update err", error); // Log the error
      return { status: "error", message: "Failed to update count from cart" };
    }
  }

  async function clearCartData() {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log("remove suc", response.data); // Log the success response
      setNumOfCartItems(0);
      setTotalCartPrice(0);
      setCartProducts([]);
      return response.data;
    } catch (error) {
      console.error("remove err", error); // Log the error
      return { status: "error", message: "Failed to clear cart" };
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getUserCart,
        cartProducts,
        totalCartPrice,
        numOfCartItems,
        removeProductFromCart,
        updateProdutCount,
        clearCartData, 
        setNumOfCartItems,
        setTotalCartPrice,
        setCartProducts,
        cartId,
        token,
        setToken,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
