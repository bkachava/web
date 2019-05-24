# Depemdencies
from splinter import Browser
from bs4 import BeautifulSoup
import time
import pandas as pd
import pymongo

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "chromedriver"}
    return Browser("chrome", **executable_path, headless=False)


def scrape_info():
    # Initialize browser
    browser = init_browser()


    # NASA Mars News
    # Define the URL to visit
    news_url = 'https://mars.nasa.gov/news/'        
    browser.visit(news_url)
    # Define HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html, 'html.parser')
    # Retrieve the first News Title
    news_title = soup.find_all('div', class_='content_title')[0].text
    # Retrieve the first news element Paragraph Text
    news_p = soup.find_all('div', class_='article_teaser_body')[0].text


    # JPL Mars Space Images - Featured Image
    # Define the base URL for the image
    base_url = 'https://www.jpl.nasa.gov'
    # Define the URL to visit
    image_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(image_url)
    # Define HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html, 'html.parser')
    # Retrieve the "large size image" of the current Featured Mars image first click the FULL IMAGE option
    browser.click_link_by_partial_text('FULL IMAGE')
    # Add a three second interval to wait for the page to fully download
    time.sleep(3)
    # Then click the more info option
    browser.click_link_by_partial_text('more info')
    # Parse again HTML with Beautiful Soup to retrieve the "large size image" URL
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    # Find the tag figure to get the href
    fig = soup.find("figure", class_="lede")
    featured_image_url = base_url + fig.a['href']


    # Mars Weather
    # Define the URL to visit
    image_url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(image_url)
    # Define HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html, 'html.parser')
    # Retrieve the current Featured Mars image
    mars_weather = soup.find('p', class_='TweetTextSize').text
    # Remove the text after pic.twitter.com
    pos = mars_weather.find('pic.twitter.com')
    if pos > 0:
        mars_weather = mars_weather[0:pos]

    # Mars Facts
    # Define the URL to visit
    facts_url = 'https://space-facts.com/mars/'
    # Make pandas to get the html
    tables = pd.read_html(facts_url)
    # Create a data frame with the info in the html
    facts_df = tables[0]
    # Change tha name of the columns
    facts_df.columns = ['Description', 'Value']
    # Set index to column Description
    facts_df.set_index('Description', inplace=True)
    # Convert the data frame to a html table
    html_table = facts_df.to_html(escape=False)
    # Clean added styles in Pandas for the table to customize them in Bootstrap
    html_table = html_table.replace('border="1"','').replace('style="text-align: right;"','')

    # Mars Hemispheres
    # Define the URL to visit
    hems_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    # Define the names and links of the hemispheres
    hems_link = ['Cerberus Hemisphere Enhanced', 
                'Schiaparelli Hemisphere Enhanced', 
                'Syrtis Major Hemisphere Enhanced',
                'Valles Marineris Hemisphere Enhanced']

    # Initialize the images list
    hemisphere_image_urls = []
    # Get the four images 
    for i in range(4):
            # Visit the initial url
            browser.visit(hems_url)
            # Retrieve the "large size image" of hemisphere 
            browser.click_link_by_partial_text(hems_link[i])
            # Define HTML object
            html = browser.html
            # Parse HTML with Beautiful Soup
            soup = BeautifulSoup(html, 'html.parser')
            # Get the href
            div = soup.find("div", class_="downloads")
            #  Define the dictionary
            hems_dict = {"title": hems_link[i], "img_url": div.ul.li.a['href']}
            #  Append the dictionary to the list
            hemisphere_image_urls.append(hems_dict)

    # Store data in a dictionary
    mars_data = {
                "news_title": news_title,
                "news_p": news_p,
                "space_image" : featured_image_url,
                "weather" : mars_weather ,
                "facts": html_table,
                "hemispheres": hemisphere_image_urls
        }

    # Close the browser after scraping
    browser.quit()
   
    # Return results
    return mars_data
