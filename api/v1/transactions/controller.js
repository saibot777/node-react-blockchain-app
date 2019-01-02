const Wallet = require('../../../models/wallet');
const TransactionPool = require('../../../models/wallet/transaction-pool');
const PubSub = require('../../../utils/pubsub');

const wallet = new Wallet();
const transactionPool = new TransactionPool();

/**
 * @api {get} /transactions
 *
 * @apiName GET Fetch All Transactions
 *
 * @access Public
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} Fetching a Blocks
 *
 * @apiError (400) {String} message Validation Error
 *
 * @apiError (500) {String} Internal Server error
 */

exports.list = (req, res) => {
    res.json(blockchain.chain);
 };

 /**
 * @api {post} /transactions/create
 *
 * @apiName POST Create transaction
 *
 * @access Public
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} Creates a Transaction
 *
 * @apiError (400) {String} message Validation Error
 *
 * @apiError (500) {String} Internal Server error
 */

exports.create = (req, res) => {
    const { amount, recipient } = req.body;

    const transaction = wallet.createTransaction({ recipient, amount });

    transactionPool.setTransaction(transaction);

    console.log('transactionPool', transactionPool);

    res.json({ transaction });
 };