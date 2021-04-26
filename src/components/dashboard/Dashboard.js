import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
// import PostItem from './PostItem';
// import PostForm from './PostForm';
import {getStats, getStatsTags, getStatsDeclined} from '../../actions/post'

const Stats = ({getStats, getStatsTags, getStatsDeclined, stat: {stats, loading}}) => {

  useEffect(() =>{
    getStats();
    getStatsTags();
    getStatsDeclined();
  }, [getStats, getStatsTags, getStatsDeclined]);

  return loading ? <Spinner/> : (
    <Fragment>
      <h1 className="large text-primary"> Dashboard</h1>
      
    </Fragment>
  )
}

Stats.propTypes = {
  getStats: PropTypes.func.isRequired,
  getStatsTags: PropTypes.func.isRequired,
  getStatsDeclined: PropTypes.func.isRequired,
  post: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  stat: state.post
})

export default connect(mapStateToProps, {getStats, getStatsTags, getStatsDeclined})(Stats)
