import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

// dereferencing does not work if it is not an observer
const NonObserverChild = (props) => {
  const { author } = props;
  return <p>{`Author Name: ${author.name}`}</p>;
};

// dereferencing works
const ObserverChild = observer(NonObserverChild);

@inject('rootStore')
@observer
class MobxRouterTest extends Component {
  constructor(props) {
    super(props);
    // will NOT react to anything because constructor is NOT listened.
    // !IMPORTANT! This is WRONG code. For demonstration purpose only.
    this.authorName = props.rootStore.testStore.author.name;
  }

  render() {
    const { 
      rootStore: {
        routerStore: {
          location,
          push,
          goBack,
        },
        testStore: {
          testNumber,
          testString,
          magicNumber,
          anotherNumber,
          magicString,
          changeState,
          changeAuthorName,
          author,
        },
      }
    } = this.props;
    return (
      <React.Fragment>
        <div>
          <span>
            {`Current pathname: ${location.pathname}`}
          </span>
          <button onClick={() => push('/test')} type="button">Change url</button>
          <button onClick={() => goBack()} type="button">Go Back</button>
        </div>
        <div>
          <p>{`Test Number: ${testNumber}`}</p>
          <p>{`Test String: ${testString}`}</p>
          <p>{`Magic Number: ${magicNumber}`}</p>
          <p>{`Another Number: ${anotherNumber}`}</p>
          <p>{`Magic String: ${magicString}`}</p>
          <button onClick={() => changeState(1, 'wow')} type="button">Change Store</button>
        </div>
        <div>
          <h4>Wrapper will NOT react to author.name but will react to author</h4>
          <h5>This component will react to author.name because it is an observer</h5>
          <ObserverChild author={author} />
          <h5>This component will NOT react to author.name because it is NOT an observer</h5>
          <NonObserverChild author={author} />
          <h5>This node will NOT react to anything because it is reading from a cache</h5>
          <div>{`Author Name: ${this.authorName}`}</div>
          <button onClick={changeAuthorName} type="button">Change Author Name</button>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(MobxRouterTest);
