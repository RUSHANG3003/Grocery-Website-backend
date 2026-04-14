DROP PROCEDURE IF EXISTS usp_RemoveCartItem;
DELIMITER $$

CREATE PROCEDURE usp_RemoveCartItem(
    IN cartItemId BIGINT
)
BEGIN
    DELETE FROM cart_item_tbl
    WHERE cart_item_id_pk = cartItemId;
END $$

DELIMITER ;