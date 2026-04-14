create database E_commerce;
use E_commerce ;

CREATE TABLE user_tbl(
user_id_pk BIGINT PRIMARY KEY AUTO_INCREMENT,
user_name  VARCHAR(255) ,
mobile_number VARCHAR(10)  UNIQUE,
email_id VARCHAR(255) NOT NULL UNIQUE,
password_hash VARCHAR(255) ,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT NOT NULL,
updated_by BIGINT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE user_tbl 
ADD role VARCHAR(20) DEFAULT 'USER';

CREATE TABLE address_tbl(
address_id_pk BIGINT PRIMARY KEY AUTO_INCREMENT,
user_id_fk BIGINT NOT NULL,
address_type ENUM ('Home','office','other'),
full_address VARCHAR(255) NOT NULL,
landmark VARCHAR(255),
city VARCHAR(255) NOT NULL,
state VARCHAR(255) NOT NULL,
pincode VARCHAR(10) NOT NULL,
created_by BIGINT NOT NULL,
updated_by BIGINT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT fk_user_address FOREIGN KEY (user_id_fk) REFERENCES user_tbl(user_id_pk) ON DELETE CASCADE
);

CREATE TABLE category_tbl (
    category_id_pk BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL UNIQUE,
    category_img VARCHAR(500),
    created_by BIGINT NOT NULL,
    updated_by BIGINT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE product_tbl (
 product_id_pk BIGINT PRIMARY KEY AUTO_INCREMENT,
 category_id_fk BIGINT NOT NULL,
 product_name VARCHAR(255) NOT NULL,
 description TEXT,
 price DECIMAL(10,2) NOT NULL,
 discount_price DECIMAL(10,2),
 stock_quantity INT DEFAULT 0,
 product_img VARCHAR(500),
 is_active BOOLEAN DEFAULT TRUE,
 created_by BIGINT NOT NULL,
 updated_by BIGINT,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
 CONSTRAINT fk_category_product FOREIGN KEY (category_id_fk) REFERENCES category_tbl(category_id_pk) ON DELETE CASCADE
);

CREATE TABLE cart_tbl(
cart_id_pk BIGINT PRIMARY KEY AUTO_INCREMENT,
user_id_fk BIGINT NOT NULL ,
is_active BOOLEAN DEFAULT TRUE,
 created_by BIGINT NOT NULL,
 updated_by BIGINT,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
 CONSTRAINT fk_user_cart FOREIGN KEY (user_id_fk) REFERENCES user_tbl(user_id_pk) ON DELETE CASCADE
);



CREATE TABLE cart_item_tbl(
cart_item_id_pk BIGINT PRIMARY KEY AUTO_INCREMENT,
cart_id_fk BIGINT NOT NULL,
product_id_fk BIGINT NOT NULL,
quantity INT NOT NULL DEFAULT 1,
created_by BIGINT NOT NULL,
 updated_by BIGINT,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
 UNIQUE (cart_id_fk, product_id_fk),

  CONSTRAINT fk_cart_cart_item FOREIGN KEY (cart_id_fk) REFERENCES cart_tbl(cart_id_pk) ON DELETE CASCADE,
   CONSTRAINT fk_product_cart_item FOREIGN KEY (product_id_fk) REFERENCES product_tbl(product_id_pk) ON DELETE CASCADE

);

CREATE TABLE order_tbl(
order_id_pk BIGINT PRIMARY KEY AUTO_INCREMENT,
user_id_fk BIGINT NOT NULL,
address_id_fk BIGINT NOT NULL,
total_amount DECIMAL (10,2),
order_status ENUM ('PLACED','CONFIRMED','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED') DEFAULT 'PLACED',
payment_method ENUM('COD','ONLINE') NOT NULL,
payment_status ENUM ('PENDING','PAID','FAILED') DEFAULT 'PENDING',
created_by BIGINT NOT NULL,
updated_by BIGINT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT fk_user_order FOREIGN KEY (user_id_fk) REFERENCES user_tbl(user_id_pk) ON DELETE CASCADE,
CONSTRAINT fk_address_order FOREIGN KEY (address_id_fk) REFERENCES address_tbl(address_id_pk) ON DELETE CASCADE

);

CREATE TABLE order_item_tbl(
order_item_id_pk BIGINT PRIMARY KEY AUTO_INCREMENT,
order_id_fk BIGINT NOT NULL,
product_id_fk BIGINT NOT NULL,
product_name VARCHAR(255) NOT NULL,
product_price DECIMAL(10,2),
quantity INT NOT NULL,
total_price DECIMAL(10,2) NOT NULL,
created_by BIGINT NOT NULL,
updated_by BIGINT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT fk_order_order_item FOREIGN KEY (order_id_fk) REFERENCES order_tbl(order_id_pk) ON DELETE CASCADE,
CONSTRAINT fk_product_order_item FOREIGN KEY (product_id_fk) REFERENCES product_tbl(product_id_pk) ON DELETE CASCADE
);

CREATE TABLE otp_tbl (
otp_id_pk BIGINT PRIMARY KEY AUTO_INCREMENT,
email_id VARCHAR(255) NOT NULL,
otp_code VARCHAR(6) NOT NULL,
expires_at DATETIME NOT NULL,
is_verified BOOLEAN DEFAULT FALSE,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_tbl (
payment_id_pk BIGINT PRIMARY KEY AUTO_INCREMENT,
order_id_fk BIGINT NOT NULL,
razorpay_order_id VARCHAR(255),
razorpay_payment_id VARCHAR(255),
razorpay_signature VARCHAR(255),
payment_method ENUM('COD','ONLINE') NOT NULL,
payment_status ENUM('PENDING','SUCCESS','FAILED') DEFAULT 'PENDING',
amount DECIMAL(10,2) NOT NULL,
currency VARCHAR(10) DEFAULT 'INR',
created_by BIGINT NOT NULL,
updated_by BIGINT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT fk_order_payment FOREIGN KEY (order_id_fk) REFERENCES order_tbl(order_id_pk) ON DELETE CASCADE
);

ALTER TABLE order_tbl 
ADD razorpay_order_id VARCHAR(255);

