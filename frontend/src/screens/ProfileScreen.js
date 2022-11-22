import React, { useState, useEffect } from 'react'
import { Grid, Table, Form, Button, Row, Col, ListGroup, Card, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile, getUserTokenDetails, getUserTokenTxDetails } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [totalReward, setTotalReward] = useState('')
  const [totalRedeem, setTotalRedeem] = useState('')
  const [balance, setBalance] = useState('')
  const [tokenDetailsCalled, setTokenDetailsCalled] = useState(false)


  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userTokenDetails = useSelector((state) => state.getUserTokenDetails)
  const { loading: tokenLoading, error: tokenError, tokenDetails } = userTokenDetails



  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {

    if (!userInfo) {
      history.push('/login')
    } else {

      console.log("*****tokenDetails***", tokenDetails)

      if (!tokenDetailsCalled) {

        dispatch(getUserTokenDetails())
        setTokenDetailsCalled(true)

      }
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())



      } else {
        setName(user.name)
        setEmail(user.email)
        setMobile(user.mobile)
        if (tokenDetails && tokenDetails.totalReward) {
          setTotalReward(tokenDetails.totalReward)
          setTotalRedeem(tokenDetails.totalRedeem)
          setBalance(tokenDetails.balance)
        }

      }
    }
  }, [dispatch, history, userInfo, user, success, tokenDetails])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, mobile, password }))
    }
  }

  const viewTxhandler = (e) => {
    e.preventDefault()

  }

  const viewTxDetails = (e) => {
    e.preventDefault()
    history.push('/token/txdetails')

  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        { }
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='mobile'>
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                type='mobile'
                placeholder='Enter mobile number'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>

                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Row>
          <Col calss={9}>

            {tokenLoading ? (
              <Loader />
            ) : tokenError ? (
              <Message variant='danger'>{error}</Message>
            ) : (<Card>

              <h2 style={{ "marginLeft": "20px" }}>Token Details</h2>
              <ListGroup variant='flush'>
                {user && !user.isAdmin ? (
                  <ListGroup.Item>
                    <Container variant="primary">

                      <Row className="justify-content-md-center show-grid">
                        <Col>Total Reward:</Col>
                        <Col>
                          {tokenDetails && <strong className='text-success'>{numberFormat(tokenDetails.totalReward)}</strong>}
                        </Col>
                      </Row>
                    </Container>
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item>
                    <Container variant="primary">

                      <Row className="justify-content-md-center show-grid">
                        <Col>Token Name:</Col>
                        <Col>
                          {tokenDetails && <strong className='text-muted'>{tokenDetails.name}</strong>}
                        </Col>
                      </Row>
                    </Container>
                  </ListGroup.Item>
                )}
                {user && !user.isAdmin ? (<ListGroup.Item>
                  <Container>
                    <Row className="justify-content-md-center">
                      <Col>Total Redemption:</Col>
                      <Col>
                        {tokenDetails && <strong className='text-muted'>{numberFormat(tokenDetails.totalRedeem)}</strong>}
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                ) : (
                  <ListGroup.Item>
                    <Container variant="primary">

                      <Row className="justify-content-md-center show-grid">
                        <Col>Token Sysmbol:</Col>
                        <Col>
                          {tokenDetails && <strong className='text-muted'>{tokenDetails.symbol}</strong>}
                        </Col>
                      </Row>
                    </Container>
                  </ListGroup.Item>
                )}


                {user && !user.isAdmin ? (<ListGroup.Item>
                  <Container>
                    <Row className="justify-content-md-center">
                      <Col>Total Balance:</Col>
                      <Col>
                        {tokenDetails && <strong className='text-info'>{numberFormat(tokenDetails.balance)}</strong>}
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                ) : (<ListGroup.Item>
                  <Container variant="primary">

                    <Row className="justify-content-md-center show-grid">
                      <Col>Token Supply:</Col>
                      <Col>
                        {tokenDetails && <strong className='text-muted'>{tokenDetails.total}</strong>}
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                )}
                {user && !user.isAdmin ? (<ListGroup.Item>



                  <Row className="justify-content-md-center show-grid">
                    <Col md={4}></Col>
                    <Col><Button
                      type='button'
                      className='btn-block ml-2 mr-2'
                      disabled={tokenDetails == undefined || tokenDetails.totalReward == '0'}
                      onClick={viewTxDetails}
                    > Tx Details </Button></Col>
                    <Col md={4}></Col>
                  </Row>



                </ListGroup.Item>
                ) : (<> </>)}

              </ListGroup>


            </Card>)}

          </Col>
        </Row>

      </Col>
    </Row>
  )
}


export const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {

  }).format(value);

export default ProfileScreen
