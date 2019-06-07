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
    backgroundImage = (image) => {
    	if(image !== undefined){
        	return true
        }else{
        	return false
        }
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
                  onUpdateBookShelf={this.updateBook}
				  backgroundHandle={this.backgroundImage}/>
              )}/>
          <Route path='/search' render={() => (
               	<Search
                	books={this.state.books}
                 	onUpdateBookShelf={this.updateBook}
					backgroundHandle={this.backgroundImage}/>
              )}/>
        </div>
    )
  }
}

export default BooksApp