import React from "react";
import "./Footer.scss";
export default function Footer() {
  return (
    <div className="footer">
      <div className="first-footer">
        <div className="about_us column">
          <p className="title">About us</p>
          <div className="location">
            <i className="fa fa-map-marker"></i>
            <p>
              152 King Street <br />
              Melbourne <br /> VIC, 3000
            </p>
          </div>
          <div className="phone">
            <i className="fa fa-phone"></i>
            <p> (+61) 1234665565 </p>
          </div>
        </div>
        <div className="customer-service column">
          <p className="title">Customer service</p>
          <p>Returns and exchanges</p>
          <p>Shipping and delivery</p>
          <p>Your order</p>
        </div>
        <div className="mail-sign column">
          <p className="title">sign up to our mailing list</p>
          <form action="submit">
            <input type="text" placeholder="Enter your email" />
            <input type="submit" />
          </form>
        </div>
      </div>
      <div className="second-footer">
        <p>
          &copy; M.A.D 2020 | Terms &amp; Conditions | Private Policy | Other
          Policies
        </p>
      </div>
    </div>
  );
}
