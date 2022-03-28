import { useContext, useEffect, useState } from 'react'
import {PodcastContext} from '../pages/index'

const PodcastDisplay = function(podcast){
  return (
    <img src= {podcast.artworkUrl100} key={podcast.collectionId} />
  )
}

export default function PodcastResults() {
  
  const {podcastData, setPodcastData} = useContext(PodcastContext)
  const [podcastResults, setPodcastResults] = useState([])

  useEffect(
    () => {
      setPodcastResults(
        () => {
          return podcastData?.map((podcast)=>{
            return PodcastDisplay(podcast)
          })
        }
      )
    },
    [podcastData]
  )
  
  return (
    <div className="flex">{podcastResults}</div>
  )
} 