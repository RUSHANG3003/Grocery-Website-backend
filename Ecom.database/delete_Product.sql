DROP PROCEDURE IF EXISTS usp_deleteProduct;
DELIMITER $$
CREATE PROCEDURE usp_deleteProduct(
IN productId BIGINT 
)
BEGIN

DELETE FROM product_tbl 
where product_id_pk = productId;
   

END$$
DELIMITER ;




