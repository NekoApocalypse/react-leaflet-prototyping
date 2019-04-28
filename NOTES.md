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

** The example code is different from reference code **
** Reference code does not work without ES7 **

## ALL components should be observer

See *How Multiple Components Will Render* section in [https://mobx.js.org/best/react.html](MobX documentation).

Also, see `./components/MobxRouterTest.jsx` to see potential consequences.

When passing props to non-observer components, make sure the props are **immutable**.

Specifically: If parent component pass observable object `author` to child component, and child component access `author.name`,
parent component will not react to `author.name`.

## Other Problems:

* No Prop-Types.

* No unit tests.

