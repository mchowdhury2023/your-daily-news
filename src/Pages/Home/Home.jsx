import React from 'react'
import AllArticles from '../Aricles/AllArticles'
import TrendingArticles from '../Aricles/TrendingArticles'

const Home = () => {
  return (
    <div className='mt-10'>
      <div style={{textAlign:'center'}}>
        <h2>Trending Articles</h2>
        <TrendingArticles></TrendingArticles>

      </div>
      <div>
      <h2 style={{textAlign:'center'}}>All Articles</h2>
      <AllArticles></AllArticles>

      </div>
       
    </div>
  )
}

export default Home