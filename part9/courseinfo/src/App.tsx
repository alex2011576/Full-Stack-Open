import CoursePart from "./types"

const Header = ({name}: {name: string}): JSX.Element => {
  return <h1>{name}</h1>
}

const Content = ({parts}: {parts: CoursePart[]}): JSX.Element => {

  return (
    <div>
      {parts.map(p => <Part key={p.name} part={p} />)}
    </div>
  )
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: {part: CoursePart}): JSX.Element => {
  let typeAttributes: JSX.Element = <></>;

  switch (part.type) {
    case "normal":
      typeAttributes = <i>{part.description}</i>;
      break;
    case "groupProject":
      typeAttributes = <>project exercises {part.groupProjectCount}</>;
      break;
    case "submission":   
      typeAttributes = (<>
        <i>{part.description}</i>
        <br />
        submit to {part.exerciseSubmissionLink}
      </>);
      break;
    case "special":
      typeAttributes = (<>
        <i>{part.description}</i>
        <br />
        required skills: {part.requirements.reduce((carry, req) => carry ? `${carry}, ${req}` : `${req}`, "")}
      </>);
      break;
    default:
      return assertNever(part);
  }
  return (
    <p>
        <strong>{part.name} {part.exerciseCount}</strong>
        <br />
        {typeAttributes}
    </p>
  )
};

const Total = ({parts}: {parts: CoursePart[]}): JSX.Element => {

  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) =>  carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
    
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
