DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("samsung tv","electronics", 2500, 4),("xbox 360","electronics", 316, 30),
("nike running shoes","apparel", 105.21, 65),("VS-one hoody","apparel", 1500, 10),
("harry potter sorcerer's stone","books", 8.65, 100),("canon sl1 camera","electronics", 600.42, 12),
("the art of seduction","books", 15.32, 1000),("samsung projector","electronics", 10000, 2),
("romper","apparel", 12.50, 43),("harman speakers","electronics", 165.78, 23);

SELECT * FROM products
