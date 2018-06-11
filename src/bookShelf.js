import React, { Componant } from 'react'
import Book from './Book'

function bookShelf (props) {
  return(
    <div className="bookshelf">
      <h2 classNmae="bookshelf-title">{this.props.TitleOfShelf}</h2>
      <div className="bookshelf-books">
        <ol classNmae="books-grid">
          {
            props.listOfBooks.map((book) => {
              return <li key={book.id}>
                <Book book={this.props.book} changeShelf={this.props.changeShelf}/>
              </li>
            })
          }
        </ol>
      </div>
    </div>
  )
}

export default bookShelf
