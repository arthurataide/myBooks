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
    booksSearch: []
  }

  setShelvesOnSearchBook = (bSearch) => {
    	const { books } = this.props
        bSearch.map(bookSearch => {
          	bookSearch.shelf = 'none'
        	books.filter(book => {
            	if(bookSearch.id === book.id){
                  	bookSearch.shelf = book.shelf
                }
            })
        })
      	return bSearch
  }

  updateQuery = (query) => {
  		this.setState({ query: query })
      if(!query){
        this.setState({booksSearch: []})
      }
      else {
        const maxresults = 10;
        BooksAPI.search(query, maxresults).then(bSearch => {
          if(bSearch.error){
              this.setState({booksSearch: []})
           }
          else{
              const b = this.setShelvesOnSearchBook(bSearch);
              this.setState({ booksSearch: b });
          }
      	});    
      }
  }

  handleClick = (e, booksSearch) =>{
      const {onUpdateBookShelf} = this.props;
      e.preventDefault();
      const value = e.target.value;
      onUpdateBookShelf(booksSearch, value);
  }

render() { 
   	const { query, booksSearch } = this.state	
	return(
      <div>
        {this.state.hasError ? (<h1>Something went wrong!</h1>) : (
          <div className="search-books">
              <div className="search-books-bar">
                <Link className='close-search' to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                  <input
                        className='search-books'
                        type='text'
                        placeholder='Search by title or author'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {booksSearch.map(booksSearch => (
                                  <li key={booksSearch.id}>
                                      <div className="book">
                                          <div className="book-top">
                                              <div className="book-cover" style={{width: 128, height: 193, 
                                                     backgroundImage: `url(${booksSearch.imageLinks.thumbnail})`}}></div>
                                              <div className="book-shelf-changer">
                                                  <select value={booksSearch.shelf} onChange={(e) => this.handleClick(e, booksSearch)}>
                                                      <option value="move" disabled>Choose the Status...</option>
                                                      <option value="currentlyReading">Currently Reading</option>
                                                      <option value="wantToRead">Want to Read</option>
                                                      <option value="read">Read</option>
                                                      <option value="none">None</option>
                                                  </select>
                                              </div>
                                          </div>
                                          <div className="book-title">{booksSearch.title}</div>
                                          <div className="book-authors">{booksSearch.authors}</div>
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