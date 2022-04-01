import React from "react";
import { compose } from "redux";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import get from "lodash/get";
import { Field, reduxForm, reset } from "redux-form";

import { CHAT_DETAILS_FORM, GLOBAL_CHAT_STORE } from "../utils/constant";
import { setContent } from "../../../redux/actions";

const ChatWindow = ({
  chatDetails,
  handleSubmit,
  reset,
  chatStore,
  updateMessageHistory,
}) => {
  const onSubmit = (formValues) => {
    let tempChatStore = chatStore;
    tempChatStore.forEach((data) => {
      if (data.phone === chatDetails.phone) {
        data.messages = [...data.messages, [formValues.sendMessage]];
      }
    });
    updateMessageHistory(tempChatStore);
    reset();
  };
  const displayChatInformation = () => {
    const messageToShow = chatStore.filter(
      (data) => data.phone === chatDetails.phone
    );
    return messageToShow.map((data) => {
      if (data.messages.length >= 1) {
        return data.messages.map((singleMessage) => {
          return (
            <div className="chat-display">
              <p style={{ textAlign: "right" }}>
                <i class="bi bi-person-circle" />
                <span style={{ padding: "1%" }}>{singleMessage[0]}</span>
              </p>
              <p style={{ textAlign: "left" }}>
                <i class="bi bi-person-circle" />
                <span style={{ padding: "1%" }}>{singleMessage[0]}</span>
              </p>
            </div>
          );
        });
      } else
        return <p style={{ textAlign: "center" }}>No Message History Found</p>;
    });
  };

  return (
    <div className="chat-history">
      <Grid container spacing={1} className="new-contact">
        <Grid item xs={0.5}>
          <i class="bi bi-person-circle" />
        </Grid>
        <Grid item xs={4}>
          <p>
            {chatDetails.firstName} {chatDetails.lastName}
          </p>
        </Grid>
      </Grid>
      {displayChatInformation()}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container className="send-message">
          <Grid item xs={7}>
            <Field
              name="sendMessage"
              component="input"
              type="text"
              placeholder="Type here...."
              className="message-box"
              required
            />
          </Grid>
          <Grid item xs={1}>
            <button type="submit">Send</button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chatDetails: get(state, "setContent.SHOW_CHAT_MESSAGE_DETAILS"),
  chatStore: get(state, "setContent.GLOBAL_CHAT_STORE"),
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset(CHAT_DETAILS_FORM)),
  updateMessageHistory: (contactDetails) =>
    dispatch(setContent(GLOBAL_CHAT_STORE, contactDetails)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: CHAT_DETAILS_FORM,
  })
)(ChatWindow);
