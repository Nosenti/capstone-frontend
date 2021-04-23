import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import PostsList from './PostsList';
import {getPendingPosts} from '../../actions/post'

const PendingPosts = ({getPendingPosts, post: {posts, loading}}) => {

  useEffect(() =>{
    getPendingPosts();
  }, [getPendingPosts]);

  return loading ? <Spinner/> : (
    <Fragment>
      <h1 className="large text-primary"> Pending Posts</h1>
      {/* <p className="lead">
        <i className="fas fa-user"></i> Welcome to the Community
      </p> */}

      <div className='table'>
        <table className='list'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Text</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
        
      </thead>
      {posts.posts.map(post => (
          <PostsList key={post._id} post={post}/>
        ))}
    </table>
        
      </div>
    </Fragment>
  )
}

PendingPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, {getPendingPosts})(PendingPosts)

