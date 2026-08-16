# ✈️ FlightFare — Flight Price Predictor

An AI-powered flight fare prediction web application designed to help travelers understand flight price trends and make more informed booking decisions.

The application provides a clean flight-search workflow, price prediction metrics, confidence indicators, and a visual price-trend chart for the selected travel date.

> **Project Status:** Portfolio / Demo Project

---

## 📌 Overview

**FlightFare** is a web application that allows users to enter their flight details and view estimated price trends before booking.

Users can provide:

* Source city or airport
* Destination city or airport
* Travel date
* Optional airline

After submitting the search, the application displays a prediction dashboard containing:

* Current average price
* Predicted price on the travel date
* Percentage price change
* Prediction confidence
* Daily price predictions
* Price trend visualization

The goal of the project is to present flight-price information through a simple, modern, and user-friendly interface.

---

## ✨ Features

### 🔎 Flight Search

Users can enter their:

* From city / airport
* To city / airport
* Travel date
* Airline preference

The search form provides a simple workflow for requesting a flight-price prediction.

### 💰 Current Average Price

The prediction dashboard displays the calculated current average flight price based on the available price data.

### 📈 Future Price Prediction

The application provides estimated daily prices leading up to the selected travel date.

This allows users to see how the estimated fare may change over time.

### 📊 Price Trend Visualization

A line chart visualizes the price trend between the current period and the selected travel date.

This makes it easier to identify potential upward or downward price movement.

### 🎯 Confidence Score

Each prediction includes a confidence score that indicates the estimated confidence of the displayed forecast.

### 🌙 Dark Theme

The application uses a modern dark interface with theme support.

### 📱 Responsive Design

The frontend is designed using responsive styling so that the main application interface can adapt to different screen sizes.

---

## 🔄 How It Works

```text
                User
                  │
                  ▼
        Flight Search Form
                  │
                  ▼
        Prediction Request
                  │
                  ▼
        Backend / Prediction Layer
                  │
                  ▼
       Historical + Forecast Data
                  │
                  ▼
       Prediction Results Dashboard
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
 Current Price  Predicted  Confidence
                Price       Score
                  │
                  ▼
          Price Trend Chart
```

---

## 🧠 Prediction Approach

The project contains a backend prediction interface along with a frontend demonstration fallback.

When populated prediction data is available from the backend, the frontend uses that prediction result.

When the backend does not return populated prediction values, the frontend generates demonstration data for the user interface.

The demonstration layer performs the following steps:

1. Generates a simulated historical price series.
2. Calculates an average current price.
3. Generates daily predicted prices.
4. Applies a simulated price trend.
5. Adds price variation.
6. Calculates a confidence value.
7. Displays the results in the prediction dashboard.
8. Visualizes the price trend using a line chart.

> **Note:** The current implementation should be considered a portfolio/demo prediction system rather than a production-grade airfare forecasting model.

For a production system, the prediction layer would require a validated historical airfare dataset, feature engineering, model training, evaluation, and reliable external flight-price data.

---

## 🏗️ Project Structure

