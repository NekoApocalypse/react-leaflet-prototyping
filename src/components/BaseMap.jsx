import React, { Component, createRef } from 'react';
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
import { PropTypes as oPropTypes, observer } from 'mobx-react';
import PropTypes from 'prop-types';
// import { Typography } from '@material-ui/core';
import L from 'leaflet';
import 'leaflet-plugin-trackplayback/dist/leaflet.trackplayback';
import 'leaflet-plugin-trackplayback/dist/control.trackplayback';
import 'leaflet-plugin-trackplayback/dist/control.playback.css';
import 'leaflet.pm';

import { Marker as MapMarker } from '../stores/MapStore';
import { layersProperty } from '../consts';
import InvisibleControl from './InvisibleControl';
import ButtonControl from './ButtonControl';
import SimpleModal from './SimpleModal';

// const { BaseLayer, Overlay } = LayersControl;
const { BaseLayer } = LayersControl;

const styles = {
  root: {
    height: '100vh',
  },
};

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
@observer
class BaseMap extends Component {
  state = {
    modalOpen: false,
  }

  mapRef = createRef();

  mapElement = null;

  componentDidMount() {
    const map = this.mapRef.current.leafletElement;
    this.mapElement = map;
    this.initTestTrack();
  }

  initTestTrack = () => {
    const map = this.mapElement;
    const trackplayback = L.trackplayback(
      [
        { lat: 30, lng: 117, time: 1502520000, info: [{ key: 'shipname', value: 'example' }, { key: 'id', value: 'null' }] },
        { lat: 30, lng: 118, time: 1502530000, info: [{ key: 'shipname', value: 'example' }] },
        { lat: 30, lng: 119, time: 1502531000, info: [{ key: 'shipname', value: 'example' }] },
        { lat: 30, lng: 120, time: 1502532000, info: [{ key: 'shipname', value: 'example' }] },
        { lat: 30, lng: 121, time: 1502533000, info: [{ key: 'shipname', value: 'example' }] },
        { lat: 30, lng: 122, time: 1502534000, info: [{ key: 'shipname', value: 'example' }] },
        { lat: 30, lng: 123, time: 1502535000, info: [{ key: 'shipname', value: 'example' }] },
        { lat: 30, lng: 124, time: 1502536000, info: [{ key: 'shipname', value: 'example' }] },
        { lat: 30, lng: 125, time: 1502537000, info: [{ key: 'shipname', value: 'example' }] },
        { lat: 30, lng: 126, time: 1502538000, info: [{ key: 'shipname', value: 'example' }] },
      ],
      map,
    );
    const trackplaybackControl = L.trackplaybackcontrol(
      trackplayback,
      { position: 'bottomleft' },
    );
    trackplaybackControl.addTo(map);
  }

  handleModalOpen = () => {
    this.setState({
      modalOpen: true,
    });
  }

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  }

  handleCreateMarker = (position, id) => {
    const { handleCreateMarker } = this.props;
    handleCreateMarker(position, id);
  }

  createExampleMarker = () => {
    const { handleCreateMarker } = this.props;
    const examplePosition = [30, 110];
    const exampleId = '1';
    handleCreateMarker(examplePosition, exampleId);
  }

  setExampleMarker = () => {
    const { handleMoveMarker } = this.props;
    const exampleTarget = [40, 130];
    const exampleId = '1';
    handleMoveMarker(exampleTarget, exampleId);
  }

  render() {
    const {
      position, zoom, markers, classes,
    } = this.props;
    const {
      modalOpen,
    } = this.state;
    return (
      <React.Fragment>
        <Map
          center={position}
          zoom={zoom}
          className={classes.root}
          zoomControl={false}
          ref={this.mapRef}
        >
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
          <ButtonControl handleClick={this.handleModalOpen}>
            M
          </ButtonControl>
          <ButtonControl handleClick={this.createExampleMarker}>
            Add
          </ButtonControl>
          <ButtonControl handleClick={this.createExampleMarker}>
            Set
          </ButtonControl>
          <MarkerSet markers={markers} />
        </Map>
        <SimpleModal open={modalOpen} handleClose={this.handleModalClose} />
      </React.Fragment>
    );
  }
}

BaseMap.propTypes = {
  position: oPropTypes.arrayOrObservableArrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
  markers: oPropTypes.arrayOrObservableArrayOf(
    PropTypes.instanceOf(MapMarker),
  ).isRequired,
  handleCreateMarker: PropTypes.func.isRequired,
  handleMoveMarker: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BaseMap);
