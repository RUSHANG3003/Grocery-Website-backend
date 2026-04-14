const pool = require('../config/db');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const logger = new Logger();
const RepositoryName = 'productsRepository';

const productsRepository = {

    getProductsByCategoryId: async (categoryId, callback) => {
        const methodName = 'getProductsByCategoryId';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Getting all productsByCategoryId`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_getAllProductByCategoryId(?)`;

            const [result] = await db.query(sql, [categoryId]);

            const products = result[0];

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `ProductsByCategoryId get successfully`);

            callback(null, products);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error getting productsByCategoryId', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    },

    getAllProduct: async (callback) => {
        const methodName = 'getAllProduct';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Getting all products`
            );

            db = await pool.promise().getConnection();

            const sql = `CALL usp_getAllProduct()`;

            const [result] = await db.query(sql);

            const products = result[0];

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `All products retrieved successfully`
            );

            callback(null, products);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error getting all products', err.stack
            );

            callback(err);

        } finally {
            if (db) db.release();
        }
    },

    getProductById: async (ProductId, callback) => {
        const methodName = 'getproductById'
        let db = null
        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Getting all productsByCategoryId`
            )
            db = await pool.promise().getConnection();
            const sql = `CALL usp_getProductById(?)`
            const [result] = await db.query(sql, [ProductId]);
            const products = result[0];
            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `ProductsByCategoryId get successfully`
            )
            callback(null, products);
        }
        catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error getting productsByCategoryId', err.stack);
            callback(err);
        }
        finally {
            if (db) db.release();
        }
    },

    addProduct: async (productData, callback) => {
        const methodName = 'AddProduct'
        let db = null

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Getting all productsByCategoryId`
            )
            db = await pool.promise().getConnection();
            const sql = `CALL usp_AddProduct(?,?,?,?,?,?,?,?,?)`
            const [result] = await db.query(sql, [productData.categoryId, productData.name,
            productData.description, productData.discountPrice, productData.price, productData.image, productData.stock,
            productData.isActive, productData.createdBy])
            const products = result[0]
            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `ProductsByCategoryId get successfully`
            )
            callback(null, products)
        }
        catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error getting productsByCategoryId', err.stack);

            callback(err);
        }
        finally {
            if (db) db.release();
        }
    }



}

module.exports = productsRepository;
