import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  render() {
    return(
      <div className="bookshelf">
        <h2 classNmae="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book) => {
                return <li key={book.id}>
                  <Book book={book} changeShelf={this.props.changeShelf}/>
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
