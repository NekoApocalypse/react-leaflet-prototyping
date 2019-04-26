import { observable } from 'mobx';
import uuid from 'node-uuid';

const defaultPosition = [33.0, 120.7];
const defaultZoom = 4;

export class Marker {
  id = null;

  store = null;

  @observable position = null;

  constructor({ store, position, id = uuid.v4() } = {}) {
    this.store = store;
    this.id = id;
    this.position = position;
  }

  delete() {
    this.store.removeMarker(this);
  }
}

class MapStore {
  @observable initViewPort = {
    position: defaultPosition,
    zoom: defaultZoom,
  };

  @observable markers = [];

  createMarker(position, id = null) {
    const params = {
      store: this,
      position,
    };
    if (id) params.id = id;
    const marker = new Marker(params);
    this.markers.push(marker);
  }

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
