import React, { useEffect } from 'react';
import Meta from '../components/meta';
import { Link } from 'react-router-dom';
import Product from '../components/Products';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Message from '../components/message';
import Loader from '../components/loader';
import Paginate from '../components/paginate';
import { useParams } from 'react-router-dom';
import ProductCarousal from '../components/productCarousal';


const HomeScreen = () => {
    const params = useParams();
    const keyword = params.keyword;
    const pageNumber = params.pageNumber

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousal /> : <Link to='/' className='btn btn-dark'>Go back</Link >}
            <h1>Latest Products</h1>
            {loading ? (<Loader />) : error ? (<Message varient='danger'>{error}</Message>) : (
                <>
                    <Row>{products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))

                    }
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate>
                </>)}

        </>
    )
}

export default HomeScreen