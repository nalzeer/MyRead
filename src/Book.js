import React, {Componant} from 'react'

class Book extends React.Component {
  changeBook = (e) => {
    this.props.changeShelf(this.props.book, e.target.value)
  }
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${ this.props.book.imageLinks.smallThumbnail }")`}}></div>
          <div className="book-shelf-changer">
            <select defaultValue={this.props.book.shelf} onChange={this.props.changeBook}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(", ") : ""}</div>
      </div>
    )
  }
}

export default Book
