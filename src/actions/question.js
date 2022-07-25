import * as api from '../api';
export const askQuestion  = (questionData,navigate) => async (dispatch) => {
  try{
    const {data} = await api.postQuestion(questionData)
    dispatch({type: "POST_QUESTION",payload: data})
    dispatch(fetchAllQuestions())
    navigate('/')
  }catch(error){
    console.log(error)
  }
}

export const fetchAllQuestions = () => async (dispatch) => {
  try{
    const {data} = await api.getAllQuestions()
    dispatch({type: "FETCH_ALL_QUESTIONS",payload: data})
  }catch(error){
    console.log(error)
  }
}

// export const fetchAllComments = () => async (dispatch) => {
//   try{
//     const {data} = await api.getComments()
//     dispatch({type: "FETCH_ALL_COMMENTS",payload: data})
//     return data;
//   }catch(error){
//     console.log(error)
//   }
// }

export const deleteQuestion = (id,navigate) => async (dispatch) => {
  try {
    const {data} = await api.deleteQuestion(id)
    dispatch(fetchAllQuestions())
    navigate("/")
  } catch (error) {
    console.log(error)
  }
}

export const voteQuestion = (id,value,userId) => async (dispatch) => {
  try {
    const {data} = await api.voteQuestion(id,value,userId)
    dispatch(fetchAllQuestions())
  } catch (error) {
    console.log(error);
  }
}

export const postAnswer = (answerdata,setLoading) => async (dispatch) => {
  try {
    const {id, noOfAnswers, answerBody, userAnswered,userId} = answerdata;
    const {data} = await api.postAnswer(id,noOfAnswers,answerBody,userAnswered,userId)
    dispatch({type: "POST_ANSWER",payload:data})
    dispatch(fetchAllQuestions())
    setLoading(false)
  } catch (error) {
    console.log(error)
  }
}

// export const postComment = (commentData) => async (dispatch) => {
//   try {
//     const {id,commentBody,userCommented,userId} = commentData;
//     const {data} = await api.postComment(id,commentBody,userCommented,userId)
//     dispatch({type: "POST_COMMENT",payload:data})
//     dispatch(fetchAllComments())
//   } catch (error) {
//     console.log(error);
//   }
// }

export const postCommentQues = (commentData,setLoading) => async (dispatch) => {
  try {
    const {id,commentBody,userCommented,userId} = commentData;
    const {data} = await api.postCommentQues(id,commentBody,userCommented,userId)
    dispatch({type: "POST_COMMENT",payload:data})
    dispatch(fetchAllQuestions())
    setLoading(false)
  } catch (error) {
    console.log(error);
  }
}

export const deleteCommentQues = (id,commentId,setLoading) => async (dispatch) => {
  try {
    const {data} = await api.deleteCommentQues(id,commentId)
    dispatch(fetchAllQuestions())
    setLoading(false)
  } catch (error) {
    console.log(error);
  }
}

export const editCommentQues = (id,commentId,commentBody,setLoading) => async (dispatch) => {
  console.log(id);
  console.log(commentBody);
  try {
    const {data} = await api.editCommentQues(id,commentId,commentBody);
    dispatch(fetchAllQuestions())
    setLoading(false)
  } catch (error) {
    console.log(error);
  }
}

export const postCommentAns = (commentData,setLoading) => async (dispatch) => {
  try {
    const {id,answerId,commentBody,userCommented,userId} = commentData;
    const {data} = await api.postCommentAns(id,answerId,commentBody,userCommented,userId)
    dispatch({type: "POST_ANS_COMMENT",payload:data})
    dispatch(fetchAllQuestions())
    setLoading(false)
  } catch (error) {
   console.log(error); 
  }
}

export const deleteAnsComment = (id,answerId,commentId,setLoading) => async (dispatch) => {
  try {
    const {data} = await api.deleteAnsComment(id,answerId,commentId);
    dispatch(fetchAllQuestions())
    setLoading(false)
  } catch (error) {
    console.log(error); 
  }
}

export const editAnsComment = (id,answerId,commentId,commentBody,setLoading) => async (dispatch) => {
  console.log(id);
  console.log({id,answerId,commentId,commentBody});
  try {
    const {data} = await api.editAnsComment(id,answerId,commentId,commentBody);
    dispatch(fetchAllQuestions())
    setLoading(false)
  } catch (error) {
    console.log(error);
  }
}

export const deleteAnswer = (id,answerId,noOfAnswers,setLoading) => async (dispatch) => {
  try {
    const {data} = await api.deleteAnswer(id,answerId,noOfAnswers)
    dispatch(fetchAllQuestions())
    setLoading(false)
  } catch (error) {
    console.log(error);
  }
}

// export const deleteComment = (commentId) => async (dispatch) => {
//   try {
//     const {data} = await api.deleteComment(commentId)
//     dispatch(fetchAllComments());
//   } catch (error) {
//     console.log(error);
//   }
// }
