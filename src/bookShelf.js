import React, { Componant } from 'react'
import Book from './Book.js'

function bookShelf (props) {
  return(
    <div className="bookshelf">
      <h2 classNmae="bookshelf-title">{props.TitleOfShelf}</h2>
      <div className="bookshelf-books">
        <ol classNmae="books-grid">
          {
            props.listOfBooks.map((book) => {
              return <li key={book.id}>
                <Book book={book} changeShelf={props.changeShelf}/>
              </li>
            })
          }
        </ol>
      </div>
    </div>
  )
}

export default bookShelf
