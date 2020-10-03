import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  getActions = () => {
    const actions = (
      <>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          to='/delete'
          className='ui button negative'
        >
          Delete
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </>
    );
    return actions;
  };

  onClick = () => {
    history.push('/');
  };

  renderContent = () => {
    if (!this.props.stream) {
      return "Are you sure you'd like to delete the stream?";
    } else {
      return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
    }
  };
  render() {
    return (
      <Modal
        title='Delete Stream'
        content={this.renderContent()}
        actions={this.getActions()}
        onClick={this.onClick}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {
  fetchStream,
  deleteStream,
})(StreamDelete);
