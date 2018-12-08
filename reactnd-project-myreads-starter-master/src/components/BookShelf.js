import React from 'react'
import Book from './Book'


class BookShelf extends React.Component {
    render() {
        let books = this.props.books
           ? this.props.books
           : [];
        
        return (
            
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (<Book onUpdateBook={this.props.onUpdateBook}
                    isBookOnShelf={this.props.isBookOnShelf} book={book} key={book.id}/>))}
                </ol>
            </div>
        </div>
    )
  }
}

export default BookShelf
        )
    }
}