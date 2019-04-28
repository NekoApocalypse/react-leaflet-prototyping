import React, { Component } from 'react';
import L from 'leaflet';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

const styles = theme => ({
  root: {
    height: '400px',
  },
});

@observer
class MapTest extends Component {
  componentDidMount() {
    const myMap = L.map('testMap').setView([51.505, -0.09], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(myMap);
  }

  render() {
    const { classes } = this.props;
    return <div id="testMap" className={classes.root} />;
  }
}

export default withStyles(styles)(MapTest);
