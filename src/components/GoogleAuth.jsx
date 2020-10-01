import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/index';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '509191547081-poutht7bh1va1i3ss63ltnoo30jokac1.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.client.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  signIn = () => {
    this.auth.signIn();
  };

  signOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.propse.isSignedIn) {
      return (
        <button onClick={this.signIn} className='ui red google button'>
          <i className='google icon'>Sign Out</i>
        </button>
      );
    } else {
      return (
        <button onClick={this.signOut} className='ui red google button'>
          <i className='google icon'>Sign In With Google</i>
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { isSignedIn: auth.isSignedIn };
}

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
