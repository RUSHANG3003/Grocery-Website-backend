DROP PROCEDURE IF EXISTS usp_AddAddress;
DELIMITER $$
CREATE PROCEDURE usp_AddAddress(
    IN userId INT,
    IN addresType VARCHAR(20),
    IN fullAddress VARCHAR(555),
    IN landmark VARCHAR(255),
    IN city VARCHAR(25),
    IN State VARCHAR(25),
    IN pincode VARCHAR(10),
    IN createdBy INT
)
BEGIN

INSERT INTO  address_tbl(
 user_id_fk,
        address_type,
        full_address,
        landmark,
        city,
        state,
        pincode,
        created_by,
        created_at
)
VALUES(
  userId ,
  addresType ,
  fullAddress,
  landmark ,
  city ,
  State,
  pincode,
  createdBy,
  NOW()
);
   
 SELECT LAST_INSERT_ID() AS addressId;
END$$
DELIMITER ;



