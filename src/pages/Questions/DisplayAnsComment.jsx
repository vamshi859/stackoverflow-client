import React, { useState } from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnsComment, deleteCommentQues } from '../../actions/question';

const DisplayAnsComment = ({comment,handleCallback,setToggleCommentAns,setCEdit,handleCallbackAns,answerId,setLoading}) => {
  const User = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comments,setComments] = useState("");
  const {id} = useParams();
  
  const handleDelete = (commentId) => {
    setLoading(true)
    dispatch(deleteAnsComment(id,answerId,commentId,setLoading))
    console.log(commentId);
  }
//   const handleComment = (e) => {
//     e.preventDefault();
//     handleCallback(comment)
//   }
  return (
    <div>
      {
        comment && (
          <div className="display-comment">
            <p>{comment.commentBody}</p>
            <div className='question-actions-user'>
              <div>
                {
                  User?.result?._id === comment?.userId && (
                    <>
                        <button type="button" onClick={() => {setToggleCommentAns(true);handleCallback(comment.commentBody,comment._id);handleCallbackAns(answerId);setCEdit(true)}}>Edit</button>
                        <button type="button" onClick={() => handleDelete(comment._id)} >Delete</button>
                    </>
                  )
                }              
                </div>
              <div>
                <p>answered {moment(comment.commentedOn).fromNow()}</p>
                <Link to={`/Users/${comment.userId}`} className="user-link" style={{color:"#0086d8"}}>
                  <Avatar backgroundColor="green" px="8px" py="5px">{comment.userCommented.charAt(0).toUpperCase()}</Avatar>
                  <div>
                    {comment.userCommented}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default DisplayAnsComment;