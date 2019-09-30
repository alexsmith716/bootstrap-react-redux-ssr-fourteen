import React, { Component, createRef } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';

import Loading from '../Loading/Loading';
import SearchBar from './components/SearchBar';
import Tables from './components/Tables';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import * as filterableTableActions from '../../redux/modules/filterableTable';

@connect(
  (state, { multireducerKey: key  }) => ({
    dropDownOptionSelected: state.filterableTableCollection[key].dropDownOptionSelected,
    loading: state.filterableTableCollection[key].loading,
    loaded: state.filterableTableCollection[key].loaded,
    data: state.filterableTableCollection[key].data,
    error: state.filterableTableCollection[key].error,
    errorResponse: state.filterableTableCollection[key].errorResponse,
    filterText: state.filterableTableCollection[key].filterText,
    inStockOnly: state.filterableTableCollection[key].inStockOnly,
  }),
  (dispatch, { multireducerKey: key  }) => bindActionCreators({ ...filterableTableActions }, dispatch, key)
)

// closure, global scope, function scope, block scope, arrow functions
// var, let, const and variable declarations in loops

// scope, Function Invocation, Method Invocation, Constructor Invocation

// been in an ES6 env so long i need REVIEW again!

// defined component (ES6 class)
// https://reactjs.org/docs/react-without-es6.html#autobinding

// Autobinding:

// =======================================================================================================
// In React components declared as ES6 classes, methods follow the same semantics as regular ES6 classes. 
// >>>>>>>>>>>>>>>> This means that they don’t automatically bind this to the instance <<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>   You’ll have to explicitly use .bind(this) in the constructor     <<<<<<<<<<<<<<<<<<<
// =======================================================================================================

// app ES6 environment is using:
//  "@babel/plugin-proposal-class-properties"
// which binds all methods
// So, no need to use .bind(this) in the constructor

// https://reactjs.org/docs/forms.html
// https://reactjs.org/docs/uncontrolled-components.html
// react controlled component onChange
// 'onChange' handler captures 'onChange' event for '<div>' and 'children'

class FilterableTable extends Component {

  // Autobinding NOT NEEDED > ES6 env > "@babel/plugin-proposal-class-properties"
  // constructor(props){
  //   super(props);
  //   // bind event handler method to an instance
  //   this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  //   this.handleInStockChange = this.handleInStockChange.bind(this);
  //   this.handleDropdownChange = this.handleDropdownChange.bind(this);
  // }

  // static propTypes = {
  //   // dropDownOptionSelected: PropTypes.string,
  //   // error: PropTypes.bool,
  //   // errorResponse: PropTypes.object,
  //   // loading: PropTypes.bool,
  //   // // data: PropTypes. .isRequired,
  //   // // optionsArray: PropTypes.array.isRequired,
  //   // // description: PropTypes.string,
  //   // filterText: PropTypes.string,
  //   // inStockOnly: PropTypes.bool,
  //   // selectedOption: PropTypes.func.isRequired,
  //   // load: PropTypes.func.isRequired,
  // };

  // static defaultProps = {};

  // state = {
  //   prevProps: this.props
  // };

  // ==============================================================================================


  // MOUNTING (instance of a component is being created and inserted into the DOM)
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  // constructor()

  // static getDerivedStateFromProps(props, state)

  // render()

  // RE: component that subscribes to an external event dispatcher
  // Event listeners are only safe to add after mount,
  // So they won't leak if mount is interrupted or errors.
  // External values could change between render and mount,
  // In some cases it may be important to handle this case.
  // componentDidMount() {
  //   const { data } = this.props;
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() > data1: ', data);
  //   if (data === null) {
  //     console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() > data2');
  //   } else {
  //     console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() > data3');
  //   }
  // }

  // ==============================================================================================


  // UPDATING (update was caused by changes to props or state. component is being re-rendered.)
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  // derive state:
  // enables a component to update its internal state as the result of changes in props
  // invoked right before calling the render method, both on the initial mount and on subsequent updates
  // invoked after a component is instantiated as well as before it is re-rendered
  // --------------------------------------------------------------------------------
  // static getDerivedStateFromProps(props, state) {
  //   const { prevProps } = state;
  //   // chance to compare incoming props to previous props
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > getDerivedStateFromProps() > prevProps: ', prevProps);
  //   // return {
  //   //   prevProps: props
  //   // };
  //   return null;
  // };

  // invoked before rendering when new props or state are being received (default: true)
  // method not called for initial render
  // let react know if a component's output is not affected by the current change in state or props
  // evaluate "true" ? re-render
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > shouldComponentUpdate()?? > nextProps: ', nextProps);
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > shouldComponentUpdate()?? > nextState: ', nextState);
  //   return nextProps;
  // };

  // render()

  // there may be delays between “render” phase lifecycles (like render) 
  //  and “commit” phase lifecycles (like getSnapshotBeforeUpdate and componentDidUpdate)

  // invoked before most recently rendered output is committed to the DOM
  // enables capturing information from the DOM (e.g. scroll position) before it is changed
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   return null;
  // }

