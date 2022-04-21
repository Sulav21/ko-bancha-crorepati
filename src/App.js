import "./App.css";
import { useState,useEffect } from "react";
import { QandA } from "./components/QandA";
import { Timer } from "./components/Timer";
import useSound from 'use-sound'
import play from './sounds/play.mp3'
import data from './data.json'
function App() {
  const [questionNum, setquestionNum] = useState(1);
  const [timer, setTimer] = useState(false);
  const [earned, setEarned] = useState('Rs. 0')
  const [letsplay] = useSound(play)
  useEffect(()=>{
    letsplay()
},[letsplay])
  const moneyParameter = [
    { id: 1, amount: "Rs. 1000" },
    { id: 2, amount: "Rs. 2000" },
    { id: 3, amount: "Rs. 3000" },
    { id: 4, amount: "Rs. 5000" },
    { id: 5, amount: "Rs. 10,000" },
    { id: 6, amount: "Rs. 20,000" },
    { id: 7, amount: "Rs. 40,000" },
    { id: 8, amount: "Rs. 80,000" },
    { id: 9, amount: "Rs. 1,60,000" },
    { id: 10, amount: "Rs. 3,20,000" },
    { id: 11, amount: "Rs. 6,40,000" },
    { id: 12, amount: "Rs. 12,50,000" },
    { id: 13, amount: "Rs. 25,00,000" },
    { id: 14, amount: "Rs. 50,00,000" },
    { id: 15, amount: "Rs. 1 Crore" },
  ].reverse();

  useEffect(()=>{
    questionNum>15 && setTimer(true) && setEarned(moneyParameter.find(m=> m.id===questionNum).amount)
    questionNum >1 && setEarned(moneyParameter.find(m=> m.id===questionNum-1).amount)}
  ,[moneyParameter,questionNum])
  return (
    <div className="container">
      <div className="main">
        {timer ? (
     <h1 className='earned'>You earned : {earned} </h1> 
        ):(
          <>
          <div className="top">
          <div className="timer">
            <Timer setTimer={setTimer} questionNum={questionNum}/>
            </div>
        </div>
        <div className="bottom">
          <QandA
            data={data}
            setTimer={setTimer}
            questionNum={questionNum}
            setquestionNum={setquestionNum}
            
          />
        </div>
          </>
        )}
        
      </div>
      <div className="mini">
        <ul className="moneyList">
          {moneyParameter.map((moneypar) => {
            return (
              <li
                className={
                  questionNum === moneypar.id
                    ? "moneyListNumber active"
                    : "moneyListNumber"
                }
              >
                <span className="itemNumber">{moneypar.id}</span>
                <span className="itemAmount">{moneypar.amount}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
