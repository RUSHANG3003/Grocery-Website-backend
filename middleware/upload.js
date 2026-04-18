const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../Config/db');

const storage = multer.diskStorage({

    destination: async (req, file, cb) => {
        try {
            const { categoryId } = req.body;

            if (!categoryId) {
                return cb(new Error("categoryId required"));
            }

            // DB से categoryName निकालो
            const [rows] = await pool.promise().query(
                "SELECT category_name FROM category_tbl WHERE category_id_pk = ?",
                [categoryId]
            );

            if (!rows.length) {
                return cb(new Error("Invalid categoryId"));
            }

            const categoryName = rows[0].category_name.toLowerCase();

            const uploadPath = path.join(
                __dirname,
                '..',
                'static',
                'categories',
                categoryName
            );

            // folder exist नहीं है तो बना दो
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);

        } catch (err) {
            cb(err);
        }
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }

});

const upload = multer({ storage });




const categoryStorage = multer.diskStorage({

    destination: async (req, file, cb) => {
        try {

            const categoryUploadPath = path.join(
                __dirname,
                '..',
                'static',
                'categories'

            );

            // folder exist नहीं है तो बना दो
            if (!fs.existsSync(categoryUploadPath)) {
                fs.mkdirSync(categoryUploadPath, { recursive: true });
            }

            cb(null, categoryUploadPath);

        } catch (err) {
            cb(err);
        }
    },

    filename: (req, file, cb) => {
        const categoryName = req.body.categoryName 
            ? req.body.categoryName.replace(/\s+/g, '') 
            : 'category';
        const extension = path.extname(file.originalname);
        cb(null, `${categoryName}${extension}`);
    }

});

const uploadCategory = multer({ storage: categoryStorage });

module.exports = { upload, uploadCategory };