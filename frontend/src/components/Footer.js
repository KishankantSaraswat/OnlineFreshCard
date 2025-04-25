import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-success text-white py-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5>Fresh Cart</h5>
            <p>Your one-stop destination for fresh groceries and daily essentials.</p>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/cart" className="text-white">Cart</a></li>
              <li><a href="/login" className="text-white">Sign In</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Contact Us</h5>
            <p>
              <i className="fas fa-envelope mr-2"></i> support@freshcart.com<br />
              <i className="fas fa-phone mr-2"></i> +1 234 567 8900
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3 border-top">
            Copyright &copy; {new Date().getFullYear()} Fresh Cart. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

