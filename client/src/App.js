import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CountryDetail from './components/CountryDetail';
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route path='/home/countries/:id' component={CountryDetail}/>
          <Route path='/home/create-activity' component={CreateActivity}/>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
