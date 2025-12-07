import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [result, setResults] = useState([]);
  const [Error, setError] = useState(null);

  async function getdata() {
    if (!input) {
      alert("please enter value")
      return
    }
    setError(null);
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=aeeb4bde&t=${input}`);
      const data = await res.json();
      if (data.Response === "False") {
        setError("Movie Not Found");
        setResults(null);
      } else {
        setResults(data)
      }
    }
    catch (error) {
      setError("Something Went Wrong")
    }
  }

  return (
    <>
      <div className='container'>
        <div className='inputfield'>
          <h2>Movie Finder</h2>
          <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Enter movie name" />
          <button onClick={getdata}>Search</button>
          {Error && <p style={{ color: "red" }}>{Error}</p>}
          <div>
            {result && (<div className="movie-card">
              <h3>{result.Title}</h3>
              <img src={result.Poster} alt="Poster" />
              <p><strong>Year:</strong> {result.Year}</p>
              <p><strong>Description:</strong>{result.Plot}</p>
            </div>)}
          </div>
        </div>
      </div>
    </>

  )
}
export default App
