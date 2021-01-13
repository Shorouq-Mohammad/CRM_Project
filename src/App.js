import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import ButtonAppBar from './components/ButtonAppBar';
import Clients from './components/Clients/Clients';
import Actions  from './components/Actions/Actions';
import Analytics from './components/Analytics/Analytics';
import './App.css'

function App() {
  return (
    <div id="app">
      <Router>
        <ButtonAppBar />
        <Route path="/clients" exact render={() => <Clients  />} />
        <Route path="/actions" exact render={() => <Actions />} />           
        <Route path="/analytics" exact render={() => <Analytics />} />
      </Router>
    </div>
  )
}

export default App
