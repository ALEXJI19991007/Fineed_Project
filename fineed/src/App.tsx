import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { HelloWorld } from './components/HelloWorldExample';
import logo from './logo.svg';
import './App.css';
import { NaviBar } from './components/Navibar';
import { NaviDrawer } from './components/NaviDrawer';
import { HomePage } from './pages/homePage/HomePage';
import { LoginPage } from './pages/loginPage/LoginPage';


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Helmet titleTemplate="%s | Fineed" defaultTitle="Fineed" />
        <NaviBar />
        <NaviDrawer/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
