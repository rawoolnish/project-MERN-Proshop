import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/formContainer';
import CheckoutSteps from '../components/checkoutSteps';
import { saveShippingAddress } from '../actions/cartActions';


const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState(shippingAddress.name)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [district, setDistrict] = useState(shippingAddress.district)
    const [state, setState] = useState(shippingAddress.state)


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ name, address, city, postalCode, state, district }))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='address' className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='address'
                        placeholder='Enter Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='city'
                        placeholder='City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='district' className='my-2'>
                    <Form.Label>District</Form.Label>
                    <Form.Control
                        type='district'
                        placeholder='District'
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='state' className='my-2'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type='state'
                        placeholder='State'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode' className='my-2'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        type='postalCode'
                        placeholder='postalCode'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-2'>
                    Continue
                </Button>

            </Form>
        </FormContainer>


    )

}

export default ShippingScreen