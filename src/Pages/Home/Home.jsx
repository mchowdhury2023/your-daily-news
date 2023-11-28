import React from 'react'
import AllArticles from '../Aricles/AllArticles'
import TrendingArticles from '../Aricles/TrendingArticles'
import SubscriptionPlans from '../../Subscription/SubsciptionPlans'
import Publishers from '../Publishers/Publishers'
import UserStatistic from '../Statistics/UserStatistic'

const Home = () => {
  return (
    <div >
      <div style={{textAlign:'center'}}>
        <h2>Trending Articles</h2>
        <TrendingArticles></TrendingArticles>

      </div>
      <div>
      <Publishers></Publishers>
      </div>
      <div>
      <h2 style={{textAlign:'center'}}>User Statistic</h2>
      <UserStatistic></UserStatistic>

      </div>
      <div>
      <h2 style={{textAlign:'center'}}>All Articles</h2>
      <AllArticles></AllArticles>

      </div>
      <div>
        <h2 style={{textAlign:'center'}}> Choose Your Subscription Plan</h2>
        <SubscriptionPlans></SubscriptionPlans>
      </div>
       
    </div>
  )
}

export default Home