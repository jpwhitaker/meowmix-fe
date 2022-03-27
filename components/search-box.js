import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {useDebounce} from 'use-debounce'
import {PodcastContext} from '../pages/index'

export default function SearchBox() {
  const [podcastTitle, setPodcastTitle] = useState('')
  const [debounceTitle] = useDebounce(podcastTitle, 500)
  const appleURL = `https://itunes.apple.com/search?`
  const {podcastData, setPodcastData} = useContext(PodcastContext)

  useEffect(
    () => {
      axios.get(`${appleURL}entity=podcast&term=${debounceTitle}&limit=6`)
      .then((response) => {
        setPodcastData(response.data.results);
      })
    },
    [debounceTitle]
  )

  return(
    <>
      <input 
        type="text" 
        placeholder="Podcast"
        onChange={(e) => {
          setPodcastTitle(e.target.value);
        }}
        className="border border-gray-300 px-3 py-2 rounded-md shadow-sm mb-2"
      ></input>
    </>
  )
}