import React, { Component } from 'react'
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
          <Route exact path="/search" render={() => (<SearchBooks books={this.state.books} onChange={this.changeShelf}/>)}/>
          <Route exact path="/" render={() => (
            <div>
              <div className="list-books-title">
                <h1>myReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf books={this.state.books.filter((book) => book.shelf === 'currentlyReading')} onChange={this.changeShelf}/>
                <BookShelf books={this.state.books.filter((book) => book.shelf === 'wantToRead')} onChange={this.changeShelf}/>
                <BookShelf books={this.state.books.filter((book) => book.shelf === 'read')} onChange={this.changeShelf}/>
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
