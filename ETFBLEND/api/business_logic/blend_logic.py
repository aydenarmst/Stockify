from api.models import ETFInformation, ETFHolding
from decimal import Decimal
from collections import defaultdict
from django.db.models import Sum, F, Count


def get_overlapping_holdings(ETFInformationTickers, number_of_holdings):
    ETF_list = ETFInformation.objects.filter(ticker__in=ETFInformationTickers)

    expense_ratio = calculate_blended_expense_ratio(ETF_list)

    duplicate_tickers_with_counts = _get_duplicate_tickers_with_counts(
        ETF_list)

    # Extract just the tickers and counts from the duplicate_tickers_with_counts for the filter.
    duplicate_tickers = [item[0] for item in duplicate_tickers_with_counts]
    ticker_to_etf_count = {item[0]: item[1]
                           for item in duplicate_tickers_with_counts}

    original_holdings = ETFHolding.objects.filter(
        ticker__in=duplicate_tickers, etf__in=ETF_list)

    ticker_prices = {
        holding.ticker: holding.price for holding in original_holdings}
    overlapping_holdings = _get_annotated_holdings(original_holdings)

    total_weight = sum(Decimal(holding['total_weight'])
                       for holding in overlapping_holdings)
    normalized_holdings = _normalize_holdings(
        overlapping_holdings, total_weight, ticker_prices, ticker_to_etf_count, number_of_holdings)

    sector_exposure = get_sector_exposure(
        normalized_holdings[:number_of_holdings])

    return normalized_holdings, sector_exposure, expense_ratio


def get_sector_exposure(normalized_holdings):
    # Calculate sector exposure based on the normalized holdings
    sector_exposure = defaultdict(Decimal)
    for holding in normalized_holdings:
        sector = holding.get('sector', 'Unknown')
        weight = holding.get('weight', Decimal('0'))
        sector_exposure[sector] += weight

    # Normalize sector exposure based on the total weight in the holdings
    total_weight = sum(sector_exposure.values())
    for sector, weight in sector_exposure.items():
        sector_exposure[sector] = round((weight / total_weight) * 100, 2)

    return dict(sector_exposure)


def _get_duplicate_tickers_with_counts(ETF_list):
    return ETFHolding.objects \
        .filter(etf__in=ETF_list) \
        .values('ticker') \
        .annotate(etf_count=Count('etf', distinct=True)) \
        .filter(etf_count__gte=2) \
        .values_list('ticker', 'etf_count')


def _get_annotated_holdings(original_holdings):
    return original_holdings \
        .values('ticker', 'name', 'sector', 'asset_class', 'location') \
        .annotate(total_weight=Sum(F('weight'))) \
        .order_by('-total_weight')


def _normalize_holdings(overlapping_holdings, total_weight, ticker_prices, ticker_to_etf_count, number_of_holdings):
    # Compute the sum of the weights for the top 20 holdings
    top_holdings_weight_sum = sum(Decimal(
        holding['total_weight']) for holding in overlapping_holdings[:number_of_holdings])

    normalized_holdings = []
    # Limit to the top 20 holdings
    for holding in overlapping_holdings[:number_of_holdings]:
        # Normalize each weight based on the sum of the top 20
        normalized_weight = round(
            (Decimal(holding['total_weight']) / top_holdings_weight_sum) * 100, 3)

        price = ticker_prices.get(holding['ticker'], None)
        if price is not None:
            price = str(round(Decimal(price), 2))

        # Fetch etf_count for this holding's ticker from ticker_to_etf_count
        etf_count = ticker_to_etf_count.get(holding['ticker'], 0)

        normalized_holdings.append({
            'ticker': holding['ticker'],
            'name': holding['name'],
            'sector': holding['sector'],
            'asset_class': holding['asset_class'],
            'location': holding['location'],
            'weight': normalized_weight,
            'price': price,
            'etf_count': etf_count,  # Added this line to append etf_count to the result
        })

    return normalized_holdings


def calculate_blended_expense_ratio(etf_list):
    n = len(etf_list)
    total_expense_ratio = sum(etf.expense_ratio for etf in etf_list)
    return round(total_expense_ratio / n, 3)
