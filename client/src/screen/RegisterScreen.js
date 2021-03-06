import { useEffect, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { register } from "../actions/userAction"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import Message from "../components/Message"
import useInputState from "../hooks/useInputState"

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useInputState("")
	const [email, setEmail] = useInputState("")
	const [password, setPassword] = useInputState("")
	const [confirmPassword, setConfirmPassword] = useInputState("")
	const [message, setMessage] = useState(null)

	const redirect = location.search ? location.search.split("=")[1] : "/"

	const dispatch = useDispatch()

	const userRegister = useSelector((state) => state.userRegister)
	const { userInfo, loading, error } = userRegister

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, redirect, userInfo])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) return setMessage("password do not match")

		dispatch(register(name, email, password))
	}
	return (
		<FormContainer>
			<h1>sign Up</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email' className='mb-3'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Name'
						value={name}
						onChange={setName}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='email' className='mb-3'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={setEmail}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password' className='mb-3'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={setPassword}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password' className='mb-3'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={setConfirmPassword}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Register
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Have an account?
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
						login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
