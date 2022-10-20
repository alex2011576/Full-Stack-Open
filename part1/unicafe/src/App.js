import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ text, value }) => {
  return (
  <tr>
    <td>{text}</td>  
    <td>{value}</td>
  </tr>
  )
}

const Statistics = ({ feedbacks }) => {
  let positive = 0;
  let average = 0;
  const sum = feedbacks.reduce((accumulator, category) => accumulator + category[Object.keys(category)], 0);
  if (sum === 0){
    return <div><p>No feedback given</p></div>
  }
  const stats = feedbacks.map((category) => { 
    const name = Object.keys(category)
    if (category.hasOwnProperty('good')) {
      average += category['good'];
      positive += category['good']; 
    }
    if (category.hasOwnProperty('bad')) {
      average -= category['bad'];
    }

    return (
      <StatisticLine 
        key={name} 
        text={name} 
        value={category[name]}
      />
    )
  })
  if (average !== 0) {
    average = average / sum;
  }
  if (positive !== 0) {
    positive = positive * 100 / sum;
  }

  return (
    <table>
      <tbody>
        {stats}
        <StatisticLine key={'sum'} text={'sum'} value={sum}/>
        <StatisticLine key={'average'} text={'average'} value={average}/>
        <StatisticLine key={'positive'} text={'positive'} value={positive + ' %'}/>
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
      <Statistics feedbacks={[{good: good}, {neutral: neutral}, {bad: bad}]} />
    </div>
  )
}

export default App