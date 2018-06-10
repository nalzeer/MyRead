import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import './App.css'
import Book from './Book.js'
import bookShelf from './bookShelf.js'
import Search from './Search.js'


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
      this.setState(state => ({books: this.state.books.filter(b => b.id !== book.id).concat([book])}))

    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={({history}) => (
          <Search
           changeShelf={this.changeShelf}
           books={this.state.books}
          />
        )}/>
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books-title">
              <h1>myReads</h1>
            </div>
            <div className="list-books-content">
              <bookShelf TitleOfShelf='Currently Reading' listOfBooks={this.props.currentlyReading} changeShelf={this.props.changeShelf}/>
              <bookShelf TitleOfShelf='Want to Read' listOfBooks={this.props.wantToRead} changeShelf={this.props.changeShelf}/>
              <bookShelf TitleOfShelf='Read' listOfBooks={this.props.read} changeShelf={this.props.changeShelf}/>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
