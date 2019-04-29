# Known pitfalls:

## react-leaflet-control

By default, custom controls don't stop event propagation.

Refer to this if you want to stop propagation.

	class ModalControl extends Component {
	  constructor(props) {
	    super(props);
	    this.refContainer = null;
	  }

	  setRefContainer = (element) => {
	  this.refContainer = element;
	    if (element) {
	      DomEvent
	        .disableClickPropagation(element)
	        .disableScrollPropagation(element);
	    }
	  }

	  render() {
	    const { classes } = this.props;
	    return (
	      <Control position="topleft">
	        <div ref={this.setRefContainer} className={classes.root}>
	          I am scrollable and will not click on the map!
	        </div>
	      </Control>
	    );
	  }
	}

Reference: https://github.com/LiveBy/react-leaflet-control/issues/2#issuecomment-234807270

**The example code is different from reference code**

**Reference code requires ES7 to work**

## ALL components should be observer

See *How Multiple Components Will Render* section in [Mobx Documentation](https://mobx.js.org/best/react.html).

Also, see `./components/MobxRouterTest.jsx` to see potential consequences.

When passing props to non-observer components, make sure the props are (at least logically) **immutable**.

## PropTypes with `@inject`

Declare propTypes as static inside the class.

See `/containers/MapPage.jsx`.

## Other Problems:

* No unit tests.

