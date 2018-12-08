import React from 'react'
import {Route, Link} from 'react-router-dom'
import SearchBook from './components/SearchBook'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    constructor(props) {
        super(props)
        this.updateBook = this.updateBook.bind(this);
        this.isBookOnShelf = this.isBookOnShelf.bind(this);
    }
    state = {
   books:[]
  }

isBookOnShelf(id) {
    let searchedBooksOnShelf

    if (this.state.books) {
      searchedBooksOnShelf = this.state.books.filter((book) => book.id === id)
      if (searchedBooksOnShelf.length !== 0) {
        return searchedBooksOnShelf[0].shelf
      } else {
        return null
      }
    }
  }

  updateBook(book, shelf) {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf // Update selected book shelf with new chosen shelf
        this.setState(state => ({
          books: state.books.filter((b) => b.id !== book.id).concat([book])
        }))
      })
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books}) // sames as ({books: books })  ES6

    })
  }

  render() {
        let currentlyReading
        let wantToRead
        let read

        if (this.state.books !== null) {
          currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
          wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
          read = this.state.books.filter((book) => book.shelf === 'read')
        }
    return (
      <div className="app">
        <Route path="/search" render={() => (<SearchBook isBookOnShelf={this.isBookOnShelf} onUpdateBook={this.updateBook}/>)}/>

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Link className="to-search" to="/search"></Link>
            <div className="list-books-content">
              <BookShelf books={currentlyReading} isBookOnShelf={this.isBookOnShelf} onUpdateBook={this.updateBook} title='Currently Reading'/>
              <BookShelf books={wantToRead} isBookOnShelf={this.isBookOnShelf} onUpdateBook={this.updateBook} title='WantToRead'/>
              <BookShelf books={read} isBookOnShelf={this.isBookOnShelf} onUpdateBook={this.updateBook} title='Read'/>
              <Route path="/rating" render={() => (<Rating/>)}/>
            </div>
            <div className="open-search">
              <Link className="to-search" to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}
          

export default BooksApp
