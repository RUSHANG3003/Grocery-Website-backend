const categoryRepository = require('../Repository/categoryRepository');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const FailureResponse = require('../response/failureResponse');
const SuccessResponse = require('../response/successReponse');
const successResponse = require('../response/successReponse');

const logger = new Logger();
const ControllerName = 'categoryController';

const categoryController = {

    getAllCategory: (req, res) => {
        const methodName = 'getAllCategory';

        // logger.log(ControllerName, methodName, LogType.logType.VERBOSE,
        //     'Initiating get all category process', JSON.stringify(req.body));



        categoryRepository.getAllCategory((err, result) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to get all category', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get all category', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'All category retrieved successfully', JSON.stringify(result));

            return res.status(200).json(
                new SuccessResponse(true, {
                    categories: result,
                    message: 'All category retrieved successfully'
                })
            );
        });
    },

    addCategory: (req, res) => {
        const methodName = 'addCategory';
        const { categoryName, categoryImage, createdBy } = req.body;

        if (!categoryName || !categoryImage || !createdBy) {
            return res.status(400).json(
                new FailureResponse(false, 'All fields are Required', '400')
            );
        }

        categoryRepository.addCategory(categoryName, categoryImage, createdBy, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName, LogType.logType.EXCEPTION, 'Failed to Adding Cateogry', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to Add Cateogry', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'Add category successfully', JSON.stringify(result));

            return res.status(200).json(
                new SuccessResponse(true, {
                    categories: result,
                    message: ' category Added successfully'
                })
            );

        })

    },

    getCategoryById: (req, res) => {
        const methodName = 'getCateogryById';
        const { categoryId } = req.query;

        if (!categoryId) {
            return res.status(400).json(
                new FailureResponse(false, 'Field Required', '400')
            )
        }

        categoryRepository.getCategoryById(categoryId, (err, result) => {

            if (err) {
                logger.log(ControllerName, methodName, LogType.logType.EXCEPTION, 'Failed To get Cateogry', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get category', '500')
                );
            }

            logger.log(ControllerName, methodName, LogType.logType.RELEASE, 'Category retirved successfully', JSON.stringify(result));

            return res.status(200).json(new successResponse(true, {
                categories: result,
                message: 'category retrieved successfully'
            })
            );


        })
    },

    updateCategory: (req, res) => {
        const methodName = 'updateCategory';
        const { categoryId, categoryName, categoryImage, updatedBy } = req.body;

        if (!categoryId || !categoryName || !categoryImage || !updatedBy) {
            return res.status(400).json(
                new FailureResponse(false, 'All fields are Required', '400')
            );
        }

        categoryRepository.updateCategory(categoryId, categoryName, categoryImage, updatedBy, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName, LogType.logType.EXCEPTION, 'Failed to updating Cateogry', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to update Cateogry', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'update category successfully', JSON.stringify(result));

            return res.status(200).json(
                new SuccessResponse(true, {
                    categories: result,
                    message: 'category updated successfully'
                })
            );

        })

    },

    deleteCategory: (req, res) => {
        const methodName = 'deleteCateogry';
        const { categoryId } = req.query;

        if (!categoryId) {
            return res.status(400).json(
                new FailureResponse(false, 'Field Required', '400')
            )
        }

        categoryRepository.deleteCategory(categoryId, (err, result) => {

            if (err) {
                logger.log(ControllerName, methodName, LogType.logType.EXCEPTION, 'Failed To delete Cateogry', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to delete category', '500')
                );
            }

            logger.log(ControllerName, methodName, LogType.logType.RELEASE, 'Category deleted successfully', JSON.stringify(result));

            return res.status(200).json(new successResponse(true, {
                categories: result,
                message: 'category deleted successfully'
            })
            );


        })
    },


}

module.exports = categoryController;
