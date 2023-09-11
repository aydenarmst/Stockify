from api.models import ETFInformation, ETFHolding
from decimal import Decimal, ROUND_DOWN
from collections import defaultdict
from django.db.models import Sum, F, Count

from api.business_logic.blend_logic import _get_duplicate_tickers_with_counts


def parse_etf_data(etf_data):
    etf_weights_dict = {ticker: float(
        weight) / 100 for ticker, weight in etf_data}
    tickers = [ticker for ticker, weight in etf_data]
    return etf_weights_dict, tickers


def get_common_holdings(tickers):
    ETF_list = ETFInformation.objects.filter(ticker__in=tickers)
    duplicate_tickers_with_counts = _get_duplicate_tickers_with_counts(
        ETF_list)

    return ETFHolding.objects \
        .filter(etf__in=ETF_list, ticker__in=[ticker for ticker, _ in duplicate_tickers_with_counts]) \
        .values('ticker', 'etf__ticker', 'weight')


def calculate_holding_weights(common_holdings, etf_weights_dict):
    overlap_data = defaultdict(
        lambda: {"total_weight": 0, "etf_weights": {}, "overlap_count": 0})

    for holding in common_holdings:
        adjusted_weight = (Decimal(holding['weight']) * Decimal(
            etf_weights_dict[holding['etf__ticker']])).quantize(Decimal('0.000'), rounding=ROUND_DOWN)
        overlap_data[holding['ticker']]["total_weight"] = (
            overlap_data[holding['ticker']]["total_weight"] + adjusted_weight).quantize(Decimal('0.000'), rounding=ROUND_DOWN)
        overlap_data[holding['ticker']
                     ]["etf_weights"][holding['etf__ticker']] = adjusted_weight

    return overlap_data


def sort_overlap_data(overlap_data):
    return dict(sorted(overlap_data.items(), key=lambda item: item[1]["overlap_count"], reverse=True))


def format_output_data(overlap_data, tickers):
    for ticker_data in overlap_data.values():
        for etf_ticker in tickers:
            if etf_ticker not in ticker_data["etf_weights"]:
                ticker_data["etf_weights"][etf_ticker] = Decimal('0.000')
            if ticker_data["etf_weights"][etf_ticker] > 0:
                ticker_data["overlap_count"] += 1

    return [{"ticker": key, **value} for key, value in overlap_data.items()]

def compute_overlap_count(tickers):
    holdings_per_etf = [set(ETFHolding.objects.filter(etf__ticker=ticker).values_list('ticker', flat=True)) for ticker in tickers]

    # Find the intersection across all the sets (stocks that are in every ETF)
    overlapping_holdings = set.intersection(*holdings_per_etf)

    return len(overlapping_holdings)


def calculate_overlap(etf_data):
    etf_weights_dict, tickers = parse_etf_data(etf_data)
    common_holdings = get_common_holdings(tickers)
    overlap_data = calculate_holding_weights(common_holdings, etf_weights_dict)
    overlap_data = sort_overlap_data(overlap_data)
    output_data = format_output_data(overlap_data, tickers)

    overlap_count = compute_overlap_count(tickers)
    
    return output_data, overlap_count

