# El Mallín - Hardware Store Management System 🛠️

A modern, robust, and open-source Point of Sale (POS) and Inventory Management System specifically designed for family-owned hardware stores (*ferreterías*). Built with the **TALL stack** (Tailwind, Alpine, Laravel, Laravel) and **React/Inertia.js**.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat&logo=laravel)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat&logo=tailwind-css)

## 🌟 Key Features

- **Inventory Control:** Full CRUD with UUID-based identification, SKU management, and automatic barcode generation.
- **Dual-Pricing Logic:** Global and item-specific profit margin calculations (Cost Price vs. Selling Price).
- **Smart POS (Point of Sale):** A fast interface for employees to process sales, apply custom discounts, and update stock in real-time.
- **Customer Ledger (Cuentas Corrientes):** Track regular customers, their purchases on credit, and total outstanding debt.
- **Role-Based Access Control (RBAC):** - **Admin:** Full access to revenue analytics (monthly/yearly), profit reports, and sensitive global settings.
  - **Employee:** Restricted access to inventory and sales operations only.
- **Dark Mode Ready:** Fully responsive UI built with Tailwind CSS, supporting both light and dark system preferences.

## 🚀 Tech Stack

- **Backend:** [Laravel 11](https://laravel.com/) (PHP 8.3+)
- **Frontend:** [React](https://react.dev/) via [Inertia.js](https://inertiajs.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** SQLite (local development) / MySQL (production ready)
- **Architecture:** Monolithic with a focus on modern SPA feel using Inertia.

## 📊 Database Architecture

The system uses a relational structure optimized for data integrity and business intelligence:



- **UUIDs:** All primary keys use UUIDs for enhanced security and URL privacy.
- **Historical Tracking:** `sale_items` table stores the price at the time of sale to ensure financial records remain accurate even if product prices change later.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/ferreteria-el-mallin.git](https://github.com/YOUR_USERNAME/ferreteria-el-mallin.git)
   cd ferreteria-el-mallin

    Install PHP dependencies:
    Bash

composer install

Install JavaScript dependencies:
Bash

npm install && npm run dev

Environment Setup:
Bash

cp .env.example .env
php artisan key:generate

Database Migration & Seeding:
Bash

php artisan migrate:fresh --seed

Serve the application:
Bash

    php artisan serve

🤝 Contributing

Contributions are welcome! If you have ideas for new features or find bugs, feel free to open an issue or submit a pull request.
📄 License

This project is open-source software licensed under the MIT license.

Developed with ❤️ for El Mallín Hardware Store.


---

### Siguiente paso sugerido:
Ya tienes el repositorio listo y documentado. ¿Te gustaría que empecemos con el **Controller de Ventas** para manejar la lógica de descontar stock y sumar deuda a los clientes, o prefieres trabajar en la **Interfaz del Carrito de Compras** en React?
