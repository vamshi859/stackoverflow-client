import React from 'react'
import { useParams,Link, useNavigate, useLocation } from 'react-router-dom'
import upVote from "../../assets/sort-up.svg";
import downVote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from './DisplayAnswer';
import DisplayComment from './DisplayComment';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteQuestion, postAnswer, voteQuestion, postCommentQues,editCommentQues, postCommentAns, editAnsComment } from '../../actions/question';
import moment from "moment";
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';

const QuestionsDetails = () => {
  const [answer,setAnswer] = useState("");
  const [toggleComment,setToggleComment] = useState(false);
  const [toggleCommentAns,setToggleCommentAns] = useState(false);
  const [cEdit,setCEdit] = useState(false);
  const [commentId,setComId] = useState("");
  const [comment,setComment] = useState("");
  const [ansId,setAnsId] = useState("");
  const [loading,setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   var questionsList = [{ 
//     _id: '1',
//     upVotes: 3,
//     downVotes: 2,
//     noOfAnswers: 2,
//     questionTitle: "What is a function?",
//     questionBody: "It meant to be",
//     questionTags: ["java", "node js", "react js", "mongo db", "express js"],
//     userPosted: "mano",
//     userId: 1,
//     askedOn: "jan 1",
//     answer: [{
//         answerBody: "Answer",
//         userAnswered: 'kumar',
//         answeredOn: "jan 2",
//         userId: 2,
//     }]
// },{ 
//     _id: '2',
//     upVotes: 3,
//     downVotes: 2,
//     noOfAnswers: 0,
//     questionTitle: "What is a function?",
//     questionBody: "It meant to be",
//     questionTags: ["javascript", "R", "python"],
//     userPosted: "mano",
//     askedOn: "jan 1",
//     userId: 1,
//     answer: [{
//         answerBody: "Answer",
//         userAnswered: 'kumar',
//         answeredOn: "jan 2",
//         userId: 2,
//     }]
// },{ 
//     _id: '3',
//     upVotes: 3,
//     downVotes: 2,
//     noOfAnswers: 0,
//     questionTitle: "What is a function?",
//     questionBody: "It meant to be",
//     questionTags: ["javascript", "R", "python"],
//     userPosted: "mano",
//     askedOn: "jan 1",
//     userId: 1,
//     answer: [{
//         answerBody: "Answer",
//         userAnswered: 'kumar',
//         answeredOn: "jan 2",
//         userId: 2,
//     }]
// }]

  const questionsList = useSelector((state) => state.questionsReducer.data)
  console.log(questionsList);
  const User = useSelector((state) => state.currentUserReducer)
  const location = useLocation();
  const url = 'https://stack-overflow-vamshi.netlify.app';

  console.log(location);
  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    setLoading(true)
    if(User === null){
      alert("Login or Signup to answer a question")
      navigate('/auth')
    }else{
      if(answer===''){
        alert("Enter an answer before submitting")
      }else{
        dispatch(postAnswer({id, noOfAnswers:answerLength+1,answerBody: answer,userAnswered: User.result.name,userId:User.result._id},setLoading))
      }
    }
  }
  const handleShare = () => {
    copy(url+location.pathname)
    alert("Copied url: "+url+location.pathname)
  }
  const handleDelete = () => {
    dispatch(deleteQuestion(id,navigate))
  }
  const handleUpVote = () => {
    dispatch(voteQuestion(id,'upvote',User.result._id))
  }
  const handleDownVote = () => {
    dispatch(voteQuestion(id,'downvote',User.result._id))
  }
  const handleCallback = (comment,commentId) => {
    setComment(comment)
    setComId(commentId)
  }

  const handleCallbackAns = (ansId) => {
    console.log(ansId);
    setAnsId(ansId)
  }

  const handleComment = (e) => {
    e.preventDefault();
    setLoading(true)
    if(User === null){
      alert("Login or Signup to comment a question")
      navigate('/auth')
    }else{
      if(comment===''){
        alert("Enter a comment before submitting")
      }else{
        dispatch(postCommentQues({id,commentBody: comment,userCommented: User.result.name,userId:User.result._id},setLoading))
        setToggleComment(false)
        setComment("")
      }
    }
  }
  const handleEditComment = (e) => {
    e.preventDefault();
    setLoading(true)
    if(User === null){
      alert("Login or Signup to comment a question")
      navigate('/auth')
    }else{
      if(comment===''){
        alert("Enter a comment before submitting")
      }else{
        dispatch(editCommentQues(id,commentId,comment,setLoading))
        setToggleComment(false)
        setComment("")
      }
    }
  }

  const handleCommentAns = (e) => {
    e.preventDefault();
    setLoading(true)
    if(User === null){
      alert("Login or Signup to comment a answer")
      navigate('/auth')
    }else{
      if(comment===''){
        alert("Enter a comment before submitting")
      }else{
        dispatch(postCommentAns({id,answerId:ansId,commentBody:comment,userCommented: User.result.name,userId:User.result._id},setLoading))
        setToggleCommentAns(false)
        setComment("")
      }
    }
  }

  const handleEditCommentAns = (e) => {
    e.preventDefault();
    setLoading(true)
    if(User === null){
      alert("Login or Signup to comment a answer")
      navigate('/auth')
    }else{
      if(comment===''){
        alert("Enter a comment before submitting")
      }else{
        dispatch(editAnsComment(id,ansId,commentId,comment,setLoading))
        setToggleCommentAns(false)
        setComment("")
      }
    }
  }

  return (
    <div className="question-details-page">
      {
        questionsList === null ?
        <h1>Loading....</h1> :
        <>
          {
            questionsList.filter(question => question._id===id).map(question => 
                <div key={question._id}>
                  <section className="question-details-container">
                    <h1>{question.questionTitle}</h1>
                    <div className='question-details-container-2'>
                      <div className="question-votes">
                        <img src={upVote} alt='upVote' width='18' className="votes-icon" onClick={handleUpVote} />
                        <p>{question.upVote.length-question.downVote.length}</p>
                        <img src={downVote} alt="downVote" width='18' className="votes-icon" onClick={handleDownVote} />
                      </div>
                      <div style={{width: "100%"}}>
                        <p className='question-body'>{question.questionBody}</p>
                        <div className='question-details-tags'>
                          {
                            question.questionTags.map((tag) => (
                              <p key={tag}>{tag}</p>
                            ))
                          }
                        </div>
                        <div className='question-actions-user'>
                          <div>
                            <button type="button" onClick={handleShare}>Share</button>
                            {
                              User?.result?._id === question?.userId && (
                                <button type="button" onClick={handleDelete} >Delete</button>
                              )
                            }
                          </div>
                          <div>
                            <p>asked {moment(question.askedOn).fromNow()}</p>
                            <Link to={`/Users/${question.userId}`} className="user-link" style={{color:"#0086d8"}}>
                              <Avatar backgroundColor="orange" px="8px" py="5px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                              <div>
                                {question.userPosted}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {
                      loading ? <FontAwesomeIcon icon={faSpinner} spin /> :
                      question.comment.length!==0 && (
                        <section>
                          <h3>Comments</h3>
                          {
                            question.comment.map((comment,index) => (
                              <DisplayComment key={index} comment={comment} setCEdit={setCEdit} setToggleComment={setToggleComment} setLoading={setLoading} handleCallback={handleCallback} />
                            ))
                          }
                        </section>
                      )
                    }
                    <button className='comment-button' type="button" onClick={() => {setToggleComment(true);setComment("");setCEdit(false)}}>Add Comment</button>
                    {
                      toggleComment && (
                        <form>
                          <textarea name="" id="" cols="60" rows="4" value={comment} onChange={(e) => setComment(e.target.value)} ></textarea><br />
                          {
                            cEdit ? 
                            <input type="submit" className='post-comment-btn' onClick={handleEditComment} value="Edit Comment" /> :
                            <input type="submit" className='post-comment-btn' onClick={handleComment} value="Comment" />
                          }
                          <button type="button" className="comment-cancel-btn" onClick={() => setToggleComment(false) }>Cancel</button>
                        </form>
                      )
                    }
                  </section>
                  {
                    loading ? <FontAwesomeIcon icon={faSpinner} spin /> :
                    question.noOfAnswers !==0 && (
                      <section>
                        <h3>{question.noOfAnswers} Answers</h3>
                        <DisplayAnswer key={question._id} setLoading={setLoading} question={question} setComment={setComment} handleShare={handleShare} setToggleCommentAns={setToggleCommentAns} handleCallbackAns={handleCallbackAns} setCEdit={setCEdit} handleCallback={handleCallback} />
                      </section>
                    )
                  }
                  {
                      toggleCommentAns && (
                        <form>
                          <textarea name="" id="" cols="60" rows="4" value={comment} onChange={(e) => setComment(e.target.value)} ></textarea><br />
                          {
                            cEdit ? 
                            <input type="submit" className='post-comment-btn' onClick={handleEditCommentAns} value="Edit Comment" /> :
                            <input type="submit" className='post-comment-btn' onClick={handleCommentAns} value="Comment" />
                          }
                          <button type="button" className="comment-cancel-btn" onClick={() => setToggleCommentAns(false) }>Cancel</button>
                        </form>
                      )
                    }
                  <section className='post-ans-container'>
                    <h3 className=''>Your Answers</h3>
                    <form onSubmit={(e) => {handlePostAns(e,question.answer.length)}}>
                      <textarea name="" id="" cols="30" rows="10" onChange={(e) => setAnswer(e.target.value)}></textarea>
                      <input type="submit" className='post-ans-btn' value="Post Answer" />
                    </form>
                    <p>
                      Browse other Question tagged
                      {
                        question.questionTags.map((tag) => (
                          <Link to='/Tags' key={tag} className="ans-tags"> {tag} </Link>
                        ))
                      } or {
                        <Link to="/AskQuestion" style={{textDecoration: "none",colr:"#009dff"}}> ask your own question.</Link>
                      }
                    </p>
                  </section>
                </div>
              )
          }          
        </>
      }
    </div>
  )
}

export default QuestionsDetails