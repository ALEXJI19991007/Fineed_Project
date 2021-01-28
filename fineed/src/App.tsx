import React from 'react';
import { RecoilRoot } from 'recoil';
import {HelloWorld} from './components/HelloWorldExample';
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <RecoilRoot>
      <div>Fuck the config</div>
      <HelloWorld/>
    </RecoilRoot>
  );
}

export default App;
