import { useAnecdoteActions } from "../store";

const Filter = () => {
  const { setSearchWord } = useAnecdoteActions();

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={(e) => setSearchWord(e.target.value)} />
    </div>
  );
};

export default Filter;
