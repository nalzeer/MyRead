import React from 'react'
import {Route, Link} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'


class BooksApp extends React.Component {
  state = {
    books: []
  }

 componentDidMount() {
   BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
 }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState((state) => ({books: state.books.filter(b => b.id !== book.id).concat([book])}))

    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/search" render={() => (<SearchBooks books={this.state.books} changeShelf={this.props.changeShelf}/>)}/>
          <Route exact path="/" render={() => (
            <div>
              <div className="list-books-title">
                <h1>myReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf title='Currently Reading' books={this.state.books.filter((book) => book.shelf === 'currentlyReading')} changeShelf={this.props.changeShelf}/>
                <BookShelf title='Want to Read' books={this.state.books.filter((book) => book.shelf === 'wantToRead')} changeShelf={this.props.changeShelf}/>
                <BookShelf title='Read' books={this.state.books.filter((book) => book.shelf === 'read')} changeShelf={this.props.changeShelf}/>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
