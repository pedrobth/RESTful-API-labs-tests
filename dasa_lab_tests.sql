DROP DATABASE IF EXISTS `dasa_laboratory_tests`;
CREATE DATABASE `dasa_laboratory_tests` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dasa_laboratory_tests`;
--
-- Database: `dasa_laboratory_tests`
--

-- --------------------------------------------------------

--
-- Table structure for table `laboratories`
--
-- UNIQUE KEY constraint should be considered in address or lab_name
CREATE TABLE laboratories (
  id INT NOT NULL AUTO_INCREMENT,
  address VARCHAR(255) NOT NULL,
  lab_name VARCHAR(64) NOT NULL,
  active BOOLEAN DEFAULT true,
  PRIMARY KEY (id)
);

INSERT INTO laboratories (address, lab_name) VALUES
    ('10, Blood test street, Histopatology_ville, 37011', 'blood test DASA center'),
    ('1005, Plasma samples street, Infectologist_land, 31011', 'plasma analysis DASA center'),
    ('5098, Image Scan and disgnostics street, health_city, 25098', 'central imaging DASA center');

CREATE TABLE tests (
  id INT NOT NULL AUTO_INCREMENT,
  test_name VARCHAR(255) NOT NULL,
  test_type VARCHAR(16) NOT NULL,
  active BOOLEAN DEFAULT true,
  PRIMARY KEY (id),
  CHECK (test_type in ('analise clinica', 'imagem'))
);

INSERT INTO tests (test_name, test_type) VALUES
    ('contagem de hematocritos', 'analise clinica'),
    ('ressonancia magnetica', 'imagem'),
    ('tomografia computadorizada', 'imagem');

CREATE TABLE tests_laboratories (
  test_id INT NOT NULL,
  laboratory_id INT NOT NULL,
  PRIMARY KEY (test_id, laboratory_id),
  FOREIGN KEY (test_id) REFERENCES tests(id),
  FOREIGN KEY (laboratory_id) REFERENCES laboratories(id)
);

INSERT INTO tests_laboratories (laboratory_id, test_id) VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (3, 3);
