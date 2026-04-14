DROP PROCEDURE IF EXISTS usp_AddOrderItemsFromCart;
DELIMITER $$

CREATE PROCEDURE usp_AddOrderItemsFromCart(
IN order_id BIGINT,
IN cart_id BIGINT,
IN created_by BIGINT
)

BEGIN

INSERT INTO order_item_tbl
(
order_id_fk,
product_id_fk,
product_name,
product_price,
quantity,
total_price,
created_by
)

SELECT
order_id,
p.product_id_pk,
p.product_name,
p.price,
c.quantity,
(p.price * c.quantity),
created_by
FROM cart_item_tbl c
JOIN product_tbl p
ON c.product_id_fk = p.product_id_pk
WHERE c.cart_id_fk = cart_id;

END $$

DELIMITER ;

CALL usp_AddOrderItemsFromCart(
3,
1,
1
);