import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Fresh Cart',
  description: 'Fresh groceries and daily essentials delivered to your doorstep',
  keywords: 'groceries, fresh vegetables, fruits, daily essentials, online grocery shopping',
}

export default Meta

