import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/forms/Button";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Account() {
  const { displayName, email } = useSelector((state) => state.user.currUser);

  return (
    <div className="account">
      <h1>Welcome, {displayName}</h1>
      <hr />
      <div className="contact">
        <p>Contact Information</p>
        <div className="contact__info">
          <div>
            <span>Name</span>
            <p>{displayName}</p>
          </div>
          <div>
            <span>Email</span>
            <p>{email}</p>
          </div>
          <div>
            <span>Phone</span>
            <p>04040404</p>
          </div>
          <div>
            <span>Birthday</span>
            <p>22/05/1993 </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="address">
        <p>Address</p>
        <div className="address__info">
          <div className="shipping">
            <p>Shipping Address</p>
            {/* No Address
            <p className="no-record">There is no address</p> */}
            <div>
              <span>Vinh Lu</span>
              <br />
              <span>119 Duke Street</span>
              <br />
              <span>Sunshine, 3020</span>
              <br />
              <span>Australia</span>
              <br />
              <span>T: 04148284776</span>
              <br />
            </div>
          </div>

          <div className="billing">
            <br />
            <p>Billing Address</p>
            {/* No Address
            <p className="no-record">There is no address</p> */}
            <div>
              <span>vinh Lu</span>
              <br />
              <span>119 Duke Street</span>
              <br />
              <span>Sunshine, 3020</span>
              <br />
              <span>Australia</span>
              <br />
              <span>T: 04148284776</span>
              <br />
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <div className="payment-method">
        <p>Save Payment Methods</p>
        <div>
          <p className="no-record">There is no payment method</p>
          <Button>Add Payment Method</Button>
        </div>
      </div>
      <hr />
      <Link to="/account/order_history" className="order-history">
        <span>Order History</span>
        <FontAwesomeIcon icon={faChevronRight} size="lg" className="icon" />
      </Link>
    </div>
  );
}
