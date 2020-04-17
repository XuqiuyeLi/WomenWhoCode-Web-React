import React from 'react'
import './App.css'
import NetworkEventRepo, {NetworkHttpClient} from './Repo/NetworkEventRepo'
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import DefaultWWCRouter from './Router/DefaultWWCRouter'
import {AppRoutes} from './AppRoutes'

function App() {
  const browserHistory = createBrowserHistory()
  let networkHttpClient = new NetworkHttpClient(window.fetch.bind(window))
  const networkEventRepo = new NetworkEventRepo(networkHttpClient)
  const wwcRouter = new DefaultWWCRouter(browserHistory)

  return (
      <div className="App">
          <Router history={browserHistory}>
              <AppRoutes eventRepo={networkEventRepo} wwcRouter={wwcRouter}/>
          </Router>
      </div>
  )
}

export default App
