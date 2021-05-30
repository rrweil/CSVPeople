import React, { Component } from 'react';
import { Route } from 'react-router';
import  Layout  from './components/Layout';
import  Home from './Pages/Home';
import Generate from './Pages/Generate'
import Upload from './Pages/Upload';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/generate' component={Generate} />
        <Route exact path='/upload' component={Upload} />
      </Layout>
    );
  }
}
