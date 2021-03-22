import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import { NaviBar } from './components/Navibar';
import { NaviDrawer } from './components/NaviDrawer';
import { HomePage } from './pages/homePage/HomePage';
import { LoginPage } from './pages/loginPage/LoginPage';
import { BarragePage } from './pages/barragePage/BarragePage';
import { ProfilePage } from './pages/profilePage/ProfilePage';
import { PromoVideoPage } from './pages/promoVideoPage/PromoVideoPage';
import { MyNewsPage } from "./pages/mynewsPage/MyNewsPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Helmet titleTemplate="%s | Fineed" defaultTitle="Fineed" />
        <NaviBar />
        <NaviDrawer/>
        <Switch>
          <Route exact path="/" component={PromoVideoPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/barrage" component={BarragePage} />
          <Route path="/mynews" component={MyNewsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/home" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
