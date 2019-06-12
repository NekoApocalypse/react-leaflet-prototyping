import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  // LinearProgress,
  withStyles,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { observer } from 'mobx-react';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const TitleBar = observer((props) => {
  const { classes } = props;
  return (
    <AppBar position="absolute" className={classes.root}>
      <Toolbar disableGutters>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          West Pacific Next
        </Typography>
      </Toolbar>
      {// <LinearProgress color="primary" />
      }
    </AppBar>
  );
});

export default withStyles(styles)(TitleBar);
