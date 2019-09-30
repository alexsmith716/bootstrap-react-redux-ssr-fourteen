import multireducer from 'multireducer';

// isolate concerns within a Redux application (modules)
// https://github.com/erikras/ducks-modular-redux

// import auth from './modules/auth';
import counterMultiReducer from './modules/counterMultiReducer';
import counterPreloaded from './modules/counterPreloaded';
import device from './modules/device';
import filterableTable from './modules/filterableTable';
import info from './modules/info';
import lineChart from './modules/lineChart';
// import notifs from './modules/notifs';
// import online from './modules/online';
import temperatureCalculator from './modules/temperatureCalculator';

// state shape
export default function rootReducer() {
  return {
    online: (v = true) => v,
    counterCollection: multireducer({
      AboutOneMultireducer1: counterMultiReducer,
      AboutTwoMultireducer1: counterMultiReducer,
      AboutTwoMultireducer2: counterMultiReducer,
      AboutTwoMultireducer3: counterMultiReducer,
    }),
    counterPreloaded,
    device,
    filterableTableCollection: multireducer({
      AboutOneMultireducerFilterableTable1: filterableTable,
      AboutOneMultireducerFilterableTable2: filterableTable,
    }),
    info,
    lineChartCollection: multireducer({
      AboutTwoMultireducerLineChart1: lineChart,
      AboutTwoMultireducerLineChart2: lineChart,
    }),
    temperatureCalculatorCollection: multireducer({
      AboutOne1: temperatureCalculator,
      AboutOne2: temperatureCalculator,
      AboutTwo1: temperatureCalculator,
      AboutTwo2: temperatureCalculator,
    }),
  };
}
