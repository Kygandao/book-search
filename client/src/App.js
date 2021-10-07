import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//Apollo imports
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

//Create Client
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id-token')
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: localStorage.getItem('token') || null,
      }
    }))
  }
})


function App() {
  return (
    <ApolloProvider>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
