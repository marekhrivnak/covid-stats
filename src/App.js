import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import Country from './components/Country';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
    return(
      <Router>
            <NavBar/>
            <Switch>
              <Route path = "/" exact component = {WelcomeScreen} />
              <Route path = "/country/:id"  render={(props) => <Country {...props} />} />
            </Switch>
            <Footer/>
      </Router>

    );

}

export default App;