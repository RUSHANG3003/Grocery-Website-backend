DROP PROCEDURE IF EXISTS usp_getallProduct;
DELIMITER $$
CREATE PROCEDURE usp_getallProduct()
BEGIN

SELECT 
	product_id_pk AS productId,
       category_id_fk AS categoryId,
        product_name AS productName ,
        description AS description,
        price AS price,
        discount_price AS discountPrice,
        product_img AS productImage,
        stock_quantity AS stock,
        is_active AS isActive,
        created_by AS createdBy,
        created_at AS createdAt,
        updated_by AS updatedBy,
        updated_at AS updatedAt 
        
FROM product_tbl;

END$$
DELIMITER ;

call usp_getallProduct()

