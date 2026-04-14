DROP PROCEDURE IF EXISTS usp_GetUserById;
DELIMITER $$
CREATE PROCEDURE usp_GetUserById(
    IN userId INT
)
BEGIN

    SELECT 
        u.user_id_pk AS userId,
	    u.user_name AS  userName, 
        u.email_id AS emailId,
		u.mobile_number AS mobileNumber,
        u.role AS role
	FROM 
        user_tbl u
    
    WHERE 
        u.user_id_pk = userId;

END$$
DELIMITER ;

call usp_GetUserById(1)