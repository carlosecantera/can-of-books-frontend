import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'

// Props coming in
// bookIn = {book}
// idxIn = {idx}
// deleteF = {this.deleteBook}

class BookCar extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props.bookIn); They are in here
    console.log(this.props.deleteF);
  }

  render() {
    return (
      <Carousel.Item>
        <img 
          className="d-block mx-auto w-50"
          src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Books_icon.png"
          alt="First slide"
        />
        <Carousel.Caption className="caption">
          <h4 className="text-primary">{this.props.bookIn.title}</h4>
          <p className="text-primary">Author: {this.props.bookIn.author}</p>
        </Carousel.Caption>
        <Button onClick={() => this.props.deleteF(this.props.bookIn)}>Delete a Book</Button>
      </Carousel.Item>
    )
  }
}

export default BookCar;