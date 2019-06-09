import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelves from './BookShelves'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
    undefinedErrorHandle: PropTypes.func.isRequired
  }

  render() { 
    const {books, onUpdateBookShelf, undefinedErrorHandle} = this.props
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
                      <BookShelves 
                        key={shelf}
						books={ books }
                        onUpdateBookShelf={ onUpdateBookShelf }
						undefinedErrorHandle={ undefinedErrorHandle }
                        shelf={shelves[shelf][1]}
                        title={shelves[shelf][0]}
                      />
                    )}
      		  	</div>
      		</div>
			<div className="open-search">
            	<Link
                 	to='/search'
                >Search Books</Link>
            </div>	
		</div>
	)
  }
}

export default ListBooks
