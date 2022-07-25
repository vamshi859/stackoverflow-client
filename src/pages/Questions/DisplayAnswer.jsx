import React,{useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnswer } from '../../actions/question';
import DisplayAnsComment from './DisplayAnsComment';
const DisplayAnswer = ({question,handleShare,setToggleCommentAns,setCEdit,handleCallbackAns,handleCallback,setComment,setLoading}) => {
  const User = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch();
  const {id} = useParams();
  // const [comment,setComment] = useState("")
  const navigate = useNavigate();
  const handleDelete = (answerId,noOfAnswers) => {
    setLoading(true)
    dispatch(deleteAnswer(id,answerId,noOfAnswers-1,setLoading))
    console.log("Delete Answer");
  }
  // const handleComment = (e) => {
  //   e.preventDefault();
  //   if(User === null){
  //     alert("Login or Signup to comment a question")
  //     navigate('/auth')
  //   }else{
  //     if(comment===''){
  //       alert("Enter a comment before submitting")
  //     }else{
  //       // dispatch(postComment({id,commentBody: comment,userCommented: User.result.name,userId:User.result._id}))
  //       // fetchComments()
  //       // fetchComments()
  //       setToggleCommentAns(false)
  //       setComment("")
  //     }
  //   }
  // }
  // const handleEditComment = (e) => {
  //   e.preventDefault();
  //   if(User === null){
  //     alert("Login or Signup to comment a question")
  //     navigate('/auth')
  //   }else{
  //     if(comment===''){
  //       alert("Enter a comment before submitting")
  //     }else{
  //       // dispatch(updateComment(commentId,comment))
  //       // fetchComments()
  //       // fetchComments()
  //       setToggleCommentAns(false)
  //       setComment("")
  //     }
  //   }
  // }
  return (
    <div>
      {
        question.answer.map((ans) => (
          <div className="display-ans" key={ans._id}>
            <p>{ans.answerBody}</p>
            <div className='question-actions-user'>
              <div>
                <button type="button" onClick={handleShare}>Share</button>
                {
                  User?.result?._id === ans?.userId && (
                    <button type="button" onClick={() => handleDelete(ans._id,question.noOfAnswers)} >Delete</button>
                  )
                }              
                </div>
              <div>
                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                <Link to={`/Users/${ans.userId}`} className="user-link" style={{color:"#0086d8"}}>
                  <Avatar backgroundColor="green" px="8px" py="5px">{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                  <div>
                    {ans.userAnswered}
                  </div>
                </Link>
              </div>
            </div>
            <h3>Comments</h3>
            {
              ans.comment.map((com,index) => (
                <DisplayAnsComment comment={com} setLoading={setLoading} answerId={ans._id} key={index} handleCallbackAns={handleCallbackAns} setToggleCommentAns={setToggleCommentAns} handleCallback={handleCallback} setCEdit={setCEdit} />
              ))
            }
            <button className='comment-button' type="button" onClick={() => {setToggleCommentAns(true);setComment("");setCEdit(false);handleCallbackAns(ans._id)}}>Add Comment</button>
          </div>
        ))
      }
    </div>
  )
}

export default DisplayAnswer