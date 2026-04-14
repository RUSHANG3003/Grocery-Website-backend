DROP PROCEDURE IF EXISTS usp_GetCateogryById;
DELIMITER $$
CREATE PROCEDURE usp_GetCateogryById(
	IN categoryId BIGINT
)

BEGIN

SELECT 
	category_name AS categoryName,
    category_img AS categoryImage,
    created_by AS createdBy,
    created_at AS createdAt,
    updated_by AS updatedBy,
    updated_at AS updatedAt
    
	from category_tbl

    WHERE category_id_pk = categoryId;
    
END$$
DELIMITER ;

 