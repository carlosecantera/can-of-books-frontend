import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import {withAuth0} from '@auth0/auth0-react';
import  Carousel  from 'react-bootstrap/Carousel';



class BestBooks extends React.Component {

  constructor(){
    super();
    this.state={books:[]};
  };


  //Request book collection based on user info from Auth0
  componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        .then(tokenData => {
          const token = tokenData.__raw;
          const requestOptions = {
            headers: { "Authorization": `Bearer ${token}` },
            method: 'GET',
            baseURL:  'http://localhost:3002', //process.env.REACT_APP_SERVER ||
            url: '/books'
          }
          axios(requestOptions).then(response => {
            console.log(response.data);
            this.setState({books: response.data});
          });
        });
    }
  }

  render() {
    console.log('Best Books was render');
    return(
      <div>
        {(this.state.books.length)
                  ? <Carousel>
                  {this.state.books.map((book, idx) => {
                    return <Carousel.Item key={idx}>
                      <img 
                        className="d-block mx-auto w-50"
                        src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Books_icon.png"
                        alt="First slide"
                        
                      />
                      <Carousel.Caption className="caption">
                        <h4 className="text-primary">{book.title}</h4>
                        <p className="text-primary">Author: {book.author}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  })}
                </Carousel>
                  : null
                }

      </div>
      
    )
  }
}

export default withAuth0(BestBooks);
