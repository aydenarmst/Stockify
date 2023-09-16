import csv
import requests
from bs4 import BeautifulSoup
import re
import string
import random

def parse_csv_data(file_path):
    data = []
    with open(file_path, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        next(csv_reader)  # Skip the first row
        for row in csv_reader:
            ticker = row[0]
            name = row[1]
            formatted_data = f"{name}({ticker})"
            data.append(formatted_data)
    return data

# api/web_scraper.py


def read_etf_data_from_csv(csv_file_path):
    etf_data = []
    with open(csv_file_path, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            etf_data.append(row)
    return etf_data


def get_expense_ratio(url):
    # Send an HTTP GET request to the URL
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the HTML content of the page using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the span element containing the text "Expense Ratio:"
        expense_ratio_span = soup.select_one(
            'span.header-nav-data:-soup-contains("Expense Ratio:")')

        # Check if the span element was found
        if expense_ratio_span:
            # Extract the text inside the span element
            expense_ratio_text = expense_ratio_span.text

            # Use regular expressions to extract the decimal value
            decimal_match = re.search(r'\d+\.\d+%', expense_ratio_text)

            if decimal_match:
                decimal_value_with_percent = decimal_match.group()
                # Remove the "%" symbol
                decimal_value = decimal_value_with_percent.strip('%')
                print("Expense Ratio:", decimal_value)
            else:
                print("Decimal value not found within the span text.")
        else:
            print("Expense ratio span not found on the page.")
    else:
        print("Failed to retrieve the webpage. Status code:", response.status_code)

    return decimal_value