  // invoked immediately after updating
  // not called for the initial render
  // component has been updated, so do something

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loading, load, dropDownOptionSelected } = this.props;

    // if (data === prevProps.data) {
    //   //
    // }

    // if (data !== prevProps.data) {
    //   //
    // }

    // LOAD_FAIL
    // if (error) {
    //   console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > LOAD_FAIL > error: ', error);
    //   console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > LOAD_FAIL > errorResponse: ', errorResponse);
    // }

    if (loading) {
      load({ request: dropDownOptionSelected });
    }

    // if (loaded && !loading) {
    //   //
    // }
  };

  // ==============================================================================================


  // UNMOUNTING (component is being removed from the DOM)
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  // componentWillUnmount() {
  //   //
  // }

  // ==============================================================================================


  // ERROR HANDLING (error during render, in a lifecycle, in the constructor of any child component)
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  // invoked after an error has been thrown by a descendant component
  // receives the error thrown as param and returns a value to update state
  // static getDerivedStateFromError(error) {
  //   // Update state so the next render will show the fallback UI.
  //   // return { hasError: true };
  //   return;
  // }

  // invoked after an error has been thrown by a descendant component
  // used for things like logging errors
  // componentDidCatch(error, info) {
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidCatch() > info.componentStack: ', info.componentStack);
  // }

  // ==============================================================================================

  handleDropdownChange = (e) => {
    const { actionHandleDropdownChange } = this.props;
    actionHandleDropdownChange({
      data: e.target.value
    });
  };

  handleFilterTextChange = (e) => {
    const { actionFilterTextChange } = this.props;
    actionFilterTextChange({
      data: e.target.value
    });
  };

  handleInStockChange = (e) => {
    const { actionInStockChange } = this.props;
    actionInStockChange({
      data: e.target.checked
    });
  };


  render() {

    const styles = require('./scss/FilterableTable.scss');

    const { loading, loaded, data, error, errorResponse,  dropDownOptionSelected }  = this.props;
    const { optionsArray, description, filterText, inStockOnly } = this.props;

    const loadingText = 'Fetching Requested Data ...';
    let items = null;

    let arrayLike = data && data.length > 0 ? arrayLike = true : arrayLike = null;

    if (data && (dropDownOptionSelected.indexOf('https') === 0 || dropDownOptionSelected.indexOf('http') === 0)) {

      if (arrayLike) {

        items = Array.from(data).map((item, index) => {

          let fromItem = item;
          let fromIndex = index;
          let ok = Object.keys(fromItem).map((item, index) => {
            return <div key={index}>{`${fromIndex}: ${item}: "${fromItem[item]}"`}</div>
          })

          return (
            <div key={index}>
              {ok}

              {fromIndex !== data.length-1 && (
                <div key={index}>---------</div>
              )}
            </div>
          )
        });

      } else {

        items = Object.keys(data).map((item, index) => {
          return <div key={index}>{`${index}: ${item}: "${data[item]}"`}</div>;
        });
      }
    }

    // ------------------------------------------------------------------------------------

    return (

      <div>

        {/* (>>>>>>>>>>>>>>>>>>>>>> DropdownSelect >>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className={`container-padding-border-radius-2`}>
          <div className="d-flex bg-color-ivory container-padding-border-radius-1">
            <div className="width-400">

              <DropdownSelect
                title={ description }
                optionsArray={ optionsArray }
                dropDownOptionSelected={ dropDownOptionSelected }
                onChange={ this.handleDropdownChange }
              />

            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {loading && (

            <div>
              <br/>
              <div className={`container-padding-border-radius-2`}>
                <div className="container-padding-border-radius-1">

                  <Loading text={ loadingText } />

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {error &&
          !loading && (

            <div>
              <br/>
              <div className={`container-padding-border-radius-2`}>
                <div className="container-padding-border-radius-1">

                  <div className="alert alert-danger text-center" role="alert">
                    <div>{errorResponse.documentation_url}</div>
                    <div>------------</div>
                    <div>{errorResponse.message}</div>
                  </div>

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> EXTERNAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {items !== null &&
          loaded &&
          !loading && (

            <div>
              <br/>
              <div className={`container-padding-border-radius-2`}>
                <div className="container-padding-border-radius-1">

                  {items}

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOCAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {items === null &&
          loaded &&
          !loading && (

            <div>
              <br/>
                <div className={`container-padding-border-radius-2`}>
                  <div className="container-flex bg-color-ivory container-padding-border-radius-1">
                    <div className="width-400">

                      <SearchBar 
                        filterText={ filterText }
                        inStockOnly={ inStockOnly }
                        onFilterTextChange={ this.handleFilterTextChange }
                        onInStockChange={ this.handleInStockChange }
                      />

                    </div>
                  </div>

                  <br />

                  <div>

                    <Tables 
                      tablesData={ data } 
                      filterText={ filterText }
                      inStockOnly={ inStockOnly }
                    />

                  </div>
                </div>
            </div>
          )}

      </div>
    );
  }
}

export default FilterableTable;
