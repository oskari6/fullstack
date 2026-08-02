const Total = (params) => {
  const total = params.parts.reduce((sum, part) => sum + part.exercises, 0);

  return <p>total of {total} exercises</p>;
};
export default Total;
