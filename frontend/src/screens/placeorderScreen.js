
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import CheckoutSteps from '../components/checkoutSteps';
import { createOrder } from '../actions/orderActions';





const PlaceorderScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart)


    //Calculate Prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 49)
    cart.taxPrice = addDecimals(Number((0.18 * cart.itemsPrice)))
    cart.totalPrice = (cart.itemsPrice + cart.shippingPrice)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            navigate(`/orders/${order._id}`)
        }
        // eslint-disable-next-line 
    }, [success, navigate,])


    const placeorderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }


    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <strong>Address:</strong>
                            <p className='my-0'>{cart.shippingAddress.name},</p>
                            <p className='my-0'>{cart.shippingAddress.address},{cart.shippingAddress.city},</p>
                            <p className='my-0'>{cart.shippingAddress.district},{cart.shippingAddress.state},</p>
                            <p className='my-0'>{cart.shippingAddress.postalCode}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment</h3>
                            <strong>Payment Method :</strong>
                            <p>{cart.paymentMethod}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x $ {item.price} = $ {(item.qty * item.price)}

                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup varient='flush'>
                        <ListGroup.Item >
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <strong>Taxable Value</strong>
                                </Col>
                                <Col>
                                    ${cart.itemsPrice - cart.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <strong>Shipping Charge</strong>
                                </Col>
                                <Col>
                                    ${cart.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <strong>Tax</strong>
                                </Col>
                                <Col>
                                    ${cart.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <strong>Total Price</strong>
                                </Col>
                                <Col>
                                    ${cart.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row className='p-1'>
                                <Button type='button' className='btn btn-block' disabled={cart.cartItems === 0} onClick={placeorderHandler} >Place Order</Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>

                </Col>

            </Row>

        </>
    )
}

export default PlaceorderScreen 
