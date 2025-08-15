import { useRef } from "react";

export default function Answers({
  answers,
  answerState,
  selectedAnswer,
  onAnswerClick,
}) {
  const shuffledAnswersRef = useRef(null);

  if (shuffledAnswersRef.current === null) {
    shuffledAnswersRef.current = answers.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswersRef.current.map((answer) => {
        const isSelected = answer === selectedAnswer;
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
            <button onClick={() => onAnswerClick(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
