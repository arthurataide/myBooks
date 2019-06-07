import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelves extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBookShelf: PropTypes.func.isRequired,
      	backgroundHandle: PropTypes.func.isRequired
      }

    render(){
      	const {books, shelf, title, backgroundHandle, onUpdateBookShelf} = this.props
		return(
      		<div className="bookshelf">
            	<h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(book => book.shelf === shelf).map(book => (
							<Book 
                          	 key={book.id}
                          	 bookObject={book}
                             onUpdateBookShelf={onUpdateBookShelf}
                             backgroundHandle={backgroundHandle}/>
                        ))}
                    </ol>
                  </div>   
           </div>
      )
    }
 
}
export default BookShelves