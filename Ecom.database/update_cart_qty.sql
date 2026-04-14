DROP PROCEDURE IF EXISTS usp_UpdateCartQty;
DELIMITER $$
CREATE PROCEDURE usp_UpdateCartQty(
   IN cartItemId BIGINT,
    IN qty INT,
    IN updatedBy BIGINT
)
BEGIN
IF  qty <= 0 THEN
	DELETE FROM cart_item_tbl
    WHERE cart_item_id_pk =cartItemId;
    ELSE
	UPDATE cart_item_tbl
    SET quantity = qty,
        updated_by = updatedBy
	 WHERE cart_item_id_pk = cartItemId;
END IF;
END$$
DELIMITER ;


call usp_UpdateCartQty(18,3,1)
