const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Header = (props) => {

    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  const Part = (props) => {
    const part = props.part;
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
  }
  const Content = (props) => {
    const parts = props.parts;
    return (
      <div>
        {parts.map((part, index) => <Part key={index.toString()} part={part} />)}
      </div>
    )
  }
  const Total = (props) => {
    const parts = props.parts;
    const sum = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
    return (
      <div>
        <p>
          Number of exercises {sum}
        </p>
      </div>
    )
  }
  
  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total parts={[part1, part2, part3]} />
    </div>
  )
}

export default App