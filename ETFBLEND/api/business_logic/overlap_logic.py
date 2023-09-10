from api.models import ETFInformation, ETFHolding
from decimal import Decimal, ROUND_DOWN
from collections import defaultdict
from django.db.models import Sum, F, Count

from api.business_logic.blend_logic import _get_duplicate_tickers_with_counts

def calculate_overlap(etf_data):
    # Create a dictionary for quick ETF weight lookup
    # Convert the weight from percentage to a float value between 0 and 1
    etf_weights_dict = {ticker: float(weight) / 100 for ticker, weight in etf_data}
    
    tickers = [ticker for ticker, weight in etf_data]
    ETF_list = ETFInformation.objects.filter(ticker__in=tickers)
    duplicate_tickers_with_counts = _get_duplicate_tickers_with_counts(ETF_list)

    # Extracting all the holdings with weights for these common tickers
    common_holdings = ETFHolding.objects \
        .filter(etf__in=ETF_list, ticker__in=[ticker for ticker, _ in duplicate_tickers_with_counts]) \
        .values('ticker', 'etf__ticker', 'weight')

    # Store the result in a dictionary
    overlap_data = defaultdict(lambda: {"total_weight": 0, "etf_weights": {}})

    for holding in common_holdings:
        # Multiply by the weight from etf_weights_dict, which is already between 0 and 1
        adjusted_weight = (Decimal(holding['weight']) * Decimal(etf_weights_dict[holding['etf__ticker']])).quantize(Decimal('0.000'), rounding=ROUND_DOWN)
        overlap_data[holding['ticker']]["total_weight"] = (overlap_data[holding['ticker']]["total_weight"] + adjusted_weight).quantize(Decimal('0.000'), rounding=ROUND_DOWN)
        overlap_data[holding['ticker']]["etf_weights"][holding['etf__ticker']] = adjusted_weight

    # sort the dictionary by total weight
    overlap_data = dict(sorted(overlap_data.items(), key=lambda item: item[1]["total_weight"], reverse=True))

    # At the end of the calculate_overlap function
    return [{"ticker": key, **value} for key, value in overlap_data.items()]
