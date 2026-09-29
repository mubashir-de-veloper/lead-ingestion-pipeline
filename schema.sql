CREATE DATABASE IF NOT EXISTS lead_pipeline
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE lead_pipeline;

CREATE TABLE IF NOT EXISTS leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(64) NOT NULL,
  company VARCHAR(255),
  requirements TEXT NOT NULL,
  score TINYINT UNSIGNED NOT NULL DEFAULT 0,
  qualification VARCHAR(20) NOT NULL,
  intent TEXT,
  summary TEXT,
  qualified TINYINT(1) NOT NULL DEFAULT 0,
  source VARCHAR(50) NOT NULL DEFAULT 'webform',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  INDEX idx_email (email),
  INDEX idx_qualified (qualified),
  INDEX idx_created_at (created_at)
);