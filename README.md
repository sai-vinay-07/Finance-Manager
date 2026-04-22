# Finance Manager API

Simple backend for personal finance tracking using Node.js, Express & PostgreSQL.

## Features
- User registration & JWT authentication
- Role-based access (User/Admin)
- Add/view transactions (income/expense categories)
- Dashboard: Income, expenses, balance
- Admin: Manage users/transactions

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Auth**: JWT + bcrypt
- **Other**: pg, cors, dotenv

## Quick Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### 1. Clone & Install
```bash
npm install
```

### 2. Database Setup
Create database `finance_manager`:
```sql
CREATE DATABASE finance_manager;

-- Tables (run in psql)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) -- 'income' or 'expense'
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  category_id INTEGER REFERENCES category(id),
  amount DECIMAL(10,2),
  description TEXT
);
```

**Insert categories**:
```sql
INSERT INTO category (type) VALUES ('income'), ('expense');
```

### 3. Environment (.env)
```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=finance_manager
DB_PORT=5432
JWT_SECRET=your_secret_key_32_chars
PORT=8080
```

### 4. Run
```bash
npm run dev  # nodemon
# or
npm start
```

Server: `http://localhost:8080`

## API Endpoints

### Auth (api/users)
- `POST /register` - {name, email, password}
- `POST /login` - {email, password} → token

**Headers**: `Authorization: Bearer <token>`

### User (api/transactions)
- `POST /create` - {amount, category_id, description}
- `GET /user` - My transactions
- `GET /dashboard` - Stats

### Admin
- `api/admin/users/:id` PUT/DELETE
- `api/transactions/all-users`, `/all-transactions`, `/user/:id/transactions`

## Testing
Use Postman/Insomnia:
1. Register → Login → Use token
2. Add transaction (category_id: 1=income, 2=expense)

## Scripts
- `npm run dev` - Development
- `npm start` - Production

## Notes
- Seed categories first!
- Admin role for user mgmt.

Built with by [Guttula Sai Vinay]
