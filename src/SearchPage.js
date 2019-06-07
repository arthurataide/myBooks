import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './config/BooksAPI'
import Book from './Book'

class SearchPage extends Component {
 static propTypes = {
    onUpdateBookShelf: PropTypes.func.isRequired,
   	backgroundHandle: PropTypes.func.isRequired
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
              return true
            })
          	return true
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

render() { 
   	const { query, booksSearch} = this.state	
	const {backgroundHandle, onUpdateBookShelf} = this.props
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
                     <Book 
                      key={booksSearch.id}
                      bookObject={booksSearch}
                      onUpdateBookShelf={onUpdateBookShelf}
                      backgroundHandle={backgroundHandle}/>             
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