import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Discuss } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

const Payement = () => {
  const [isCashLoading, setIsCashLoading] = useState(false);
  const [isCardLoading, setIsCardLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [succMessage, setSuccMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { cartId, setNumOfCartItems, setTotalCartPrice, setCartProducts } =
    useContext(cartContext);
  const navigate = useNavigate();

  // **********************cash payment*******************************
  const confirmCashpayment = async (values, { resetForm }) => {
    setIsCashLoading(true);
    setErrMessage(null);
    setSuccMessage(null);

    const payload = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
      },
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        payload,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log("Success payment", data);
      if (data.status === "success") {
        toast.success("Payment confirmed! successfully");
        setSuccMessage("Payment confirmed!");
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setCartProducts([]);
        resetForm(); // Reset the form fields
        setTimeout(() => {
          navigate("/allorders");
        }, 1000);
      }
    } catch (error) {
      setErrMessage(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setIsCashLoading(false);
  };
  // **********************online payment********************************
  const confirmCardpayment = async (values, { resetForm }) => {
    setIsCardLoading(true);
    setErrMessage(null);
    setSuccMessage(null);

    const payload = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
      },
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        payload,
        {
          headers: { token: localStorage.getItem("token") },
          params: { url: `http://localhost:${window.location.port}` },
        }
      );
      window.open(data.session.url, "_blank");
    } catch (error) {
      setErrMessage(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setIsCardLoading(false);
  };

  const handleSubmit = (values, formikHelpers) => {
    if (paymentMethod === "cash") {
      confirmCashpayment(values, formikHelpers);
    } else if (paymentMethod === "card") {
      confirmCardpayment(values, formikHelpers);
    }
  };

  const formikObj = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: "",
    },
    onSubmit: handleSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.phone) {
        errors.phone = "Phone is required.";
      } else if (!/^[\d-]+$/.test(values.phone)) {
        errors.phone = "Phone must be a valid number.";
      }

      if (!values.city) {
        errors.city = "City is required.";
      }

      if (!values.details) {
        errors.details = "Details are required.";
      }

      return errors;
    },
  });

  return (
    <div className="container pt-5">
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card shadow  text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body px-md-5 ">
                  <div className="row justify-content-center">
                    {succMessage ? (
                      <div className="alert alert-success">{succMessage}</div>
                    ) : (
                      ""
                    )}

                    {errMessage ? (
                      <div className="alert alert-danger">{errMessage}</div>
                    ) : (
                      ""
                    )}
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h3 fw-bold mb-3 mx-1 mx-md-4 mt-2">
                        Payment
                      </p>
                      <form
                        onSubmit={formikObj.handleSubmit}
                        className="mx-1 mx-md-4"
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              name="phone"
                              value={formikObj.values.phone}
                              onChange={formikObj.handleChange}
                              onBlur={formikObj.handleBlur}
                              type="tel"
                              placeholder="Phone number"
                              id="form3Example5c"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example5c"
                            >
                              Phone
                            </label>
                            {formikObj.errors.phone &&
                              formikObj.touched.phone ? (
                              <div className="alert alert-danger">
                                {formikObj.errors.phone}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-city fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              name="city"
                              value={formikObj.values.city}
                              onChange={formikObj.handleChange}
                              onBlur={formikObj.handleBlur}
                              type="text"
                              placeholder="City"
                              id="form3Example6c"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example6c"
                            >
                              City
                            </label>
                            {formikObj.errors.city && formikObj.touched.city ? (
                              <div className="alert alert-danger">
                                {formikObj.errors.city}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-info fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <textarea
                              name="details"
                              value={formikObj.values.details}
                              onChange={formikObj.handleChange}
                              onBlur={formikObj.handleBlur}
                              placeholder="Details"
                              id="form3Example7c"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example7c"
                            >
                              Details
                            </label>
                            {formikObj.errors.details &&
                              formikObj.touched.details ? (
                              <div className="alert alert-danger">
                                {formikObj.errors.details}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-2 mb-lg-3">
                          <button
                            type="button" // Change to button to prevent default form submission
                            onClick={() => {
                              setPaymentMethod("cash");
                              formikObj.handleSubmit();
                            }}
                            disabled={
                              formikObj.isValid === false ||
                              formikObj.dirty === false
                            }
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-lg"
                          >
                            {isCashLoading ? (
                              <Discuss
                                visible={true}
                                height="40"
                                width="40"
                                ariaLabel="discuss-loading"
                                wrapperStyle={{}}
                                wrapperClass="discuss-wrapper"
                              />
                            ) : (
                              "Confirm Cash Payment"
                            )}
                          </button>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-2 mb-lg-3">
                          <button
                            type="button" // Change to button to prevent default form submission
                            onClick={() => {
                              setPaymentMethod("card");
                              formikObj.handleSubmit();
                            }}
                            disabled={
                              formikObj.isValid === false ||
                              formikObj.dirty === false
                            }
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-success btn-lg"
                          >
                            {isCardLoading ? (
                              <Discuss
                                visible={true}
                                height="40"
                                width="40"
                                ariaLabel="discuss-loading"
                                wrapperStyle={{}}
                                wrapperClass="discuss-wrapper"
                                color='#eee'
                              />
                            ) : (
                              "Confirm Online Payment"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://www.cflowapps.com/wp-content/uploads/2021/12/o2_proces.jpg"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payement;
