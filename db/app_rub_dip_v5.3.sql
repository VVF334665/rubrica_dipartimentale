-- --------------------------------------------------------
-- Host:                         localhost
-- Versione server:              8.0.31 - MySQL Community Server - GPL
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dump della struttura del database app_rub_dip
CREATE DATABASE IF NOT EXISTS `app_rub_dip` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `app_rub_dip`;

-- Dump della struttura di tabella app_rub_dip.agenda_appuntamenti
CREATE TABLE IF NOT EXISTS `agenda_appuntamenti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_appuntamento` date DEFAULT NULL,
  `ora_appuntamento` time DEFAULT NULL,
  `id_stato` int DEFAULT NULL,
  `note` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nominativo_richiedente` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_richiedente` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono_richiedente` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_funzionario_richiesto` int DEFAULT NULL,
  `data_ultima_modifica` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_agenda_richieste_appuntamento_auth_utenti` (`id_funzionario_richiesto`),
  KEY `FK_agenda_richieste_appuntamento_agenda_stato_ric_app` (`id_stato`) USING BTREE,
  CONSTRAINT `FK_agenda_richieste_appuntamento_agenda_stati_appuntamento` FOREIGN KEY (`id_stato`) REFERENCES `agenda_stati_appuntamento` (`id_stato`),
  CONSTRAINT `FK_agenda_richieste_appuntamento_auth_utenti` FOREIGN KEY (`id_funzionario_richiesto`) REFERENCES `auth_utenti_vvf` (`id_utente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.agenda_appuntamenti: ~0 rows (circa)

