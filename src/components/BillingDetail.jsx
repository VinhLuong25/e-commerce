import React from "react";
import { Link } from "react-router-dom";
import FormField from "./forms/FormField";

export default function BillingDetail({ user }) {
  return (
    <div className="billing-detail">
      <div className="top-title">
        <p className="check-title">Contact Information</p>
        {!user && (
          <p className="accountExist">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        )}
      </div>

      <FormField
        name="email"
        type="email"
        placeholder="jane.doe@example.com"
        required
      />

      <p className="check-title">Shipping Address</p>

      <FormField name="name" type="text" placeholder="Jane Doe" required />

      <FormField
        name="address"
        type="text"
        placeholder="185 Berry St. Suite 550"
        required
      />
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormField
          name="city"
          type="text"
          placeholder="Sydney"
          required
          classname="true"
        />
        <FormField
          name="zip"
          type="text"
          placeholder="3000"
          required
          classname="true"
        />
      </span>
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormField
          name="state"
          type="text"
          placeholder="NSW"
          required
          classname="true"
        />
        <FormField
          name="country"
          type="text"
          placeholder="Australia"
          required
          classname="true"
        />
      </span>
    </div>
  );
}
