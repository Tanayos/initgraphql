import React from 'react';
import BookList from './compoonent/BookList';
import Addbook from './compoonent/Addbook';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});


const  App = () => {
  return (
    <ApolloProvider client={client}>

    <div id="main" className="App">
      <h1>Read Ninja List </h1>
      <BookList />
      <Addbook />
    </div>

    </ApolloProvider>
  );
}

export default App;
