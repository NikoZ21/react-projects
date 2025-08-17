import { useState } from "react";

import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

import questions from "../questions";

export default function Question({ index, onAnswerSelect, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer) => {
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: questions[index].answers[0] === answer,
      });

      setTimeout(() => {
        onAnswerSelect(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answerState === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{questions[index].text}</h2>
      <Answers
        answers={questions[index].answers}
        answerState={answerState}
        selectedAnswer={answer.selectedAnswer}
        onAnswerSelect={handleSelectAnswer}
      />
    </div>
  );
}
