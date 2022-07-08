import './style.css'

let state = {
  words: ['welcome',
          'javascript',
          'hello',
          'goodmorning',
          'goodbye',
          'goodnight',
          'goodafternoon',
          'day',
          'night',
          'morning',
          'afternoon',
          'evening',  
          'bye',
          'night',  
          'carrot',
          'apple',
          'banana',
          'orange',
          'grape',
          'strawberry'],
  guessedLetter: [],
  maxMistakes: 5,
}
 

  let randomindex=Math.floor(Math.random()*state.words.length)
  let randomWord=state.words[randomindex]
  console.log(randomWord)
  let appEl=document.querySelector('#app')


function getMistakesWord(){
   let mistakeWord= state.guessedLetter.filter(letter=>!randomWord.includes(letter))
   return mistakeWord
}

window.addEventListener('keydown', function (event) {
  let letters='abcdefghijklmnopqrstuvwxyz'
  if(!letters.includes(event.key))return
  state.guessedLetter.push(`${event.key}`)
  render()
});

function renderCorrectLetters(){
  if(!appEl) return
  for(let letter of randomWord){
    let letterEl=document.createElement('span')
    if(state.guessedLetter.includes(letter)){
    letterEl.className='correct'
    letterEl.textContent=letter}
    else{
      letterEl.className='incorrect'
      letterEl.textContent='_'
    }
    appEl.appendChild(letterEl)
  }
  
}

function renderMistakeLetters(){
  let pEl=document.createElement('p')
  pEl.className='mistake'
  if(!appEl) return
  pEl.textContent=`Wrong Guesses: ${getMistakesWord()} (${getMistakesWord().length})`
  let p2El=document.createElement('p')
  p2El.className='remaining'
  p2El.textContent=`Remaining Guesses: ${state.maxMistakes-getMistakesWord().length}`

  appEl.append(pEl,p2El)
 
}

function renderwonAndGameOver(){
  let randomWordArray=randomWord.split('')
  if(randomWordArray.every(letter=>state.guessedLetter.includes(letter))){
    let pEl=document.createElement('p')
    pEl.className='won'
    pEl.textContent=`You won`
    let buttonEl=document.createElement('button')
    buttonEl.className='button'
    buttonEl.textContent='Next Word'
    buttonEl.addEventListener('click',function(){
      location.reload()
    }
    )
    appEl?.append(pEl,buttonEl)
  }
  else if (getMistakesWord().length>=state.maxMistakes) 
  {
    let pEl=document.createElement('p')
    pEl.className='lost'
    pEl.textContent=`Game Over`
    let buttonEl=document.createElement('button')
    buttonEl.textContent='Play Again'
    buttonEl.className='button'
    buttonEl.addEventListener('click',function(){
      location.reload()
    }
    )
    appEl?.append(pEl,buttonEl)

  }
 }

function render(){
  if(!appEl) return
  appEl.textContent=''
  renderCorrectLetters()
  renderMistakeLetters()
  renderwonAndGameOver()

 }
 render()

