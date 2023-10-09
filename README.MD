# Stockify: Comprehensive ETF Analysis Toolkit

'Stockify' is built upon the robustness of Django and the flexibility of React, offering an intricate tool dedicated to unraveling the overlaps in ETF holdings. Its design is tailored to:

1. Procure all ETF data, currently exclusive to iShares, and sustain an efficient database of these acquisitions.
2. Aggregate, standardize, and revamp the list of holdings, representing the proportionate share of each constituent stock.
3. Equip users with the capability to downscale or exclude specific sectors from ETF holdings.

## Why Stockify?
The curious absence of this utility from brokerage platforms, combined with the deliberate barriers set up against scraping ETF holdings, sparked the creation of 'Stockify'. This platform aims to be the go-to solution for a broad spectrum of users—DIY investors, novices, retirement account holders, and financial advisors. It reshapes the way Exchange-Traded Funds are viewed and allocated, catering to specific needs.

--- 
### Key Features
- **ETF Holdings Analysis:** Deep dive into the holdings of various ETFs and identify which securities they have in common.
- **Blend Normalization:** Adjust the weightings of the holdings in a custom blend to see how the portfolio makeup changes.
- **Data Updates:** The dataset is sourced from iShares, ensuring you're working with high-quality and up-to-date information.
---
### Quick Start

#### Prerequisites
Ensure you have `npm` and `Django` installed to run the frontend and backend respectively.

### Requirements.txt
``` pip install -r requirements.txt ```


#### Starting the React Frontend
``` cd frontend ```
``` npm install ``` # Only for the first time or when dependencies change
``` npm run dev ```


#### Starting the Django Backend
``` python manage.py runserver ```

### Data Management
#### Load New Data
To update or add new ETF holdings data from iShares, simply run the management command:
``` python manage.py download_etf_holdings ```
