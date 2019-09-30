import React from 'react';

const ReadmeModal = () => {

  const styles = require('./ReadmeModal.scss');

  return (

    <div className={`app-modal modal fade ${styles.graySixteen}`} id="ReadmeModal" tabIndex="-1" role="dialog" aria-labelledby="appModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className={`modal-header d-flex flex-items-center flex-justify-between px-2 ${styles.ghostWhite}`}>

            <h5 className="modal-title pr-3" id="appModalLabel">
              <svg aria-hidden="true" className="octicon octicon-book svg-padding-right" height="22" version="1.1" viewBox="0 1 16 16" width="22">
                  <path d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z" fillRule="evenodd">
                  </path>
              </svg>
              README.js
            </h5>

            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">

            <div>
                <div>
                    <article>

                        <h2>
                          App 2020
                        </h2>

                        <hr/>

                        {/* ------------------------------ */}

                        <h3>
                          About
                        </h3>

                        <hr className={`${styles.hrStyle}`} />

                        <p>
                          A meeting place for the 2020 Primary! Cast your vote of opinion and discuss what's going on. Well, it was at first. Currently, the app is an evolving JS playground.
                        </p>
                        <p>
                          Why? Because I really enjoy the challenge and reward of modern JavaScript development. Instead of creating alot of small projects with a single focus, I just keep building upon this one. I have spent many, many, hours working on this "app" and therefore various aspects of modern JS development. I am no expert on this stuff and am occasionally very humbled by how complex the work is.
                        </p>
                        <p>
                          Initially inspired by Erik Rasmussen's, <a href="https://github.com/erikras" rel="nofollow">@erikras</a> and Kévin Berthommier's, <a href="https://github.com/bertho-zero" rel="nofollow">@bertho-zero</a> <a href="https://github.com/bertho-zero/react-redux-universal-hot-example" rel="nofollow">react-redux-universal-hot-example</a>. I have since directly used a few components and pieces of code from the original ("RouterTrigger.js", "configureStore.js") but have also re-worked and built out a fair amount as well including the app build process, webpack development build and css modules. I'm actually not 100% sure if the different approaches I used in my code are better than the original app's but it helps in better understanding what is going on with node, server/client, universal rendering, sync/async, transpiling, webpack, scss and bascially everything JavaScript.
                        </p>
                        <p>
                          Component "clientMiddleware.js" is interesting because that amazingly simple and effective solution goes back to the genius himself <a href="https://github.com/reduxjs/redux/issues/99#issuecomment-112212639" rel="nofollow">Best async serverside loading technique?</a>
                        </p>

                        <p>
                          This app is for Heroku. It does not include the development build code.
                        </p>

                        <p>
                          I had to heavily modify this app from a working, error-free desktop ENV to simply working on Heroku. It took days and days and days to get a handle on Heroku memory constraints. Much code was removed and some was added. All custom ('@font-face' and '@fortawesome') fonts had to be removed. It was extensive trial and error. If you see a "Status Code 404!" it means module was purposely removed from build. The Heroku "process" was interesting and a fair amount was learned from it. I have to say I am still not 100% sure original code is leak free!
                        </p>

                        <p>
                          Node.js memory usage for app pre-build <span className="pre-style-inline font-courier">process.memoryUsage()</span> (measured in bytes).
                        </p>

                        <pre className="pre-style" >
{`{
  rss: 60088320,
  heapTotal: 37453824,
  heapUsed: 24303632,
  external: 1215378
}`}
                        </pre>

                        <p>
                          Node.js memory usage for app post-build <span className="pre-style-inline font-courier">process.memoryUsage()</span> (measured in bytes).
                        </p>

                        <pre className="pre-style" >
{`{
  rss: 230256640,
  heapTotal: 174202880,
  heapUsed: 111070600,
  external: 4275037
}`}
                        </pre>

                        <p>
                          Post-build <span className="pre-style-inline font-courier">process.memoryUsage().heapUsed</span> is 105.96 MB.
                        </p>
                        
                        <h4>
                          Features (no particular order)
                        </h4>

                        <ul>
                          <li>
                            Production build (TerserPlugin, OptimizeCSSAssetsPlugin, workbox-webpack-plugin)
                          </li>
                          <li>
                            Development build (DllPlugin, Hot Module Replacement, React Hot Loading)
                          </li>
                          <li>
                            Babel ES+ transpiling (use future JavaScript today!)
                          </li>
                          <li>
                            CSS Modules (scope class names local or global -assert control over CSS)
                          </li>
                          <li>
                            react-helmet-async (asynchronous management to document head)
                          </li>
                          <li>
                            Sass (cool way to build CSS!)
                          </li>
                          <li>
                            TWBS Bootstrap (not a CSS guru, use this framework)
                          </li>
                        </ul>

                        {/* ------------------------------ */}

                        <h3>
                          Installation
                        </h3>

                        <hr className={`${styles.hrStyle}`} />

                        <h4>
                          Development
                        </h4>

                        <pre className="pre-style" >
                          git clone the app
                          <br />
                          cd into the app
                          <br />
                          yarn dlls
                          <br />
                          yarn dev
                          <br />
                          http://localhost:3000
                        </pre>

                        <h4>
                          Production
                        </h4>

                        <pre className="pre-style" >
                          git clone the app
                          <br />
                          cd into the app
                          <br />
                          yarn prod
                          <br />
                          https://localhost:8080
                        </pre>

                        {/* ------------------------------ */}

                        <h3>
                          Features To Observe
                        </h3>

                        <hr className={`${styles.hrStyle}`} />

                        <ul>
                          <li>
                            View source in the browser to see App's store/state (window.__PRELOADED)
                          </li>
                          <li>
                            Navigate and view source in the browser to observe head meta and title changes
                          </li>
                          <li>
                            View source in the browser to see what chunks are being sent on each page
                          </li>
                          <li>
                            Open Network tab to see imports being fetched
                          </li>
                          <li>
                            Open Storage tab, select Indexed DB to see locally persisted state (localforage)
                          </li>
                          <li>
                            Service Worker (production only): go offline, refresh browser and the app will reload, restore state and navigate (* limits when offline)
                          </li>
                          <li>
                            Google Workbox (production only): show Storage tab and select Cache Storage to see the workbox-precache (cached offline assets)
                          </li>
                          <li>
                            The fact it works on Heroku!
                          </li>
                        </ul>

                        {/* ------------------------------ */}

                        <h3>
                          To Do List
                        </h3>

                        <hr className={`${styles.hrStyle}`} />

                        <ol>
                          <li>
                            Iterate over and keep learning/refining usage of <a href="https://github.com/ReactTraining/react-router" rel="nofollow">React Router</a> components
                          </li>
                          <li>
                            Iterate over and keep learning/refining <a href="https://github.com/facebook/react" rel="nofollow">React</a> library (lifecycles/best practices)
                          </li>
                          <li>
                            Iterate over and keep learning/refining/understanding best practices of full stack build process (SSR/SPA)
                          </li>
                          <li>
                            Iterate over and keep learning/refining <a href="https://github.com/reduxjs/redux" rel="nofollow">Redux</a> (initial state/state/actions/reducer)
                          </li>
                          <li>
                            Iterate over and keep learning/refining state data fetching, caching, offline storage techniques (redial/localforage/lru-memoize/serviceWorker)
                          </li>
                          <li>
                            Handle errors (log & throw)
                          </li>
                          <li>
                            Re-build/expand/refine component LineChart (build on D3 experience)
                          </li>
                          <li>
                            Further work on serviceWorker, Progressive Web App and Workbox
                          </li>
                          <li>
                            Implement <a href="https://github.com/microsoft/TypeScript" rel="nofollow">TypeScript</a> type checking
                          </li>
                          <li>
                            Research Immutable.JS with redux and normalizing state/data
                          </li>
                          <li>
                            Review Redux application memory usage/garbage collection
                          </li>
                          <li>
                            Go over and control scrolling and positioning (nav dropdown)
                          </li>
                          <li>
                            Get mongo & mongoose back up and running
                          </li>
                          <li>
                            Much more to do since app is a work in progress
                          </li>
                        </ol>
                    </article>
                </div>
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReadmeModal;
