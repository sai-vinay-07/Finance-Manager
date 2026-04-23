CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    category INT REFERENCES category_id(id),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    
)