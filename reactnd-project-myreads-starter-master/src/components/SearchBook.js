import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component {

  state = {
    query: '',
    books: []
  }

  execSearch = (query) => {
    const search = this.currentSearch = BooksAPI.search(query, 20).then(books => {
      if (this.currentSearch === search)
        this.setState({books: books})
    })
  }

  updateQuery = (query) => {
    this.currentSearch = null

    if (query)
      this.execSearch(query)

    this.setState({books: [], query})
  }

  render() {

    const {query} = this.state
    let books = this.state.books

    if (books === null || books.error) {
      books = []
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <h1>Searching results for "{query}"</h1>
          <ol className="books-grid">
            {books.map((book) => (<Book onUpdateBook={this.props.onUpdateBook} isBookOnShelf={this.props.isBookOnShelf} book={book} key={book.id}/>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook