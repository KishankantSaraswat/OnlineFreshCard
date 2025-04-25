import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { listOrders } from '../actions/orderActions'
import Loader from './Loader'
import Message from './Message'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales & Stock Data',
    },
  },
}

const AdminDashboard = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading: loadingProducts, error: errorProducts, products } = productList

  const orderList = useSelector((state) => state.orderList)
  const { loading: loadingOrders, error: errorOrders, orders } = orderList

  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalOrders: 0,
    lowStockItems: 0,
    averageOrderValue: 0,
  })

  useEffect(() => {
    dispatch(listProducts())
    dispatch(listOrders())
  }, [dispatch])

  useEffect(() => {
    if (orders && products) {
      const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0)
      const lowStockItems = products.filter((product) => product.countInStock < 10).length
      const averageOrderValue = totalSales / orders.length

      setStatistics({
        totalSales: totalSales.toFixed(2),
        totalOrders: orders.length,
        lowStockItems,
        averageOrderValue: averageOrderValue.toFixed(2),
      })
    }
  }, [orders, products])

  const salesData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Sales ($)',
        data: orders
          ? orders
              .slice(-7)
              .map((order) => order.totalPrice)
          : [],
        borderColor: 'rgb(40, 167, 69)',
        backgroundColor: 'rgba(40, 167, 69, 0.5)',
        tension: 0.4,
      },
    ],
  }

  const stockData = {
    labels: products ? products.slice(0, 10).map((product) => product.name) : [],
    datasets: [
      {
        label: 'Stock Level',
        data: products ? products.slice(0, 10).map((product) => product.countInStock) : [],
        backgroundColor: 'rgba(32, 201, 151, 0.5)',
        borderColor: 'rgb(32, 201, 151)',
        borderWidth: 1,
      },
    ],
  }

  if (loadingProducts || loadingOrders) return <Loader />
  if (errorProducts) return <Message variant='danger'>{errorProducts}</Message>
  if (errorOrders) return <Message variant='danger'>{errorOrders}</Message>

  return (
    <Container>
      <h1 className='my-4'>Admin Dashboard</h1>
      
      <Row className='mb-4'>
        <Col md={3}>
          <Card className='text-center h-100'>
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <h2 className='text-success'>${statistics.totalSales}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='text-center h-100'>
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <h2 className='text-success'>{statistics.totalOrders}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='text-center h-100'>
            <Card.Body>
              <Card.Title>Low Stock Items</Card.Title>
              <h2 className='text-warning'>{statistics.lowStockItems}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='text-center h-100'>
            <Card.Body>
              <Card.Title>Avg. Order Value</Card.Title>
              <h2 className='text-success'>${statistics.averageOrderValue}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className='mb-4'>
            <Card.Body>
              <Card.Title>Sales Trend (Last 7 Days)</Card.Title>
              <Line options={options} data={salesData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='mb-4'>
            <Card.Body>
              <Card.Title>Stock Levels (Top 10 Products)</Card.Title>
              <Bar options={options} data={stockData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className='mb-4'>
        <Card.Body>
          <Card.Title>Low Stock Alerts</Card.Title>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products
                    .filter((product) => product.countInStock < 10)
                    .map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.countInStock}</td>
                        <td>
                          <span className={`badge bg-${product.countInStock === 0 ? 'danger' : 'warning'}`}>
                            {product.countInStock === 0 ? 'Out of Stock' : 'Low Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AdminDashboard 