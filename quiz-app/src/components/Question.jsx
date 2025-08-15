import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({
  question,
  answers,
  answerState,
  selectedAnswer,
  handleAnswerClick,
  handleSkipAnswer,
}) {
  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
      <h2>{question.text}</h2>
      <Answers
        answers={answers}
        answerState={answerState}
        selectedAnswer={selectedAnswer}
        onAnswerClick={handleAnswerClick}
      />
    </div>
  );
}
