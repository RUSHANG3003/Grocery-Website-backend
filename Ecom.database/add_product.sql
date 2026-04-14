DROP PROCEDURE IF EXISTS usp_AddProduct;
DELIMITER $$
CREATE PROCEDURE usp_AddProduct(
    IN categoryId BIGINT,
    IN productName VARCHAR(555),
    IN description VARCHAR(555),
    IN price DECIMAL(10,2),
    IN discountPrice DECIMAL(10,2),
    IN productImage VARCHAR(500),
    IN stock INT,
    IN isActive TINYINT(1),
    IN createdBy INT
)
BEGIN

INSERT INTO  product_tbl(
 category_id_fk,
        product_name,
        description,
        price,
        discount_price,
        product_img,
        stock_quantity,
        is_active,
        created_by,
        created_at
)
VALUES(
  categoryId ,
  productName ,
  description,
  price ,
  discountPrice ,
  productImage,
  stock,
  isActive,
  createdBy,
  NOW()
);
   
 SELECT LAST_INSERT_ID() AS productId;
END$$
DELIMITER ;

call usp_AddProduct(1,'sdv','wew',1.0,0.5,'static/categories/vegetable/tomato.png',1,1,1)

