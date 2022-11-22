import React, { useEffect ,useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, OverlayTrigger, Tooltip  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserTokenTxDetails  } from '../actions/tokenDetailsActions'
import EllipsisText from 'react-text-overflow-middle-ellipsis'
const TokenTxListScreen = ({ history }) => {
  //const [tokenTxDetails, setTokenTxDetails] = useState([])
  const dispatch = useDispatch()
  
  const userTxList = useSelector((state) => state.getUserTokenTxDetails)
  const { loading, error, tokenTxDetails } = userTxList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
 
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserTokenTxDetails())
     
    } else {
      history.push('/login')
    }
     
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>User Token Tx Details</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm' sm={12} >
          <thead>
            <tr>
              <th sm={3} width={'10%'}>TxHash</th>
              <th sm={3} width={'10%'}>BlockHash</th>
              <th sm={3} width={'10%'}>TotalPrice</th>
              <th sm={3} width={'10%'}>Order ID</th>
              <th sm={3} width={'20%'}>Created</th>
            </tr>
          </thead>
          <tbody>
            {tokenTxDetails && tokenTxDetails.length > 0 && tokenTxDetails.map((tx) => (
              <tr  key={tx._id}>
                <td width={'10%'} calssName='ellipsis'>
                
                <OverlayTrigger  delay={{ hide: 450, show: 300 }} placement="bottom"  overlay={<Tooltip id="tooltip2">{tx.transactionHash}</Tooltip>}>
                <EllipsisText text={tx.transactionHash} className={'centerText'} />
                 </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger  delay={{ hide: 450, show: 300 }} placement="bottom"
        overlay={<Tooltip id="tooltip2">{tx.transactionHash}</Tooltip>}
      >
                 <EllipsisText text={tx.blockHash} className={'centerText'} />
                 </OverlayTrigger>
                 
                 </td>
                <td>{tx.totalItemsPrice}</td>
                <td>
                  <LinkContainer to={`/order/${tx.order}`}>
                    <strong>{tx.order}</strong>
                  </LinkContainer>
                 
                </td>
                   <td>{tx.createdAt.substr(0, (tx.createdAt.indexOf('Z')-4))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default TokenTxListScreen
