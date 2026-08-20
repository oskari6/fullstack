interface Props {
  name: string;
}

export const Header = ({ name }: Props) => {
  return <h1>{name}</h1>;
};
