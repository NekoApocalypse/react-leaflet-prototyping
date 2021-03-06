import { observable, computed, action } from 'mobx';

class TestStore {
  @observable testNumber = 1;

  @observable testString = 'test';

  @observable author = {
    name: 'John',
    age: 23,
  }

  @computed get magicNumber() {
    return this.testNumber + 1;
  }

  @computed get anotherNumber() {
    return this.testNumber + 2;
  }

  @computed get magicString() {
    return `${this.testString} wow`;
  }

  @action.bound
  changeState(x, str) {
    this.testNumber += x;
    this.testString += str;
  }

  @action.bound
  changeAuthorName() {
    this.author.name += 'wow';
  }
}

export default TestStore;
