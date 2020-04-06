import React from 'react';
import './App.css';
import EventList from './EventList/EventList'
import EventRepo from './Repo/EventRepo'

function App() {
  return (
    <div className="App">
      <EventList eventRepo={new EventRepo()}/>
    </div>
  );
}

export default App;
