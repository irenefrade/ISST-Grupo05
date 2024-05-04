insert into users(username,password,enabled) values ('admin','{bcrypt}$2a$04$OQ62wPGHPnw7lD1pSfZ3quSSu7ac/QTpT1HgzDh.wr87svx5jErAa',true);
insert into users(username,password,enabled) values ('user1','{bcrypt}$2a$04$qyt1xhUdfiU.Tsb9.jepIupoqqIfvDICBf8Ri2uIby/3HZwirJf0G',true); 
insert into users(username,password,enabled) values ('user2','{bcrypt}$2a$04$FFRIxlBshsMHbt34IDQ3oek82UZWSuaFdfB8ON13yfEYiCtuK02wa',true); 



insert into authorities(username,authority) values ('admin','ROLE_ADMIN');
insert into authorities(username,authority) values ('user1','ROLE_USER');
insert into authorities(username,authority) values ('user2','ROLE_USER');