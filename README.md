# Web Technologies Assignments

Apply the skills learned so far to some real-world situations.

 
## Blanttitude - Latitude Analysis Dashboard with Attitude  -- Web Visualizations

   HTML, CSS, Bootstrap were used for building this dashboard, with a page for each plot and a means by which
    the user can navigate between them. These pages contained the visualizations created in the 
    [PyWeather - APIs assignment](https://github.com/bkachava/pandas/tree/master/PyWeather) and their 
    corresponding explanations. Also, includes a landing page, a page where we can see a comparison of all 
    of the plots, and another page to view the data used to build them.

   * See the [Dashboard](https://bkachava.github.io/web/dashboard/)
   * Go to the [repository](https://github.com/bkachava/web/tree/master/dashboard) 


## Mission to Mars -- Web Scraping and Document Databases

   A web application that scrapes various websites for data related to the Mission to Mars and 
    displays the information in a single HTML page was built. 

   - Step 1 - Scraping. The initial scraping used [Jupyter Notebook](/missiontomars/Notebook/mission_to_mars.ipynb), 
    BeautifulSoup to help find and parse out the necessary data, Pandas library, and Requests/Splinter to navigate the sites.
    
   - Step 2 - MongoDB and Flask Application. MongoDB with Flask templating and Bootstrap were used to create a HTML 
    page, that displays all of the information that was scraped in the previous step. First, the Jupyter notebook was
    converted into a [Python script](/missiontomars/Flask/scrape_mars.py) and then a route to import the script 
    was included in [Flask Application](/missiontomars/Flask/app.py). Also, Pymongo library for the database was used and
    each time the /scrape url is visited, the existing document is overwritten and new data is obtained.


## UFO sightings -- JavaScript and DOM Manipulation

   HTML, CSS, Bootstrap, JavaScript and D3.js were used to explore the [UFO Sightings Data](/jsdom/static/js/data.js), 
    an array of JavaScript objects, and to present it in a HTML table that is dynamically created. Also, the user can 
    filter the dataset.
    
   - Level 1. When the page loads the table is dynamically created and an input type with a calendar is presented to
    apply a filter by date.
    
   - Level 2. Using multiple select dropdowns `city, state, country, and shape`, the user can set multiple filters 
    and search for UFO sightings that match its selection.


## Belly Button Biodiversity Dashboard -- Interactive Visualizations and Dashboard

   HTML, CSS, Bootstrap, JavaScript, Plotly.js, JSON, Flask with a SQLite database, and Heroku with a Postgress 
    database, were used to build an interactive dashboard for exploring the Belly Button Biodiversity DataSet.

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

