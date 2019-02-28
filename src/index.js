import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import App from './App';
//import BookList from './BookList'
import PersonList from './PersonList'




ReactDOM.render(
    <Router>
    <div>
     <Route exact path='/' component={PersonList} />
    </div>
   </Router>
    ,document.getElementById('root'));

