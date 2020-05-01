import React from 'react';
import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
// import { graphql } from 'react-apollo';
import { getBookQueryDetails } from './../queries/queries'


const BookDetails = ({ bookId }) => {
    const { loading, error, data } = useQuery(getBookQueryDetails, {

        variables: {
            id: bookId
        }
    });
    if (loading) return <div id="book-details">
                        <p> Loading...</p>;
                        </div>
    if (error) return <div id="book-details">
                    <p>Error :(</p>
                    </div>
    // if(data) return <p>test</p>
    console.log(data)
    if(data.book == null) return <div id="book-details">
        <p>No book selected</p>
        </div>

    if(data.book !== null) return (
        <div id="book-details">
            <h2>{data.book.name}</h2>
            <p>{data.book.genre}</p>
            <p>{data.book.author.name}</p>
            <p>All book this author</p>
            <ul className="other-books">
                {data.book.author.books.map(item =>{
                return <li key={item.id}>{item.name}</li>
                })}
            </ul>

        </div>
    )



    // if (data) return <h2>{data.name}</h2>




    return (
        <div id="book-details">
            <p>Output book details</p>
        </div>
    )

}

export default BookDetails