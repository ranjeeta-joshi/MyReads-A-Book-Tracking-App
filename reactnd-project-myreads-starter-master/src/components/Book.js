import React, {Component} from 'react';
import Rating from './Rating'

class Book extends Component {
    state = {
        shelfName: 'None'
    }


    componentDidMount() {
        let book = this.props.book
        let bookOnShelf = this.props.isBookOnShelf(book.id)
        let shelfName
        
        if(bookOnShelf !== null) {
            shelfName = bookOnShelf
        } else {
            shelfName = 'None'
        }
        
        this.setState({shelfName: shelfName})
    }

    handleUpdate =(e,book) => {
        const select = e.target.value
        if(this.props.onUpdateBook)
            this.props.onUpdateBook(book,select)
    }
    
    render() {

    let book = this.props.book

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelfName} onChange={(event) => this.handleUpdate(event, book)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
          <div>
            <Rating book={book}/>
          </div>
        </div>
      </li>
    )
  }
}

export default Book


     
