import React, { useState, useEffect } from "react";

function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [historyVisible, setHistoryVisible] = useState(false);
  const [history, setHistory] = useState([]);
//   const buttonValues = [
//     "7",
//     "8",
//     "9",
//     "/",
//     "4",
//     "5",
//     "6",
//     "*",
//     "1",
//     "2",
//     "3",
//     "-",
//     "0",
//     ".",
//     "=",
//     "+",
//     "CE",
//     "C",
//     "<-",
//   ];
  const buttonValues=["CE","C","<-","/","7","8","9","*","4","5","6","-","1","2","3","+","","0",".","="]

  useEffect(() => {
    const savedHistory = localStorage.getItem("calculator_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calculator_history", JSON.stringify(history));
  }, [history]);

  const handleClick = (value) => {
    if (/[0-9]/.test(value) || value === "+" || value === "-" || value === "*" || value === "/") {
      setExpression((prevExpression) => prevExpression + value);
    } else if (value === "=") {
      const calculatedResult =eval(expression);
      setResult(calculatedResult);
      setHistory([...history, `${expression} = ${calculatedResult}`]);
      setExpression("");
    } else if (value === "C") {
      setExpression("");
      setResult("0");
    } else if (value === "CE") {
      const operators = ["+", "-", "*", "/"];
      let lastOperatorIndex = -1;
      for (let i = expression.length - 1; i >= 0; i--) {
        if (operators.includes(expression[i])) {
          lastOperatorIndex = i;
          break;
        }
      }
      if (lastOperatorIndex >= 0) {
        const updatedExpression = expression.slice(0, lastOperatorIndex + 1);
        setExpression(updatedExpression);
      }
    } else if (value === "<-") {
      const updatedExpression = expression.slice(0, -1); 
      setExpression(updatedExpression);
    } else {
      setExpression("");
      setResult("0");
    }
  };
  

  const toggleHistory = () => {
    setHistoryVisible(!historyVisible);
  };
  const onDelete = () => {
    setHistory([]);
    setExpression("");
    setResult("0");
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="box1">
          <div className="calculator-display">
            <div className="toggle-btn-container">
              <div className="history-toggle" onClick={() => toggleHistory()}>
                <span className="btn">☰</span>
              </div>
            </div>
            <div className="history-list">
              {history.map((entry, index) => (
                <div key={index} className="history-item">
                  {entry}
                </div>
              ))}
            </div>
            <div className="result-display">
              <div className="result-value">{result}</div>
            </div>
            <div className="expression">{expression}</div>
          </div>
          <div className="calculator-buttons">
            {buttonValues?.map((item) => {
              return (
                <button key={item} onClick={() => handleClick(item)}>
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <div className={historyVisible ? `box2 open` : `box2`}>
          <div className="history-header">
            <h2>History</h2>
            {historyVisible ? (
              <h3 onClick={() => toggleHistory()}>Close</h3>
            ) : (
              <></>
            )}
          </div>
          <div className="history-list">
            {history.map((entry, index) => (
              <div key={index} className="history-item">
                {entry}
              </div>
            ))}
          </div>
          <div className="deleteBtn" onClick={() => onDelete()}>
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
