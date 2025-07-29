-- สร้าง database สำหรับ Express.js + TypeORM project
-- ใช้คำสั่งนี้ใน PostgreSQL command line หรือ pgAdmin

-- สร้าง database

-- สร้าง table users สำหรับ TypeORM Entity
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- สร้าง index สำหรับ email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- เพิ่มข้อมูลตัวอย่าง
INSERT INTO users ("firstName", "lastName", email) VALUES 
('John', 'Doe', 'john.doe@example.com'),
('Jane', 'Smith', 'jane.smith@example.com'),
('Bob', 'Johnson', 'bob.johnson@example.com')
ON CONFLICT (email) DO NOTHING;

-- แสดงข้อมูลที่เพิ่งสร้าง
SELECT * FROM users;
