import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelves from 'BookShelves'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  render() { 
    const {books, onUpdateBookShelf} = this.props
    const shelves = {
          currentlyReading: ['Currently Reading', 'currentlyReading'],
          wantToRead: ['Want to Read', 'wantToRead'],
          read: ['Read', 'read']
      }
    return (
		<div className="app">
          	<div className="list-books">
              	<div className="list-books-title">
                  	<h1>My Books</h1>
              	</div>
              	<div className="list-books-content">
      				{ Object.keys(shelves).map((shelf) =>
                      <BookShelves key={shelf}
						books={ books }
                        onUpdateBookShelf={ () => { onUpdateBookShelf() } }
                        shelf={shelves[shelf][1]}
                        title={shelves[shelf][0]}
                      />
                    )}
      		  	</div>
      		</div>
		</div>
	)
  }
}

export default ListBooks
