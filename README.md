# Financial Portfolio Dashboard

A modern, responsive financial portfolio dashboard web application designed for retail investors and finance professionals. This application provides a comprehensive overview of your financial portfolio with real-time data visualization, holdings management, and performance tracking.

## Features

### Dashboard Overview

- **Net Worth Tracking**: Interactive line graph showing portfolio value over time with customizable date ranges (1D, 1W, 1M, 6M, 1Y, All)
- **Portfolio Summary**: Quick-view cards displaying total value, daily percentage changes, and gain/loss metrics
- **Asset Allocation**: Visual pie chart breakdown of your investments across different asset classes (stocks, crypto, cash)

### Holdings Management

- **Detailed Holdings Table**: Complete visibility of your assets with key metrics
  - Asset name and ticker symbol
  - Quantity, average purchase price, and current price
  - Current value and profit/loss in both amount and percentage
  - Sector classification
- **Advanced Filtering**: Sort and filter your holdings by various parameters
- **Search Functionality**: Quickly find specific assets in your portfolio

### Performance Analysis

- **Interactive Charts**: Line and candlestick charts for detailed technical analysis
- **Multiple Timeframes**: Switch between different time intervals
- **Portfolio vs. Individual View**: Compare overall portfolio performance or analyze individual assets
- **Technical Indicators**: Access to RSI, MACD, Moving Averages and other indicators

### Transaction History

- **Complete Transaction Log**: Track all buy, sell, and dividend transactions
- **Filtering Options**: Sort by date, type, or asset
- **Transaction Management**: Add new transactions with the quick-add transaction button

### Alerts and Notifications

- **Price Alerts**: Set and manage alerts for target prices
- **Event Notifications**: Stay informed about earnings announcements, dividends, and other important events
- **Status Tracking**: View active, triggered, and expired alerts

### User Account Management

- **Profile Management**: Update personal information and preferences
- **Account Settings**: Manage security settings, password changes, and two-factor authentication
- **Billing Information**: View subscription details and billing history
- **Notification Preferences**: Customize which alerts and notifications you receive
- **Help & Support**: Access documentation and support resources

## Technical Implementation

### Responsive Design

- **Adaptive Layout**: Optimized for desktop and tablet views
- **Dark/Light Mode**: Complete theme support with system preference detection

### Modern UI Components

- **Clean Dashboard Layout**: Intuitive grid-based design with proper spacing
- **Interactive Data Visualization**: Dynamic charts and graphs powered by Recharts
- **Accessible UI Elements**: Fully accessible components with keyboard navigation support

### Technology Stack

- **Frontend**: React with TypeScript for type safety
- **Styling**: Tailwind CSS for modern, responsive design
- **UI Components**: Shadcn UI library for consistent design language
- **State Management**: React Query for efficient data fetching and caching
- **Routing**: React Router for seamless navigation
- **Chart Visualization**: Recharts for performance and portfolio charts

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn package manager

### Installation

1. Clone the repository:

```
git clone https://github.com/your-username/financial-portfolio-dashboard.git
```

2. Navigate to the project directory:

```
cd financial-portfolio-dashboard
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm run dev
```

5. Open your browser and visit http://localhost:5173

## Customization

### Theming

The application uses a soft, muted color palette with primary emerald green (#4ADE80) for success highlights and cool blue (#60A5FA) for actions and navigation. You can customize the color scheme in the Tailwind configuration file.

### Data Sources

Currently, the application uses mock data for demonstration purposes. To connect to real financial data APIs, you would need to update the data fetching logic in the respective components.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern financial applications and trading platforms
- Icons provided by Lucide React
- Chart components built with Recharts
- UI components from Shadcn UI library

---

Built with ❤️ for investors who value data-driven decision making.
