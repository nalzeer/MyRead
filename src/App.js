import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import bookShelf from './bookShelf'
import Search from './Search'


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
    BooksAPI.update(book, shelf).then(
      this.setState(sate => (
        {books: this.state.books.map(bk => {
          if(bk.id === book.id) {
            bk.shelf = shelf
            return book
          } else {
            return bk
          }
        })}
      ))
    )
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books-title">
              <h1>myReadings</h1>
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
        <Route exact path="/search" render={({history}) => (
          <Search
            changeShelf={this.changeShelf}
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
