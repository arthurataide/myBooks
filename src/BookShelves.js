import React from 'react'
import Book from './Book'

function BookShelves (props) {
	const {books, shelf, title, undefinedErrorHandle, onUpdateBookShelf} = props
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
                             undefinedErrorHandle={undefinedErrorHandle}/>
                        ))}
                    </ol>
                  </div>   
           </div>
      )
}
export default BookShelves