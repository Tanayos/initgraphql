import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import BookDetails from './BookDetails'
// import { gql } from 'apollo-boost';
import {getBookQuery} from './../queries/queries'

const BookList = ()=> {
    const { loading, error, data } = useQuery(getBookQuery);
    const [bookDetailsAttribute, setBookDetailsAttribute] = useState({
        selected :  null
    })
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const bookLive = (
        <ul id="book-list">
            { data.books.map(book => {
                // console.log(book.id)
                 return(

                <li key={book.id} onClick={(e)=>{
                    setBookDetailsAttribute({...bookDetailsAttribute ,selected : book.id})
                }}>
                     {book.name}
                </li>
                 )
             })
            }

        </ul>

    )
        console.log(getBookQuery)
  return (
    <div>
        {bookLive}
        <BookDetails bookId={bookDetailsAttribute.selected}/>
    </div>
  );
}

export default BookList;