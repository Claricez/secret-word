//CSS
import './App.css';

//Components
import Start from './components/Start';
import Game from './components/Game';
import GameOver from './components/GameOver'

//React
import {useCallback, useEffect, useState} from 'react';

//data
import {wordList} from "./data/Data";


const stages = [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"}
]


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [word] = useState(wordList)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  

  const pickedWordAndCategory = () => {

    //Pick a random category
    const categories = Object.keys(word);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    //Pick a random word
    const wordPick = word[category][Math.floor(Math.random() * word[category].length)]
    
    console.log(wordPick);

    return {wordPick,category}
    
  }
//Start the game
const startGame = () => {
  //pick a word and a category
  const {wordPick, category} = pickedWordAndCategory();

  //create an array of letters
  let wordLetters = wordPick.split("")
  wordLetters = wordLetters.map((l) => l.toLowerCase());

  console.log(word, category);
  console.log(wordLetters);

  //Fill states
  setPickedWord(pickedWord);
  setPickedCategory(pickedCategory);
  setLetters(letters);

  setGameStage(stages[1].name)
  
  
}

//process the letter input
const verifyLetter = () =>{
  setGameStage(stages[2].name);
}

//Restart
const restart = () => {
  setGameStage(stages[0].name)
}

  console.log(word)
  return (
    <div className="App">
     {gameStage === 'start' && <Start startGame={startGame}/>}
     {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
     {gameStage ==='end' && <GameOver restart={restart}/>}
    </div>
  );
}

export default App;
