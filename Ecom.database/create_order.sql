DROP PROCEDURE IF EXISTS usp_CreateOrder;
DELIMITER $$

CREATE PROCEDURE usp_CreateOrder(
IN user_id BIGINT,
IN address_id BIGINT,
IN total_amount DECIMAL(10,2),
IN payment_method VARCHAR(20),
IN created_by BIGINT,
OUT outpar BIGINT
)

BEGIN

INSERT INTO order_tbl
(
user_id_fk,
address_id_fk,
total_amount,
payment_method,
payment_status,
created_by
)

VALUES
(
user_id,
address_id,
total_amount,
payment_method,
'PENDING',
created_by
);

SET outpar = LAST_INSERT_ID();

END $$

DELIMITER ;

CALL usp_CreateOrder(
1,
4,
500,
'ONLINE',
1,
@outpar
);