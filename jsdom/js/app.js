// Function to call the calendar with the date of the first sighting
$(document).ready(function() {
    $("#date").datepicker({ 
        defaultDate: '01/01/2010', 
        beforeShow: function(){    
           $(".ui-datepicker").css('font-size', '62.5%')  } 
    });
});

// Fill the country and shape select tags with unique values
function fillSelects(data) {
    // First, an array of countries with unique values is created
    let countries = data.map(sighting => sighting.country)
        .filter((value, index, self) => self.indexOf(value) === index).sort();
    
    // Then, an option for each country is created, using a class to distinguish the options inserted with d3 from the included in the HTML
    let countrySel = d3.select('#country');
    countrySel.selectAll('option .values')
                        .data(countries)
                        .enter()
                        .append('option')
                        .attr("class", "values")
                        .attr('value', function (d) { return d; })
                        .text( function (d) { return d.toUpperCase(); });

    // First an array of shapes with unique values is created
    let shapes = data.map(sighting => sighting.shape)
        .filter((value, index, self) => self.indexOf(value) === index).sort();

    // Then an option for each shape is created, using a class to distinguish the options inserted with d3 from the included in the HTML
    let shapeSel = d3.select('#shape');
    shapeSel.selectAll('option .values')
                      .data(shapes)
                      .enter()
                      .append('option')
                      .attr("class", "values capitalize")
                      .attr('value', function (d) { return d; })
                      .text( function (d) { return d });
}

// Display the information without filters
function showTable(info) {
    // Get info from data.js
    let tableData = info;

    // Get a reference to the table body
    let tbody = d3.select("tbody");

    // Add a tr + td for each element in the object
    tableData.forEach((element) => {
        let row = tbody.append("tr");
        Object.entries(element).forEach(([key, value]) => {
        let cell = tbody.append("td");

        // Display the correct character in the field comments, for example a comma instead of &#44
        let parser = new DOMParser;
        let dom = "";
        
        // Apply format to the displayed information
        switch(key)
        {
        case "state": 
        case "country":
            cell.text(value.toUpperCase());
            break;
        case "city":
        case "shape":           
            cell.text(value);
            cell.attr("class", "capitalize");
            break;
        case "comments":
            // Display the correct character in the field comments, for example a comma instead of &#44
            dom = parser.parseFromString(value,'text/html');
            cell.text(dom.body.textContent);
            break;
        default:
            cell.text(value);
        }
        });
    });
}
// Show the table the first time
showTable(data);

// Fill the countries and the shapes select tags
fillSelects(data);

// EVENT LISTENERS
// Select the country dropdown list to fill the states dropdown list
var country = d3.select("#country");

// Change handler for the country dropdown list
country.on("change", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Get the value property of the select element
    let selValue = country.property("value");

    // If the user select an element with value different than the default
    if (selValue !== "0") {

        // Fill the states select tag according to the selection in country
        let statesSel = data.filter(sighting => sighting.country === selValue);

        // Create an array with unique values
        let states = statesSel.map(sighting => sighting.state)
                .filter((value, index, self) => self.indexOf(value) === index)
                .sort();

        // Make sure that the array has element before trying to access the content 
        if (states.length > 0) {
            // Remove options that could be created before, using the class values
            d3.select('#state').selectAll('option.values').remove();
            d3.select('#city').selectAll('option.values').remove();
            
            // An option for each state is created, with the class values
            let countrySel = d3.select('#state');
            countrySel.selectAll('option .values')
                      .data(states)
                      .enter()
                      .append('option')
                      .attr("class", "values")
                      .attr('value', function (d) { return d; })
                      .text( function (d) { return d.toUpperCase(); });
        }
        else   {
           // Remove options that could be created before when the states array is empty
            d3.select('#state').selectAll('option.values').remove();
            d3.select('#city').selectAll('option.values').remove();
        }
    }
    else   { 
           // Because the user selected the default option, remove those options that could be created before
            d3.select('#state').selectAll('option.values').remove();
            d3.select('#city').selectAll('option.values').remove();
    }
  });


// Select the state dropdown list to fill the cities dropdown list
var state = d3.select("#state");

