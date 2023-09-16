import requests
from bs4 import BeautifulSoup
import re
import csv
import shutil

BASE_URL = 'https://www.ishares.com'

def get_expense_ratio(product_url):
    """Fetch and return the expense ratio from a given iShares product URL."""

    response = requests.get(BASE_URL + product_url)

    if response.status_code != 200:
        print("Failed to retrieve the webpage. Status code:", response.status_code)
        return None

    soup = BeautifulSoup(response.text, 'html.parser')
    expense_ratio_span = soup.select_one('span.header-nav-data:-soup-contains("Expense Ratio:")')

    if not expense_ratio_span:
        print(f"Expense ratio span not found for {BASE_URL + product_url}.")
        return None

    decimal_match = re.search(r'\d+\.\d+%', expense_ratio_span.text)
    if not decimal_match:
        print("Decimal value not found within the span text.")
        return None

    return decimal_match.group().strip('%')


def process_and_filter_csv(input_filename, output_filename):
    """Process an input CSV of iShares products and write a new one with expense ratios."""

    with open(input_filename, 'r') as input_file, open(output_filename, 'w', newline='') as output_file:
        csv_reader = csv.reader(input_file)
        csv_writer = csv.writer(output_file)

        header = next(csv_reader)
        header.append("expense_ratio")
        csv_writer.writerow(header)

        for row in csv_reader:
            ticker, name, start_date, product_url = row
            expense = get_expense_ratio(product_url)
            
            if expense is None:
                continue
            
            row.append(expense)
            csv_writer.writerow(row)

    shutil.move(output_filename, input_filename)


if __name__ == '__main__':
    INPUT_FILENAME = 'ishares-etf-index.csv'
    OUTPUT_FILENAME = 'output2.csv'

    process_and_filter_csv(INPUT_FILENAME, OUTPUT_FILENAME)
    print("Filtered CSV created successfully.")
