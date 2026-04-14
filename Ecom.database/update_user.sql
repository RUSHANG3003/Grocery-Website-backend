	DROP PROCEDURE IF EXISTS usp_UpdateUser;
	DELIMITER $$

	CREATE PROCEDURE usp_UpdateUser(
	    IN userId BIGINT,
		IN userName VARCHAR(500),
		IN mobileNumber VARCHAR(10),
		IN updatedBy BIGINT,
		OUT oId BIGINT 
	)
	BEGIN

		 UPDATE user_tbl
		SET
			
			user_name = userName,
			mobile_number = mobileNumber,
			updated_at=NOW(),
			updated_by=updatedBy  
		WHERE
			user_id_pk = userId;
	  
		SET oId = userId;

	END$$

	DELIMITER ;
    
