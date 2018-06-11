import React, { Componant } from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  render() {
    return(
      <div className="bookshelf">
        <h2 classNmae="bookshelf-title">{this.props.titleofshelf}</h2>
        <div className="bookshelf-books">
          <ol classNmae="books-grid">
            {
              this.props.listofbooks.map((book) => {
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
}

export default BookShelf
