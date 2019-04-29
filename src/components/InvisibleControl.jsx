import React from 'react';
import Control from 'react-leaflet-control';
import { observer } from 'mobx-react';

// A placeholder control to push other controls around
const InvisibleControl = observer((props) => {
  const { position, height } = props;
  return (
    <Control position={position}>
      <div style={{ height }} />
    </Control>
  );
});

InvisibleControl.defaultProps = {
  position: 'topleft',
  height: '64px',
};

export default InvisibleControl;
