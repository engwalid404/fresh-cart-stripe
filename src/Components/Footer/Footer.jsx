import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faDribbble, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className="container-fluid mt-5 px-0">
      <footer className="text-white text-center text-lg-start bg-dark">
        <div className="container p-4">
          <div className="row mt-4">
            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">About store</h5>

              <p>
             This is store contains several categories and there is more <br />
             services that we present here.
              </p>

              <p>
                You can get any product on any time and our <br />
                delivery will send the orders.
              </p>

              <div className="mt-4">
                <button type="button" className=" m-1 btn btn-floating btn-light btn-lg">
                  <FontAwesomeIcon icon={faFacebookF} />
                </button>
                <button type="button" className=" m-1 btn btn-floating btn-light btn-lg">
                  <FontAwesomeIcon icon={faDribbble} />
                </button>
                <button type="button" className=" m-1 btn btn-floating btn-light btn-lg">
                  <FontAwesomeIcon icon={faTwitter} />
                </button>
                <button type="button" className=" m-1 btn btn-floating btn-light btn-lg">
                  <FontAwesomeIcon icon={faGooglePlusG} />
                </button>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4 pb-1">Search something</h5>

              <div className="form-outline form-white mb-4">
                <input type="text" id="formControlLg" className="form-control form-control-lg" />
              </div>

              <ul className="fa-ul" style={{ marginLeft: '1.65em' }}>
                <li className="mb-3">
                  <span className="fa-li"><FontAwesomeIcon icon={faHome} /></span><span className="ms-2">Cairo, 6 october city</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><FontAwesomeIcon icon={faEnvelope} /></span><span className="ms-2">contact@example.com</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><FontAwesomeIcon icon={faPhone} /></span><span className="ms-2">+ 48 234 567 88</span>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">Opening hours</h5>

              <table className="table text-center text-white">
                <tbody className="fw-normal">
                  <tr>
                    <td>Mon - Thu:</td>
                    <td>8am - 9pm</td>
                  </tr>
                  <tr>
                    <td>Fri - Sat:</td>
                    <td>8am - 1am</td>
                  </tr>
                  <tr>
                    <td>Sunday:</td>
                    <td>9am - 10pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 Copyright Developed by : 
          <a style={{fontStyle:"italic",color:"green"}} className='text-white' target='__blank' href="mailto:engwalidrabie404@gmail.com">Walid Rabie</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
