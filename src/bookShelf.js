import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  state = {}
  render() {
    const {books, changeShelf} = this.props
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book) => {
                return <li key={book.id}>
                  <Book book={book} changeShelf={changeShelf}/>
                </li>
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
