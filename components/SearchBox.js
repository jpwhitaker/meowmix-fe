import { useState, useEffect } from 'react'
import axios from 'axios'
import {useDebounce} from 'use-debounce'

const PodcastDisplay = function(podcast){
  return (
    <img src= {podcast.artworkUrl60} />
  )
}

export default function SearchBox() {
  const [podcastTitle, setPodcastTitle] = useState('')
  const [podcastData, setPodcastData] = useState([])
  const [debounceTitle] = useDebounce(podcastTitle, 500)
  const [podcastResults, setPodcastResults] = useState([])  
  const appleURL = `https://itunes.apple.com/search?`

  useEffect(
    () => {
      axios.get(`${appleURL}entity=podcast&term=${debounceTitle}&limit=6`)
      .then((response) => {
        setPodcastData(response.data);
      })
    },
    [debounceTitle]
  )

  useEffect(
    () => {
      setPodcastResults(
        () => {
          return podcastData?.results?.map((podcast)=>{
            return PodcastDisplay(podcast)
          })
        }
      )
    },
    [podcastData]
  )

  return(
    <div>
      <input 
        type="text" 
        placeholder="Podcast"
        onChange={(e) => {
          setPodcastTitle(e.target.value);
        }}
        className="border border-gray-300"
      ></input>

      <div className="flex">{podcastResults}</div>
    </div>
  )
}