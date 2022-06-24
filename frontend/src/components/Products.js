import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Products = ({ product }) => {

    return (
        <div>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} varient='top' />
                </Link>

                <Card.Body>
                    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}   >
                        <Card.Title as='div'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as='div'>
                        <Rating value={product.rating} text={`${product.numReviews}  reviews `} />
                    </Card.Text>
                    <Card.Text as='h3'>${product.price}  </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Products