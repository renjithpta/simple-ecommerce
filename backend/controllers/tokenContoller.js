import asyncHandler from 'express-async-handler'
import { getCustomerDetails, getTokenbasicDetails } from '../utils/tokenUtil.js'
import User from '../models/userModel.js'
import TxDetails from '../models/txDetailsModel.js'



// @desc    Get user token details of customer
// @route   GET /api/token/customerdetails
// @access  Protected
const customerTokenDetails = asyncHandler(async (req, res) => {
  console.log("*******Token Details********", req.user);
  let customerDetails = {};
  if (!req.user.isAdmin)
    customerDetails = await getCustomerDetails(req.user.email);
  else
    customerDetails = await getTokenbasicDetails();
  res.json(customerDetails);
})


// @desc    Get user token details of customer
// @route   GET /api/token/customerdetails
// @access  Protected
const getTxDetails = asyncHandler(async (req, res) => {
  console.log("*******Token Details********", req.user);
  const customerDetails = await TxDetails.find({ email: req.user.email });
  res.json(customerDetails);
})



export {
  customerTokenDetails, getTxDetails
}

