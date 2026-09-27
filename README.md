# PocketSmart AI 💰🤖

PocketSmart AI is a smart budget and recommendation assistant designed to help users manage their expenses and make better spending decisions.

## 📌 Project Overview

PocketSmart AI combines budget management with AI-powered recommendations. Users can manage their budget, track spending-related information, and receive useful recommendations based on their requirements.

## 🎯 Objectives

- Help users manage their personal budget
- Provide AI-powered recommendations
- Organize budget and spending information
- Provide useful product/e-commerce recommendations
- Make financial planning easier for users

## ✨ Key Features

- 💰 Budget Management
- 🤖 AI-powered recommendations
- 🛒 E-commerce product recommendations
- 🗄️ Database management
- 🔐 Password/security utilities
- 📋 List and model management
- 🌐 Web-based application

## 🤖 AI Integration

The project uses Google's Gemini AI service to provide intelligent responses and recommendations.

The main AI-related functionality is implemented through:

- `gemini_service.py`
- `list_models.py`

## 💰 Budget Management

The application provides budget-related functionality to help users organize and manage their spending plans.

Related functionality is implemented in:

- `add_budget_product.py`

## 🛒 E-commerce Recommendations

PocketSmart AI also includes functionality related to e-commerce product recommendations.

Related functionality is implemented in:

- `add_ecommerce_list.py`

## 🗄️ Database

The project uses a database layer for storing and managing application data.

Main database functionality:

- `database.py`

## 🔐 Security

Password-related utility functions are handled through:

- `password_utils.py`

## 🛠️ Technologies Used

- Python
- Gemini AI
- Database
- Git & GitHub
- Web application technologies

## 📂 Project Structure

```text
pocketsmart-ai/
│
├── main.py
├── database.py
├── gemini_service.py
├── list_models.py
├── password_utils.py
├── add_budget_product.py
├── add_ecommerce_list.py
├── .gitignore
└── README.md
