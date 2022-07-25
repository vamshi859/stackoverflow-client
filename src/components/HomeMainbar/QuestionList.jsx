import React from 'react'
import Questions from './Questions';
// import "./styles.css";
const QuestionList = ({questionList}) => {
  console.log(questionList)
  return (
    <>
      {
        questionList.map((question,index) => (
          <Questions question={question} key={index} />
        ))
      }
    </>
  )
}

export default QuestionList