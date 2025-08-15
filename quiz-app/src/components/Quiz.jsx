import { useState, useCallback } from "react";

import questions from "../questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isQuizOver = activeQuestionIndex == questions.length;

  const handleAnswerClick = useCallback(
    (selectedAnswer) => {
      if (answerState !== "") return;

      setAnswerState("answered");
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === questions[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleAnswerClick(null);
  }, [handleAnswerClick]);

  if (isQuizOver) {
    return (
      <div id="summary">
        <img src={quizCompleteImage} alt="Quiz Complete" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        question={questions[activeQuestionIndex]}
        answers={questions[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        handleAnswerClick={handleAnswerClick}
        handleSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
