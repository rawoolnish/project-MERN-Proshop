import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';
const PORT = 'http://localhost:5000'




const OrderScreen = () => {

    const [sdkReady, setSdkReady] = useState(false)

    const params = useParams();
    const orderId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        //Calculate Prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100)
        }

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }



    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get(`${PORT}/api/config/paypal`)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay || successDeliver) {

            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, orderId, successPay, successDeliver, order, userInfo, navigate])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }



    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <>
                <Link to='/admin/orderlist' className='btn btn-dark' >Go back</Link >
                <h1>Order_{order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>Shipping</h3>
                                <strong>Address:</strong>
                                <p className='my-0'>{order.shippingAddress.name},</p>
                                <p className='my-0'>{order.shippingAddress.address},{order.shippingAddress.city},</p>
                                <p className='my-0'>{order.shippingAddress.district},{order.shippingAddress.state},</p>
                                <p className='my-0'>{order.shippingAddress.postalCode}</p>
                                {order.isDelivered ? (
                                    <Message variant='success'>
                                        Delivered on {order.deliveredAt}
                                    </Message>
                                ) : (
                                    <Message variant='danger'>Not Delivered</Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h3>Payment</h3>
                                <p className='mb-0'> <strong>User:</strong>{order.user.name}</p>
                                <p > <a href={`mail to:${order.user.email}`}>Email: {order.user.email}</a></p>

                                <p ><strong>Payment Method :</strong>{order.paymentMethod}</p>
                                {order.isPaid ? (
                                    <Message variant='success'>Paid on {order.paidAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not Paid</Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h3>Order Items</h3>
                                {order.orderItems.length === 0 ? (
                                    <Message> Order is empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
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
                                        ${order.itemsPrice - order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Shipping Charge</strong>
                                    </Col>
                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Tax</strong>
                                    </Col>
                                    <Col>
                                        ${order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Total Price</strong>
                                    </Col>
                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>Mark As Delivered</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>

                    </Col>

                </Row>

            </>
    )
}

export default OrderScreen 
