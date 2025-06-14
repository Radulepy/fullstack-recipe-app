CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    prep_time VARCHAR(50),
    image VARCHAR(255),
    description TEXT,
    ingredients TEXT, -- JSON stringified array
    instructions TEXT, -- JSON stringified array
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);