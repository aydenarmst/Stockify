import csv

def parse_csv_data(file_path):
    data = []
    with open(file_path, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        next(csv_reader) # Skip the first row
        for row in csv_reader:
            ticker = row[0]
            name = row[1]
            formatted_data = f"{name}({ticker})"
            data.append(formatted_data)
    return data