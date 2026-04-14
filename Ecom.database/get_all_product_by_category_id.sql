DROP PROCEDURE IF EXISTS usp_getAllProductByCategoryId;
DELIMITER $$
CREATE PROCEDURE usp_getAllProductByCategoryId(
		IN categoryId INT
)
BEGIN

select 
  p.product_id_pk AS productId,
  p.category_id_fk AS categoryId,
  c.category_name AS categoryName,
  p.product_name AS productName,
  p.description AS Description,
  p.price AS price,
 p.discount_price AS DiscoutPrice,
 p.stock_quantity AS stock,
 p.product_img AS productImg,
 p.is_active AS Active,
 p.created_by AS createdBy,
 p.updated_by AS updatedBy,
 p.created_at AS createdAt,
 p.updated_at AS updatedAt
  
  FROM product_tbl p
  JOIN category_tbl c
  ON p.category_id_fk = c.category_id_pk
  
  where category_id_fk = categoryId
  AND p.is_active = 1;
   

END$$
DELIMITER ;


call usp_getAllProductByCategoryId(2)


