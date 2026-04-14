DROP PROCEDURE IF EXISTS usp_AddOTP;
DELIMITER $$

CREATE PROCEDURE usp_AddOTP (
IN emailId VARCHAR(255),
IN otp VARCHAR(6),
OUT OId BIGINT
)
BEGIN
DECLARE expiry DATETIME;

SET expiry = DATE_ADD(NOW(), INTERVAL 5 MINUTE);

INSERT INTO otp_tbl (
    email_id,
    otp_code,
    expires_at,
    created_at
)
VALUES (
    emailId,
    otp,
    expiry,
    NOW()
);
    
SET OId = LAST_INSERT_ID();

END$$

DELIMITER ;

CALL usp_AddOTP('test@gmail.com', '123456', @OId);