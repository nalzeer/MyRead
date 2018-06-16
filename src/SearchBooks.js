import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {
  state = {
    bookResults: [],
    searchQuery: ''
  }

  updateSearch = (query) => {
    this.setState({searchQuery: query})
    if (query <= 0) {
      this.setState({bookResults: []});
      return
    }
    if (query.length > 1){
      BooksAPI.search(query.trim(), 20).then(bookResults => {
            if (bookResults.error) {
                bookResults = [];
            }
            bookResults = bookResults.map((book) => {
                const bookShelf = this.props.books.find(b => b.id === book.id)
                if (bookShelf) {
                    book.shelf = bookShelf.shelf;
                }
                else {
                  book.shelf = 'none'
                }
                return book
            })
            this.setState({bookResults});
        })
      }
    // this.setState({searchQuery: query})
    // if (query.length > 1) {
    //   BooksAPI.search(query.trim(),20).then((books) => {
    //     // this.shelfz(books)
    //     this.setState({bookResults: books})
    //   }).catch(() => {
    //     this.setState({bookResults: []})
    //   })
    // }
  }

  // shelfz = (books) => {
  //   if(books){
  //     books.map((book) => book.shelf = 'null')
  //   }
  // }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.searchQuery} onChange={(event) => this.updateSearch(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.bookResults.map((book) => (
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

export default SearchBooks
