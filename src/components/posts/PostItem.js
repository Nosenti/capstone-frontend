import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import { Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import { updateAgree, updateDisagree, deletePost} from '../../actions/post'

const PostItem = ({updateAgree, updateDisagree, deletePost, auth, post:{_id, text, title, name, avatar, user, tags, agree, disagree,comments, date }, showActions}) => {
  return (
    <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          
          <div>
            <p class="my-1">
              {title}
            </p>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>

            {showActions && <Fragment>
              <button onClick={e => updateAgree(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i> {' Agree'}
              <span> {agree.length > 0 && (
                <span>{agree.length}</span>
              )} </span>
            </button>
            <button onClick={e => updateDisagree(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i> {' Disagree'}
              <span> {disagree.length > 0 && (
                <span>{disagree.length}</span>
              )} </span>
            </button>
            <Link to={`/posts/${_id}`} class="btn btn-primary">
              Discussion {' '} 
              {comments.length > 0 && (
                <span class='comment-count'>{comments.length}</span>
              )} 
            </Link>
            {!auth.loading && user === auth.user._id &&(
              <button onClick={e => deletePost(_id)}     
                type="button"
                class="btn btn-danger"
              >
                <i class="fas fa-times"></i> 
              </button>
            )}
              </Fragment>}

            
            <div>
            <p>{tags}</p>
          </div>
          </div>
        </div>
  )
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateAgree: PropTypes.func.isRequired,
  updateDisagree: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {updateAgree, updateDisagree, deletePost}) (PostItem)
