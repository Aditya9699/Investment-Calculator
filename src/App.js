import { useState } from 'react';
import Form from './Components/Form';
import Header from './Components/Header';
import Table from './Components/Table';

function App(props) {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];

  if (userInput) {
    let currentSavings = userInput['current-savings'];
    const yearlyContribution = userInput['yearly-contribution'];
    const expectedReturn = userInput['expected-return'] / 100;
    const duration = userInput['duration'];

    if(currentSavings === 0){
      currentSavings = yearlyContribution;
    } 
    
    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      
      const yearlyInterest = currentSavings * expectedReturn;
      if(currentSavings === yearlyContribution){
        currentSavings = 0;
      }
      
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header></Header>
      <Form onCalculate={calculateHandler}></Form>
      {!userInput && <p className='no-value'>No investment calculated yet.</p>}
      {userInput && <Table data={yearlyData} initialInvestment={userInput['current-savings']}/>}
    </div>
  );
}

export default App;
