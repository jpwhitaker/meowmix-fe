import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useDebounce} from 'use-debounce'


const PodcastDisplay = function(podcast){
  return (
    <img src= {podcast.artworkUrl60} />
  )
}

const SearchBox = function(){

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

  return (
    <div>
      <input 
        type="text" 
        placeholder="Podcast"
        onChange={(e) => {
          setPodcastTitle(e.target.value);
        }}
      ></input>

      <p>{podcastResults}</p>
    </div>
  )
}


export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to MeowMix from JP</p>
        <SearchBox/>

      </section>
    </Layout>
  )
}