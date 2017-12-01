import React, { Component } from 'react';
import { connect } from 'react-redux';

const LoadingHOC = (WrappedComponent) => {

  class Wrapped extends Component {
    render() {
      return (
        this.props.is_fetching
          ? 'loading'
          : <WrappedComponent {...this.props} />
      )
    }
  }

  const mapStateToProps = ({ is_fetching }) => ({
    is_fetching
  });

  return connect(mapStateToProps, null)(Wrapped);

};


export default LoadingHOC;