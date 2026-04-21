DROP PROCEDURE IF EXISTS usp_GetDeliveryBoys;
DELIMITER $$
CREATE PROCEDURE usp_GetDeliveryBoys()
BEGIN

select user_id_pk AS userId ,
       user_name AS userName
		FROM user_tbl
        
        WHERE role = 'DELIVERY';
       
END$$
DELIMITER ;

call usp_GetDeliveryBoys()