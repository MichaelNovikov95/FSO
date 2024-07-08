import { useState } from "react";

const Title = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ onHanlder, text }) => {
  return <button onClick={onHanlder}>{text}</button>;
};

const PopularAnecdote = ({ points, anecdotes }) => {
  const arrValues = Object.values(points);
  const max = Math.max(...arrValues);
  const position = arrValues.indexOf(max);

  if (max === 0) {
    return;
  } else {
    return (
      <>
        <p>{anecdotes[position]}</p>
        <p>Has {max} votes</p>
      </>
    );
  }
};

const App = () => {
  const title = ["Anecdote of the day", "Anecdote with most votes"];
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const AnecdotesHandler = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const voteHandler = () => {
    const copy = { ...points };
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <>
      <div>
        <Title title={title[0]} />
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
      </div>
      <div>
        <Button onHanlder={AnecdotesHandler} text={"Next"} />
        <Button onHanlder={voteHandler} text={"Vote"} />
      </div>
      <div>
        <Title title={title[1]} />
        <PopularAnecdote points={points} anecdotes={anecdotes} />
      </div>
    </>
  );
};

export default App;
