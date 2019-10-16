import { getContext } from 'recompose';
import PropTypes from 'prop-types';

const withApp = getContext({
  app: PropTypes.any
});

export default withApp;



// withContext():
// ========================

// withContext(
//   childContextTypes: Object,
//   getChildContext: (props: Object) => Object
// ): HigherOrderComponent

// Provides context to the component's children. 'childContextTypes' is an object of React prop types. 
// 'getChildContext()' is a function that returns the child context. 
// Use along with 'getContext()'.



// getContext():
// ========================

// getContext(
//   contextTypes: Object
// ): HigherOrderComponent

// Gets values from context and passes them along as props. 
// Use along with 'withContext()'.