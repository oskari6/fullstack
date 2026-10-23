import { useState } from "react";
import Button from "./Button";
import Content from "./Content";
import Header from "./Header";
import Statistics from "./Statistics";
import Total from "./Total";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const maxVotes = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVotes);

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <>
      {/*1*/}
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
      ----------------------------------------------------------------------------------------------------------------
      {/*2*/}
      <div>
        <h1>Give feedback</h1>
        <div>
          <Button onHandle={() => setGood((prev) => prev + 1)}>good</Button>
          <Button onHandle={() => setNeutral((prev) => prev + 1)}>
            neutral
          </Button>
          <Button onHandle={() => setBad((prev) => prev + 1)}>bad</Button>
        </div>
        {good === 0 && neutral === 0 && bad === 0 ? (
          <p style={{ paddingTop: "5px" }}>No feedback given</p>
        ) : (
          <Statistics good={good} neutral={neutral} bad={bad} />
        )}
      </div>
      ----------------------------------------------------------------------------------------------------------------
      {/*3*/}
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <div>
          <button onClick={handleVote}>vote</button>
          <button
            onClick={() =>
              setSelected(
                (prev) => Math.floor(Math.random() * anecdotes.length - 1) + 1,
              )
            }
          >
            next anecdote
          </button>
        </div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[maxIndex]}</p>
        <p>has {maxVotes} votes</p>
      </div>
    </>
  );
};

export default App;
