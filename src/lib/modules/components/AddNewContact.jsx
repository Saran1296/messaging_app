import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { compose } from "redux";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import get from "lodash/get";

import {
  NEW_CONTACT_FORM,
  CONTACT_DETAILS,
  GLOBAL_CHAT_STORE,
} from "../utils/constant";
import { setContent } from "../../../redux/actions";

const AddNewContact = ({
  handleSubmit,
  reset,
  existingContactDetails,
  addContact,
  setInititalChatInformation,
}) => {
  const onSubmit = (formValues) => {
    const existingContactCheck = existingContactDetails.some(
      (data) => data.phone === get(formValues, "phone")
    );
    if (!existingContactCheck) {
      const currentContactDetails = [
        {
          firstName: get(formValues, "firstName"),
          lastName: get(formValues, "lastName"),
          phone: get(formValues, "phone"),
          email: get(formValues, "email"),
          messages: [],
        },
      ];
      addContact([...existingContactDetails, ...currentContactDetails]);
      setInititalChatInformation([
        ...existingContactDetails,
        ...currentContactDetails,
      ]);
      reset();
    } else return alert("Contact already added.");
  };
  return (
    <div className="add-new-contact">
      <Grid container spacing={1} className="new-contact">
        <Grid item xs={0.5} />
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          <span>NEW CONTACT</span>
        </Grid>
      </Grid>
      <div style={{ margin: "15% 0% 0% 15%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ margin: "2%" }}>
            <label style={{ margin: "2%" }}>
              <i class="bi bi-person-plus-fill contact-icon"></i>
            </label>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
              required
              maxLength={35}
            />
            <span style={{ margin: "2%" }}>
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
                required
                maxLength={35}
              />
            </span>
          </div>
          <div style={{ margin: "2%" }}>
            <label style={{ margin: "2%" }}>
              <i class="bi bi-telephone contact-icon"></i>
            </label>
            <Field
              name="phone"
              component="input"
              type="tel"
              placeholder="Phone: 10 digits"
              required
              pattern="[0-9]{10}"
            />
          </div>
          <div style={{ margin: "2%" }}>
            <label style={{ margin: "2%" }}>
              <i class="bi bi-at contact-icon"></i>
            </label>
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div style={{ margin: "2% 0% 0% 15%" }}>
            <button type="submit" style={{ margin: "2%" }}>
              Save
            </button>
            <button
              type="button"
              style={{ margin: "2%" }}
              onClick={() => reset()}
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  existingContactDetails: get(state, "setContent.CONTACT_DETAILS", []),
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset(NEW_CONTACT_FORM)),
  addContact: (contactDetails) =>
    dispatch(setContent(CONTACT_DETAILS, contactDetails)),
  setInititalChatInformation: (contactDetails) =>
    dispatch(setContent(GLOBAL_CHAT_STORE, contactDetails)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: NEW_CONTACT_FORM,
  })
)(AddNewContact);
