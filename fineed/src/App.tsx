import React from 'react';
import { RecoilRoot } from 'recoil';
import {HelloWorld} from './components/HelloWorldExample';
import logo from './logo.svg';
import './App.css';
import {NaviBar} from './components/Navibar';
import { HomePage } from './pages/HomePage';


function App() {
  return (
    <RecoilRoot>
      <NaviBar/>
      <HomePage/>
      {/* <HelloWorld/> */}
    </RecoilRoot>
  );
}

export default App;
