import { useState, useCallback } from "react";

import questions from "../questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const isQuizOver = activeQuestionIndex == questions.length;

  const handleAnswerClick = useCallback((selectedAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }, []);

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
        index={activeQuestionIndex}
        onAnswerSelect={handleAnswerClick}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
