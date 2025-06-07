


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



-- Comment Section


CREATE TABLE reports (
    report_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    comment_id INTEGER,
    reply_id INTEGER,
    user_id varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,
    FOREIGN KEY (reply_id) REFERENCES replies(reply_id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE comments (
    comment_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    alias varchar(255) NOT NULL,
    user_id varchar(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (alias) REFERENCES chatbots(alias) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE replies (
    reply_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    comment_id INTEGER NOT NULL,
    parent_reply_id  INTEGER,
    user_id varchar(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE comment_likes (
    comment_like_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    comment_id INTEGER NOT NULL,
    user_id varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(comment_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE reply_likes (
    reply_like_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    reply_id INTEGER NOT NULL,
    user_id varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(reply_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reply_id) REFERENCES replies(reply_id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

