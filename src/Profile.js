import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';

class Profile extends React.Component {
  render() {
    return(
      <Jumbotron>
        <h1>Profile</h1>
        <p>
          I am the Vizier!!!
        </p>
      </Jumbotron>
    )
  }
}

export default Profile;