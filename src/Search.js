import React, {Componant} from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import bookShelf from'./bookShelf'
import * as BooksAPI from './BooksAPI'

class Search extends React.Componant {
  // static propTypes = {
  //   books: PropTypes.array.isRequired,
  //   onChange: PropTypes.func.isRequired
  // }
  state = {
    bookResults: [],
    query: ''
  }

  updateSearch = (query) => {
    this.setState({query: query.trim()})
    if (query === 0) {
      this.setState({bookResults: []})
    }
    if (query !== 0){
      BooksAPI.search(query, 10).then(bookResults => {
        if (bookResults.error) {
          bookResults = []
        }
        bookResults = bookResults.map((book) => {
          const shelfOfBook = this.props.books.find(bk => bk.id === book.id)
          if (shelfOfBook) {
            book.shelf = shelfOfBook.shelf
          }
          return book
        })
        this.setState({bookResults})
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateSearch(event.target.value)}/>
            </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.bookResults && this.state.bookResults.map(book => (
              <li key={book.id}>
                <Book book={book} changeShelf={this.props.changeShelf}/>
              </li>
             ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
