DROP PROCEDURE IF EXISTS usp_GetAssignedOrders;
DELIMITER $$
CREATE PROCEDURE usp_GetAssignedOrders(
	IN deliveryBoyId  INT
    )


BEGIN
select 
	o.order_id_pk AS orderId,
    o.total_amount AS totalAmount,
	o.order_status AS orderStatus,
    o.payment_status AS paymentStatus,
	o.created_at AS createdAt,
    
     a.address_type AS AddressType,
        a.full_address AS fullAddress,
        a.city AS city,
        a.state AS state,
        a.pincode AS pincode
        
        FROM order_tbl o
        
            LEFT JOIN address_tbl a 
        ON o.address_id_fk = a.address_id_pk

    WHERE o.delivery_boy_id = deliveryBoyId
      AND o.order_status = 'OUT_FOR_DELIVERY'

    ORDER BY o.order_id_pk DESC;

END$$
DELIMITER ;

call usp_GetAssignedOrders(2)