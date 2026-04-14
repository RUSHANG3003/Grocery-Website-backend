DROP PROCEDURE IF EXISTS usp_AddPaymentTransaction;
DELIMITER $$

CREATE PROCEDURE usp_AddPaymentTransaction(
IN order_id BIGINT,
IN razorpay_order_id VARCHAR(255),
IN amount DECIMAL(10,2),
IN created_by BIGINT,
OUT outpar BIGINT
)

BEGIN

INSERT INTO payment_tbl
(
order_id_fk,
razorpay_order_id,
payment_method,
payment_status,
amount,
created_by
)

VALUES
(
order_id,
razorpay_order_id,
'ONLINE',
'PENDING',
amount,
created_by
);

SET outpar = LAST_INSERT_ID();

END $$

DELIMITER ;

CALL usp_AddPaymentTransaction(
3,
'order_test12345',
500,
1,
@outpar
);