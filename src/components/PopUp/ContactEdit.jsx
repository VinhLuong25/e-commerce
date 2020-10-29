import React, { useState } from "react";
import FormField from "../forms/FormField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { firestore } from "../../firebase/utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";
import moment from "moment";
export default function ContactEdit({ closePopUp, title }) {
  const user = useSelector((state) => state.user.currUser);
  const { displayName, email, phone, DOB, uid } = user;

  const a = DOB
    ? DOB.seconds
      ? moment.unix(user.DOB.seconds).toDate()
      : moment(DOB).toDate()
    : null;

  const [name, setName] = useState(displayName);
  const [phoneNo, setPhoneNo] = useState(phone);
  const [startDate, setStartDate] = useState(a);

  console.log(user);
  console.log(DOB);
  console.log(startDate);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactInfo = {
      displayName: e.target.name.value.trim(),
      DOB: e.target.dob.value.trim(),
      phone: e.target.phone.value.trim(),
    };
    try {
      await firestore.doc(`users/${uid}`).update(contactInfo);
    } catch (err) {
      console.log(err);
    }

    dispatch(
      setUser({
        displayName: name,
        email: email,
        DOB: `${startDate}`,
        phone: phoneNo,
        uid: uid,
      })
    );
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
            <form onSubmit={handleSubmit}>
              <FormField
                name="name"
                type="text"
                value={name ? name : ""}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                required
              />

              <FormField
                name="phone"
                type="text"
                value={phoneNo ? phoneNo : ""}
                onChange={(e) => setPhoneNo(e.target.value)}
                label="Phone"
              />
              <span className="form-field__sub">
                <label htmlFor="">Date of Birth</label>
                <DatePicker
                  name="dob"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  showYearDropdown
                  showMonthDropdown
                  useShortMonthInDropdown
                />
              </span>
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
