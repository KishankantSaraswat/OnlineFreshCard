import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import Rating from './Rating'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container>
      <Carousel pause='hover' className='bg-light mb-4'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption>
                <h2>
                  {product.name} (${product.price})
                </h2>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color='#f8e825'
                />
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  )
}

export default ProductCarousel

