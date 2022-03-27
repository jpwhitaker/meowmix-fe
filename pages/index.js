import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useDebounce} from 'use-debounce'


const SearchBox = function(){

  const [podcastTitle, setPodcastTitle] = useState('')
  const [debounceTitle] = useDebounce(podcastTitle, 500)

  return (
    <div>
      <input 
        type="text" 
        placeholder="Podcast"
        onChange={(e) => {
          setPodcastTitle(e.target.value);
        }}

      ></input>
      
      <p>Actual value: {podcastTitle}</p>
      <p>Debounce: {debounceTitle}</p>

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