import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { HelloWorld } from './components/HelloWorldExample';
import logo from './logo.svg';
import './App.css';
import { NaviBar } from './components/Navibar';
import { HomePage } from './pages/homePage/HomePage';


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Helmet titleTemplate="%s | Fineed" defaultTitle="Fineed" />
        <NaviBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
