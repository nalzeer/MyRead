import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import bookShelf from './bookShelf'
import Search from './Search'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

 componentDidMount() {
   BooksAPI.getAll().then((books) => {
      this.setState({books: books})
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
    const currentlyReading = this.state.books.filter((book) => book.shelfTitle === 'currentlyReading')
    const wantToRead = this.state.books.filter((book) => book.shelfTitle === 'wantToRead')
    const read = this.state.books.filter((book) => book.shelfTitle === 'read')

    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <div>
            <div className="list-books-title">
              <h1>myReadings</h1>
            </div>
            <bookShelf
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
                changeShelf={this.changeShelf}/>
          </div>
        )}/>
        <Route path="/search" render={({history}) => (
          <Search
            changeShelf={this.changeShelf}
            history={history}
            books={currentlyReading.concat(wantToRead, read)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
