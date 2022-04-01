import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import get from "lodash/get";

import AddNewContact from "../components/AddNewContact";
import ExistingContact from "../components/ExistingContact";
import ChatWindow from "../components/ChatWindow";

const MessagingApp = ({ showAddContact, showChat }) => {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ margin: "2px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <ExistingContact />
        </Grid>
        <Grid item xs={6} md={8}>
          {showAddContact && <AddNewContact />}
          {showChat && <ChatWindow />}
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  showAddContact: get(state, "setContent.SHOW_CONTACT_FLAG", true),
  showChat: get(state, "setContent.SHOW_CHAT_WINDOW"),
});

export default connect(mapStateToProps, null)(MessagingApp);
