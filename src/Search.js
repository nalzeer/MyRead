import React, {Componant} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book.js'
import bookShelf from'./bookShelf.js'
import * as BooksAPI from './BooksAPI.js'

class Search extends React.Componant {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }
  // state = {
  //   bookResults: [],
  //   query: ''
  // }
  //
  // updateSearch = (query) => {
  //   this.setState({query: query.trim()})
  //   if (query === 0) {
  //     this.setState({bookResults: []})
  //   }
  //   if (query !== 0){
  //     BooksAPI.search(query, 10).then(bookResults => {
  //       if (bookResults.error) {
  //         bookResults = []
  //       }
  //       bookResults = bookResults.map((book) => {
  //         const shelfOfBook = this.props.books.find(bk => bk.id === book.id)
  //         if (shelfOfBook) {
  //           book.shelf = shelfOfBook.shelf
  //         }
  //         return book
  //       })
  //       this.setState({bookResults})
  //     })
  //   }
  // }

  render() {
    const { books } = this.props
    const { query } = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('title'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
            </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
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
