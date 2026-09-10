# Todo App - Backend API

RESTful API backend untuk aplikasi Todo List yang dibangun menggunakan **Express.js**, **TypeScript**, dan **MySQL**. Backend ini dilengkapi dengan sistem autentikasi berbasis **JSON Web Token (JWT)** dan manajemen data tugas (todo).

---

## 📋 Prasyarat Sistem (Prerequisites)

Sebelum memulai, pastikan perangkat Anda telah terpasang:
- **Node.js** (versi 18.x atau lebih baru) & **npm**
- **MySQL Server** (bisa menggunakan **XAMPP**, **Laragon**, atau MySQL Standalone)
- **Git**

---

## 🛠️ Panduan Setup Project

Ikuti langkah-langkah berikut untuk mengatur project di lingkungan lokal:

### 1. Clone Repository (Jika belum)
```bash
git clone https://github.com/mizanyf/todo-backend.git
cd todo-backend
```

### 2. Install Dependencies
Jalankan perintah berikut untuk mengunduh semua package yang diperlukan:
```bash
npm install
```

### 3. Konfigurasi Environment Variables (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
*(Di Windows PowerShell: `Copy-Item .env.example .env`)*

Buka file `.env` dan sesuaikan konfigurasinya dengan pengaturan MySQL Anda:
```env
# Konfigurasi Database MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todo_db

# Port Server
PORT=5000

# Secret Key untuk JWT
JWT_SECRET=pwf_2026_super_secret_key
```

---

## 🗄️ Cara Import Database MySQL

File skema SQL telah disediakan pada file [`database.sql`](./database.sql). Anda dapat mengimpornya dengan salah satu dari dua cara berikut:

### Opsi A: Melalui phpMyAdmin (Rekomendasi / GUI)
1. Buka browser dan akses **phpMyAdmin** (biasanya di `http://localhost/phpmyadmin`).
2. Buat database baru bernama `todo_db` (atau klik menu **Databases** -> buat dengan nama `todo_db` dan collation `utf8mb4_unicode_ci`).
3. Pilih database `todo_db` di panel sebelah kiri.
4. Klik tab **Import** pada menu atas.
5. Klik **Choose File** / **Pilih File**, lalu arahkan ke file `database.sql` yang ada di dalam folder project ini.
6. Gulir ke bawah lalu klik tombol **Import** / **Go**.
7. Pastikan tabel `users` dan `todos` berhasil dibuat.

---

### Opsi B: Melalui MySQL CLI / Command Prompt
Jika MySQL sudah terdaftar di Environment PATH Anda:

```bash
# Masuk ke MySQL (masukkan password jika diminta)
mysql -u root -p

# Di dalam prompt MySQL, import file database.sql:
source database.sql;
```

Atau langsung eksekusi dari terminal/PowerShell:
```bash
mysql -u root -p < database.sql
```

> **Catatan:** Skema database mencakup 2 tabel:
> - `users`: Menyimpan kredensial user (`id`, `username`, `email`, `password`, `created_at`).
> - `todos`: Menyimpan daftar tugas (`id`, `user_id`, `task`, `is_completed`, `created_at`) dengan relasi *foreign key* ke `users.id`.

---

## 🚀 Perintah Menjalankan Server Lokal

Jalankan perintah berikut untuk menyalakan development server:

```bash
npm run dev
```

Server akan berjalan menggunakan `tsx watch` (hot-reload saat ada perubahan file TypeScript) pada:
```
http://localhost:5000
```

Untuk memverifikasi bahwa server sudah aktif, buka browser atau kirim request GET ke:
- `GET http://localhost:5000/`
- Respons yang diharapkan:
  ```json
  {
    "success": true,
    "message": "Backend Todo Praktikum Berjalan Mulus!"
  }
  ```

---

## 📡 Daftar Endpoint API

Semua endpoint API diawali dengan prefix `/api`.

### Autentikasi (`/api/auth`)

| Method | Endpoint | Keterangan | Body Request | Header |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Mendaftarkan akun baru | `{"username": "...", "email": "...", "password": "..."}` | - |
| `POST` | `/api/auth/login` | Login user & mendapatkan token | `{"username": "...", "password": "..."}` | - |

### Todo (`/api/todos`) - *Protected (Memerlukan JWT)*

| Method | Endpoint | Keterangan | Body Request | Header |
|---|---|---|---|---|
| `GET` | `/api/todos` | Mengambil semua todo milik user login | - | `Authorization: Bearer <TOKEN>` |
| `POST` | `/api/todos` | Menambahkan todo baru | `{"task": "Belajar Express.js"}` | `Authorization: Bearer <TOKEN>` |

---

## 📁 Struktur Folder

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts             # Koneksi MySQL Connection Pool
│   ├── controllers/
│   │   ├── authController.ts # Logika login & register
│   │   └── todoController.ts # Logika CRUD todo
│   ├── middlewares/
│   │   ├── authMiddleware.ts # Verifikasi JWT Token
│   │   └── validator.ts      # Validasi payload request
│   ├── models/
│   │   ├── todoModel.ts      # Query SQL tabel todos
│   │   └── userModel.ts      # Query SQL tabel users
│   ├── routes/
│   │   └── api.ts            # Definisi endpoint rute
│   ├── app.ts                # Inisialisasi Express app & middleware
│   └── server.ts             # Server entry point
├── .env.example              # Template variabel lingkungan
├── .gitignore                # Daftar file/folder yang diabaikan git
├── database.sql              # Skema DDL Database MySQL
├── package.json              # Metadata project dan dependencies
├── tsconfig.json             # Konfigurasi TypeScript
└── README.md                 # Dokumentasi project
```
