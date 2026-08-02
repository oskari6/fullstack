import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  return (
    <>
      <h1>statistics</h1>
      <table style={{ display: "flex", flexDirection: "column" }}>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine
            text="average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text="positive"
            value={`${(good / (good + neutral + bad)) * 100}%`}
          />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
