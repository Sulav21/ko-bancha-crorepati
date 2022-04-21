import React from "react";
import { useState, useEffect } from "react";
import useSound from "use-sound";

import correct from "../sounds/correct.mp3";

import wrong from "../sounds/wrong.mp3";

export const QandA = ({
  data,
  setTimer,
  questionNum,
  setquestionNum,
  
}) => {
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  const [correctAns] = useSound(correct);
  const [wrongAns] = useSound(wrong);

  useEffect(() => {
    setQuestion(data[questionNum - 1]);
  }, [data, questionNum]);

  const handleOnClick = (a) => {
    setSelectAnswer(a);
    setClassName("answer active");
    setTimeout(() => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
        setTimeout(() => {
          if (a.correct) {
            correctAns();
            setquestionNum((prev) => prev + 1);
            setSelectAnswer(null);
          } else {
            setTimer(true);
            wrongAns();
          }
        }, 4000);
    
    }, 2000);
  };

  return (
    <div className="QandA">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => {
          return (
            <div
              className={selectAnswer === a ? className : "answer"}
              onClick={() => handleOnClick(a)}
            >
              {a.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
