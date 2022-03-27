import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import useSWR from 'swr'

import {useDebounce} from 'use-debounce'
import {PodcastContext} from '../pages/index'

const appleURL = `https://itunes.apple.com/search?`
const fetcher = (...args) => fetch(...args).then(res => res.json())

function usePodcast (searchTerm) {


  const { data, error } = useSWR(`${appleURL}entity=podcast&term=${searchTerm}&limit=6&domain=${window.location.host}`, fetcher)
  return {
    podcasts: data,
    isLoading: !error && !data,
    isError: error
  }
}


export default function SearchBox() {
  const [podcastTitle, setPodcastTitle] = useState('')
  const [debounceTitle] = useDebounce(podcastTitle, 500)
  const {podcastData, setPodcastData} = useContext(PodcastContext)
  if (typeof window !== 'undefined') {
    const { podcasts, isLoading, isError } = usePodcast(debounceTitle)
      if (podcasts != undefined){
        setPodcastData(podcasts?.results)
      }
  }


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