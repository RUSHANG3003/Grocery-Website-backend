const pool = require('../config/db');
const { addCategory, getCategoryById } = require('../Controller/categoryController');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const logger = new Logger();
const RepositoryName = 'categoryRepository';

const categoryRepository = {

    getAllCategory: async (callback) => {
        const methodName = 'getAllCategory';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Getting all category`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_GetAllCategory()`;

            const [result] = await db.query(sql);

            const categories = result[0];

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `Category get successfully`);

            callback(null, categories);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error getting category', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    },

    addCategory: async (categoryName, categoryImage, createdBy, callback) => {
        const methodName = 'addCateogry';
        let db = null;

        try {
            logger.log(RepositoryName, methodName, LogType.logType.VERBOSE, 'Adding Category');

            db = await pool.promise().getConnection();

            const sql = `CALL usp_AddCategory(?, ?, ?)`

            const [result] = await db.query(sql, [categoryName, categoryImage, createdBy]);

            const categories = result[0];

            logger.log(RepositoryName, methodName, LogType.logType.RELEASE, 'Category added successfully');

            callback(null, categories);

        } catch (err) {
            logger.log(RepositoryName, methodName, LogType.logType.EXCEPTION, 'Error adding category', err.stack);
            callback(err);
        } finally {
            if (db)
                db.release();
        }
    },

    getCategoryById: async (CategoryId, callback) => {
        const methodName = 'getCategoryById';
        let db = null

        try {
            logger.log(RepositoryName, methodName, LogType.logType.VERBOSE, 'Getting category by id');

            db = await pool.promise().getConnection();

            const sql = `CALL usp_GetCategoryById(?)`;

            const [result] = await db.query(sql, [CategoryId]);

            const categories = result[0];

            logger.log(RepositoryName, methodName, LogType.logType.RELEASE, 'Category get successfully');

            callback(null, categories);

        } catch (err) {
            logger.log(RepositoryName, methodName, LogType.logType.EXCEPTION, 'Error getting category', err.stack);
            callback(err);
        } finally {
            if (db)
                db.release();
        }

    },

    updateCategory: async (categoryId, categoryName, categoryImage, updatedBy, callback) => {
        const methodName = 'updateCategory';
        let db = null;

        try {
            logger.log(RepositoryName, methodName, LogType.logType.VERBOSE, 'Updating category');

            db = await pool.promise().getConnection();

            const sql = `CALL usp_UpdateCategory(?, ?, ?, ?)`

            const [result] = await db.query(sql, [categoryId, categoryName, categoryImage, updatedBy]);

            const categories = result[0];

            logger.log(RepositoryName, methodName, LogType.logType.RELEASE, 'Category updated successfully');

            callback(null, categories);

        } catch (err) {
            logger.log(RepositoryName, methodName, LogType.logType.EXCEPTION, 'Error updating category', err.stack);
            callback(err);
        } finally {
            if (db)
                db.release();
        }
    },

    deleteCategory: async (categoryId, callback) => {
        const methodName = 'deleteCategory';
        let db = null;

        try {
            logger.log(RepositoryName, methodName, LogType.logType.VERBOSE, 'Deleting category');

            db = await pool.promise().getConnection();

            const sql = `CALL usp_DeleteCategory(?)`;

            const [result] = await db.query(sql, [categoryId]);

            const categories = result[0];

            logger.log(RepositoryName, methodName, LogType.logType.RELEASE, 'Category deleted successfully');

            callback(null, categories);

        } catch (err) {
            logger.log(RepositoryName, methodName, LogType.logType.EXCEPTION, 'Error deleting category', err.stack);
            callback(err);
        } finally {
            if (db)
                db.release();
        }
    },



}

module.exports = categoryRepository;
