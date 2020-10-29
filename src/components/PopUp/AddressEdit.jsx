import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { firestore } from "../../firebase/utils";
import {
  setBillingAddress,
  setBillingSameAddress,
  setShippingAddress,
} from "../../redux/userSlice";
import FormField from "../forms/FormField";

export default function AddressEdit({
  closePopUp,
  title,
  uid,
  shippingAddress,
  billingAddress,
  billingSameAddress,
}) {
  const [show, setShow] = useState(true);
  const [checked, setChecked] = useState(billingSameAddress);
  const [sName, setSName] = useState(shippingAddress.name);
  const [sPhone, setSPhone] = useState(shippingAddress.phone);
  const [sAddress, setSAddress] = useState(shippingAddress.address);
  const [sCity, setSCity] = useState(shippingAddress.townOrCity);
  const [sState, setSState] = useState(shippingAddress.state);
  const [sPostcode, setSPostcode] = useState(shippingAddress.postcode);
  const [sCountry, setSCountry] = useState(shippingAddress.country);
  const [bName, setBName] = useState(billingAddress.name);
  const [bPhone, setBPhone] = useState(billingAddress.phone);
  const [bAddress, setBAddress] = useState(billingAddress.address);
  const [bCity, setBCity] = useState(billingAddress.townOrCity);
  const [bState, setBState] = useState(billingAddress.state);
  const [bPostcode, setBPostcode] = useState(billingAddress.postcode);
  const [bCountry, setBCountry] = useState(billingAddress.country);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const shippingAddress = {
      name: e.target.name.value.trim(),
      phone: e.target.phone.value.trim(),
      address: e.target.address.value.trim(),
      townOrCity: e.target.townOrCity.value.trim(),
      state: e.target.state.value.trim(),
      postcode: e.target.postcode.value.trim(),
      country: e.target.country.value.trim(),
    };

    if (!checked) {
      const billingAddress = {
        name: e.target.nameB.value.trim(),
        phone: e.target.phoneB.value.trim(),
        address: e.target.addressB.value.trim(),
        townOrCity: e.target.townOrCityB.value.trim(),
        state: e.target.stateB.value.trim(),
        postcode: e.target.postcodeB.value.trim(),
        country: e.target.countryB.value.trim(),
      };
      try {
        await firestore.doc(`users/${uid}`).update({
          shippingAddress: shippingAddress,
          billingAddress: billingAddress,
        });
      } catch (error) {
        console.log(error);
      }
      dispatch(setShippingAddress(shippingAddress));
      dispatch(setBillingAddress(billingAddress));
      dispatch(setBillingSameAddress(false));
    } else {
      try {
        await firestore.doc(`users/${uid}`).update({
          shippingAddress: shippingAddress,
          billingAddress: shippingAddress,
        });
      } catch (error) {
        console.log(error);
      }
      dispatch(setShippingAddress(shippingAddress));
      dispatch(setBillingAddress(shippingAddress));
      dispatch(setBillingSameAddress(true));
    }
    closePopUp();
  };
  return (
    <div className="popup">
      <div className="popup__inner">
        <div className="content">
          <div className="content__inner">
            <div onClick={() => closePopUp()} className="close-btn">
              X
            </div>
            <h2>{title}</h2>

            <h4>Shipping Address</h4>

            <form onSubmit={handleSubmit}>
              <FormField
                name="name"
                type="text"
                label="Name"
                value={sName ? sName : ""}
                onChange={(e) => setSName(e.target.value)}
                required
              />
              <FormField
                name="phone"
                type="text"
                label="Phone"
                value={sPhone ? sPhone : ""}
                onChange={(e) => setSPhone(e.target.value)}
                required
              />
              <FormField
                name="address"
                type="text"
                label="Address"
                value={sAddress ? sAddress : ""}
                onChange={(e) => setSAddress(e.target.value)}
                required
              />
              <div className="grid">
                <FormField
                  name="townOrCity"
                  type="text"
                  label="Town or City"
                  value={sCity ? sCity : ""}
                  onChange={(e) => setSCity(e.target.value)}
                  required
                />
                <FormField
                  name="state"
                  type="text"
                  label="State/Province"
                  value={sState ? sState : ""}
                  onChange={(e) => setSState(e.target.value)}
                  required
                />
              </div>
              <div className="grid">
                <FormField
                  name="postcode"
                  type="text"
                  label="Postcode"
                  value={sPostcode ? sPostcode : ""}
                  onChange={(e) => setSPostcode(e.target.value)}
                  required
                />
                <FormField
                  name="country"
                  type="text"
                  label="Country"
                  value={sCountry ? sCountry : ""}
                  onChange={(e) => setSCountry(e.target.value)}
                  required
                />
              </div>
              <hr />
              <h4>Billing Address</h4>
              <div className="check-box">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                    setShow(!show);
                    setBName("");
                    setBPhone("");
                    setBAddress("");
                    setBState("");
                    setBPostcode("");
                    setBCity("");
                    setBCountry("");
                  }}
                />
                <p> My billing address is the same as my shipping address</p>
              </div>
              {!checked && (
                <>
                  <FormField
                    name="nameB"
                    type="text"
                    label="Name"
                    value={bName ? bName : ""}
                    onChange={(e) => setBName(e.target.value)}
                    required
                  />
                  <FormField
                    name="phoneB"
                    type="text"
                    label="Phone"
                    value={bPhone ? bPhone : ""}
                    onChange={(e) => setBPhone(e.target.value)}
                    required
                  />
                  <FormField
                    name="addressB"
                    type="text"
                    label="Address"
                    required
                    value={bAddress ? bAddress : ""}
                    onChange={(e) => setBAddress(e.target.value)}
                  />
                  <div className="grid">
                    <FormField
                      name="townOrCityB"
                      type="text"
                      label="Town or City"
                      value={bCity ? bCity : ""}
                      onChange={(e) => setBCity(e.target.value)}
                      required
                    />
                    <FormField
                      name="stateB"
                      type="text"
                      label="State/Province"
                      value={bState ? bState : ""}
                      onChange={(e) => setBState(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid">
                    <FormField
                      name="postcodeB"
                      type="text"
                      label="Postcode"
                      value={bPostcode ? bPostcode : ""}
                      onChange={(e) => setBPostcode(e.target.value)}
                      required
                    />
                    <FormField
                      name="countryB"
                      type="text"
                      label="Country"
                      value={bCountry ? bCountry : ""}
                      onChange={(e) => setBCountry(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              <button className="btn" type="submit">
                SAVE CHANGES
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
