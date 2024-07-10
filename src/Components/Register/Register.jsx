import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Discuss } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [errMessage, setErrMessage] = useState(null);
  const [succMessage, setSuccMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // *********formik***********
  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const registerNewUser = async (values) => {
    setIsLoading(true)
    //calling api
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      console.log("success", data);
      if (data.message === "success") {
        setSuccMessage("Account has been created successfully");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setErrMessage(error.response.data.message);
    }
    setIsLoading(false)
  };

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: registerNewUser, //refrence of fun that call when submit
    validate: function (values) {
      setErrMessage(null);

      const errors = {};
      if (values.name.length < 4 || values.name.length > 10) {
        errors.name = "Name must be from 4  to 10 characters.  ";
      }
      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "Email must be valid.  ";
      }

      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "Password must be from 6  to 12 characters.  ";
      }

      if (values.rePassword !== values.password) {
        errors.rePassword = "rePassword doesn't match password .  ";
      }
      if (!values.phone.match(/^(02)?01[0125][0-9]{8}/)) {
        errors.phone = "Phone Invalid. ";
      }

      return errors;
    },
  });
  // *******end formic*******
  return (
    <div>
      <section className="vh-100" >
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
                        Register Now
                      </p>
                      <form
                        onSubmit={formikObj.handleSubmit}
                        className="mx-1 mx-md-4"
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw text-success"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              name="name" // Add name attribute
                              value={formikObj.values.name}
                              onChange={formikObj.handleChange}
                              onBlur={formikObj.handleBlur}
                              type="text"
                              placeholder="Your name"
                              id="form3Example1c"
                              className="form-control"
                            />
                           
                            {formikObj.errors.name && formikObj.touched.name ? (
                              <div className="alert alert-danger">
                                {formikObj.errors.name}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw text-success"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              name="email" // Add name attribute
                              value={formikObj.values.email}
                              onChange={formikObj.handleChange}
                              onBlur={formikObj.handleBlur}
                              type="email"
                              id="form3Example3c"
                              placeholder="Your email"
                              className="form-control"
                            />
                           
                            {formikObj.errors.email &&
                            formikObj.touched.email ? (
                              <div className="alert alert-danger">
                                {formikObj.errors.email}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw text-success"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              name="password"
                              value={formikObj.values.password}
                              onChange={formikObj.handleChange}
                              onBlur={formikObj.handleBlur}
                              type="password"
                              placeholder="Password"
                              id="form3Example4c"
                              className="form-control"
                            />

                            {formikObj.errors.password &&
                            formikObj.touched.password ? (
                              <div className="alert alert-danger">
                                {formikObj.errors.password}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw text-success"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              name="rePassword"
                              value={formikObj.values.rePassword}
                              onChange={formikObj.handleChange}
                              onBlur={formikObj.handleBlur}
                              type="password"
                              placeholder="Confirm password"
                              id="form3Example4cd"
                              className="form-control"
                            />
                        
                            {formikObj.errors.rePassword &&
                            formikObj.touched.rePassword ? (
                              <div className="alert alert-danger">
                                {formikObj.errors.rePassword}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-phone fa-lg me-3 fa-fw text-success"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              name="phone" // Add name attribute
                              value={formikObj.values.phone}
                              onChange={formikObj.handleChange}
                              onBlur={formikObj.handleBlur}
                              type="tel"
                              placeholder="Your phone"
                              id="form3Example4cd1"
                              className="form-control"
                            />
                         
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

                        <div className="d-flex justify-content-center mx-4 mb-2 mb-lg-3">
                          <button
                            type="submit"
                            disabled={
                              formikObj.isValid === false ||
                              formikObj.dirty === false
                            }
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-success btn-lg"
                          >

                            {isLoading?<Discuss
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="discuss-loading"
                            wrapperStyle={{}}
                            wrapperClass="discuss-wrapper"
                            // color="green"
                            // backgroundColor="red"
                          />: "Register"}
                            
                            
                          </button>

                         
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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

export default Register;
