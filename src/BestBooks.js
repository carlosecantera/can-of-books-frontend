import React from 'react';
import './BestBooks.css';
import axios from 'axios';
import {withAuth0} from '@auth0/auth0-react';
import  Carousel  from 'react-bootstrap/Carousel';
import  Form  from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



class BestBooks extends React.Component {

  constructor(){
    super();
    this.state={
      books:[],
      title: '',
      author: '',
      description: '',
      status: '',
      searchTitle: ''
    };
  };

  //Request book collection based on user info from Auth0
  //Requests it every time best books shows up
  //Honestly I am going to use the demo example for future functions I worry that this is terrible
  componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        //Package and send request for books to the server
        .then(tokenData => {
          const token = tokenData.__raw;
          const requestOptions = {
            headers: { "Authorization": `Bearer ${token}` },
            method: 'GET',
            baseURL:  'http://localhost:3002', //process.env.REACT_APP_SERVER ||
            url: '/books'
          }
          //The actual sending of the request
          axios(requestOptions).then(response => {
            console.log(response.data);
            this.setState({books: response.data});
          });
        });
    }
  }

  // postBook
  postBook = async () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        //Package and send request for books to the server
        .then(tokenData => {
          const token = tokenData.__raw;
          const requestOptions = {
            headers: { "Authorization": `Bearer ${token}` },
            method: 'POST',
            baseURL:  'http://localhost:3002', //process.env.REACT_APP_SERVER ||
            url: '/books',
            params: { 
              title: this.state.title, 
              author: this.state.author,
              description: this.state.description,
              status: this.state.status,
            }
          }
          //The actual sending of the request
          axios(requestOptions).then(response => {
            console.log('Front-End postBook function got this back');
            console.log(response.data);
            this.setState({books: response.data});
          });
        });
    }
  }

  // deleteBook
  deleteBook = async (book2del) => {
    
    console.log(book2del._id);
    
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        //Package and send request for books to the server
        .then(tokenData => {
          const token = tokenData.__raw;
          console.log('Delete book tried to make a token');
          console.log(token);
          const requestOptions = {
            headers: { "Authorization": `Bearer ${token}` },
            method: 'DELETE',
            baseURL:  'http://localhost:3002', //process.env.REACT_APP_SERVER ||
            url: `/books/${book2del._id}`
          }
          //The actual sending of the request
          axios(requestOptions).then(response => {
            console.log('Front-End postBook function got this back');
            console.log(response.data);
            this.setState({books: response.data});
          });
        });
    }
  }

  render() {
    console.log('Best Books was render');
    console.log()
    return(
      <div> 
        {(this.state.books.length)
          //If there are books make the carousel. If not return null
          ? <Carousel>
            {this.state.books.map((book, idx) => {
              //Return a carousel item for each book in array mapped through
              return <Carousel.Item key={idx}>
                <img 
                  className="d-block mx-auto w-50"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Books_icon.png"
                  alt="First slide"
                />
                <Carousel.Caption className="caption">
                  <h4 className="text-primary">{book.title}</h4>
                  <p className="text-primary">Author: {book.author}</p>
                  <Button onClick={() => this.deleteBook(book)}>Delete a Book</Button>
                </Carousel.Caption>
              </Carousel.Item>
            })}
          </Carousel>
          : null}
        <Form>
          <Form.Label>Let's Add a Book!</Form.Label>
          <Form.Control placeholder="Title (Required)" onChange={(e) => {this.setState({ title: e.target.value })}}></Form.Control>
          <Form.Control placeholder="Author" onChange={(e) => {this.setState({ author: e.target.value })}}></Form.Control>
          <Form.Control placeholder="Description" onChange={(e) => {this.setState({ description: e.target.value })}}></Form.Control>
          <Form.Control placeholder="Status" onChange={(e) => {this.setState({ status: e.target.value })}}></Form.Control>
          <Button onClick={this.postBook}>Add a Book</Button>
        </Form>
      </div>
    )
  }
}

export default withAuth0(BestBooks);
