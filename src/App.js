import React, { useEffect, useState } from 'react'
import './App.css'


export const App = () => {
  let [data, setData] = useState([])
  let [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://emoji-api.com/emojis?access_key=efae03777e7a3fa78451f9f9e9209ed31e9b2f97')
     .then(res => res.json())
     .then(res => setData(res))
     
  }, [])

  let handleSearch = (e) => {
    setSearch(e.target.value)
  }

  let handleSubmit = () =>{
    if(search!==''){
      fetch(`https://emoji-api.com/emojis?search=${search}&access_key=efae03777e7a3fa78451f9f9e9209ed31e9b2f97`)
      .then(res => res.json())
      .then(res => {
        if(res) {
          setData(res)
        }else{
          setData([])
        }
      }
      )
    }
  }
  return (
    <div className='App'>
      <div className='header'>
        <div className='header-text'>
          <h1>Gospel Emoji Search</h1>
          <div className='search-wrap'>
          <input type='text' placeholder='search' value={search} onChange={(e) =>handleSearch(e)}/>
          <button className='search-btn' onClick={() =>handleSubmit()}>Search</button>
          </div>
        </div>
      </div>
      <div className='container'>
        {
          data.map((e, i) =><div className='card' key={e.slug}>
          <p className='emoji'>
          {e.character}
          </p>
          <article>{e.unicodeName.slice(4,e.unicodeName.length)}</article>
        </div>
        )
        }
        
      </div>
    </div>
  )
}
export default App;