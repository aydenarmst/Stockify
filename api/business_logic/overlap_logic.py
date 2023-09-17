from api.models import ETFInformation, ETFHolding
from decimal import Decimal, ROUND_DOWN
from collections import defaultdict
from django.db.models import Sum, F, Count
from api.business_logic.blend_logic import _get_duplicate_tickers_with_counts, get_sector_exposure


def parse_etf_data(etf_data):
    etf_weights = {ticker: float(weight) / 100 for ticker, weight in etf_data}
    tickers = list(etf_weights.keys())
    return etf_weights, tickers


def get_common_holdings(tickers, exclude_holdings=[]):
    ETF_list = ETFInformation.objects.filter(ticker__in=tickers)
    duplicate_tickers = [ticker for ticker,
                         _ in _get_duplicate_tickers_with_counts(ETF_list)]

    return ETFHolding.objects.filter(
        etf__in=ETF_list,
        ticker__in=duplicate_tickers
    ).exclude(
        sector__in=exclude_holdings  # Exclude stocks from the specified sectors
    ).values('ticker', 'etf__ticker', 'weight', 'sector')


def calculate_holding_weights(common_holdings, etf_weights_dict):
    overlap_data = defaultdict(lambda: {"total_weight": Decimal(
        0), "etf_weights": {}, "overlap_count": 0, "sector": ""})

    for holding in common_holdings:
        adjusted_weight = (Decimal(holding['weight']) * Decimal(
            etf_weights_dict[holding['etf__ticker']])).quantize(Decimal('0.000'), rounding=ROUND_DOWN)

        ticker_info = overlap_data[holding['ticker']]
        ticker_info["total_weight"] += adjusted_weight
        ticker_info["etf_weights"][holding['etf__ticker']] = Decimal(
            holding['weight']).quantize(Decimal('0.000'), rounding=ROUND_DOWN)
        ticker_info["sector"] = holding['sector']

    return overlap_data


def sort_overlap_data(overlap_data):
    return dict(sorted(overlap_data.items(), key=lambda item: (item[1]["overlap_count"], item[1]["total_weight"]), reverse=True))


def format_output_data(overlap_data, tickers):
    for ticker_data in overlap_data.values():
        for etf_ticker in tickers:
            ticker_data["etf_weights"].setdefault(etf_ticker, Decimal('0.000'))
            if ticker_data["etf_weights"][etf_ticker] > 0:
                ticker_data["overlap_count"] += 1

    return [{"ticker": ticker, **data} for ticker, data in overlap_data.items() if data["total_weight"] > Decimal('0.000')]


def compute_overlap_count(tickers):
    holdings_per_etf = [set(ETFHolding.objects.filter(
        etf__ticker=ticker).values_list('ticker', flat=True)) for ticker in tickers]
    return len(set.intersection(*holdings_per_etf))


def calculate_overlap(etf_data, exclude_holdings=[]):
    etf_weights, tickers = parse_etf_data(etf_data)
    common_holdings = get_common_holdings(tickers, exclude_holdings)
    holding_weights = calculate_holding_weights(common_holdings, etf_weights)
    sorted_weights = sort_overlap_data(holding_weights)
    output_data = format_output_data(sorted_weights, tickers)

    normalized_holdings = [{'ticker': data['ticker'], 'weight': data['total_weight'],
                            'sector': data['sector']} for data in output_data]

    return output_data, compute_overlap_count(tickers), get_sector_exposure(normalized_holdings)