// Change handler for the country dropdown list
state.on("change", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Get the value property of the select element
    let selValue = state.property("value");

    // If the user select an element with value different than the default
    if (selValue !== "0") {

        // Fill the cities select tag according to the selection in state
        let citiesSel = data.filter(sighting => sighting.state === selValue);

        // Create an array with unique values
        let cities = citiesSel.map(sighting => sighting.city)
               .filter((value, index, self) => self.indexOf(value) === index)
               .sort();

        // Make sure that the array has element before trying to access the content 
        if (cities.length > 0) {
            // Remove options that could be created before, using the class values
            d3.select('#city').selectAll('option.values').remove();
            
            // An option for each state is created, with the class values
            let stateSel = d3.select('#city');
            stateSel.selectAll('option .values')
                      .data(cities)
                      .enter()
                      .append('option')
                      .attr("class", "values capitalize")
                      .attr('value', function (d) { return d; })
                      .text( function (d) { return d; });
        }
        else   {
           // Remove options that could be created before when the cities array is empty
            d3.select('#city').selectAll('option.values').remove();
        }
    }
    else   { 
           // Because the user selected the default option, remove those options that could be created before
            d3.select('#city').selectAll('option.values').remove();
    }
  });


// Show filtered table on Submit

// Select the submit button
var submit = d3.select("#filterbtn");

// Click handler for the form
submit.on("click", function() {

    // Store how many filters were selected by the user
    let criteria = 0;
    let filteredData = [];
    
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    let inputElement = d3.select("#date");
  
    // Get the value property of the input element
    let inputValue = inputElement.property("value");
    if (inputValue !== "") {
        // Divide the date to check if the day or the month have zeroes 
        let dateParts = inputValue.split("/");
        let dateStr = "";
        if (dateParts.length === 3) {
            // If the user provided a valid date with zeroes for the day or the month, remove them before comparing
            dateStr = parseInt(dateParts[0]).toString() + "/" + parseInt(dateParts[1]).toString() + "/" + dateParts[2].toString();
        }
        else {
            // If the user provided a non valid date passed the exact value
            dateStr = inputValue;
        }
        // Use the form input to filter the data by date
        filteredData = data.filter(sighting => sighting.datetime === dateStr);
        criteria++;
    }

    let country = d3.select("#country").property("value");
    if (country !== "0")  { 
        // Apply the filter, only if the user made a selection
        filteredData = (criteria > 0) ? filteredData.filter(sighting => sighting.country === country) : data.filter(sighting => sighting.country === country);
        criteria++;
    }
    
    let state = d3.select("#state").property("value");
    if (state !== "0")    {
        // Apply the filter, only if the user made a selection
        filteredData = (criteria > 0) ? filteredData.filter(sighting => sighting.state === state) : data.filter(sighting => sighting.state === state);
        criteria++;
    }

    let city = d3.select("#city").property("value");
    if (city !== "0")    {
         // Apply the filter, only if the user made a selection
        filteredData = (criteria > 0) ? filteredData.filter(sighting => sighting.city === city) : data.filter(sighting => sighting.city === city);
        criteria++;
    }

    let shape = d3.select("#shape").property("value");
    if (shape !== "0")    {
        // Apply the filter, only if the user made a selection
        filteredData = (criteria > 0) ? filteredData.filter(sighting => sighting.shape === shape) : data.filter(sighting => sighting.shape === shape);
        criteria++;
    }

    if (criteria > 0) {
       // At this point, all the filters selected by the user were applied to the data
        if (filteredData.length > 0) {
            // Remove the tr + td  that could be created before
            d3.select("tbody").selectAll("*").remove();
            // Remove the p that could be created before
            d3.select("#table-area").select("p").remove();
            // Present the filtered information 
            showTable(filteredData);
        }
        else
        {
            // Remove the tr + td  that could be created before
            d3.select("tbody").selectAll("*").remove();
            // Remove the p that could be created before
            d3.select("#table-area").select("p").remove();
            // Show a message to the user
            d3.select("#table-area").append("p").text("Not sightings found with these criteria. Try again!").attr("class", "text-warning text-center");
        }
    }
    else{
        // Remove the tr + td  that could be created before
        d3.select("tbody").selectAll("*").remove();
        // Remove the p that could be created before
        d3.select("#table-area").select("p").remove();
        // Show a message to the user
        d3.select("#table-area").append("p").text("To filter data, provide at least one criterion!").attr("class", "text-warning text-center");
    }
  });

 // Select the Show All button
var showAll = d3.select("#nofilterbtn");

// Click handler for the Show All button
showAll.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Remove the tr + td  that could be created before
    d3.select("tbody").selectAll("*").remove();
    
    // Remove the p that could be created before
    d3.select("#table-area").select("p").remove();
    
    // Present the filtered information 
    showTable(data);

    // Remove options that could be created before when the states array is empty
    d3.select('#state').selectAll('option.values').remove();
    d3.select('#city').selectAll('option.values').remove();
    
    // Clear the values of the filters
    document.getElementById('date').value = "";
    document.getElementById('country').selectedIndex = 0;
    document.getElementById('state').selectedIndex = 0;
    document.getElementById('city').selectedIndex = 0;
    document.getElementById('shape').selectedIndex = 0;
});

   