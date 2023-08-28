import pandas as pd
import pandas_market_calendars as mcal
from datetime import datetime
import json
import os
import requests
from .models import ETFInformation, ETFHolding
from .utils import read_etf_data_from_csv
import time

def get_trading_day_month_ends(exchange_code, start_date, end_date, output_format):
    nyse = mcal.get_calendar(exchange_code)
    trading_days_df = pd.DataFrame({'trading_date':
                                        nyse.valid_days(start_date=start_date,
                                                        end_date=end_date)
                                    })
    trading_days_df['yymm'] = trading_days_df['trading_date'].dt.strftime('%y%m')
    trading_day_month_ends = trading_days_df.groupby('yymm')['trading_date'].max(). \
        dt.strftime(output_format).to_list()

    return trading_day_month_ends

def map_raw_item(unmapped_item):
    return {
        'ticker': unmapped_item[0],
        'name': unmapped_item[1],
        'sector': unmapped_item[2],
        'asset_class': unmapped_item[3],
        'market_value': unmapped_item[4]['raw'],
        'weight': unmapped_item[5]['raw'],
        'notional_value': unmapped_item[6]['raw'],
        'shares': unmapped_item[7]['raw'],
        'cusip': unmapped_item[8],
        'isin': unmapped_item[9],
        'sedol': unmapped_item[10],
        'price': unmapped_item[11]['raw'],
        'location': unmapped_item[12],
        'exchange': unmapped_item[13],
        'currency': unmapped_item[14],
        'fx_rate': unmapped_item[15],
        'maturity': unmapped_item[16]
    }

def format_response(response_json):
    input_items = response_json['aaData']
    output_items = []
    for input_item in input_items:
        mapped_item = map_raw_item(input_item)
        output_items.append(mapped_item)
    return (output_items)

# api/web_scraper.py
def download_and_save_etf_holdings():
    etf_data = read_etf_data_from_csv('api/ishares-etf-index.csv') 
    start_date = '2023-1-01'
    end_date = datetime.now().strftime('%Y-%m-%d')

    for etf in etf_data:
        etf_information, _ = ETFInformation.objects.get_or_create(
            ticker=etf['ticker'],
            name=etf['name'],
            url=etf['product_url']
        )

        yyyymmdd_queue = get_trading_day_month_ends('NYSE', start_date, end_date, '%Y%m%d')
        for yyyymmdd in yyyymmdd_queue:
            request_url = f'https://www.ishares.com{etf_information.url}/1467271812596.ajax?' \
                      f'fileType=json&tab=all&asOfDate={yyyymmdd}'
            print(f'requesting: {request_url}')

            response = requests.get(request_url)

            if response is None:
                print(f'{"!" * 10}\nREQUEST FAILED({yyyymmdd}):\n'
                    f'ERROR: Request to SB Timed-Out\n'
                    f'{"!" * 10}')
            else:
                print(f'response.status_code: {response.status_code}')

                if response.status_code == 200:
                    response_json = json.loads(response.content)
                    holdings_json = format_response(response_json)

                    for holding_data in holdings_json:
                        holding_data['as_of_date'] = f'{yyyymmdd[:4]}-{yyyymmdd[4:6]}-{yyyymmdd[6:]}'  # %Y-%m-%d

                        # Create and save the ETFHolding instance
                        etf_holding = ETFHolding.objects.create(
                            etf=etf_information,
                            ticker=holding_data['ticker'],
                            name=holding_data['name'],
                            sector=holding_data['sector'],
                            asset_class=holding_data['asset_class'],
                            market_value=holding_data['market_value'],
                            weight=holding_data['weight'],
                            notional_value=holding_data['notional_value'],
                            shares=holding_data['shares'],
                            cusip=holding_data['cusip'],
                            isin=holding_data['isin'],
                            sedol=holding_data['sedol'],
                            location=holding_data['location'],
                            exchange=holding_data['exchange'],
                            currency=holding_data['currency'],
                            fx_rate=holding_data['fx_rate'],
                            maturity=holding_data['maturity'],
                            price=holding_data['price']
                        )

                        print(f'Saved ETFHolding instance: {etf_holding}')
                else:
                    print(f'{"!" * 10}\nREQUEST FAILED({yyyymmdd}):\n'
                        f'status code = {response.status_code}\n'
                        f'response_message = {response.text}\n'
                        f'{"!" * 10}')

                time.sleep(30)  # Sleep for 1 second to avoid getting blocked by the server

