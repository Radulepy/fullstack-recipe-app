CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    prep_time VARCHAR(50),
    image VARCHAR(255),
    description TEXT,
    ingredients TEXT NOT NULL,    -- JSON stringified array
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- future; normalize table if needed for ingredients/steps/...