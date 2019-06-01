import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelves extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBookShelf: PropTypes.func.isRequired
      }

      handleClick = (e, book) =>{
      	const {onUpdateBookShelf} = this.props;
        e.preventDefault();
        const value = e.target.value;
        onUpdateBookShelf(book, value);
       }

    render(){
      	const {books, shelf, title} = this.props
		return(
      		<div className="bookshelf">
            	<h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid">
                  {books.filter(book => book.shelf === shelf).map(book => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{width: 128, height: 193, 
                                                   backgroundImage: `url(${book.imageLinks.thumbnail || book.imageLinks.SmallThumbnail})`}}></div>
                                            <div className="book-shelf-changer">
                                                <select value={book.shelf} onChange={(e) => this.handleClick(e, book)}>
                                                    <option value="move" disabled>Choose the Status...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>  
                           ))}
                      </ol>
                     </div>   
                  </div>
      )
    }
 
}
export default BookShelves