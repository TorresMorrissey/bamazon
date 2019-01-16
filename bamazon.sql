DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db; 

use bamazon_db;

CREATE TABLE products (

	item_id INTEGER(50) AUTO_INCREMENT NOT NULL, 
    product_name VARCHAR(10),
    department_name VARCHAR(15) NOT NULL,
    price INTEGER(10),
    stock_quantity INTEGER(10),
	PRIMARY KEY(item_id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gaiam_Yoga_mat", "Health", 26.24, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crate of Spam","GROCERY",24.50,50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cool Shades","CLOTHING",75.00,5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Worn Denim Jeans","CLOTHING",54.25,35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Survival Towel","SPORTS & OUTDOORS",42.42,42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bill and Ted's Excellent Adventure","ENTERTAINMENT",15.00,25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mad Max: Fury Road","ENTERTAINMENT",25.50,57);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monopoly","ENTERTAINMENT",30.50,35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yahtzee","ENTERTAINMENT",19.95,23);

select * from products;