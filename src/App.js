//CSS
import './App.css';

//Components
import Start from './components/Start';
import Game from './components/Game';
import GameOver from './components/GameOver'

//React
import { useEffect, useState} from 'react';

//data
import {wordList} from "./data/Data";


const stages = [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"}
];

const guessesQty = 3;


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [word] = useState(wordList)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickedWordAndCategory = () => {

    //Pick a random category
    const categories = Object.keys(word);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //console.log(category);

    //Pick a random word
    const wordPick = word[category][Math.floor(Math.random() * word[category].length)]
    
    //console.log(wordPick);

    return {category,wordPick}
    
  }
//Start the game
const startGame = () => {
  clearStates();
  //pick a word and a category
  const {category, wordPick} = pickedWordAndCategory();

  //create an array of letters
  let wordLetters = wordPick.split("")
  wordLetters = wordLetters.map((l) => l.toLowerCase());

  //console.log(word, category);
  //console.log(wordLetters);

  //Fill states
  setPickedWord(wordPick);
  setPickedCategory(category);
  setLetters(wordLetters);

  setGameStage(stages[1].name)
  

};

//process the letter input
const verifyLetter = (letter) =>{
  const normalizedLetter = letter.toLowerCase();

  //Check if letter has already been used
  if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter))
  {
    return;
  }

    //push guessed letter or remove a guess
  if(letters.includes(normalizedLetter)){
    setGuessedLetters((actualGuessedLetters)=>[
    ...actualGuessedLetters, 
    normalizedLetter
    ]) 
  }else{
    setWrongLetters((actualWrongLetters)=>[
      ...actualWrongLetters, 
      normalizedLetter
    ])
  
    setGuesses((actualGuesses)=> actualGuesses - 1);
  }



  
    console.log(guessedLetters)
    console.log(wrongLetters)

    
}
//Restart
const restart = () => {
  setScore(0);
  setGuesses(guessesQty);
  setGameStage(stages[0].name)
}
const clearStates = () =>{
  setGuessedLetters([]);
  setWrongLetters([]);
}

//Check if guesses ended 
useEffect(() => {
  if(guesses<=0){
    // reset all states
    clearStates();
    setGameStage(stages[2].name);
  }
}, [guesses])

//Check win conditions
useEffect(() => {
  const uniqueLetters = [... new Set(letters)]

  if(guessedLetters.length === uniqueLetters.length){
    // add score
    setScore((score) => (score += 100))
    startGame();

  }

  //Restart Game
  
  console.log(uniqueLetters)

}, [guessedLetters, letters, startGame])



  console.log(word)
  return (
    <div className="App">
     {gameStage === 'start' && <Start startGame={startGame}/>}
     {gameStage === 'game' && 
     <Game verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters} 
          guesses={guesses}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          score={score}/>}
     {gameStage ==='end' && <GameOver restart={restart} score={score}/>}
    </div>
  );
}

export default App;
