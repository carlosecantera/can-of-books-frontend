import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';


class Profile extends React.Component {

  //So I took the info from the this.props.auth0.user instead of running the verrification again
  //Not Bootstrap styled but I am under the fucking gun here so it'll need to do.
  render() {
    return (
      <>
        <h1>{this.props.auth0.user.nickname}</h1>
        <h2>{this.props.auth0.user.email}</h2>
        <img
          src={this.props.auth0.user.picture}
          alt={'grandvizier'}
        />
      </>
    )
  }
}

export default withAuth0(Profile);