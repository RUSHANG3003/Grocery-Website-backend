DROP PROCEDURE IF EXISTS usp_UpdatePaymentStatus;
DELIMITER $$

CREATE PROCEDURE usp_UpdatePaymentStatus(
IN p_razorpay_payment_id VARCHAR(255),
IN p_razorpay_order_id VARCHAR(255),
IN p_payment_status INT,
IN p_updated_at DATETIME,
OUT outpar BIGINT
)

BEGIN

UPDATE payment_tbl
SET
razorpay_payment_id = p_razorpay_payment_id,
payment_status = 
CASE 
WHEN p_payment_status = 1 THEN 'SUCCESS'
WHEN p_payment_status = 2 THEN 'FAILED'
END,
updated_at = p_updated_at

WHERE razorpay_order_id = p_razorpay_order_id;

SET outpar = ROW_COUNT();

END $$

DELIMITER ;
SET SQL_SAFE_UPDATES = 0;
CALL usp_UpdatePaymentStatus(
'pay_123456',
'order_test12345',
1,
NOW(),
@outpar
);