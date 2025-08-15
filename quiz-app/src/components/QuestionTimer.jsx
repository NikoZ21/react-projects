import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    console.log("Setting timeout");
    const timer = setTimeout(() => {
      onTimeout();
    }, timeout);
    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("Setting interval");
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 10);
    }, 10);
    return () => clearInterval(timer);
  }, []);

  return <progress id="question-timer" max={timeout} value={timeRemaining} />;
}
