module.exports = app => {

    /**
     * @BlocksApiRoutes
     */
    app.use('/api/v1/blocks', require('../api/v1/blocks'));

    /**
     * @TransactionsApiRoutes
     */
    app.use('/api/v1/transactions', require('../api/v1/transactions'));

    /**
     * @MinesApiRoutes
     */
    app.use('/api/v1/mines', require('../api/v1/mines'));

};