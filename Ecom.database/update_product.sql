DROP PROCEDURE IF EXISTS usp_updateProduct;
DELIMITER $$
CREATE PROCEDURE usp_updateProduct(
	IN productId BIGINT,
    IN categoryId BIGINT,
    IN productName VARCHAR(555),
    IN description VARCHAR(555),
    IN price DECIMAL(10,2),
    IN discountPrice DECIMAL(10,2),
    IN productImage VARCHAR(500),
    IN stock INT,
    IN isActive TINYINT(1),
    IN updatedBy INT
)
BEGIN

UPDATE product_tbl
SET
       category_id_fk = categoryId,
        product_name = productName ,
        description = description,
        price = price,
        discount_price = discountPrice,
        product_img = productImage,
        stock_quantity = stock,
        is_active = isActive,
        updated_by = updatedBy,
        updated_at = NOW()
        
        WHERE product_id_pk = productId;

END$$
DELIMITER ;

call usp_updateProduct(21,2,'sf','wg',1.0,0.5,'static/categories/vegetable/tomato.png',1,1,1)

