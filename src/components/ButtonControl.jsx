import React, { Component } from 'react';
import Control from 'react-leaflet-control';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { DomEvent } from 'leaflet';
import { observer } from 'mobx-react';

const styles = {
  root: {
    border: '2px solid rgba(0,0,0,0.2)',
    borderRadius: '4px',
    // borderWidth: '2px',
  },
  button: {
    height: '30px',
    width: '30px',
    padding: 0,
    minWidth: '30px',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
  },
};

@observer
class ButtonControl extends Component {
  constructor(props) {
    super(props);
    this.refContainer = null;
  }

  setRefContainer = (element) => {
    this.refContainer = element;
    if (element) {
      DomEvent
        .disableClickPropagation(element);
    //  .disableScrollPropagation(element);
    }
  }

  render() {
    const { classes, handleClick } = this.props;
    return (
      <Control position="topleft" className={classes.root}>
        <div ref={this.setRefContainer}>
          <Button className={classes.button} onClick={handleClick} />
        </div>
      </Control>
    );
  }
}

export default withStyles(styles)(ButtonControl);
