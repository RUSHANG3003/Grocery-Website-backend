DROP PROCEDURE IF EXISTS usp_GetAddressById;
DELIMITER $$

CREATE PROCEDURE usp_GetAddressById(
    IN AddressId INT
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
WHERE address_id_pk = addressId;

END$$
DELIMITER ;

