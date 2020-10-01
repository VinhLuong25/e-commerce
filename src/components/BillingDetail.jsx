import React from "react";
import FormField from "./forms/FormField";

export default function BillingDetail() {
  return (
    <div>
      <div>
        <p className="check-title">Contact Information</p>
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
        <FormField
          name="city"
          type="text"
          placeholder="San Francisco"
          required
        />
        <FormField name="state" type="text" placeholder="California" required />
        <FormField name="zip" type="text" placeholder="94103" required />
      </div>
    </div>
  );
}
