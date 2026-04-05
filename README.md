# Financial Dashboard UI

A modern **Financial Dashboard Web Application** built using **React, Tailwind CSS, and Context API**.
This project allows users to **track income, expenses, and financial insights** through a clean and responsive interface.

The goal of this project is to demonstrate **modern frontend development practices** such as component architecture, state management, responsive UI design, and reusable UI components.

---

# Features

### Dashboard

* Overview of financial activity
* Summary cards for **Income, Expenses, and Balance**
* Visual financial insights (time-based and category-based charts)

### Transactions Management

* View all financial transactions
* Add new transactions
* Edit existing transactions *(Admin only)*
* Search and filter transactions
* Empty state UI when no transactions exist

### Insights

* Financial data insights
* Category-based spending analysis
* Monthly comparison and observations

### Data Export

* Export transactions as:

  * CSV
  * JSON

### Dark Mode

* Light / Dark theme toggle
* Fully responsive design

### Role-Based UI Simulation

* Viewer: Read-only access
* Admin: Can add/edit transactions
* Role toggle implemented for demonstration

---

# Tech Stack

**Frontend**

* React
* JavaScript (ES6+)
* Tailwind CSS
* Context API

**Tools**

* Vite
* Git
* GitHub

---

# Project Structure

```
src
│
├── components
│   ├── common
│   ├── layout
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   │
│   ├── transactions
│   │   ├── TransactionsTable.jsx
│   │   ├── TransactionsToolbar.jsx
│   │   └── TransactionFormModal.jsx
│   │
│   └── views
│       ├── DashboardView.jsx
│       ├── TransactionsView.jsx
│       └── InsightsView.jsx
│
├── context
│   └── FinanceContext.jsx
│
├── utils
│   ├── exportData.js
│   └── formatters.js
│
└── App.jsx
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/navneetsharma212006/Financial-Dashboard-UI.git
```

Go into the project directory

```bash
cd Financial-Dashboard-UI
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

---

# Screenshots

**Dashboard**
![Dashboard](https://github.com/navneetsharma212006/Financial-Dashboard-UI/blob/c67f4762e221c22c1eff06a3465b299d70152df0/screenshots/Dashboard.png)

**Transactions**
![Transactions](https://github.com/navneetsharma212006/Financial-Dashboard-UI/blob/148053565611cb98bef6490cb92f242b4c396018/screenshots/Insights.png)

**Insights**
![Insights](screenshots/insights.png)

**Empty State Example**
![Empty State](screenshots/empty-state.png)

---

# Future Improvements

* Advanced transaction filtering
* Sorting transactions
* Delete transactions
* Enhanced charts & analytics
* Backend integration
* Authentication system

---

# Learning Goals

This project demonstrates:

* React component architecture
* State management with Context API
* Responsive UI design
* Reusable UI components
* Modern Tailwind CSS practices
* Clean project structure

---

# Author

**Navneet Sharma**
Frontend Developer
Passionate about building **modern web applications and dashboards**

---

# Support

If you like this project:

* Star the repository
* Fork the project
* Contribute to improve it
