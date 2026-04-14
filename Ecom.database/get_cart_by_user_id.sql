DROP PROCEDURE IF EXISTS usp_GetCartByUserId;
DELIMITER $$
CREATE PROCEDURE usp_GetCartByUserId(
    IN userId BIGINT
)
BEGIN
	SELECT 
    c.cart_id_pk AS cartId,
    ci.cart_item_id_pk AS cartItemId,
    p.product_id_pk AS productId,
    p.product_name AS productname,
    p.product_img AS productImg,
    p.price AS price,
    p.discount_price AS discountPrice,
    ci.quantity AS quantity,
    (ci.quantity * IFNULL(p.discount_price , p. price)) AS total_price
    FROM cart_tbl c
    JOIN cart_item_tbl ci ON c.cart_id_pk = ci.cart_id_fk
    JOIN product_tbl p ON p.product_id_pk = ci.product_id_fk
    WHERE c.user_id_fk = userId
    AND c.is_active =TRUE;
END$$
DELIMITER ;

call usp_GetCartByUserId(3)

