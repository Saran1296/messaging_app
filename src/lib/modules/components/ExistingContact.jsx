import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import get from "lodash/get";

import {
  EXISTING_CONTACT_SEARCH,
  SHOW_CONTACT_FLAG,
  SHOW_CHAT_WINDOW,
  SHOW_CHAT_MESSAGE_DETAILS,
} from "../utils/constant";
import { setContent } from "../../../redux/actions";

const ExistingContact = ({
  existingContactDetails,
  showAddContactComponent,
  showChatWindow,
  chatInformation,
}) => {
  const onClickChatButton = (data) => {
    showChatWindow(true);
    chatInformation(data);
    showAddContactComponent(false);
  };
  const onClickAddContact = () => {
    showChatWindow(false);
    showAddContactComponent(true);
  };
  const displayExistingContact = () => {
    return existingContactDetails.map((data) => (
      <div className="contact-display" key={data.email}>
        <Grid container spacing={0.5}>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <i class="bi bi-person-circle contact-icon"></i>
          </Grid>
          <Grid item xs={4}>
            <p>
              {data.firstName} {data.lastName}
            </p>
            <p>{data.phone}</p>
          </Grid>
          <Grid item xs={2}>
            <i class="bi bi-telephone-fill contact-icon cursor"></i>
          </Grid>
          <Grid item xs={2}>
            <i
              class="bi bi-chat-left-text-fill contact-icon cursor"
              onClick={() => onClickChatButton(data)}
            ></i>
          </Grid>
        </Grid>
        <hr />
      </div>
    ));
  };
  return (
    <div className="existing-contact">
      <Grid container spacing={1}>
        <Grid item xs={2} />
        <Grid item xs={6}>
          <div className="search-bar">
            <form>
              <Field
                name="searchContact"
                component="input"
                type="text"
                placeholder="Search people"
              />
            </form>
          </div>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1}>
          <i
            class="bi bi-plus-square-fill contact-icon cursor"
            onClick={() => onClickAddContact()}
          ></i>
        </Grid>
      </Grid>
      <div>
        <h3>Contacts</h3>
        <hr />
      </div>
      {displayExistingContact()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  existingContactDetails: get(state, "setContent.CONTACT_DETAILS", []),
});
const mapDispatchToProps = (dispatch) => ({
  showAddContactComponent: (flag) =>
    dispatch(setContent(SHOW_CONTACT_FLAG, flag)),
  showChatWindow: (showChat) =>
    dispatch(setContent(SHOW_CHAT_WINDOW, showChat)),
  chatInformation: (data) =>
    dispatch(setContent(SHOW_CHAT_MESSAGE_DETAILS, data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: EXISTING_CONTACT_SEARCH,
  })
)(ExistingContact);
