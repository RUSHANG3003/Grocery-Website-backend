DROP PROCEDURE IF EXISTS usp_DeleteCateogry;
DELIMITER $$
CREATE PROCEDURE usp_DeleteCateogry(
	IN categoryId BIGINT
)

BEGIN

DELETE FROM category_tbl

    WHERE category_id_pk = categoryId;
    
END$$
DELIMITER ;
    
