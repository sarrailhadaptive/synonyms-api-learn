import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

// `https://api.datamuse.com/words?rel_syn=`

type Synonym = {
  score: number
  word: string
}

export default function App() {
  const [word, setWord] = useState<string>('')
  const [synonyms, setSynonyms] = useState<Synonym[]>([])

  const fetchSynonyms = (newWord: string) => {
    fetch(`https://api.datamuse.com/words?rel_syn=${newWord}`)
      .then(response => response.json())
      .then(setSynonyms)
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    fetchSynonyms(word)
    setWord('')
  }

  const handleClickWord = (clickedWord: string) => {
    fetchSynonyms(clickedWord)
    setWord('')
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="word-form">Insert word</label>
        <input
          id="word-form"
          onChange={e => setWord(e.target.value)}
          value={word}
        />
        <button>Submit</button>
      </form>
      <ol>
        {synonyms.map(synonym => (
          <li onClick={() => handleClickWord(synonym.word)} key={synonym.word}>
            {synonym.word}
          </li>
        ))}
      </ol>
    </div>
  )
}