```text
flight-fare-prediction-website/
│
├── backend/
│   ├── main.mo
│   └── migration.mo
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Features.tsx
│   │   │   ├── FlightSearchForm.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── PredictionResults.tsx
│   │   │   └── PriceChart.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useQueries.ts
│   │   │
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── index.html
│   └── tailwind.config.js
│
├── build-template/
│   ├── src/
│   │   ├── backend/
│   │   └── frontend/
│   │
│   ├── scripts/
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── pnpm-workspace.yaml
│   └── tsconfig.json
│
├── spec.md
│
├── screenshots/
│   ├── home.png
│   ├── flight-search.png
│   ├── features.png
│   └── prediction-results.png
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* TanStack React Query
* Recharts
* Lucide React
* Next Themes

### Backend

* Motoko
* Internet Computer (ICP)
* Candid
* Internet Computer canister architecture

### Development Tools

* Node.js
* pnpm
* Vite
* ESLint
* Prettier
* Git
* GitHub
* VS Code

---

## 📊 Main UI Components

| Component           | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `Header`            | Application navigation and new-search action |
| `Hero`              | Landing-page introduction                    |
| `FlightSearchForm`  | Collects flight-search parameters            |
| `Features`          | Displays the application's main features     |
| `PredictionResults` | Displays prediction metrics and results      |
| `PriceChart`        | Visualizes price trends                      |
| `Footer`            | Displays project attribution                 |

---

## ⚙️ Local Development

### Prerequisites

Make sure the following tools are installed:

* Node.js
* pnpm
* Git
* VS Code

For the Internet Computer backend workflow, the required ICP / DFINITY development tools are also needed.

---

### 1. Clone the Repository

```bash
git clone https://github.com/Vivek-41-Thakare/flight-fare-prediction-website.git
```

Move into the project directory:

```bash
cd flight-fare-prediction-website
```

---

### 2. Enter the Build Template

The Vite frontend workspace is located inside:

```text
build-template/
```

Run:

```bash
cd build-template
```

---

### 3. Install Dependencies

```bash
pnpm install
```

---

### 4. Start the Frontend

```bash
pnpm --filter @caffeine/template-frontend start
```

The development server runs on port `3000`.

Open the application in your browser:

```text
http://127.0.0.1:3000/
```

---

## 🧪 Development Commands

Common commands used during development include:

```bash
pnpm start
```

```bash
pnpm build:skip-bindings
```

```bash
pnpm typescript-check
```

```bash
pnpm format
```

```bash
pnpm lint
```

```bash
pnpm lint:fix
```

---

## 🔌 Backend Architecture

The project includes a Motoko backend designed around the Internet Computer canister architecture.

The backend defines data structures for concepts such as:

* Flight searches
* Price records
* Daily predictions
* Prediction results
* Airports
* Airlines

The application is structured around a prediction result containing information such as:

```text
currentPrice
dailyPredictions
confidence
historicalTrend
```

The frontend communicates with the backend through the project's generated actor/query layer.

---

## 📈 Prediction Dashboard

After a successful search, the user is presented with a dedicated prediction dashboard.

The dashboard contains:

### Current Average Price

Shows the estimated current average fare.

### Predicted Price on Travel Date

Shows the estimated fare for the selected travel date.

### Price Change

Displays the estimated percentage change between the current average price and the predicted travel-date price.

### Confidence

Displays an estimated confidence percentage for the prediction.

### Price Trend Analysis

A line chart shows the estimated fare movement leading up to the travel date.

---

## 🚀 Future Improvements

The project can be extended into a more advanced airfare forecasting platform by implementing:

* Real flight-price API integration
* Large historical airfare datasets
* Machine-learning forecasting models
* Feature engineering
* Route-specific models
* Airline-specific analysis
* Seasonality analysis
* Day-of-week effects
* Holiday and festival effects
* Demand-based features
* Model evaluation using MAE, RMSE, and MAPE
* Persistent price history
* Price-drop alerts
* Email notifications
* User accounts
* Saved flight routes
* Airport autocomplete
* Currency conversion
* Booking-platform comparison
* Production deployment

---

## 🎯 Learning Objectives

This project demonstrates practical experience with:

* React application development
* TypeScript
* Component-based UI architecture
* State management
* API/backend integration
* React Query
* Data visualization
* Responsive UI development
* Tailwind CSS
* Internet Computer / Motoko architecture
* Git and GitHub
* Frontend-backend integration

---

## 👨‍💻 Author

**Vivek Thakare**

B.Tech — Artificial Intelligence & Machine Learning

GitHub:
https://github.com/Vivek-41-Thakare

---

## 🙌 Acknowledgement

This project was developed as a personal AI/ML portfolio project with a focus on combining predictive analytics concepts with modern full-stack web development.

---

### ⭐ If you find this project useful, consider giving the repository a star!
