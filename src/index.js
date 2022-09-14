import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './DashBoard';
import LoginPage from './Pages/Login';
import { PrivateRoute } from './components/PrivateRouter';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/home/*' element={<DashBoard/>}></Route> */}
        <Route exact path='/*' element={<LoginPage></LoginPage>}></Route>
        <Route path='/home/*' element={<PrivateRoute><DashBoard/></PrivateRoute>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
