import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Link, useParams } from 'react-router-dom';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Loader from '../components/loader';
import Message from '../components/message';
import { useNavigate } from "react-router-dom";
import Meta from '../components/meta';
// import Products from '../components/Products';


const ProductScreen = () => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    let navigate = useNavigate();

    const { id } = useParams();
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails;

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate;


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const addToCartHandler = () => {
        navigate(`/cart/${id}/qty=1`)
    }

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
        }
        if (!product._id || product._id !== id) {
            dispatch(listProductDetails(id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, product._id, id, successProductReview])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReview(id, { rating, comment })
        )
    }

    return (

        <>
            <Link className='btn btn-dark my-3' to='/'> Go Back</Link>
            {loading ? (<Loader />) : error ? <Message variant='danger'>{error}</Message> :
                (<>
                    <Meta title={product.name} />
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid  ></Image>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price :${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    description :{product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup varient='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col> Price : </Col>
                                            <Col> <strong>{(product.price)}</strong> </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col> Status : </Col>
                                            <Col>
                                                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Stock Left:</Col>
                                                <Col>
                                                    ({product.countInStock})
                                                    {/* <Form.Control
                                                        as='select'
                                                        placeholder='1'
                                                        value={qty}
                                                        onChange={(e) => { setQty(e.target.value) }}>
                                                        {[...Array(product.countInStock).keys()].map((x) => {
                                                            return <option key={x + 1} value={x + 1}>{x + 1}</option>;
                                                        })}
                                                    </Form.Control> */}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item >
                                        <Row>
                                            <Button className="btn-block" type='button' onClick={addToCartHandler} disabled={product.countInStock === 0} >
                                                Add  to  Cart
                                            </Button>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h3>Reviews</h3>
                            {product.reviews.length === 0 && <Message>No  Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h3>Add a Review</h3>
                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Button type='submit' variant='primary'>Submit</Button>
                                        </Form>)
                                        : <Message> Please<Link to='/login'>sign in</Link>{''}</Message>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>)
            }
        </>
    )
}

export default ProductScreen