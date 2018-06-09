import React, { Componant } from 'react'
// import PropTypes from 'prop-types'
import Book from './Book'

function bookShelf (props) {
  return(
    <div className="bookshelf">
      <h2 classNmae="bookshelf-title">{props.TitleOfShelf}</h2>
      <div className="bookshelf-books">
        <ol classNmae="books-grid">
          {
            this.props.listOfBooks.map((book) => {
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
