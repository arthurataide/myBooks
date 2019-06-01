import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './config/BooksAPI'
import ListBooks from './ListBooks'
import Search from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    hasError: false
  }
  	componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    }

   	updateBook = (bookUpdate, shelf) =>{
      	BooksAPI.update(bookUpdate, shelf)
      	bookUpdate.shelf = shelf;
      	this.setState((state) => ({
      	books: state.books.filter((b) => b.id !== bookUpdate.id).concat([ bookUpdate ])
    	}))
      }

  render() {
    return (
        <div>
          <Route exact path='/' render={() => (
                <ListBooks
                  books={this.state.books}
                  onUpdateBookShelf={this.updateBook}/>
              )}/>
              <Route path='/search' render={() => (
                  <Search
                  	onUpdateBookShelf={this.updateBook}
					/>
              )}/>
        </div>
    )
  }
}

export default BooksApp