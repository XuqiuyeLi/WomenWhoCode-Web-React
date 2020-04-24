import React from 'react'
import './App.css'
import NetworkEventRepo from './Repo/NetworkEventRepo'
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {AppRoutes} from './AppRoutes'
import {NetworkHttpClient} from './Repo/NetworkHttpClient'
import {NetworkAuthRepo} from './ Authentication/NetworkAuthRepo'

function App() {
    const browserHistory = createBrowserHistory()
    const networkHttpClient = new NetworkHttpClient(window.fetch.bind(window))
    const networkEventRepo = new NetworkEventRepo(networkHttpClient)
    const authRepo = new NetworkAuthRepo(networkHttpClient)

    return (
        <div className="App">
            <Router history={browserHistory}>
                <AppRoutes eventRepo={networkEventRepo} authRepo={authRepo}/>
            </Router>
        </div>
    )
}

export default App
