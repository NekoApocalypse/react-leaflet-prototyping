import { observable, action, computed } from 'mobx';
import uuid from 'node-uuid';

const defaultPosition = [33.0, 120.7];
const defaultZoom = 4;
const frameInterval = 100;

export class Marker {
  id = null;

  store = null;

  @observable position = null;

  constructor({ store, position, id = uuid.v4() } = {}) {
    this.store = store;
    this.id = id;
    this.position = position;
  }

  @action.bound
  delete() {
    this.store.removeMarker(this);
  }

  // set new position for marker
  @action.bound
  setPosition(position) {
    this.position = position;
  }

  // move marker to new position with animation
  @action.bound
  moveTo(newPosition, interVal) {
    const frames = Math.floor(interVal / frameInterval);
    const deltaX = newPosition[0] - this.position[0];
    const deltaY = newPosition[1] - this.position[1];
    const oldX = this.position[0];
    const oldY = this.position[1];
    let now = 0;
    let handle = null;
    const handler = () => {
      const newX = deltaX * (now / frames) + oldX;
      const newY = deltaY * (now / frames) + oldY;
      if (now === frames) {
        clearInterval(handle);
        return;
      }
      now += 1;
      this.setPosition([newX, newY]);
    };
    handle = setInterval(handler, frameInterval);
  }
}

class MapStore {
  @observable initViewPort = {
    position: defaultPosition,
    zoom: defaultZoom,
  };

  @observable markers = [];

  @computed get markersIds() {
    return (this.markers.map(marker => marker.id));
  }

  @action.bound
  createMarker(position, id = null) {
    // Problem: marker collision?
    const params = {
      store: this,
      position,
    };
    if (id) params.id = id;
    const marker = new Marker(params);
    this.markers.push(marker);
    return marker;
  }

  @action.bound
  removeMarker(marker) {
    this.markers.splice(this.markers.indexOf(marker), 1);
    // marker.dispose();
  }

  constructor() {
    this.createMarker(defaultPosition);
    this.createMarker([33.4, 121]);
    this.createMarker([36.0, 124]);
  }
}

export default MapStore;
