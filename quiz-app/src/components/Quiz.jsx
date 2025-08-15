import { useState, useCallback } from "react";

import questions from "../questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

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
        if (selectedAnswer === originalAnswers[0]) {
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

  const originalAnswers = questions[activeQuestionIndex].answers;
  const shuffledAnswers = originalAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = answer === userAnswers[userAnswers.length - 1];
            let cssClass = "";

            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleAnswerClick(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
