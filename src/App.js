import React from 'react';
import './App.css';
import EventList from './EventList/EventList'
import NetworkEventRepo from './Repo/NetworkEventRepo'

function App() {
  return (
    <div className="App">
      <EventList eventRepo={new NetworkEventRepo()}/>
    </div>
  );
}

export default App;
