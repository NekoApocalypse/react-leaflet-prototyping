import React from 'react';
import Control from 'react-leaflet-control';

// A place holdercontrol to push other controls around
const InvisibleControl = (props) => {
  const { position, height } = props;
  return (
    <Control position={position}>
      <div style={{ height }} />
    </Control>
  );
};

InvisibleControl.defaultProps = {
  position: 'topleft',
  height: '64px',
};

export default InvisibleControl;