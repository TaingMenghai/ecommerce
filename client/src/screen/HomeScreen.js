import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Col, Row } from "react-bootstrap"

import Product from "../components/Product.js"
import Loader from "../components/Loader.js"
import Message from "../components/Message.js"
import Paginate from "../components/Paginate.js"
import ProductCarousel from "../components/ProductCarousel.js"
import Meta from "../components/Meta.js"

import { listProducts } from "../actions/productAction.js"

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword
	const pageNumber = match.params.pageNumber

	const dispatch = useDispatch()

	const productList = useSelector((state) => state.productList)
	const { loading, products, error, pages, page } = productList

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])

	return (
		<>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light'>
					Go Back
				</Link>
			)}

			<h1>latest products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map((p) => (
							<Col sm={12} md={6} lg={4} xl={3} key={p._id}>
								<Product product={p} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ""}
					/>
				</>
			)}
		</>
	)
}

export default HomeScreen
