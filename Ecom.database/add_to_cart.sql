DROP PROCEDURE IF EXISTS usp_AddToCart;
DELIMITER $$
CREATE PROCEDURE usp_AddToCart(
    IN userId BIGINT,
    IN productId BIGINT,
    IN qty INT,
    IN createdBy BIGINT
)
BEGIN

DECLARE cartId BIGINT;
DECLARE item_Count INT;

SELECT cart_id_pk INTO cartId
FROM cart_tbl
where user_id_fk = userId AND is_active=TRUE
LIMIT 1;

-- create cart if not exist
IF cartId IS NULL THEN 
	 INSERT INTO cart_tbl(user_id_fk,created_by)
     VALUES (userId,createdBy);
     
     SET cartId = LAST_INSERT_ID();
     
END IF;

SELECT COUNT(*) INTO item_count
FROM cart_item_tbl
WHERE cart_id_fk = cartId AND product_id_fk = productId;

IF item_count > 0 THEN 
	UPDATE cart_item_tbl
    SET quantity = quantity + qty,
		updated_by = createdBy
	WHERE cart_id_fk = cartId AND product_id_fk = productId;
    
    ELSE


INSERT INTO cart_item_tbl(
cart_id_fk,
product_id_fk ,
quantity ,
created_by,
created_at
)
VALUES(
  cartId,
  productId,
  qty,
  createdBy,
  NOW()
);
END IF;
END$$
DELIMITER ;



CALL usp_AddToCart(1, 3, 5, 1);