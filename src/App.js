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
    const listofbooks = this.props.listofbooks
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/search" render={() => (<SearchBooks bookResults={this.state.books} onChange={this.props.updateSearch} />)}/>
          <Route exact path="/" render={() => (
            <div>
              <div className="list-books-title">
                <h1>myReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf titleofshelf='Currently Reading' listofbooks={this.state.books.filter((book) => book.shelf === 'currentlyReading')} changeShelf={this.props.changeShelf}/>
                <BookShelf titleofshelf='Want to Read' listofbooks={this.state.books.filter((book) => book.shelf === 'wantToRead')} changeShelf={this.props.changeShelf}/>
                <BookShelf titleofshelf='Read' listofbooks={this.state.books.filter((book) => book.shelf === 'read')} changeShelf={this.props.changeShelf}/>
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
