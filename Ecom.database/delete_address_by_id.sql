DROP PROCEDURE IF EXISTS usp_DeleteAddressById;
DELIMITER $$

CREATE PROCEDURE usp_DeleteAddressById(
    IN AddressId INT
)
BEGIN

DELETE FROM address_tbl
WHERE address_id_pk = AddressId;

END$$
DELIMITER ;

call usp_DeleteAddressById(1)