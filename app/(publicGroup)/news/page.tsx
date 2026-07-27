import React from 'react'
import PublicBNewsCard from '../_components/news/PublicNews'

const NewsPage = () => {
  return (
    <div>
      <h2>NewsPage</h2>

      <div className='max-w-6xl mx-auto grid grid-cols-3 gap-5'>
        <PublicBNewsCard />
        <PublicBNewsCard />
        <PublicBNewsCard />
        
      </div>


    </div>
  )
}

export default NewsPage