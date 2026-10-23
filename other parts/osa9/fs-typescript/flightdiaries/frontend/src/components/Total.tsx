interface Props {
  total: number;
}

export const Total = ({ total }: Props) => {
  return <p>Number of exercises {total}</p>;
};
