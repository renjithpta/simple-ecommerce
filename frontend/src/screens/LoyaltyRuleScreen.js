import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listRules } from '../actions/ruleActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const LoyaltyRuleScreen = ({ location, history }) => {

    const [message, setMessage] = useState(null)
    const [pageLoading, setPageLoading] = useState(false)
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin



    const ruleList = useSelector((state) => state.ruleList)
    const { loading: ruleLoading, error: ruleError, rules } = ruleList

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }
        if (!pageLoading) {
            dispatch(listRules())
            setPageLoading(true);
        }
    }, [dispatch, history, userInfo, rules])



    return (

        <>
            <Row className='align-items-center'>
                <Col className='text-left' md={1}> </Col>
                <Col className='text-left' md={3}>
                    <h2>Exchange Rules</h2>
                </Col>
                <Col className='text-left' md={4}> </Col>
                <Col className='align-items-right'>
                    <LinkContainer to={`/admin/rule/new`}>
                        <Button className='my-3' >
                            <i className='fas fa-plus'></i> Create Rule
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            <Row>
                <Col md={1}> </Col>

                <Col md={9}>

                    {ruleLoading ? (
                        <Loader />
                    ) : ruleError ? (
                        <Message variant='danger'>{ruleError}</Message>
                    ) : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Amount(cent)</th>
                                    <th>Token Rate</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                {rules.map((rule) => (
                                    <tr key={rule._id}>
                                        <td>{rule.category}</td>
                                        <td>{rule.amount}</td>
                                        <td>{rule.tokenRate}</td>
                                        <td>
                                            <LinkContainer to={`/admin/rule/${rule._id}/edit`}>
                                                <Button className='btn-sm' variant='light'>
                                                    Update
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default LoyaltyRuleScreen;


