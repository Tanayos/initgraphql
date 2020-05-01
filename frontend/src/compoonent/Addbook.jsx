import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation,getBookQuery } from './../queries/queries'

const AddBook = () => {
  const [addPostMutation] = useMutation(addBookMutation)
  const [bookAttribute, setBookAttribute] = useState({
    name: "",
    genre: "",
    authorId: ""
  });


  const { loading, error, data } = useQuery(getAuthorsQuery);
  if (loading) return <p>Author Loading...</p>;
  if (error) return <p>Error :(</p>;
  const AuthorLive = (
    <select onChange={(e) => setBookAttribute({ ...bookAttribute, authorId: e.target.value })}>
      <option>Select author</option>
      {data.authors.map(author => {
        // console.log("name : ", author.name)
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        )
      })}
    </select>

  );


  return (
    <div>
      <form id="add-book" onSubmit={e => {
          e.preventDefault();
          addPostMutation({
            variables: {
              name : bookAttribute.name,
              genre: bookAttribute.genre,
              authorId :  bookAttribute.authorId
            },
            //Permet de mettre à jour les données sans recharger la page en invoquant la queries 
            refetchQueries: [{query: getBookQuery}]
          })

        }}>

        <div className="field">
          <label>Book name:</label>
          <input type="text" value={bookAttribute.name} onChange={(e) => setBookAttribute({ ...bookAttribute, name: e.target.value })} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" value={bookAttribute.genre} onChange={(e) => setBookAttribute({ ...bookAttribute, genre: e.target.value })} />
        </div>

        <div className="field">
          <label>Author:</label>

          {AuthorLive}

        </div>
        <button>+</button>
      </form>
    </div>
  );
}
export default compose(
  graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
  graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook)
