import React, { Component } from 'react';
import {
  Map, TileLayer, Marker, Popup, Tooltip, ZoomControl,
} from 'react-leaflet';
import { withStyles } from '@material-ui/core/styles';
// import { Typography } from '@material-ui/core';

import InvisibleControl from './InvisibleControl';
import ButtonControl from './ButtonControl';

const styles = theme => ({
  root: {
    height: '100vh',
  },
});

const MarkerSet = (props) => {
  const { markers } = props;
  return (
    <React.Fragment>
      {markers.map(marker => (
        <Marker key={marker.id} position={marker.position}>
          <Tooltip>{marker.id}</Tooltip>
          <Popup>{`Position ${marker.position}`}</Popup>
        </Marker>
      ))}
    </React.Fragment>
  );
};

const BaseMap = (props) => {
  const {
    position, zoom, markers, classes,
  } = props;
  return (
    <Map center={position} zoom={zoom} className={classes.root} zoomControl={false}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <InvisibleControl />
      <ZoomControl position="topleft" />
      <ButtonControl />
      <MarkerSet markers={markers} />
    </Map>
  );
};

export default withStyles(styles)(BaseMap);
