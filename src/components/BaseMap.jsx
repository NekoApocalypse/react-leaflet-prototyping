import React, { Component } from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  ZoomControl,
  LayersControl,
} from 'react-leaflet';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes, observer } from 'mobx-react';
// import { Typography } from '@material-ui/core';

import { layersProperty } from '../consts';
import InvisibleControl from './InvisibleControl';
import ButtonControl from './ButtonControl';

const { BaseLayer, Overlay } = LayersControl;

const styles = theme => ({
  root: {
    height: '100vh',
  },
});

// Renders a set of markers.
const MarkerSet = observer((props) => {
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
});

// The Base Map component.
const BaseMap = observer((props) => {
  const {
    position, zoom, markers, classes,
  } = props;
  return (
    <Map center={position} zoom={zoom} className={classes.root} zoomControl={false}>
      <InvisibleControl />
      <InvisibleControl position="topright" />
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap from web">
          <TileLayer
            {...layersProperty.osmWeb}
          />
        </BaseLayer>
        <BaseLayer name="OpenStreetMap Black and White from web">
          <TileLayer
            {...layersProperty.osmWebBlackWhite}
          />
        </BaseLayer>
      </LayersControl>
      <ZoomControl position="topleft" />
      <ButtonControl />
      <MarkerSet markers={markers} />
    </Map>
  );
});

BaseMap.propTypes = {
  position: PropTypes.arrayOrObservableArrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(BaseMap);
