DROP PROCEDURE IF EXISTS usp_GetOrderHistoryByUserId;
DELIMITER $$
CREATE PROCEDURE usp_GetOrderHistoryByUserId(
    IN userId BIGINT
)
BEGIN
	SELECT 
  oi.order_item_id_pk AS orderItemId,
  oi.order_id_fk AS orderIdPk,
  oi.product_id_fk AS productIdFk,
  oi.product_name AS productName,
  p.product_img AS productImg,
  oi.product_price AS productPrice,
  oi.quantity AS quantity,
  oi.total_price AS totalPrice,
  o.address_id_fk AS addressId,
  o.total_amount AS totalAmount,
  o.order_status AS orderStatus,
  o.payment_method AS paymentMethod,
  o.payment_status AS paymentStatus,
  a.address_type AS addressType,
  a.full_address AS Address,
  a.landmark AS landmark,
  a.city AS city,
  a.state AS state,
  a.pincode AS pinCode
  FROM order_tbl o
  JOIN order_item_tbl oi
	ON o.order_id_pk = oi.order_id_fk
    
  LEFT JOIN product_tbl p
   ON oi.product_id_fk = p.product_id_pk
   
    LEFT JOIN address_tbl a
   ON o.address_id_fk = a.address_id_pk
   
   WHERE o.user_id_fk = userId
   
   ORDER BY o.order_id_pk DESC;

END$$
DELIMITER ;


call usp_GetOrderHistoryByUserId(1)

