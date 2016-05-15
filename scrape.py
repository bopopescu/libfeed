from bs4 import BeautifulSoup
from urllib2 import urlopen
from fuzzywuzzy import fuzz
import datetime
from datetime import datetime
import csv
import json

OUTPUT_FILE = "scrape.csv"

def make_soup(url):
    try:
        html = urlopen(url).read()
        return BeautifulSoup(html, "lxml")
    except Exception:
        return None

def main():

    fw = open(OUTPUT_FILE, "w")
    writer = csv.writer(fw)

    num = 0
    for i in range(1, 100):
        search = "http://aisd.sdp.sirsi.net/client/en_US/richards/search/results?rw={0}&lm=RICHARDSLIB".format(num)
        soup = make_soup(search)
        results = soup.find_all(class_="results_cell")
        for result in results:
            isbn = result.find(class_="isbnValue")
            try:
                isbn = isbn['value']
            except:
                isbn = ''
            try:
                title = result.find(class_="displayDetailLink").text
            except:
                title = ''
            try:
                author = result.find(class_="searchlink").text
                author_parts = author.split(',')
                try:
                    author = author_parts[1].replace('.','') + " " + author_parts[0]
                except:
                    author = author
            except:
                author = ''
            isbn = isbn.encode('ascii','ignore')
            author = author.encode('ascii','ignore')
            title = title.encode('ascii','ignore')
            row = [isbn, title, author]
            try:
                writer.writerow(row)
            except:
                print 'fail to write ', num
                pass
        num += 12
        print num


main()
