# Web Technologies Assignments

Applying the skills learned so far to some real-world situations.

 
## Blanttitude - Latitude Analysis Dashboard -> Web Visualizations

   __HTML, CSS, Bootstrap__ were used for building this dashboard, with a page for each plot and a means by which
    the user can navigate between them. These pages contained the visualizations created in the 
    [PyWeather - APIs assignment](https://github.com/bkachava/pandas/tree/master/PyWeather) and their 
    corresponding explanations. Also, includes a landing page, a page where we can see a comparison of all 
    of the plots, and another page to view the data used to build them.

   * See the [Dashboard](https://bkachava.github.io/web/dashboard/)
   * Go to the [repository](dashboard/) 
   


## Mission to Mars -> Web Scraping and Document Databases

   A web application that scrapes various websites for data related to the Mission to Mars and 
    displays the information in a single HTML page was built. 

   - Step 1 - Scraping. [Jupyter Notebook](/missiontomars/Notebook/mission_to_mars.ipynb) was used to do the initial
    scraping, __BeautifulSoup__ to help find and parse out the necessary data, __Pandas__ library to extract information, and 
    __Requests/Splinter__ to navigate the sites.
    
   - Step 2 - __MongoDB__ and __Flask__ Application. MongoDB with Flask templating and Bootstrap were used to create a HTML 
    page, that displays all of the information that was scraped in the previous step. First, the Jupyter notebook was
    converted into a [Python script](/missiontomars/Flask/scrape_mars.py) and then a route to import the script 
    was included in a [Flask Application](/missiontomars/Flask/app.py). Also, __Pymongo__ library for the database was used and
    each time the /scrape URL is visited, the existing document is overwritten and new data is obtained.
    
   * Go to the [repository](missiontomars/) 
   


## UFO sightings -> JavaScript and DOM Manipulation

   __HTML, CSS, Bootstrap, JavaScript and D3.js__ were used to explore the [UFO Sightings Data](/jsdom/static/js/data.js), 
    an array of JavaScript objects, and to present it in a HTML table that is dynamically created. Also, the user can 
    filter the dataset.
    
   - Level 1. When the [page](jsdom/index.html) loads the table is dynamically created and an input type 
   with a calendar is presented to apply a filter by date.
    
   - Level 2. Using multiple select dropdowns `city, state, country, and shape`, the user can set [multiple filters](jsdom/static/js/app.js) and search for UFO sightings that match its selection.

   * Go to the [repository](jsdom/) 
   


## Belly Button Biodiversity Dashboard -> Interactive Visualizations and Dashboard

   __HTML, CSS, Bootstrap, JavaScript, D3.js, Plotly.js, JSON, Flask with a SQLite database, and Heroku with a 
   Postgress database__, were used to build an interactive dashboard for exploring the Belly Button Biodiversity dataset.

   - Step 1. Use Plotly.js to build [interactive charts](plotly/bkabelly/static/js/app.js) for the dashboard. 
    Includes:
      * A Pie chart that uses data from the Flask application samples route (/samples/<sample>) to display 
      the top 10 samples.
      * A Bubble Chart that uses data from the Flask application samples route (/samples/<sample>) to display 
      each sample.
      * A section that displays the sample metadata from the Flask application route /metadata/<sample>.
      * Updates for all the plots and metadata when a new sample is selected.

   - Step 2. Deploy the Flask application to [Heroku](https://bkabelly.herokuapp.com)

   - Advanced Challenge. Includes a [Gauge Chart](plotly/bkabelly/static/js/bonus.js) wiht the Weekly Washing 
    Frequency obtained from the Flask application /metadata/<sample> route, that is updated whenever a new 
    sample is selected.
    
   - Flask API. To [serve the data](plotly/bkabelly/app.py) needed for the plots.

   * Go to the [repository](plotly/) 
