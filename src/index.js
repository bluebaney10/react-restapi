import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PersonList from './PersonList'
import EditPerson from './components/EditPerson'
import CreatePerson from './components/CreatePerson'





ReactDOM.render(
    <Router>
    <div>
     <Route exact path='/' component={PersonList} />
     <Route path='/create' component={CreatePerson} />
     <Route path='/edit/:id' component={EditPerson} />
    </div>
   </Router>
    ,document.getElementById('root'));

