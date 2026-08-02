import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = (props) => {
  const { course } = props;

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
