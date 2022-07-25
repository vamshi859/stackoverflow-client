import axios from 'axios';
const baseURL = "https://stack-overflow-clone-vamshi.herokuapp.com";
const localUrl = "http://localhost:5000"
const API = axios.create({baseURL: baseURL})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login',authData);
export const signUp = (authData) => API.post('/user/signup',authData);
export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id,updateData) => API.patch(`user/update/${id}`,updateData);

export const postQuestion = (questionData) => API.post('/questions/ask',questionData);
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id,value,userId) => API.patch(`questions/vote/${id}`,{value,userId});

export const postCommentQues = (id,commentBody,userCommented,userId) => API.patch(`/answer/comment/${id}`,{commentBody,userCommented,userId});
export const deleteCommentQues = (id,commentId) => API.patch(`/answer/deleteComm/${id}`,{commentId});
export const editCommentQues = (id,commentId,commentBody) => API.patch(`/answer/editComment/${id}`,{commentId,commentBody});

export const postCommentAns = (id,answerId,commentBody,userCommented,userId) => API.patch(`/answer/postAnsComment/${id}`,{answerId,commentBody,userCommented,userId});
export const deleteAnsComment = (id,answerId,commentId) => API.patch(`/answer/deleteAnsComment/${id}`,{answerId,commentId});
export const editAnsComment = (id,answerId,commentId,commentBody) => API.patch(`/answer/editAnsComment/${id}`,{answerId,commentId,commentBody})

export const postAnswer = (id,noOfAnswers, answerBody, userAnswered, userId ) => API.patch(`/answer/post/${id}`,{noOfAnswers, answerBody, userAnswered, userId});
export const deleteAnswer = (id,answerId,noOfAnswers) => API.patch(`/answer/delete/${id}`,{answerId,noOfAnswers});
