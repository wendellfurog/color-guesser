import { useEffect, useState } from 'react';
import './App.css';

function App() {
  
  enum Result {
    Correct,
    Wrong
  }

  const [color, setColor] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setresult] = useState<Result | undefined>(undefined);


  const pickColor = () => {
    // Generate a random color
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers([actualColor, getRandomColor(), getRandomColor()].sort(
      () => 0.5 - Math.random()
      )
    );
  };

  const getRandomColor = () => {
    const colorNumber = Math.floor(Math.random()*16777215).toString(16);
    const colorCode = "#" + colorNumber;
    return colorCode;
  };

  useEffect(() => {
    pickColor();
  }, []);

  function handleAnswer(answer: string) {
    if (answer === color) {
      // guessed correct answer
      setresult(Result.Correct);
      // generate new color
      pickColor();
    } else {
      // guessed wrong answer
      setresult(Result.Wrong);
    }
  }


  return (
    <div className="App">
      <div className='column'>
        <h1 className='title'>Guess the Color</h1>
        <div className='guess-box' style={{ background: color }}>
        </div>
        {answers.map(answer => (
          <button key={answer} onClick={() => handleAnswer(answer)}>{answer}</button>
        ))
        }
        {result === Result.Wrong && <div className='wrong'>Wrong Answer</div>}
        {result === Result.Correct && <div className='correct'>Correct Answer!</div>}
      </div>
    </div>
  );
}

export default App;
