import React,{ useState, useEffect } from "react";
import useSound from 'use-sound'
import wait from '../sounds/wait.mp3'

export const Timer = ({setTimer,questionNum}) => {
    const [count, setCount] = useState(30);
    const [waiting] = useSound(wait)

//     useEffect(() => {
//       setInterval(() => {
//         setCount(prevCount => prevCount -1 );
//       }, 1000);
//     }, []);
//   return count;
// };
useEffect(() => {
    if (count===0) return setTimer(true)
    const interval = setInterval(() => {
        setCount(prevCount => prevCount -1 );
        
    }, 1000);
    
    return () => clearInterval(interval);
  }, [setTimer,count]);

  useEffect(()=>{
   setCount(30)
   waiting()
  },[questionNum,waiting])
  return count;
};