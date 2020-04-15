import React from 'react'
import './App.css'
import EventList from './EventList/EventList'
import NetworkEventRepo, {NetworkHttpClient} from './Repo/NetworkEventRepo'
import {Route, Router, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import EventDetail from './EventDetail/EventDetail'
import DefaultWWCRouter from './Router/DefaultWWCRouter'
import AddEventForm from './EventList/AddEventForm'

function App() {
  const browserHistory = createBrowserHistory()
  let networkHttpClient = new NetworkHttpClient(window.fetch.bind(window))
  const networkEventRepo = new NetworkEventRepo(networkHttpClient)
  const wwcRouter = new DefaultWWCRouter(browserHistory)

  return (
    <Router history={browserHistory}>
      <div className="App">
        <Switch>
          <Route path='/events/:eventId'>
            <EventDetail/>
          </Route>
          <Route path='/add-event'>
            <AddEventForm eventRepo={networkEventRepo}/>
          </Route>
          <Route path='/events'>
            <EventList eventRepo={networkEventRepo}
                       router={wwcRouter}/>
          </Route>
          <Route path='/'>
            <EventList eventRepo={networkEventRepo}
                       router={wwcRouter}/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
