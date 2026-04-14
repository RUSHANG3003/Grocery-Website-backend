DROP PROCEDURE IF EXISTS usp_getAllCategory;
DELIMITER $$
CREATE PROCEDURE usp_getAllCategory()
BEGIN

select 
  category_id_pk AS categoryId,
  category_name AS categoryName,
  category_img AS cateogryImage
  
  FROM category_tbl
     ;
   

END$$
DELIMITER ;




