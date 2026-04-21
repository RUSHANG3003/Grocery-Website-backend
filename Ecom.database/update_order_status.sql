DROP PROCEDURE IF EXISTS usp_UpdateOrderStatus;
DELIMITER $$
CREATE PROCEDURE usp_UpdateOrderStatus(
	IN orderId BIGINT,
	IN status VARCHAR(50),
    IN updatedBy INT
)
BEGIN

UPDATE order_tbl
SET
		order_status = status,
        updated_by = updatedBy,
        updated_at = NOW()
        
        
        WHERE order_id_pk = orderId;

END$$
DELIMITER ;

call usp_OrderStatus(3,'PLACE',1)



