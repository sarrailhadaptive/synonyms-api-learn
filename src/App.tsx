import React, { useState } from 'react'
import './App.css'

// `https://api.datamuse.com/words?rel_syn=`

type Synonym = {
  score: number
  word: string
}

export default function App() {
  const [word, setWord] = useState<string>('')
  const [synonyms, setSynonyms] = useState<Synonym[]>([])

  async function fetchSynonyms(newWord: string) {
    const response = await fetch(`https://api.datamuse.com/words?rel_syn=${newWord}`)
    const synonyms = await response.json()
    setSynonyms(synonyms)
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
    <div className='App'>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor='word-form'>Insert word</label>
        <input id='word-form' onChange={e => setWord(e.target.value)} value={word} />
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
