# E-Kuota Project Guide

Website **e-Kuota** is an e-commerce platform for purchasing internet data packages. It requires a refresh in terms of design and enhanced user experience. This guide will walk you through setting up the **e-Kuota** project using React and a mock server API powered by **json-server**, with a focus on improving the user interface and user experience. The prototype will include:

- **Login Menu**
- **Customer Menu**
- **Transaction Menu** for purchasing data packages by each customer

## 1. Set Up Your React Project

First, create a new React app using **Create React App**:

````bash
npx create-react-app e-kuota
cd e-kuota


## 1. Set Up Your React Project

First, create a new React app using **Create React App**:

## 2. Install Dependencies

```bash
npx create-react-app e-kuota
cd e-kuota
````

## 4. Configure json-server globally

```bash
npm install -g json-server
```

## 4. Create Mock Data

```json
{
  "users": [
    {
      "id": "1",
      "username": "admin",
      "password": "admin123",
      "role": "admin"
    },
    {
      "id": "2",
      "username": "juan",
      "password": "juan123",
      "role": "customer"
    },
    {
      "id": "3",
      "username": "filla",
      "password": "filla123",
      "role": "customer"
    },
    {
      "id": "4",
      "username": "hanief",
      "password": "hanief123",
      "role": "customer"
    }
  ],
  "customers": [
    {
      "id": "1",
      "name": "Juan",
      "phoneNumber": "081234567890"
    },
    {
      "id": "3",
      "name": "Filla",
      "phoneNumber": "089876543210"
    },
    {
      "id": "4",
      "name": "Hanief",
      "phoneNumber": "082345678901"
    }
  ],
  "packages": {
    "Telkomsel": [
      {
        "id": "1",
        "name": "1GB - Daily",
        "price": "Rp 10.000",
        "type": "Harian",
        "description": "Daily use for basic browsing and messaging",
        "logo": "https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png"
      },
      {
        "id": "2",
        "name": "2GB - Daily",
        "price": "Rp 15.000",
        "type": "Harian",
        "description": "Great for daily social media and light streaming",
        "logo": "https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png"
      },
      {
        "id": "3",
        "name": "5GB - Weekly",
        "price": "Rp 30.000",
        "type": "Mingguan",
        "description": "Perfect for weekly moderate browsing and streaming",
        "logo": "https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png"
      },
      {
        "id": "4",
        "name": "10GB - Weekly",
        "price": "Rp 50.000",
        "type": "Mingguan",
        "description": "Great for heavy weekly usage",
        "logo": "https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png"
      },
      {
        "id": "5",
        "name": "20GB - Monthly",
        "price": "Rp 100.000",
        "type": "Bulanan",
        "description": "Perfect for light streaming and work",
        "logo": "https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png"
      },
      {
        "id": "6",
        "name": "50GB - Monthly",
        "price": "Rp 250.000",
        "type": "Bulanan",
        "description": "Ideal for all heavy internet users",
        "logo": "https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png"
      }
    ],
    "Indosat": [
      {
        "id": "7",
        "name": "1GB - Daily",
        "price": "Rp 8.000",
        "type": "Harian",
        "description": "Basic browsing and messaging",
        "logo": "https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp"
      },
      {
        "id": "8",
        "name": "3GB - Weekly",
        "price": "Rp 25.000",
        "type": "Mingguan",
        "description": "Moderate social media and light streaming",
        "logo": "https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp"
      },
      {
        "id": "9",
        "name": "7GB - Weekly",
        "price": "Rp 40.000",
        "type": "Mingguan",
        "description": "Great for streaming and moderate gaming",
        "logo": "https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp"
      },
      {
        "id": "10",
        "name": "15GB - Monthly",
        "price": "Rp 70.000",
        "type": "Bulanan",
        "description": "Perfect for casual internet use",
        "logo": "https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp"
      },
      {
        "id": "11",
        "name": "30GB - Monthly",
        "price": "Rp 110.000",
        "type": "Bulanan",
        "description": "Suitable for families or shared usage",
        "logo": "https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp"
      },
      {
        "id": "12",
        "name": "100GB - Monthly",
        "price": "Rp 300.000",
        "type": "Bulanan",
        "description": "Massive data plan for all needs",
        "logo": "https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp"
      }
    ]
  },
  "transactions": []
}
```

## 5. Start and watch JSON server

```bash
json-server --watch db.json --port3001
```

## 6. Set Up React App

```bash
Set Up React App
```

## 7. Run the React App

```bash
npm start
```

## 8. Build Your React App

```bash
npm run build

```
