import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const TitleBar = (props) => {
  const { classes } = props;
  return (
    <AppBar position="absolute" className={classes.root}>
      <Toolbar>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          West Pacific Next
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(TitleBar);
