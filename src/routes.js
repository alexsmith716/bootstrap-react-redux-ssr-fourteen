import {
  App,
  Home,
  NotFound,
  CodeSampleLocalStart,
  CodeSampleHerokuStart,
  CodeSampleWebpackProdClient,
  CodeSampleWebpackProdServer,
  CodeSampleAboutLoadable,
  CodeSampleServer,
  CodeSampleStylesGlobalScss,
  CodeSampleApp,
  CodeSampleAboutOne,
  CodeSampleFilterabletable,
  CodeSampleReduxFilterabletable,
  CodeSampleInfoBar,
  CodeSampleReduxInfo,
  CodeSampleReduxLineChart,
  CodeSampleReduxCounterMuliReducer,
  CodeSampleReduxCounterPreloaded,
  CodeSampleMockAPI,
  CodeSampleTimeElapsedClass,
  CodeSampleTimeElapsedClassTwo,
  CodeSampleTimeElapsedModule,
} from './containers';

import About from './containers/About/Loadable';
import AboutOne from './containers/AboutOne/Loadable';
import AboutTwo from './containers/AboutTwo/Loadable';
import AboutThree from './containers/AboutThree/Loadable';
import AboutFour from './containers/AboutFour/Loadable';
import StickyFooter from './containers/StickyFooter/Loadable';
import Login from './containers/Login/Loadable';
import Register from './containers/Register/Loadable';

import './theme/scss/global/styles.global.scss';

const routes = [{
  component: App,
  routes: [
    { path: '/', exact: true, component: Home },
    { path: '/about', component: About },
    { path: '/aboutone', component: AboutOne },
    { path: '/abouttwo', component: AboutTwo },
    { path: '/aboutthree', component: AboutThree },
    { path: '/aboutfour', component: AboutFour },
    { path: '/stickyfooter', component: StickyFooter },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/codesamplelocalstart', component: CodeSampleLocalStart },
    { path: '/codesampleherokustart', component: CodeSampleHerokuStart },
    { path: '/codesamplewebpackprodclient', component: CodeSampleWebpackProdClient },
    { path: '/codesamplewebpackprodserver', component: CodeSampleWebpackProdServer },
    { path: '/codesampleaboutloadable', component: CodeSampleAboutLoadable },
    { path: '/codesampleserver', component: CodeSampleServer },
    { path: '/codesamplestylesglobalscss', component: CodeSampleStylesGlobalScss },
    { path: '/codesampleapp', component: CodeSampleApp },
    { path: '/codesampleaboutone', component: CodeSampleAboutOne },
    { path: '/codesamplefilterabletable', component: CodeSampleFilterabletable },
    { path: '/codesamplereduxfilterabletable', component: CodeSampleReduxFilterabletable },
    { path: '/codesampleinfobar', component: CodeSampleInfoBar },
    { path: '/codesamplereduxinfo', component: CodeSampleReduxInfo },
    { path: '/codesamplereduxlinechart', component: CodeSampleReduxLineChart },
    { path: '/codesamplereduxcountermultireducer', component: CodeSampleReduxCounterMuliReducer },
    { path: '/codesamplereduxcounterpreloaded', component: CodeSampleReduxCounterPreloaded },
    { path: '/codesampleutilsmockapi', component: CodeSampleMockAPI },
    { path: '/codesampleutilstimeelapsedclass', component: CodeSampleTimeElapsedClass },
    { path: '/codesampleutilstimeelapsedclasstwo', component: CodeSampleTimeElapsedClassTwo },
    { path: '/codesampleutilstimeelapsedmodule', component: CodeSampleTimeElapsedModule },
    { component: NotFound }
  ]
}];

export default routes;
