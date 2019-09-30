import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
import * as temperatureCalculatorActions from '../../../redux/modules/temperatureCalculator';

import BoilingVerdict from './BoilingVerdict';
import TemperatureInput from './TemperatureInput';
import { toCelsius, toFahrenheit, tryConvert } from './stateHelpers';

// UI bindings
@connect(
  (state, { multireducerKey: key }) => ({ 
    temperature: state.temperatureCalculatorCollection[key].temperature,
    scale: state.temperatureCalculatorCollection[key].scale,
  }),
  (dispatch, { multireducerKey: key }) => bindActionCreators(temperatureCalculatorActions, dispatch, key)
)

class TemperatureCalculator extends Component {

  // static propTypes = {
  //   temperature: PropTypes.string.isRequired,
  //   scale: PropTypes.string.isRequired,
  //   celsiusChange: PropTypes.func.isRequired,
  //   fahrenheitChange: PropTypes.func.isRequired,
  // };

  render() {

    const { scale, temperature, celsiusChange, fahrenheitChange } = this.props;

    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    const styles = require('./scss/TemperatureCalculator.scss');

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex bg-color-ivory container-padding-border-radius-2">
            <div className="width-400">

              <form>

                <TemperatureInput
                  scale="c"
                  temperature={ celsius }
                  onTemperatureChange={ celsiusChange } />

                <TemperatureInput
                  scale="f"
                  temperature={ fahrenheit }
                  onTemperatureChange={ fahrenheitChange } />

              </form>

              <BoilingVerdict celsius={ parseFloat(celsius) } />

            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default TemperatureCalculator;
