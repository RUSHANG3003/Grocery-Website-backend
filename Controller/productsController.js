const productsRepository = require('../Repository/productsRepository');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const FailureResponse = require('../response/failureResponse');
const SuccessResponse = require('../response/successReponse');

const logger = new Logger();
const ControllerName = 'productsController';

const productsController = {

    getProductsByCategoryId: (req, res) => {
        const methodName = 'getProductsByCategoryId';
        const { categoryId } = req.query;

        // logger.log(ControllerName, methodName, LogType.logType.VERBOSE,
        //     'Initiating get all category process', JSON.stringify(req.body));


        if (!categoryId) {
            return res.status(400).json(
                new FailureResponse(false, 'Category ID is required', '400')
            );
        }

        productsRepository.getProductsByCategoryId(categoryId, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to get all productsByCategoryId', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get all productsByCategoryId', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'All productsByCategoryId retrieved successfully', JSON.stringify(result));

            return res.status(200).json(
                new SuccessResponse(true, {
                    productsByCategoryId: result,
                    message: 'All productsByCategoryId retrieved successfully'
                })
            );
        });
    },

    getAllProduct: (req, res) => {
        const methodName = 'getAllProduct';

        logger.log(ControllerName, methodName, LogType.logType.VERBOSE,
            'Initiating get all product process', JSON.stringify(req.body));

        productsRepository.getAllProduct((err, result) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to get all product', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get all product', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'All product retrieved successfully', JSON.stringify(result));

            return res.status(200).json(
                new SuccessResponse(true, {
                    getAllProduct: result,
                    message: 'All product retrieved successfully'
                })
            );
        });
    },

    getProductById: (req, res) => {
        const methodName = 'getProductById';
        const { productId } = req.query;

        if (!productId) {
            return res.status(400).json(
                new FailureResponse(false, 'productId missing', '400')
            )
        }

        logger.log(ControllerName, methodName, LogType.logType.VERBOSE, 'Fetching ProductByID', JSON.stringify(req.body));

        productsRepository.getProductById(productId, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to get ProductByID', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get ProductByID', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'ProductByID retrieved successfully', JSON.stringify(result));

            return res.status(200).json(
                new SuccessResponse(true, {
                    getProductById: result,
                    message: 'ProductByID retrieved successfully'
                })
            );
        })
    },



    AddProduct: (req, res) => {
        const methodName = 'AddProduct';
        const { categoryId, name, description, discountPrice, price, stock, isActive, createdBy } = req.body;


        const imagePath = req.file
            ? req.file.path.replace(/\\/g, "/").split("static/")[1]
            : null;

        if (!categoryId || !name || !description || !price || !imagePath || !stock || !isActive || !createdBy) {
            return res.status(400).json(
                new FailureResponse(false, 'All fields are required', '400')
            );
        }

        logger.log(ControllerName, methodName, LogType.logType.VERBOSE,
            'Initiating AddProduct process', JSON.stringify(req.body));

        const productData = {
            categoryId,
            name,
            description,
            discountPrice,
            price,
            image: imagePath,
            stock,
            isActive,
            createdBy
        };

        productsRepository.addProduct(productData, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to AddProduct', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to AddProduct', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'AddProduct retrieved successfully', JSON.stringify(result));

            return res.status(200).json(
                new SuccessResponse(true, {
                    AddProduct: result,
                    message: 'AddProduct retrieved successfully'
                })
            );
        });

    }

}

module.exports = productsController;
