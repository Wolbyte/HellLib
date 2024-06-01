import os
import unicodedata

import pandas as pd
import requests


def normalize_text(text):
    try:
        normalized_text = unicodedata.normalize("NFC", str(text))
        text = ""

        for c in normalized_text:
            if unicodedata.category(c) == "Mn":
                continue

            # Nim faseleh
            if c == "\u200c":
                c = " "

            text += c

    except NameError:
        pass

    return text


def register_book(book):
    book.title = normalize_text(book.title)
    book.publisher = normalize_text(book.publisher)

    requests.post(
        "http://localhost:8080/api/books/",
        data={
            "isbn": book.isbn,
            "title": book.title,
            "author": book.author,
            "publisher": book.publisher,
            "copies": book.copies,
            "borrowable": True,
        },
    )

    return book


def process_excel_file(path: str):
    df = pd.read_excel(path, header=1, usecols="B:F")
    df["display_title"] = df["title"]
    df = df.dropna()
    df = df.apply(register_book, axis=1)
    print(df)


def main():
    DATA_DIR = input("Path to the folder which contains the excel files: ")

    print("\nStarting...")

    for file in os.listdir(DATA_DIR):
        if file.endswith(".xlsx"):
            process_excel_file(f"{DATA_DIR}/{file}")


if __name__ == "__main__":
    main()
