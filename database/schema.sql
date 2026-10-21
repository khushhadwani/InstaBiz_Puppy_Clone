-- =============================================================================
-- TeddyPups U.A.E. — Database Schema (MySQL 8.0+)
-- =============================================================================

CREATE DATABASE IF NOT EXISTS teddypups_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE teddypups_db;

-- 1. Puppies Catalog
CREATE TABLE IF NOT EXISTS puppies (
    id VARCHAR(36) PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    gender_label VARCHAR(20) NOT NULL,
    age VARCHAR(50) NOT NULL,
    colour VARCHAR(50) DEFAULT '',
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'available',
    featured BOOLEAN DEFAULT FALSE,
    origin VARCHAR(50) DEFAULT 'local',
    cover_image_url VARCHAR(500) NOT NULL,
    cover_focal_x FLOAT DEFAULT 0.5,
    cover_focal_y FLOAT DEFAULT 0.5,
    cover_bg_color VARCHAR(20) DEFAULT '#785838',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_puppies_breed (breed),
    INDEX idx_puppies_status (status),
    INDEX idx_puppies_gender (gender)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Puppy Media (Photos & Videos)
CREATE TABLE IF NOT EXISTS puppy_media (
    id VARCHAR(36) PRIMARY KEY,
    puppy_id VARCHAR(36) NOT NULL,
    url VARCHAR(500) NOT NULL,
    kind VARCHAR(20) DEFAULT 'image',
    width INT DEFAULT NULL,
    height INT DEFAULT NULL,
    alt_text VARCHAR(255) DEFAULT '',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (puppy_id) REFERENCES puppies(id) ON DELETE CASCADE,
    INDEX idx_media_puppy (puppy_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Adoption Inquiries & Reservations
CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    puppy_id VARCHAR(36) DEFAULT NULL,
    puppy_name VARCHAR(100) DEFAULT NULL,
    customer_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    city VARCHAR(100) DEFAULT 'Dubai',
    message TEXT,
    inquiry_type VARCHAR(50) DEFAULT 'general',
    status VARCHAR(30) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (puppy_id) REFERENCES puppies(id) ON DELETE SET NULL,
    INDEX idx_inquiries_email (email),
    INDEX idx_inquiries_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Contact Letterhead Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    puppy_interest VARCHAR(100) DEFAULT 'any puppy',
    letter_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_contact_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. FAQs
CREATE TABLE IF NOT EXISTS faqs (
    id VARCHAR(36) PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Happy Families Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id VARCHAR(36) PRIMARY KEY,
    client_name VARCHAR(150) NOT NULL,
    location VARCHAR(150) NOT NULL,
    puppy_name VARCHAR(100) NOT NULL,
    quote TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
