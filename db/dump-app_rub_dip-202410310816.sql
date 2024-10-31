-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: app_rub_dip
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agenda_appuntamenti`
--

DROP TABLE IF EXISTS `agenda_appuntamenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda_appuntamenti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_appuntamento` date DEFAULT NULL,
  `ora_appuntamento` time DEFAULT NULL,
  `id_stato` int DEFAULT NULL,
  `note` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nominativo_richiedente` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_richiedente` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono_richiedente` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_funzionario_richiesto` int DEFAULT NULL,
  `data_ultima_modifica` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_agenda_richieste_appuntamento_auth_utenti` (`id_funzionario_richiesto`),
  KEY `FK_agenda_richieste_appuntamento_agenda_stato_ric_app` (`id_stato`) USING BTREE,
  CONSTRAINT `FK_agenda_richieste_appuntamento_agenda_stati_appuntamento` FOREIGN KEY (`id_stato`) REFERENCES `agenda_stati_appuntamento` (`id_stato`),
  CONSTRAINT `FK_agenda_richieste_appuntamento_auth_utenti` FOREIGN KEY (`id_funzionario_richiesto`) REFERENCES `auth_utenti_vvf` (`id_utente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda_appuntamenti`
--

LOCK TABLES `agenda_appuntamenti` WRITE;
/*!40000 ALTER TABLE `agenda_appuntamenti` DISABLE KEYS */;
/*!40000 ALTER TABLE `agenda_appuntamenti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agenda_orari_disponibilita`
--

DROP TABLE IF EXISTS `agenda_orari_disponibilita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda_orari_disponibilita` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda_orari_disponibilita`
--

LOCK TABLES `agenda_orari_disponibilita` WRITE;
/*!40000 ALTER TABLE `agenda_orari_disponibilita` DISABLE KEYS */;
/*!40000 ALTER TABLE `agenda_orari_disponibilita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agenda_stati_appuntamento`
--

DROP TABLE IF EXISTS `agenda_stati_appuntamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda_stati_appuntamento` (
  `id_stato` int NOT NULL AUTO_INCREMENT,
  `descrizione` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_stato`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda_stati_appuntamento`
--

LOCK TABLES `agenda_stati_appuntamento` WRITE;
/*!40000 ALTER TABLE `agenda_stati_appuntamento` DISABLE KEYS */;
INSERT INTO `agenda_stati_appuntamento` VALUES (1,'DA_CONFERMARE'),(2,'CONFERMATO'),(3,'ANNULLATO'),(4,'EFFETTUATO');
/*!40000 ALTER TABLE `agenda_stati_appuntamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_parametri_sede`
--

DROP TABLE IF EXISTS `auth_parametri_sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_parametri_sede` (
  `id_parametro` int NOT NULL AUTO_INCREMENT,
  `codice_sede` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `json_valori` json DEFAULT NULL,
  PRIMARY KEY (`id_parametro`),
  UNIQUE KEY `Indice 2` (`codice_sede`,`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_parametri_sede`
--

LOCK TABLES `auth_parametri_sede` WRITE;
/*!40000 ALTER TABLE `auth_parametri_sede` DISABLE KEYS */;
INSERT INTO `auth_parametri_sede` VALUES (1,'1000','prova','{\"a\": 0, \"b\": 2}');
/*!40000 ALTER TABLE `auth_parametri_sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permessi`
--

DROP TABLE IF EXISTS `auth_permessi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permessi` (
  `id_permesso` int NOT NULL AUTO_INCREMENT,
  `nome_permesso` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_permesso`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permessi`
--

LOCK TABLES `auth_permessi` WRITE;
/*!40000 ALTER TABLE `auth_permessi` DISABLE KEYS */;
INSERT INTO `auth_permessi` VALUES (1,'allow'),(2,'deny');
/*!40000 ALTER TABLE `auth_permessi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_ruoli`
--

DROP TABLE IF EXISTS `auth_ruoli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_ruoli` (
  `id_ruolo` int NOT NULL AUTO_INCREMENT,
  `descrizione_ruolo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ambito_applicativo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_ruolo`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_ruoli`
--

LOCK TABLES `auth_ruoli` WRITE;
/*!40000 ALTER TABLE `auth_ruoli` DISABLE KEYS */;
INSERT INTO `auth_ruoli` VALUES (1,'Super User','Auth'),(2,'Utente di Sede','Rubrica, Auth'),(3,'Ufficio Prevenzione Incendi','Agenda'),(4,'Funzionario Prevenzione Incendi','Agenda'),(5,'Guest','Rubrica');
/*!40000 ALTER TABLE `auth_ruoli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_ruolo_has_permessi`
--

DROP TABLE IF EXISTS `auth_ruolo_has_permessi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_ruolo_has_permessi` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_ruolo_has_permessi`
--

LOCK TABLES `auth_ruolo_has_permessi` WRITE;
/*!40000 ALTER TABLE `auth_ruolo_has_permessi` DISABLE KEYS */;
INSERT INTO `auth_ruolo_has_permessi` VALUES (1,1,1,'Auth/Ruolo','*'),(2,1,1,'Auth/UtenteVvf','*'),(3,1,1,'Auth/UtenteVvfHasRuoli','*'),(4,2,1,'Auth','*'),(5,2,1,'Rubrica','*'),(6,3,1,'Agenda/Agenda','*'),(7,3,1,'Agenda/Appuntamento','*'),(8,3,2,'Agenda/Appuntamento','Conferma'),(9,3,2,'Agenda/Appuntamento','Rifiuta'),(10,3,1,'Agenda/OrarioDisponibilita','GetDisponibilitaFunzionarioDaA'),(11,3,1,'Agenda/OrarioDisponibilita','GetFunzionariDisponibiliDaA'),(12,3,1,'Agenda/StatoAppuntamento','GetLista'),(13,3,1,'Agenda/StatoAppuntamento','Read'),(14,4,1,'Agenda/Agenda','ConfermaAppuntamento'),(15,4,1,'Agenda/Agenda','GetAppuntamentiDelFunzionarioDaA'),(16,4,1,'Agenda/Agenda','RifiutaAppuntamento'),(17,4,1,'Agenda/OrarioDisponibilita','*'),(18,4,2,'Agenda/OrarioDisponibilita','GetFunzionariDisponibiliDaA'),(19,4,1,'Agenda/StatoAppuntamento','GetLista'),(20,4,1,'Agenda/StatoAppuntamento','Read'),(21,5,1,'Rubrica/Ricerche','*');
/*!40000 ALTER TABLE `auth_ruolo_has_permessi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_utente_vvf_has_ruoli`
--

DROP TABLE IF EXISTS `auth_utente_vvf_has_ruoli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_utente_vvf_has_ruoli` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_utente_vvf_has_ruoli`
--

LOCK TABLES `auth_utente_vvf_has_ruoli` WRITE;
/*!40000 ALTER TABLE `auth_utente_vvf_has_ruoli` DISABLE KEYS */;
INSERT INTO `auth_utente_vvf_has_ruoli` VALUES (1,1,5,'*',NULL),(2,2,2,'NO',NULL),(3,2,3,'NO',NULL),(5,2,4,'NO',NULL),(6,2,1,'*',NULL);
/*!40000 ALTER TABLE `auth_utente_vvf_has_ruoli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_utenti_vvf`
--

DROP TABLE IF EXISTS `auth_utenti_vvf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_utenti_vvf` (
  `id_utente` int NOT NULL AUTO_INCREMENT,
  `username_dipvvf` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_utente`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_utenti_vvf`
--

LOCK TABLES `auth_utenti_vvf` WRITE;
/*!40000 ALTER TABLE `auth_utenti_vvf` DISABLE KEYS */;
INSERT INTO `auth_utenti_vvf` VALUES (1,'guest'),(2,'massimo.brunale'),(3,'pietro.scotti'),(4,'marco.panoni'),(5,'michele.equizzi'),(6,'michele.coretti'),(7,'cecilia.ferrarini'),(8,'giancarlo.garau'),(9,'federico.cimini'),(10,'francesco.pantuso'),(11,'michele.amato'),(12,'frida.schiavoni'),(13,'evelise.pintonello'),(14,'angelo.bruno'),(15,'giuseppe.merola'),(16,'massimiliano.mollichelli'),(17,'roberto.bagala'),(18,'giuseppe.rirrama'),(19,'gabriella.salvatori'),(20,'giacomo.dallape'),(21,'giacomo.picciolo');
/*!40000 ALTER TABLE `auth_utenti_vvf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubrica_carriere_dirigenziali`
--

DROP TABLE IF EXISTS `rubrica_carriere_dirigenziali`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubrica_carriere_dirigenziali` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_tipologia_carriera` int DEFAULT NULL,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descrizione` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `colore` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_rubrica_qualifiche_dei_dirigenti_rubrica_tipologie_carriere` (`id_tipologia_carriera`),
  CONSTRAINT `FK_rubrica_qualifiche_dei_dirigenti_rubrica_tipologie_carriere` FOREIGN KEY (`id_tipologia_carriera`) REFERENCES `rubrica_tipologie_carriere` (`id_tipo_carriera`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubrica_carriere_dirigenziali`
--

LOCK TABLES `rubrica_carriere_dirigenziali` WRITE;
/*!40000 ALTER TABLE `rubrica_carriere_dirigenziali` DISABLE KEYS */;
INSERT INTO `rubrica_carriere_dirigenziali` VALUES (1,1,'CAPO DEL CORPO','Capo del C.N.V.V.F. Vice Capo Dipartimento','#6F2B3D'),(2,1,'DGEN','DIRIGENTE GENERALE','#9E2344'),(3,1,'DSUP','DIRIGENTE SUPERIORE','#BD758B'),(4,1,'PD','PRIMO DIRIGENTE','#C3B4C9'),(5,2,'CAPO DIPARTIMENTO','CAPO DIPARTIMENTO','#3055C0'),(6,2,'PREFETTO DIREZIONE CENTRALE','PREFETTO DIREZIONE CENTRALE','#4F89E2'),(7,2,'VICEPREFETTO','VICEPREFETTO','#91BDE7'),(8,2,'VICEPREFETTO AGGIUNTO','VICEPREFETTO AGGIUNTO','#B1D6E6'),(9,3,'DIRIGENTE GENERALE DI RAGIONERIA','DIRIGENTE GENERALE DI RAGIONERIA','#D1E75E'),(10,3,'DIRIGENTE DI II FASCIA','DIRIGENTE DI II FASCIA','#CEDB95');
/*!40000 ALTER TABLE `rubrica_carriere_dirigenziali` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubrica_contatti`
--

DROP TABLE IF EXISTS `rubrica_contatti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubrica_contatti` (
  `id_contatto` int NOT NULL AUTO_INCREMENT,
  `codice_fiscale` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_carriera_dirigenziale` int DEFAULT NULL,
  `qualifica` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'in wauc ma non cambia',
  `cognome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'in wauc ma non cambia',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'in wauc ma non cambia',
  `telefono` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_contatto`) USING BTREE,
  KEY `FK_rubrica_contatti_rubrica_qualifiche_dei_dirigenti` (`id_carriera_dirigenziale`) USING BTREE,
  CONSTRAINT `FK_rubrica_contatti_rubrica_qualifiche_dei_dirigenti` FOREIGN KEY (`id_carriera_dirigenziale`) REFERENCES `rubrica_carriere_dirigenziali` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubrica_contatti`
--

LOCK TABLES `rubrica_contatti` WRITE;
/*!40000 ALTER TABLE `rubrica_contatti` DISABLE KEYS */;
INSERT INTO `rubrica_contatti` VALUES (1,'',5,NULL,'RENATO','FRANCESCHELLI','SEGRETERIA.CAPODIP.VVF@VIGILFUOCO.IT','06 465.37310','70000'),(2,'DLLCRL59S16D458Z',1,NULL,'CARLO','DALL\'OPPIO','CARLO.DALLOPPIO@VIGILFUOCO.IT','06 465 37380',NULL),(3,'acabbb71a19b783c',NULL,'IIE','nome1','cognome1','aa@aa.it','322234566','123'),(4,'agabbb71a19b783c',NULL,'ILGE','nome2','cognome2','bb@aa.it','333234566','124'),(5,'aajbbb71a19b783c',NULL,'OP','nome3','cognome3','cc@aa.it','333234566','125'),(6,'aaabbb71a19b783c',NULL,'IIE','nome4','cognome4','dd@mn.it','345234566','126'),(7,'aajnbb71a19b783c',NULL,'ILGE','nome5','cognome5','ee@aa.it','355237566','127'),(8,'aaabbb71a19b783c',NULL,'ILG','nome6','cognome6','ff@mn.it','333234596','128'),(9,'aajjbb71a19b783c',NULL,'OP','nome7','cognome7','gg@aa.it','332345606','129'),(10,'aartbb71a19b783c',NULL,'IIE','nome8','cognome8','hh@ss.it','333234066','120'),(11,'aawsbb71a19b783c',4,'COM','nome9','cognome9','ii@aa.it','333034566','121'),(12,'bcabbb71a19b783c',NULL,'IIE','nome10','cognome10','ll@aa.it','342234566','212'),(13,'cgabbb71a19b783c',NULL,'ILGE','nome12','cognome12','mm@aa.it','334234566','213'),(14,'asdbbb71a19b783c',NULL,'OP','nome13','cognome13','nn@aa.it','333434566','214'),(15,'aeabbb71a19b783c',NULL,'OP','nome14','cognome14','oo@mn.it','345244566','215'),(16,'ajfnbb71a19b783c',NULL,'IIE','nome15','cognome15','pp@aa.it','355234566','216'),(17,'aabgbb71a19b783c',NULL,'ILGE','nome16','cognome16','qq@mn.it','333234496','217'),(18,'aajbhb71a19b783c',NULL,'OP','nome17','cognome17','rr@aa.it','332345646','218'),(19,'aarbbj71a19b783c',NULL,'IIE','nome18','cognome18','tt@ss.it','333234064','219'),(20,'aawsb7i1a19b783c',4,'COM','nome19','cognome19','uu@aa.it','433034566','210'),(21,'qcabbb71a19b783c',NULL,'IIE','nome20','cognome20','ll@aba.it','542234566','212'),(22,'cgqbbb71a19b783c',NULL,'ILGE','nome21','cognome21','mm@aba.it','534234566','213'),(23,'asdbqb71a19b783c',NULL,'OP','nome23','cognome23','nn@baa.it','533434566','214'),(24,'aeabbq71a19b783c',NULL,'OP','nome24','cognome24','oo@cmn.it','545244566','215'),(25,'ajfnqb71a19b783c',NULL,'IIE','nome25','cognome25','pp@caa.it','555234566','216'),(26,'aqbgbb71a19b783c',NULL,'ILGE','nome26','cognome26','qq@mnc.it','533234496','217'),(27,'aqqbhb71a19b783c',NULL,'OP','nome27','cognome27','rr@aba.it','532345646','218'),(28,'aarerj71a19b783c',NULL,'DIRET','nome28','cognome28','tt@sws.it','533234064','219'),(29,'CCCBBB99A01G666A',NULL,'IIE','ANTONIO','FER','A.F@VIGILFUOCO.IT','0773.3181818','220'),(30,'BBBAAA99A01G666A',NULL,'IIE','DIEGO','STRI','D.S@VIGILFUOCO.IT','0773 000 37380',NULL),(31,'AAABBB99A01G666A',NULL,'IIESC','MICHELE','AMA','ma@vigilfuoco.it','0773 4086000','12399'),(32,'DDDBBB99A01G666A',NULL,'IIE','DANIELE','MAR','D.M@VIGILFUOCO.IT','0773.31844448','2520'),(33,'EEEAAA99A01G666A',NULL,'VC AIB','MARGHERITA','RIC','D.S@VIGILFUOCO.IT','0773 000 30000',NULL),(34,'FFFBBB99A01G666A',NULL,'ASS','FRANCESCO','BIG','FB@vigilfuoco.it','0773 40000','12');
/*!40000 ALTER TABLE `rubrica_contatti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubrica_contatto_has_uffici`
--

DROP TABLE IF EXISTS `rubrica_contatto_has_uffici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubrica_contatto_has_uffici` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_contatto` int DEFAULT NULL,
  `id_ufficio` int DEFAULT NULL,
  `is_responsabile` tinyint DEFAULT NULL,
  `compito` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Indice 2` (`id_contatto`,`id_ufficio`),
  KEY `FK_rubrica_contatto_has_uffici_rubrica_uffici` (`id_ufficio`),
  CONSTRAINT `FK_rubrica_contatto_has_uffici_rubrica_contatti` FOREIGN KEY (`id_contatto`) REFERENCES `rubrica_contatti` (`id_contatto`),
  CONSTRAINT `FK_rubrica_contatto_has_uffici_rubrica_uffici` FOREIGN KEY (`id_ufficio`) REFERENCES `rubrica_uffici` (`id_ufficio`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubrica_contatto_has_uffici`
--

LOCK TABLES `rubrica_contatto_has_uffici` WRITE;
/*!40000 ALTER TABLE `rubrica_contatto_has_uffici` DISABLE KEYS */;
INSERT INTO `rubrica_contatto_has_uffici` VALUES (1,6,4,1,'prova'),(2,10,4,1,'uno e due'),(3,12,7,1,'prova'),(4,16,7,1,'uno e due'),(5,3,4,1,'porta'),(6,19,7,1,'uno e due'),(7,4,2,1,'ottimo'),(8,5,2,1,'un paio'),(9,7,3,1,'un paio'),(10,8,3,1,'tre o quattro'),(11,9,3,1,'inserisco'),(12,18,6,1,'inserisco'),(13,17,6,1,'inserisco'),(14,13,5,1,'inserisco'),(15,29,25,NULL,'Responsabile'),(16,30,26,NULL,NULL),(17,31,26,NULL,NULL),(18,32,33,1,'Responsabile'),(19,33,30,NULL,'operatore'),(20,34,25,NULL,'operatore');
/*!40000 ALTER TABLE `rubrica_contatto_has_uffici` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubrica_dirigente_has_sedi`
--

DROP TABLE IF EXISTS `rubrica_dirigente_has_sedi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubrica_dirigente_has_sedi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_sede` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_contatto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_rubrica_dirigenti_sedi_rubrica_contatti` (`id_contatto`),
  CONSTRAINT `FK_rubrica_dirigenti_sedi_rubrica_contatti` FOREIGN KEY (`id_contatto`) REFERENCES `rubrica_contatti` (`id_contatto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubrica_dirigente_has_sedi`
--

LOCK TABLES `rubrica_dirigente_has_sedi` WRITE;
/*!40000 ALTER TABLE `rubrica_dirigente_has_sedi` DISABLE KEYS */;
INSERT INTO `rubrica_dirigente_has_sedi` VALUES (1,'00',1),(2,'001',2),(3,'BN',11),(4,'AV',20),(5,'13',28);
/*!40000 ALTER TABLE `rubrica_dirigente_has_sedi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubrica_tipologie_carriere`
--

DROP TABLE IF EXISTS `rubrica_tipologie_carriere`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubrica_tipologie_carriere` (
  `id_tipo_carriera` int NOT NULL AUTO_INCREMENT,
  `carriera` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_tipo_carriera`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubrica_tipologie_carriere`
--

LOCK TABLES `rubrica_tipologie_carriere` WRITE;
/*!40000 ALTER TABLE `rubrica_tipologie_carriere` DISABLE KEYS */;
INSERT INTO `rubrica_tipologie_carriere` VALUES (1,'C.N.VV.F.'),(2,'CARRIERA PREFETTIZIA'),(3,'RUOLO UNICO DELLA DIRIGENZA');
/*!40000 ALTER TABLE `rubrica_tipologie_carriere` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubrica_uffici`
--

DROP TABLE IF EXISTS `rubrica_uffici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubrica_uffici` (
  `id_ufficio` int NOT NULL AUTO_INCREMENT,
  `descrizione` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_ufficio_padre` int DEFAULT NULL,
  `id_sede` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_peo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_pec` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `piano` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stanza` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_attivo` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_ufficio`) USING BTREE,
  KEY `FK_rubrica_uffici_rubrica_uffici` (`id_ufficio_padre`),
  CONSTRAINT `FK_rubrica_uffici_rubrica_uffici` FOREIGN KEY (`id_ufficio_padre`) REFERENCES `rubrica_uffici` (`id_ufficio`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubrica_uffici`
--

LOCK TABLES `rubrica_uffici` WRITE;
/*!40000 ALTER TABLE `rubrica_uffici` DISABLE KEYS */;
INSERT INTO `rubrica_uffici` VALUES (1,'Ufficio Prevenzione',NULL,'NO',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'prevenzione',NULL,'BN','111','111','ab@uno.it','ab@pec.uno.it','1','1',1),(3,'personale',NULL,'BN','112','112','ac@uno.it','ac@pec.uno.it','1','2',1),(4,'informatica',NULL,'BN','113','113','as@uno.it','as@pec.uno.it','1','3',1),(5,'prevenzione',NULL,'AV','111','111','as@uno.it','as@pec.uno.it','1','1',1),(6,'personale',NULL,'AV','112','112','at@uno.it','at@pec.uno.it','1','2',1),(7,'informatica',NULL,'AV','113','113','ar@uno.it','ar@pec.uno.it','1','3',1),(8,'ufficio uno',NULL,'13','98','99','uno@uno.it','uno@pec.uno.it','22','1',1),(9,'UFFICIO PER LA SICUREZZA VOLO, PER LA QUALITA, LA FORMAZIONE E LA STANDARDIZZAZIONE',NULL,'1T','8103','8103','ab@unodue.it','ab@pec.unodue.it','1','1',1),(10,'UFFICIO PER LA PIANIFICAZIONE E IL COORDINAMENTO DEL SERVIZIO AIB',NULL,'1Y','8104','8104',NULL,NULL,'1','1',1),(11,'UFFICIO PER LA REGOLAMENTAZIONE COMUNITARIA',NULL,'3P','8005','8005',NULL,NULL,'1','1',1),(12,'UFFICIO PER LA PIANIFICAZIONE, IL CONTROLLO E LO SVILUPPO DELLA FORMAZIONE - VICARIO DEL DIRETTORE CENTRALE',NULL,'2B','8100','8100',NULL,NULL,'1','1',1),(13,'SCUOLE CENTRALI ANTINCENDI',NULL,'2C','8101','8101',NULL,NULL,'1','1',1),(14,'ISTITUTO SUPERIORE ANTINCENDI',NULL,'2E','8103','8103',NULL,NULL,'1','1',1),(15,'SCUOLA DI FORMAZIONE OPERATIVA',NULL,'2F','8104','8104',NULL,NULL,'1','1',1),(16,'UFFICIO PER LA FORMAZIONE MOTORIA PROFESSIONALE',NULL,'2H','8106','8106',NULL,NULL,'1','1',1),(17,'UFFICIO I - PROGRAMMAZIONE E ANALISI ECONOMICO-FINANZIARIE - CAPO UFFICIO DI STAFF',NULL,'6D','8001','8001',NULL,NULL,'1','1',1),(18,'UFFICIO III - ORDINAMENTO RETRIBUTIVO DEL PERSONALE - CAPO UFFICIO DI STAFF',NULL,'6E','8002','8002',NULL,NULL,'1','1',1),(19,'UFFICIO II - BILANCIO E PATRIMONIO',NULL,'6G','8101','8101',NULL,NULL,'1','1',1),(20,'UFFICIO IV - TRATTAMENTO ECONOMICO FISSO DEL PERSONALE',NULL,'6P','8103','8103',NULL,NULL,'1','1',1),(21,'UFFICIO V - TRATTAMENTO ECONOMICO ACCESSORIO DEL PERSONALE',NULL,'6Q','8104','8104',NULL,NULL,'1','1',1),(22,'UFFICIO VI - PREVIDENZA E ASSISTENZA AL PERSONALE',NULL,'6T','8005','8005',NULL,NULL,'1','1',1),(23,'UFFICIO VII - TRATTAMENTO PREVIDENZIALE ORDINARIO E PRIVILEGIATO',NULL,'6B','8100','8100',NULL,NULL,'1','1',1),(24,'UFFICIO III - GESTIONE DELLE RISORSE IMMOBILIARI',NULL,'8C','8100','8100',NULL,NULL,'1','1',1),(25,'Ufficio Prevenzione',NULL,'LT','0773 278','222',NULL,'PREV.LATINA@CERT.VIGILFUOCO.IT','0','18',1),(26,'Ufficio Informatica',NULL,'LT','0773 218','4444','informatica.latina@vigilfuoco.it',NULL,'0','99',1),(27,'Ufficio Comandante',NULL,'LT','0773 6464','11',NULL,NULL,'1','1',1),(28,'Segreteria',NULL,'LT','0773 321','6699','comando.latina@vigilfuoco.it','com.latina@cert.vigilfuoco.it','1','2',1),(29,'Area amministrativa contabile',NULL,'LT','0773 68',NULL,NULL,NULL,'1','3',1),(30,'Ufficio Personale',NULL,'LT','0773 66','123','personale.latina@vigilfuoco.it',NULL,'0','18',1),(31,'Ufficio TEP',NULL,'LT','0773 55',NULL,NULL,NULL,'0','21',1),(32,'Ufficio Acquisti',NULL,'LT','0773 2','212',NULL,NULL,'0','22',1),(33,'Ufficio Formazione',NULL,'LT','0773 3',NULL,NULL,NULL,'0','23',1);
/*!40000 ALTER TABLE `rubrica_uffici` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'app_rub_dip'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-31  8:16:50
