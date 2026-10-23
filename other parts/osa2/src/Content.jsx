import Part from "./Part";

const Content = (params) => {
  return (
    <div>
      {params.parts.map((part) => (
        <p key={part.name}>
          <Part part={part.name} exercise={part.exercises} />
        </p>
      ))}
    </div>
  );
};

export default Content;
