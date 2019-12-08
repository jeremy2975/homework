import pandas as pd
import numpy as np
from bs4 import BeautifulSoup as bs
import requests
import os
from splinter import Browser
from urllib.request import urlopen as uReq
import time
import json
def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)

def scrape():
	browser = init_browser()
	mars_data = pd.DataFrame(columns=['News_Title','News_P','Featured_Image','mars_facts'])

	url = "https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"

	response = requests.get(url)
	soup = bs(response.text, 'html.parser')
	soup.find('div', {"id" : "main_container"}).find('div', {"id" : "page"}).find("div", class_="grid_list_page module content_page").find("div", class_="grid_layout").find("article").find("div", {"data-react-class":"GridListPage"})#.find("div", class_= "react_grid_list grid_list_container")
	news_title = soup.find('div',{"class":"content_title"}).text.strip()

	news_p = soup.find('div', {"class": "rollover_description_inner"}).text.strip()

	pic_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
	browser.visit(pic_url)
	browser.click_link_by_partial_text('FULL IMAGE')
	time.sleep(5)
	html = browser.html
	test_soup = bs(html, 'html.parser')
	something = test_soup.find('img', class_="fancybox-image")
	featured_image = "https://www.jpl.nasa.gov/"+ something.get("src")

	weather_url = "https://twitter.com/marswxreport?lang=en"
	browser.visit(weather_url)

	pic_response = requests.get(pic_url)
	pic_soup = bs(pic_response.text, 'html.parser')

	weather_response = requests.get(weather_url)
	weather_soup = bs(weather_response.text, 'html.parser')
	current_weather = weather_soup.find('p', {"class": "TweetTextSize TweetTextSize--normal js-tweet-text tweet-text"}).text.strip()

	mars_fact_url = "https://space-facts.com/mars/"
	mars_facts = pd.read_html(mars_fact_url)
	mars_facts =mars_facts[0]#.to_json()

	mars_data_dict = {}
	mars_data_dict["News_Title"] = news_title
	mars_data_dict["News_P"] = news_p
	mars_data_dict["Featured_Image"] = featured_image
	mars_data_dict["Weather"] = current_weather
	


	mars_data_dict["mars_facts"] = mars_facts.to_html()
	# mars_data.loc[0]= [news_title,news_p,featured_image,mars_facts[0]]
	browser.quit()

	return mars_data_dict




