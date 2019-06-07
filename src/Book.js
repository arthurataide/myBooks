import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NoImage from './icons/noimage.png'

class Book extends Component {
  static propTypes = {
        bookObject: PropTypes.array.isRequired,
        onUpdateBookShelf: PropTypes.func.isRequired,
      	backgroundHandle: PropTypes.func.isRequired
      }
  handleClick = (e, book) =>{
        const {onUpdateBookShelf} = this.props;
        e.preventDefault();
        const value = e.target.value;
        onUpdateBookShelf(book, value);
    }

  render(){
    const {bookObject, backgroundHandle} = this.props
    return (
		<li key={bookObject.id}>
        	<div className="book">
            	<div className="book-top">
                  <div className="book-cover" style={{width: 128, height: 193, 
                  backgroundImage: `url(${ backgroundHandle(bookObject.imageLinks) ? bookObject.imageLinks.thumbnail : NoImage })`}}></div>
                  <div className="book-shelf-changer">
                      <select value={bookObject.shelf} onChange={(e) => this.handleClick(e, bookObject)}>
                          <option value="move" disabled>Choose the Status...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                      </select>
                  </div>
                </div>
                <div className="book-title">{bookObject.title}</div>
                <div className="book-authors">{bookObject.authors.join(', ')}</div>
           </div>
       </li>
	)
  }
}

export default Book