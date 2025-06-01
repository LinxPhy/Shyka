


CREATE TABLE users (
    user_id varchar(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(255),
    password VARCHAR(255),
    premium BOOLEAN DEFAULT 0,
    model VARCHAR(255),
    role enum ('user', 'moderator', 'admin') DEFAULT 'user',
    banned BOOLEAN DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE sessions (
    user_id varchar(255) PRIMARY KEY,
    signature VARCHAR(255) NOT NULL,
    ip_address VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE logs (
    log_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(255) NOT NULL,
    alias VARCHAR(255) NOT NULL,
    role enum ('user', 'assistant', 'system') NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE tokens (
    token_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE likes (
    like_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    alias varchar(255) NOT NULL,
    user_id varchar(255) NOT NULL,
    UNIQUE(alias, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (alias) REFERENCES chatbots(alias) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

