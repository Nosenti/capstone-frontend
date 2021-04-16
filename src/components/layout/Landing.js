import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function Landing({auth:{isAuthenticated, loading}}) {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Your feedback is important to us</h1>
          <p className="lead">
            A platform for feedback at ALU
          </p>
          <div className="buttons">
            { !loading && (<Fragment>{ isAuthenticated?
            <Fragment></Fragment>
            
             : <Fragment> 
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
            </Fragment>}</Fragment>)}
            
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
}
// Navbar.defaultProps = {
//   isAdmin: true
// }
const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps) (Landing)
