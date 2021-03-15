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
import { HistoryPage } from './pages/historyPage/HistoryPage';
import { BarragePage } from './pages/barragePage/BarragePage';
import { ProfilePage } from './pages/profilePage/ProfilePage';
import { PromoVideoPage } from './pages/promoVideoPage/PromoVideoPage';

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
          <Route path="/barrage" component={BarragePage} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/promo" component={PromoVideoPage} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
