import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: {} };
   }
  componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        .then(tokenData => {
          const jwt = tokenData.__raw;

          console.log(jwt);
          const requestUserData = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'get',
            baseURL:  'http://localhost:3001', //process.env.REACT_APP_SERVER ||
            url: '/test'
          }
          axios(requestUserData)
            .then(response => {
              console.log(response.data);
              this.setState ({
                userData:response.data
              });
            })
            .catch(err => console.error(err));

        }).catch(err => console.log(err));
    }
  }

  render() {
    return (
      <>
        <h1>{this.state.userData.nickname}</h1>
        <h2>{this.state.userData.email}</h2>
        <img
          src={this.state.userData.picture}
          alt={'grandvizier'}
        />
      </>
    )
  }
}

export default withAuth0(Profile);