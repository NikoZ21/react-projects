import { useState } from "react";

import questions from "../questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  function handleAnswerClick(selectedAnswer) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }

  const isQuizOver = activeQuestionIndex == questions.length;

  if (isQuizOver) {
    return (
      <div id="summary">
        <img src={quizCompleteImage} alt="Quiz Complete" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const originalAnswers = questions[activeQuestionIndex].answers;
  const shuffledAnswers = originalAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <QuestionTimer
        timeout={3000}
        onTimeout={() => handleAnswerClick("skipped")}
      />
      <div id="question">
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleAnswerClick(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
