import React,{Fragment, useState} from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

const ConfirmPassword = () => {

  return (
    
    <Fragment>
      <h1>Email is confirmed. Login to access ALUxFeed</h1>
    </Fragment>
  )
}


export default connect(null, {  })(ConfirmPassword);