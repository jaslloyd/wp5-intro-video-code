import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default () => (
  <AppBar position="relative">
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        Header from Nav Bundle
      </Typography>
    </Toolbar>
  </AppBar>
);
