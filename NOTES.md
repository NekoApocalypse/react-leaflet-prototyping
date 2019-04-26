# Known pitfalls:

## react-leaflet-control

By default, custom controls don't stop event propagation.

Refer to this if you want to stop propagation.

	import { DomEvent } from 'leaflet'
	import  React, { Component } from 'react'
	import Control from 'react-leaflet-control'

	class CustomZoom extends Component {

	  componentDidMount() {
	    DomEvent
	      .disableClickPropagation(this.container)
	      .disableScrollPropagation(this.container)
	  }

	  refContainer(el) {
	    this.container = el;
	  }

	  render() {
	    <Control position={topright} >
	      <div ref={::this.refContainer}> I am scrollable, and will not click on the map! </div>
	    </Control>
	  }
	}

Reference: https://github.com/LiveBy/react-leaflet-control/issues/2#issuecomment-234807270

## Other Problems:

* No Prop-Types.

* No unit tests.

