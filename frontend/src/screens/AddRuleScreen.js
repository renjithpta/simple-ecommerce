import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Table, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { LinkContainer } from 'react-router-bootstrap'
import {
    addRule
} from '../actions/ruleActions'

const AddRuleScreen = ({ location, history }) => {

    const [category, setCategory] = useState('Global')
    const [amount, setAmount] = useState('')
    const [tokenRate, setTokenRate] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()


    const ruleAdd = useSelector((state) => state.ruleAdd)
    const { loading, success, error, ruleDetails } = ruleAdd

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() => {
        if (!userInfo) {
            history.push(redirect)
        }
    }, [dispatch, history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(addRule(category, amount, tokenRate))
    }

    return (
        <FormContainer>
            {success && <Message variant='success'>New rule added successfully!</Message>}


            {error && <Message variant='danger'>{error}</Message>}

            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <>
                        <h1>New Rule</h1>
                        <Row>
                            <Col md={12}>
                                {loading ? (
                                    <Loader />
                                ) : error ? (
                                    <Message variant='danger'>{error}</Message>
                                ) : (
                                    <Form onSubmit={submitHandler}>

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
export default AddRuleScreen
