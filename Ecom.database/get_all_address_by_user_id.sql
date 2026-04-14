DROP PROCEDURE IF EXISTS usp_GetAllAddressByUserId;
DELIMITER $$

CREATE PROCEDURE usp_GetAllAddressByUserId(
    IN userId INT
)
BEGIN

SELECT
    address_id_pk,
    user_id_fk,
    address_type,
    full_address,
    landmark,
    city,
    state,
    pincode,
    created_by,
    updated_by,
    created_at,
    updated_at
FROM address_tbl
WHERE user_id_fk = userId;

END$$
DELIMITER ;

