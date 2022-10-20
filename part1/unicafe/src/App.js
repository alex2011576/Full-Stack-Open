import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Part = ({ name, value }) => {
  return (
  <tr>
    <td>{name} </td>  
    <td>{value}</td>
  </tr>
  )
}

const Content = ({ parts }) => {
  const stats = parts.map((part) => { 
    const name = Object.keys(part)
    return (
      <Part 
        key={name} 
        name={name} 
        value={part[name]}
      />
    )
  })

  return (
    <table>
      <tbody>
        {stats}
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (value, setterFunction) => {
    setterFunction(value + 1);
  }

  return (
    <div>
      <Header text={'give feedback'} />
      <Button handleClick={()=>handleClick(good, setGood)} text='good' />
      <Button handleClick={()=>handleClick(neutral, setNeutral)} text='neutral' />
      <Button handleClick={()=>handleClick(bad, setBad)} text='bad' />
      <Header text={'statistics'} />
      <Content parts={[{good: good}, {neutral: neutral}, {bad: bad}]} />
    </div>
  )
}

export default App