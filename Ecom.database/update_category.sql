DROP PROCEDURE IF EXISTS usp_updateCategory;
DELIMITER $$
CREATE PROCEDURE usp_updateCategory(
	IN categoryId BIGINT,
    IN categoryName VARCHAR(555),
	IN categoryImage VARCHAR(200),
    IN updatedBy INT
)
BEGIN

UPDATE category_tbl
SET
	   category_name = categoryName,
       category_img = categoryImage,
       updated_by = updatedBy,
       updated_at = NOW()
       
       WHERE category_id_pk = categoryId;
       
END$$
DELIMITER ;




