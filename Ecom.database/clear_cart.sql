DROP PROCEDURE IF EXISTS usp_ClearCart;
DELIMITER $$
CREATE PROCEDURE usp_ClearCart(
    IN cartId BIGINT
)
BEGIN
DELETE FROM cart_item_tbl
WHERE cart_id_fk = cartId;

UPDATE cart_tbl
SET is_active = FALSE
WHERE cart_id_pk = cartId;
END$$
DELIMITER ;


