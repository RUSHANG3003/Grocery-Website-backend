DROP PROCEDURE IF EXISTS usp_VerifyOTP;
DELIMITER $$

CREATE PROCEDURE usp_VerifyOTP (
    IN emailId VARCHAR(255),
    IN otp VARCHAR(6),
    OUT userId BIGINT,
    OUT status INT
)
BEGIN

DECLARE existingUser BIGINT;

SET status = 0;
SET userId = 0;


    UPDATE otp_tbl 
    SET is_verified = TRUE
    WHERE otp_id_pk = (
        SELECT otp_id_pk FROM (
            SELECT otp_id_pk
            FROM otp_tbl
            WHERE email_id = emailId
            AND otp_code = otp
            AND expires_at > NOW()
            AND is_verified = FALSE
            ORDER BY otp_id_pk DESC
            LIMIT 1
        ) AS temp
    );

    IF ROW_COUNT() > 0 THEN
    
     SET status =1 ;
     
     select user_id_pk Into existingUser
     FROM user_tbl
     where email_Id = emailId
     LIMIT 1;
     
     IF existingUser IS NULL THEN 
     
     INSERT INTO user_tbl 
(user_name, mobile_number, password_hash, email_Id, created_by, created_at) 
VALUES (NULL, NULL, NULL, emailId, 1, NOW());

       SET userId = LAST_INSERT_ID();
       
       ELSE
       
        SET userId = existingUser;
    END IF;
    END IF;

END$$

DELIMITER ;


