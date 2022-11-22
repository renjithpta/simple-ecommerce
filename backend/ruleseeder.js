import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import Rule from './models/ruleModel.js'
import connectDB from './config/db.js'
import { newRule } from './utils/tokenUtil.js'
dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Rule.deleteMany()
    await newRule(1, 1);
    const createdRule = await Rule.insertMany({ "ruleNumber": 1, category: 'Global', amount: 1, tokenRate: 1 })

    console.log(`Rule saved!${createdRule}`)

    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

importData();