import React from 'react';
import './App.css';
import EventList from './EventList/EventList'
import NetworkEventRepo, {NetworkHttpClient} from './Repo/NetworkEventRepo'

function App() {
  return (
    <div className="App">
      <EventList eventRepo={new NetworkEventRepo(new NetworkHttpClient())}/>
    </div>
  );
}

export default App;
