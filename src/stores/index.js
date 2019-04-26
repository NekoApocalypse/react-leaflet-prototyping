import { RouterStore } from 'mobx-react-router';
import TestStore from './TestStore';
import MapStore from './MapStore';

export default class RootStore {
  constructor() {
    this.routerStore = new RouterStore();
    this.testStore = new TestStore();
    this.mapStore = new MapStore();
  }
}