-- Dump della struttura di tabella app_rub_dip.agenda_orari_disponibilita
CREATE TABLE IF NOT EXISTS `agenda_orari_disponibilita` (
  `id_orario` int NOT NULL,
  `id_utente` int DEFAULT NULL,
  `data_disponibilita` date DEFAULT NULL,
  `ora_inizio` time DEFAULT NULL,
  `ora_fine` time DEFAULT NULL,
  `data_ultima_modifica` datetime DEFAULT NULL,
  PRIMARY KEY (`id_orario`),
  KEY `FK_agenda_orario_disponibilita_auth_utenti` (`id_utente`),
  CONSTRAINT `FK_agenda_orario_disponibilita_auth_utenti` FOREIGN KEY (`id_utente`) REFERENCES `auth_utenti_vvf` (`id_utente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.agenda_orari_disponibilita: ~0 rows (circa)

-- Dump della struttura di tabella app_rub_dip.agenda_stati_appuntamento
CREATE TABLE IF NOT EXISTS `agenda_stati_appuntamento` (
  `id_stato` int NOT NULL AUTO_INCREMENT,
  `descrizione` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_stato`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.agenda_stati_appuntamento: ~4 rows (circa)
INSERT IGNORE INTO `agenda_stati_appuntamento` (`id_stato`, `descrizione`) VALUES
	(1, 'DA_CONFERMARE'),
	(2, 'CONFERMATO'),
	(3, 'ANNULLATO'),
	(4, 'EFFETTUATO');

-- Dump della struttura di tabella app_rub_dip.auth_parametri_sede
CREATE TABLE IF NOT EXISTS `auth_parametri_sede` (
  `id_parametro` int NOT NULL AUTO_INCREMENT,
  `codice_sede` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `json_valori` json DEFAULT NULL,
  PRIMARY KEY (`id_parametro`),
  UNIQUE KEY `Indice 2` (`codice_sede`,`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.auth_parametri_sede: ~0 rows (circa)
INSERT IGNORE INTO `auth_parametri_sede` (`id_parametro`, `codice_sede`, `nome`, `json_valori`) VALUES
	(1, '1000', 'prova', '{"a": 0, "b": 2}');

-- Dump della struttura di tabella app_rub_dip.auth_permessi
CREATE TABLE IF NOT EXISTS `auth_permessi` (
  `id_permesso` int NOT NULL AUTO_INCREMENT,
  `nome_permesso` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_permesso`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.auth_permessi: ~2 rows (circa)
INSERT IGNORE INTO `auth_permessi` (`id_permesso`, `nome_permesso`) VALUES
	(1, 'allow'),
	(2, 'deny');

-- Dump della struttura di tabella app_rub_dip.auth_ruoli
CREATE TABLE IF NOT EXISTS `auth_ruoli` (
  `id_ruolo` int NOT NULL AUTO_INCREMENT,
  `descrizione_ruolo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ambito_applicativo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_ruolo`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.auth_ruoli: ~5 rows (circa)
INSERT IGNORE INTO `auth_ruoli` (`id_ruolo`, `descrizione_ruolo`, `ambito_applicativo`) VALUES
	(1, 'Super User', 'Auth'),
	(2, 'Utente di Sede', 'Rubrica, Auth'),
	(3, 'Ufficio Prevenzione Incendi', 'Agenda'),
	(4, 'Funzionario Prevenzione Incendi', 'Agenda'),
	(5, 'Guest', 'Rubrica');

-- Dump della struttura di tabella app_rub_dip.auth_ruolo_has_permessi
CREATE TABLE IF NOT EXISTS `auth_ruolo_has_permessi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_ruolo` int DEFAULT NULL,
  `id_permesso` int DEFAULT NULL,
  `endpoint` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metodo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Indice 4` (`id_ruolo`,`endpoint`,`id_permesso`,`metodo`) USING BTREE,
  KEY `FK_auth_ruolo_has_permessi_auth_permessi` (`id_permesso`),
  CONSTRAINT `FK_auth_ruolo_has_permessi_auth_permessi` FOREIGN KEY (`id_permesso`) REFERENCES `auth_permessi` (`id_permesso`),
  CONSTRAINT `FK_auth_ruolo_has_permessi_auth_ruoli` FOREIGN KEY (`id_ruolo`) REFERENCES `auth_ruoli` (`id_ruolo`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.auth_ruolo_has_permessi: ~21 rows (circa)
INSERT IGNORE INTO `auth_ruolo_has_permessi` (`id`, `id_ruolo`, `id_permesso`, `endpoint`, `metodo`) VALUES
	(1, 1, 1, 'Auth/Ruolo', '*'),
	(2, 1, 1, 'Auth/UtenteVvf', '*'),
	(3, 1, 1, 'Auth/UtenteVvfHasRuoli', '*'),
	(4, 2, 1, 'Auth', '*'),
	(5, 2, 1, 'Rubrica', '*'),
	(6, 3, 1, 'Agenda/Agenda', '*'),
	(7, 3, 1, 'Agenda/Appuntamento', '*'),
	(8, 3, 2, 'Agenda/Appuntamento', 'Conferma'),
	(9, 3, 2, 'Agenda/Appuntamento', 'Rifiuta'),
	(10, 3, 1, 'Agenda/OrarioDisponibilita', 'GetDisponibilitaFunzionarioDaA'),
	(11, 3, 1, 'Agenda/OrarioDisponibilita', 'GetFunzionariDisponibiliDaA'),
	(12, 3, 1, 'Agenda/StatoAppuntamento', 'GetLista'),
	(13, 3, 1, 'Agenda/StatoAppuntamento', 'Read'),
	(14, 4, 1, 'Agenda/Agenda', 'ConfermaAppuntamento'),
	(15, 4, 1, 'Agenda/Agenda', 'GetAppuntamentiDelFunzionarioDaA'),
	(16, 4, 1, 'Agenda/Agenda', 'RifiutaAppuntamento'),
	(17, 4, 1, 'Agenda/OrarioDisponibilita', '*'),
	(18, 4, 2, 'Agenda/OrarioDisponibilita', 'GetFunzionariDisponibiliDaA'),
	(19, 4, 1, 'Agenda/StatoAppuntamento', 'GetLista'),
	(20, 4, 1, 'Agenda/StatoAppuntamento', 'Read'),
	(21, 5, 1, 'Rubrica/Ricerche', '*');

-- Dump della struttura di tabella app_rub_dip.auth_utente_vvf_has_ruoli
CREATE TABLE IF NOT EXISTS `auth_utente_vvf_has_ruoli` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_utente` int NOT NULL,
  `id_ruolo` int NOT NULL,
  `id_sede` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_ufficio` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Indice 2` (`id_utente`,`id_ruolo`) USING BTREE,
  KEY `FK_auth_utenti_has_profili_auth_profili` (`id_ruolo`) USING BTREE,
  CONSTRAINT `FK_auth_utenti_has_profili_auth_profili` FOREIGN KEY (`id_ruolo`) REFERENCES `auth_ruoli` (`id_ruolo`),
  CONSTRAINT `FK_auth_utenti_has_profili_auth_utenti` FOREIGN KEY (`id_utente`) REFERENCES `auth_utenti_vvf` (`id_utente`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.auth_utente_vvf_has_ruoli: ~5 rows (circa)
INSERT IGNORE INTO `auth_utente_vvf_has_ruoli` (`id`, `id_utente`, `id_ruolo`, `id_sede`, `id_ufficio`) VALUES
	(1, 1, 5, '*', NULL),
	(2, 2, 2, 'NO', NULL),
	(3, 2, 3, 'NO', NULL),
	(5, 2, 4, 'NO', NULL),
	(6, 2, 1, '*', NULL);

-- Dump della struttura di tabella app_rub_dip.auth_utenti_vvf
CREATE TABLE IF NOT EXISTS `auth_utenti_vvf` (
  `id_utente` int NOT NULL AUTO_INCREMENT,
  `username_dipvvf` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_utente`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.auth_utenti_vvf: ~21 rows (circa)
INSERT IGNORE INTO `auth_utenti_vvf` (`id_utente`, `username_dipvvf`) VALUES
	(1, 'guest'),
	(2, 'massimo.brunale'),
	(3, 'pietro.scotti'),
	(4, 'marco.panoni'),
	(5, 'michele.equizzi'),
	(6, 'michele.coretti'),
	(7, 'cecilia.ferrarini'),
	(8, 'giancarlo.garau'),
	(9, 'federico.cimini'),
	(10, 'francesco.pantuso'),
	(11, 'michele.amato'),
	(12, 'frida.schiavoni'),
	(13, 'evelise.pintonello'),
	(14, 'angelo.bruno'),
	(15, 'giuseppe.merola'),
	(16, 'massimiliano.mollichelli'),
	(17, 'roberto.bagala'),
	(18, 'giuseppe.rirrama'),
	(19, 'gabriella.salvatori'),
	(20, 'giacomo.dallape'),
	(21, 'giacomo.picciolo');

-- Dump della struttura di tabella app_rub_dip.rubrica_carriere_dirigenziali
CREATE TABLE IF NOT EXISTS `rubrica_carriere_dirigenziali` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_tipologia_carriera` int DEFAULT NULL,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descrizione` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `colore` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_rubrica_qualifiche_dei_dirigenti_rubrica_tipologie_carriere` (`id_tipologia_carriera`),
  CONSTRAINT `FK_rubrica_qualifiche_dei_dirigenti_rubrica_tipologie_carriere` FOREIGN KEY (`id_tipologia_carriera`) REFERENCES `rubrica_tipologie_carriere` (`id_tipo_carriera`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.rubrica_carriere_dirigenziali: ~10 rows (circa)
INSERT IGNORE INTO `rubrica_carriere_dirigenziali` (`id`, `id_tipologia_carriera`, `nome`, `descrizione`, `colore`) VALUES
	(1, 1, 'CAPO DEL CORPO', 'Capo del C.N.V.V.F. Vice Capo Dipartimento', '#6F2B3D'),
	(2, 1, 'DGEN', 'DIRIGENTE GENERALE', '#9E2344'),
	(3, 1, 'DSUP', 'DIRIGENTE SUPERIORE', '#BD758B'),
	(4, 1, 'PD', 'PRIMO DIRIGENTE', '#C3B4C9'),
	(5, 2, 'CAPO DIPARTIMENTO', 'CAPO DIPARTIMENTO', '#3055C0'),
	(6, 2, 'PREFETTO DIREZIONE CENTRALE', 'PREFETTO DIREZIONE CENTRALE', '#4F89E2'),
	(7, 2, 'VICEPREFETTO', 'VICEPREFETTO', '#91BDE7'),
	(8, 2, 'VICEPREFETTO AGGIUNTO', 'VICEPREFETTO AGGIUNTO', '#B1D6E6'),
	(9, 3, 'DIRIGENTE GENERALE DI RAGIONERIA', 'DIRIGENTE GENERALE DI RAGIONERIA', '#D1E75E'),
	(10, 3, 'DIRIGENTE DI II FASCIA', 'DIRIGENTE DI II FASCIA', '#CEDB95');

-- Dump della struttura di tabella app_rub_dip.rubrica_contatti
CREATE TABLE IF NOT EXISTS `rubrica_contatti` (
  `id_contatto` int NOT NULL AUTO_INCREMENT,
  `codice_fiscale` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_carriera_dirigenziale` int DEFAULT NULL,
  `qualifica` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'in wauc ma non cambia',
  `cognome` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'in wauc ma non cambia',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'in wauc ma non cambia',
  `telefono` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voip` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_contatto`) USING BTREE,
  KEY `FK_rubrica_contatti_rubrica_qualifiche_dei_dirigenti` (`id_carriera_dirigenziale`) USING BTREE,
  CONSTRAINT `FK_rubrica_contatti_rubrica_qualifiche_dei_dirigenti` FOREIGN KEY (`id_carriera_dirigenziale`) REFERENCES `rubrica_carriere_dirigenziali` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.rubrica_contatti: ~2 rows (circa)
INSERT IGNORE INTO `rubrica_contatti` (`id_contatto`, `codice_fiscale`, `id_carriera_dirigenziale`, `qualifica`, `nome`, `cognome`, `email`, `telefono`, `voip`) VALUES
	(1, '', 5, NULL, 'RENATO', 'FRANCESCHELLI', 'SEGRETERIA.CAPODIP.VVF@VIGILFUOCO.IT', '06 465.37310', '70000'),
	(2, 'DLLCRL59S16D458Z', 1, NULL, 'CARLO', 'DALL\'OPPIO', 'CARLO.DALLOPPIO@VIGILFUOCO.IT', '06 465 37380', NULL);

-- Dump della struttura di tabella app_rub_dip.rubrica_contatto_has_uffici
CREATE TABLE IF NOT EXISTS `rubrica_contatto_has_uffici` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_contatto` int DEFAULT NULL,
  `id_ufficio` int DEFAULT NULL,
  `is_responsabile` tinyint DEFAULT NULL,
  `compito` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Indice 2` (`id_contatto`,`id_ufficio`),
  KEY `FK_rubrica_contatto_has_uffici_rubrica_uffici` (`id_ufficio`),
  CONSTRAINT `FK_rubrica_contatto_has_uffici_rubrica_contatti` FOREIGN KEY (`id_contatto`) REFERENCES `rubrica_contatti` (`id_contatto`),
  CONSTRAINT `FK_rubrica_contatto_has_uffici_rubrica_uffici` FOREIGN KEY (`id_ufficio`) REFERENCES `rubrica_uffici` (`id_ufficio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.rubrica_contatto_has_uffici: ~0 rows (circa)

-- Dump della struttura di tabella app_rub_dip.rubrica_dirigente_has_sedi
CREATE TABLE IF NOT EXISTS `rubrica_dirigente_has_sedi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_sede` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_contatto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_rubrica_dirigenti_sedi_rubrica_contatti` (`id_contatto`),
  CONSTRAINT `FK_rubrica_dirigenti_sedi_rubrica_contatti` FOREIGN KEY (`id_contatto`) REFERENCES `rubrica_contatti` (`id_contatto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.rubrica_dirigente_has_sedi: ~2 rows (circa)
INSERT IGNORE INTO `rubrica_dirigente_has_sedi` (`id`, `id_sede`, `id_contatto`) VALUES
	(1, '00', 1),
	(2, '001', 2);

-- Dump della struttura di tabella app_rub_dip.rubrica_tipologie_carriere
CREATE TABLE IF NOT EXISTS `rubrica_tipologie_carriere` (
  `id_tipo_carriera` int NOT NULL AUTO_INCREMENT,
  `carriera` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_tipo_carriera`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.rubrica_tipologie_carriere: ~2 rows (circa)
INSERT IGNORE INTO `rubrica_tipologie_carriere` (`id_tipo_carriera`, `carriera`) VALUES
	(1, 'C.N.VV.F.'),
	(2, 'CARRIERA PREFETTIZIA'),
	(3, 'RUOLO UNICO DELLA DIRIGENZA');

-- Dump della struttura di tabella app_rub_dip.rubrica_uffici
CREATE TABLE IF NOT EXISTS `rubrica_uffici` (
  `id_ufficio` int NOT NULL AUTO_INCREMENT,
  `descrizione` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_ufficio_padre` int DEFAULT NULL,
  `id_sede` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voip` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_peo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_pec` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `piano` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stanza` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_attivo` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_ufficio`) USING BTREE,
  KEY `FK_rubrica_uffici_rubrica_uffici` (`id_ufficio_padre`),
  CONSTRAINT `FK_rubrica_uffici_rubrica_uffici` FOREIGN KEY (`id_ufficio_padre`) REFERENCES `rubrica_uffici` (`id_ufficio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella app_rub_dip.rubrica_uffici: ~1 rows (circa)
INSERT IGNORE INTO `rubrica_uffici` (`id_ufficio`, `descrizione`, `id_ufficio_padre`, `id_sede`, `telefono`, `voip`, `email_peo`, `email_pec`, `piano`, `stanza`, `is_attivo`) VALUES
	(1, 'Ufficio Prevenzione', NULL, 'NO', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
