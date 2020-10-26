import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Switch,
  withRouter
} from 'react-router-dom';
import { Router } from '../../router';
import './App.css';

const App = (props) => {
  const {} = props;

  return(
    <div className="App">
      <Switch>
        <Router />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
