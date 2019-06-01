import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './config/BooksAPI'

class SearchPage extends Component {
 static propTypes = {
    onUpdateBookShelf: PropTypes.func.isRequired
  } 

 state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
      this.setState({ query: query })
      if(!query){
        this.setState({books: []})
      }
      else {
        const maxresults = 10;
        BooksAPI.search(query, maxresults).then((books) => {
          this.setState({books})
        });
      }
  }

  handleClick = (e, book) =>{
      const {onUpdateBookShelf} = this.props;
      e.preventDefault();
      const value = e.target.value;
      onUpdateBookShelf(book, value);
  }

render() { 
   	const { query, books } = this.state	
	return(
      <div>
        {this.state.hasError ? (<h1>Something went wrong!</h1>) : (
          <div className="search-books">
          {console.log(books)}
              <div className="search-books-bar">
                <Link className='close-search' to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                  <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search by title or author'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {books.filter(book => book).map(book => (
                                  <li key={book.id}>
                                      <div className="book">
                                          <div className="book-top">
                                              <div className="book-cover" style={{width: 128, height: 193, 
                                                     backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
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
              )}
		</div>
		)
	}
}
export default SearchPage