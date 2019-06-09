import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as BooksAPI from './config/BooksAPI'
import ListBooks from './ListBooks'
import Search from './SearchPage'
import ErrorPage from './ErrorPage'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: []
  }
  	componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    }
    errorHandle = (error) => {
    	if(error !== undefined){
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
         <Router>
             <Switch>
                <Route exact path='/' render={() => (
                      <ListBooks
                        books={this.state.books}
                        onUpdateBookShelf={this.updateBook}
                        undefinedErrorHandle={this.errorHandle}/>
                    )}/>
                <Route path='/search' render={() => (
                      <Search
                          books={this.state.books}
                          onUpdateBookShelf={this.updateBook}
                          undefinedErrorHandle={this.errorHandle}/>
                    )}/>
				<Route render={() => (
                  		<ErrorPage/>
                	)}/>
              </Switch>
			</Router>
        </div>
    )
  }
}

export default BooksApp