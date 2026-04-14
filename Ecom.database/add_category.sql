DROP PROCEDURE IF EXISTS usp_AddCategory;
DELIMITER $$
CREATE PROCEDURE usp_AddCategory(
    IN categoryName VARCHAR(555),
	IN categoryImage VARCHAR(200),
    IN createdBy INT
)
BEGIN

INSERT INTO  category_tbl(
        category_name,
        category_img,
        created_by,
        created_at
)
VALUES(
  categoryName ,
  categoryImage,
  createdBy,
  NOW()
);
   
 SELECT LAST_INSERT_ID() AS cateogryId;
END$$
DELIMITER ;



