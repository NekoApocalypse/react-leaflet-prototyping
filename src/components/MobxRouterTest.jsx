import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('routing')
@inject('test')
@observer
class MobxRouterTest extends Component {
  render() {
    const { routing: { location, push, goBack } } = this.props;
    const {
      test:{
        testNumber,
        testString,
        magicNumber,
        anotherNumber,
        magicString,
        changeState,
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
      </React.Fragment>
    );
  }
}

export default withRouter(MobxRouterTest);
