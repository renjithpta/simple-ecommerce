import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Table, Form, Row, Col ,Grid} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { LinkContainer } from 'react-router-bootstrap'
import {
  getRuleDetails, updateRule

} from '../actions/ruleActions'

const RuleDetailsScreen = ({ match, history }) => {
  const ruleId = match.params.id
  const [ruleNumber, setRuleNumber] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [tokenRate, setTokenRate] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const ruleDetails = useSelector((state) => state.ruleDetails)
  const { rule, loading, error } = ruleDetails
  const ruleUpdate = useSelector((state) => state.ruleUpdate)
  const { loading: updateLoading, success } = ruleUpdate
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {

    if (!userInfo) {
      history.push('/login')
    } else {
      if (!rule || !rule.ruleNumber) {

        dispatch(getRuleDetails(ruleId));

      } else {
        setRuleNumber(rule.ruleNumber)
        setCategory(rule.category)
        setAmount(rule.amount)
        setTokenRate(rule.tokenRate)
      }
    }




  }, [dispatch, rule])
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateRule({ id: rule._id, ruleNumber: rule.ruleNumber, category, amount, tokenRate }))
  }

  return (
    <FormContainer>
      {message && <Message variant='danger'>{message}</Message>}
      { }
      {success && <Message variant='success'>Rule Updated</Message>}

      {error && <Message variant='danger'>{error}</Message>}

      {
        loading || updateLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <h1>Rule {rule.ruleNumber}</h1>
            <Row>
              <Col md={12}>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='ruleNumber'>
                      <Form.Label>Rule #</Form.Label>
                      <Form.Control
                        readOnly={true}
                        type='ruleNumber'
                        placeholder='Enter Rule#'
                        value={ruleNumber}
                        onChange={(e) => setRuleNumber(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                      <Form.Label>Rule Category</Form.Label>

                      <Form.Control
                        as='select'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >

                        <option key='Global' value='Global'>
                          Global
                        </option>
                        <option key='Shope' value='Shope'>
                          Shope
                        </option>


                      </Form.Control>

                    </Form.Group>

                    <Form.Group controlId='amount'>
                      <Form.Label>Amount(cent)</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='tokenRate'>
                      <Form.Label>Token rate</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Per cent token rate'
                        value={tokenRate}
                        onChange={(e) => setTokenRate(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                      Update
                    </Button>

                    <LinkContainer to={`/admin/rules`} style={{ marginLeft: '12px' }}>
                      <Button type='button' variant='outline-secondary'>
                        Back
                      </Button>
                    </LinkContainer>
                  </Form>
                )}
              </Col>
            </Row>
          </>
        )}
    </FormContainer>
  )
}
export default RuleDetailsScreen
