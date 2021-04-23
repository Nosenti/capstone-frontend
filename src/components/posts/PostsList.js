import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import { approvePost, declinePost } from '../../actions/post'

const PostsList = ({approvePost, declinePost, auth, post:{_id, text, title, date }, showActions}) => {
  return (
      <tbody>
        <tr>
          <td>{title}</td>
          <td>{text}</td>
          <td><button onClick={e => approvePost(_id)} type="button" class="btn-action btn-success">approve</button> or <button onClick={e => declinePost(_id)} type="button" class="btn-action btn-danger">decline</button></td>
          <td><Moment format='YYYY/MM/DD'>{date}</Moment></td>
        </tr>
      </tbody>
  )
}

PostsList.defaultProps = {
  showActions: true
}

PostsList.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  approvePost: PropTypes.func.isRequired,
  declinePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {approvePost, declinePost}) (PostsList)
