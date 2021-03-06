const Wallet = require('../../../models/wallet');
const TransactionPool = require('../../../models/wallet/transaction-pool');
const PubSub = require('../../../utils/pubsub');

const wallet = new Wallet();
const transactionPool = new TransactionPool();
const pubsub = new PubSub({ transactionPool, wallet })

/**
 * @api {get} /transactions
 *
 * @apiName GET Fetch TransactionPoolMapList
 *
 * @access Public
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} Fetching a PoolMap
 *
 * @apiError (400) {String} message Validation Error
 *
 * @apiError (500) {String} Internal Server error
 */

exports.poolMapList = (req, res) => {
    res.status(200).json(transactionPool.transactionMap);
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

    let transaction = transactionPool
        .existingTransaction({ inputAddress: wallet.publicKey });

    try {
        if (transaction) {
            transaction.update({ senderWallet: wallet, recipient, amount })
        } else {
            transaction = wallet.createTransaction({ recipient, amount });
        }
    } catch (error) {
        return res.status(400).json({ type: 'error', message: error.message })
    }

    transactionPool.setTransaction(transaction);

    pubsub.broadcastTransaction(transaction);

    res.status(200).json({ type: 'success', transaction });
 };