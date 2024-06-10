create database samueldb;
create table samueldb.`users`(
    `user_id` int(12) not null auto_increment primary key,
    `firstname` varchar(30) not null,
    `lastname` varchar(30) not null,
    `address` varchar(150)not null,
    `contact` varchar(20)not null
);