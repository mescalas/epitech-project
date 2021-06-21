# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.32)
# Database: tweet_academie
# Generation Time: 2021-03-03 10:10:08 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table cover
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cover`;

CREATE TABLE `cover` (
  `id_cover` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cover_url` varchar(255) NOT NULL DEFAULT '',
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_cover`),
  KEY `cover_to_user` (`id_user`),
  CONSTRAINT `cover_to_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table follow
# ------------------------------------------------------------

DROP TABLE IF EXISTS `follow`;

CREATE TABLE `follow` (
  `id_follow` int(11) NOT NULL,
  `id_follower` int(11) NOT NULL,
  KEY `id_follower_to_user` (`id_follower`),
  KEY `id_follow_to_user` (`id_follow`),
  CONSTRAINT `follow_to_user` FOREIGN KEY (`id_follow`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `follower_to_user` FOREIGN KEY (`id_follower`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table images
# ------------------------------------------------------------

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `id_image` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_post` int(11) NOT NULL,
  `url_image` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_image`),
  KEY `images_to_tweet` (`id_post`),
  CONSTRAINT `images_to_tweet` FOREIGN KEY (`id_post`) REFERENCES `tweet` (`id_post`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table like_tweet
# ------------------------------------------------------------

DROP TABLE IF EXISTS `like_tweet`;

CREATE TABLE `like_tweet` (
  `id_post` int(11) NOT NULL,
  `id_like` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_like`),
  KEY `like_to_tweet` (`id_post`),
  KEY `like_to_user` (`id_user`),
  CONSTRAINT `like_to_tweet` FOREIGN KEY (`id_post`) REFERENCES `tweet` (`id_post`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `like_to_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

LOCK TABLES `like_tweet` WRITE;
/*!40000 ALTER TABLE `like_tweet` DISABLE KEYS */;

INSERT INTO `like_tweet` (`id_post`, `id_like`, `id_user`)
VALUES
	(3,69,1),
	(3,73,2),
	(3,75,3),
	(3,76,4),
	(15,78,7),
	(3,79,7);

/*!40000 ALTER TABLE `like_tweet` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table message_prive
# ------------------------------------------------------------

DROP TABLE IF EXISTS `message_prive`;

CREATE TABLE `message_prive` (
  `id_message` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `contenu` varchar(255) NOT NULL DEFAULT '',
  `id_destinataire` int(11) NOT NULL,
  `id_expediteur` int(11) NOT NULL,
  `date_message_prive` datetime NOT NULL,
  PRIMARY KEY (`id_message`),
  KEY `id_destinataire_to_user` (`id_destinataire`),
  KEY `id_expediteur_to_user` (`id_expediteur`),
  CONSTRAINT `detinataire_to_user` FOREIGN KEY (`id_destinataire`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `expediteur_to_user` FOREIGN KEY (`id_expediteur`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table photo_de_profil
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photo_de_profil`;

CREATE TABLE `photo_de_profil` (
  `id_photo_de_profil` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_photo_de_profil`),
  KEY `photo_de_profil_to_user` (`id_user`),
  CONSTRAINT `photo_de_profil_to_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table reply
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reply`;

CREATE TABLE `reply` (
  `id_reply` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  `contenu` varchar(140) NOT NULL,
  `date_reply` datetime NOT NULL,
  PRIMARY KEY (`id_reply`),
  KEY `reply_to_tweet` (`id_post`),
  KEY `reply_to_user` (`id_user`),
  CONSTRAINT `reply_to_tweet` FOREIGN KEY (`id_post`) REFERENCES `tweet` (`id_post`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `reply_to_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;

INSERT INTO `reply` (`id_reply`, `id_user`, `id_post`, `contenu`, `date_reply`)
VALUES
	(2,7,3,'Ceci est la première réponse de la plateforme !','2021-03-02 11:45:51'),
	(3,7,2,'Ceci est un test pour vérifier que la fonctionnalité \'reply\' fonctionne correctement.','2021-03-02 11:49:23'),
	(10,7,2,'Ceci est un test pour vérifier que tout s\'affiche correctement.','2021-03-02 12:39:20'),
	(23,7,15,'Ceci est une réponse de test afin de pouvoir faire le css','2021-03-02 14:58:44'),
	(44,7,15,'Répondre à ce tweet','2021-03-02 16:23:42'),
	(45,7,2,'blablablabla','2021-03-02 16:23:59');

/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table retweet
# ------------------------------------------------------------

DROP TABLE IF EXISTS `retweet`;

CREATE TABLE `retweet` (
  `id_retweet` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  `date_retweet` datetime NOT NULL,
  PRIMARY KEY (`id_retweet`),
  KEY `retweet_to_tweet` (`id_post`),
  KEY `retweet_to_user` (`id_user`),
  CONSTRAINT `retweet_to_tweet` FOREIGN KEY (`id_post`) REFERENCES `tweet` (`id_post`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `retweet_to_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

LOCK TABLES `retweet` WRITE;
/*!40000 ALTER TABLE `retweet` DISABLE KEYS */;

INSERT INTO `retweet` (`id_retweet`, `id_user`, `id_post`, `date_retweet`)
VALUES
	(14,7,15,'2021-03-01 12:18:28');

/*!40000 ALTER TABLE `retweet` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tweet
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tweet`;

CREATE TABLE `tweet` (
  `id_user` int(11) NOT NULL,
  `id_post` int(11) NOT NULL AUTO_INCREMENT,
  `contenu` varchar(140) NOT NULL DEFAULT '',
  `date_tweet` datetime NOT NULL,
  PRIMARY KEY (`id_post`),
  KEY `tweet_to_user` (`id_user`),
  CONSTRAINT `tweet_to_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

LOCK TABLES `tweet` WRITE;
/*!40000 ALTER TABLE `tweet` DISABLE KEYS */;

INSERT INTO `tweet` (`id_user`, `id_post`, `contenu`, `date_tweet`)
VALUES
	(7,2,'Ceci est le premier tweet de la plateforme !','2021-02-22 15:23:28'),
	(7,3,'Je suis étudiant en développement web','2021-02-22 15:24:16'),
	(2,4,'Je ne sais pas quoi manger ce soir','2021-02-22 15:24:44'),
	(1,5,'En plein air, tu t\'enorgueillis des organismes.','2021-02-22 15:25:17'),
	(2,6,'Prenez-vous des mélèzes à des archéologues ?','2021-02-22 15:25:48'),
	(3,7,'Les vieillards pensent-ils à porter secours à ces plateaux ?','2021-02-22 15:26:19'),
	(3,8,'L\'émir sait prendre la parole pour apparaître à la frontière.','2021-02-22 15:27:02'),
	(4,9,'Culpabilisent-ils normalement ?','2021-02-22 15:28:18'),
	(4,10,'L\'organisation se trouvait sur le flanc du Vésuve.','2021-02-22 15:28:43'),
	(5,11,'Presque tous les japonais souscrivaient à un remplaçant.','2021-02-22 15:29:13'),
	(5,12,'Je toucherai terre à Gotham City.','2021-02-22 15:29:27'),
	(6,13,'S\'attend-t-elle aux ragondins édulcorés ?','2021-02-22 15:29:47'),
	(6,14,'Est-ce que les alcooliques se jettent sur la solitude ?','2021-02-22 15:30:01'),
	(7,15,'Ceci est un test pour vérifier si la publication de tweet fonctionne','2021-02-23 12:19:35');

/*!40000 ALTER TABLE `tweet` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT '',
  `arobase` varchar(255) NOT NULL DEFAULT '',
  `date_de_naissance` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `mot_de_passe` varchar(255) NOT NULL DEFAULT '',
  `active` int(11) NOT NULL DEFAULT '1',
  `token` varchar(255) NOT NULL DEFAULT '',
  `biographie` varchar(255) NOT NULL DEFAULT '',
  `photo` int(11) NOT NULL DEFAULT '1',
  `localisation` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id_user`, `username`, `arobase`, `date_de_naissance`, `email`, `mot_de_passe`, `active`, `token`, `biographie`, `photo`, `localisation`)
VALUES
	(1,'test','@user-pea4qp9u0u','2000-04-15','test@test.com','1504b548db68929fbee87237e46e629a',1,'tgr2tofbq5','',1,''),
	(2,'Auguste Gousse','@user-902mg5hzynf','1989-02-01','auguste.gousse@gmail.com','1504b548db68929fbee87237e46e629a',1,'977vzb8tr8m','',1,''),
	(3,'Adèle Dodier','@user-buuwt8c9ppf','1981-06-11','adele.dodier@gmail.com','1504b548db68929fbee87237e46e629a',1,'cmu2ijd5jor','',1,''),
	(4,'Fayme Fouquet','@user-7raj6f2pgql','1987-02-26','fayme.fouquet@gmail.com','1504b548db68929fbee87237e46e629a',1,'s07p3cnc5dj','',1,''),
	(5,'Bevis Riquier','@user-sjn9db9x5r','1973-10-17','bevis.riquier@gmail.com','1504b548db68929fbee87237e46e629a',1,'uta93uccusm','',1,''),
	(6,'Orlene Meunier','@user-6lne6fkq55','1970-01-29','orlene.meunier@gmail.com','1504b548db68929fbee87237e46e629a',1,'3so6zhzw5b','',1,''),
	(7,'Enricó','@user-ad9trwlg4mf','2000-04-15','mateo.escalas@epitech.eu','1504b548db68929fbee87237e46e629a',1,'nfarzlzeljf','Je suis un étudiant en développement web',1,'Nancy'),
	(8,'Olivier Marcoux','@user-sk44vc9302h','2002-06-13','olivier.marcoux@epitech.eu','1504b548db68929fbee87237e46e629a',1,'pw1m2bkebkf','',1,''),
	(9,'Flordelis Grandpré','@user-nexqgy8nswa','1999-02-04','flordelis.grandpre@epitech.eu','1504b548db68929fbee87237e46e629a',1,'sroon2js7m','',1,''),
	(10,'Logistilla Carignan','@user-ubesucfys4','2000-06-21','logistilla.carignan@gmail.com','1504b548db68929fbee87237e46e629a',1,'1fidki26j41','',1,'');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
