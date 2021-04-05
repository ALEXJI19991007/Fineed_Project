import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import { NaviBar } from './components/Navibar';
import { NaviDrawer } from './components/NaviDrawer';
import { HomePage } from './pages/homePage/HomePage';
import { LoginPage } from './pages/loginPage/LoginPage';
import { RegisterPage } from './pages/registerPage/RegisterPage';
import { BarragePage } from './pages/barragePage/BarragePage';
import { ProfilePage } from './pages/profilePage/ProfilePage';
import { PromoVideoPage } from './pages/promoVideoPage/PromoVideoPage';
import { MyNewsPage } from "./pages/mynewsPage/MyNewsPage";
import { CompanyNewsPage } from './pages/companynewsPage/CompanyNewsPage';
import { VerificationPage} from './pages/verificationPage/VerificationPage'

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
          <Route path="/register" component={RegisterPage} />
          <Route path="/barrage" component={BarragePage} />
          <Route path="/mynews" component={MyNewsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/companynews" component={CompanyNewsPage}/>
          <Route path="/verify" component={VerificationPage}/>
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
