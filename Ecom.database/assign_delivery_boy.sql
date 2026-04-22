DROP PROCEDURE IF EXISTS usp_AssignDeliveryBoy;
DELIMITER $$
CREATE PROCEDURE usp_AssignDeliveryBoy(
	IN orderId INT,
    IN deliveryBoyId INT,
    IN updatedBy INT
    )


BEGIN
 UPDATE order_tbl
 SET delivery_boy_id = deliveryBoyId,
     order_status = 'OUT_FOR_DELIVERY',
     updated_by = updatedBy,
	 updated_at = NOW()
	WHERE order_id_pk = orderId;
       
END$$
DELIMITER ;

