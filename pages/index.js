import Head from 'next/head'
import React, { useState, createContext } from 'react'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import SearchBox from '../components/SearchBox'
import PodcastDisplay from '../components/podcast-results'

export const PodcastContext = React.createContext({
  podcastData: [],
  setPodcastData: () => {}
});

export default function Home() {
  const [podcastData, setPodcastData] = useState([])
  const podcastDataState = {podcastData, setPodcastData};

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className="mb-4">Welcome to MeowMix</p>
        <PodcastContext.Provider value={podcastDataState}>
          <SearchBox/>
          <PodcastDisplay/>
        </PodcastContext.Provider>
      </section>
    </Layout>
  )
}