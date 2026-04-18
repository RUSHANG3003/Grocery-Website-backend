const pool = require('../config/db');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const logger = new Logger();
const fs = require('fs');
const path = require('path');
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
                `Adding Product`
            )
            db = await pool.promise().getConnection();
            const sql = `CALL usp_AddProduct(?,?,?,?,?,?,?,?,?)`
            const [result] = await db.query(sql, [productData.categoryId, productData.name,
            productData.description, productData.discountPrice, productData.price, productData.image, productData.stock,
            productData.isActive, productData.createdBy])
            const products = result[0]
            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `added  successfully`
            )
            callback(null, products)
        }
        catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error getting Add Product', err.stack);

            callback(err);
        }
        finally {
            if (db) db.release();
        }
    },

    updateProduct: async (productData, callback) => {
        const methodName = 'updateProduct'
        let db = null

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Updating Product`
            )
            db = await pool.promise().getConnection();
            const sql = `CALL usp_updateProduct(?,?,?,?,?,?,?,?,?,?)`
            const [result] = await db.query(sql, [productData.productId, productData.categoryId, productData.name,
            productData.description, productData.discountPrice, productData.price, productData.image, productData.stock,
            productData.isActive, productData.updatedBy])
            const products = result[0]
            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `updated successfully`
            )
            callback(null, products)
        }
        catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error getting updateProduct', err.stack);

            callback(err);
        }
        finally {
            if (db) db.release();
        }
    },



    deleteProduct: async (productId, callback) => {
        const methodName = 'deleteProduct'
        let db = null;

        try {

            logger.log(RepositoryName, methodName, LogType.logType.VERBOSE, 'deleting product', JSON.stringify(productId))
            db = await pool.promise().getConnection();

            // 1. Get image path first
            const [rows] = await db.query(
                "SELECT product_img FROM product_tbl WHERE product_id_pk = ?",
                [productId]
            );

            if (!rows.length) {
                return callback(new Error("Product not found"));
            }

            const imagePath = rows[0].product_img;

            // 2. Delete file from static
            if (imagePath) {
                const fullPath = path.join(__dirname, '..', imagePath);

                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                    console.log("Image deleted:", fullPath);
                } else {
                    console.log("Image not found:", fullPath);
                }
            }
            const sql = `CALL usp_deleteProduct(?)`
            const [result] = await db.query(sql, [productId])
            const products = result[0]
            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `ProductsByCategoryId get successfully`
            )
            callback(null, products)
        } catch (err) {
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
