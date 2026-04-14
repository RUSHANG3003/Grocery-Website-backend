DROP PROCEDURE IF EXISTS usp_UpdateAddress;
DELIMITER $$
CREATE PROCEDURE usp_UpdateAddress(
	IN addressId INT,
    IN userId INT,
    IN addresType VARCHAR(20),
    IN fullAddress VARCHAR(555),
    IN landmark VARCHAR(255),
    IN city VARCHAR(25),
    IN State VARCHAR(25),
    IN pincode VARCHAR(10),
    IN updatedBy INT
)
BEGIN

UPDATE address_tbl
SET
        address_type = addresType ,
        full_address = fullAddress,
        landmark = landmark,
        city = city,
        state = State,
        pincode = pincode,
       updated_by = updatedBy,
    updated_at = NOW()
WHERE address_id_pk = addressId
AND user_id_fk = userId;
   

END$$
DELIMITER ;





