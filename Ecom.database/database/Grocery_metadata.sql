INSERT INTO category_tbl (category_name, category_img, created_by)
VALUES
('Vegetables','veg.png',1),
('Fruits','fruits.png',1),
('Dairy','dairy.png',1),
('Snacks','snacks.png',1),
('Beverages','beverages.png',1);

-- vegetable
INSERT INTO product_tbl
(category_id_fk, product_name, description, price, discount_price, stock_quantity, product_img, is_active, created_by)
VALUES
(1, 'Tomato', 'Fresh farm tomato', 40, NULL, 100, 'static/categories/vegetable/tomato.png', 1, 1),
(1, 'Potato', 'Organic potato', 30, NULL, 200, 'static/categories/vegetable/potato.png', 1, 1),
(1, 'Onion', 'Fresh red onion', 35, NULL, 180, 'static/categories/vegetable/onion.png', 1, 1),
(1, 'Carrot', 'Sweet organic carrot', 60, 50, 90, 'static/categories/vegetable/carrot.png', 1, 1),
(1, 'Cabbage', 'Green cabbage farm fresh', 45, NULL, 70, 'static/categories/vegetable/cabbage.png', 1, 1),
(1, 'Cauliflower', 'Fresh cauliflower', 55, 48, 60, 'static/categories/vegetable/cauliflower.png', 1, 1),
(1, 'Brinjal', 'Purple brinjal fresh', 50, 42, 85, 'static/categories/vegetable/brinjal.png', 1, 1),
(1, 'Capsicum', 'Green capsicum', 70, 60, 65, 'static/categories/vegetable/capsicum.png', 1, 1),
(1, 'Spinach', 'Healthy green spinach', 25, NULL, 100, 'static/categories/vegetable/	.png', 1, 1),
(1, 'Peas', 'Fresh green peas', 80, 70, 75, 'static/categories/vegetable/peas.png', 1, 1);


-- fruits
INSERT INTO product_tbl
(category_id_fk, product_name, description, price, discount_price, stock_quantity, product_img, is_active, created_by)
VALUES
(2, 'Apple', 'Kashmir apple', 120, NULL, 50, 'static/categories/fruit/apple.png', 1, 1),
(2, 'Banana', 'Fresh banana', 60, NULL, 80, 'static/categories/fruit/banana.png', 1, 1),
(2, 'Mango', 'Sweet alphonso mango', 250, 220, 60, 'static/categories/fruits/mango.png', 1, 1),
(2, 'Orange', 'Juicy orange', 120, 100, 90, 'static/categories/fruits/orange.png', 1, 1),
(2, 'Pineapple', 'Fresh pineapple', 90, NULL, 40, 'static/categories/fruits/pineapple.png', 1, 1),
(2, 'Papaya', 'Healthy papaya', 70, 60, 50, 'static/categories/fruits/papaya.png', 1, 1),
(2, 'Watermelon', 'Sweet watermelon', 50, NULL, 35, 'static/categories/fruits/watermelon.png', 1, 1),
(2, 'Grapes', 'Green seedless grapes', 140, 120, 75, 'static/categories/fruits/grapes.png', 1, 1),
(2, 'Strawberry', 'Fresh strawberries', 220, 200, 30, 'static/categories/fruits/strawberry.png', 1, 1),
(2, 'Guava', 'Farm fresh guava', 80, NULL, 65, 'static/categories/fruits/guava.png', 1, 1);
