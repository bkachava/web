function buildMetadata(sample) {
  // Function that builds the metadata card
  var url = "/metadata/" + sample;
  var wfreq = 0;
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(sample_metadata){
    // Use d3 to select the card with id of `#sample-metadata`
    var selection = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    selection.html("");
    // Use `Object.entries` to add each key and value pair to the card
    // Use d3 to append new tags for each key-value in the metadata, in a specific order
    selection.append("div").text("Sample ID:").classed("card-text text-info", true);
    selection.append("div").text(sample_metadata["sample"]).classed("card-text text-warning font-weight-bold", true);
    selection.append("div").text("Ethnicity:").classed("card-text text-info", true);
    selection.append("div").text(sample_metadata["ETHNICITY"]).classed("card-text text-warning font-weight-bold", true);
    selection.append("div").text("Gender:").classed("card-text text-info", true);
    selection.append("div").text(sample_metadata["GENDER"]).classed("card-text text-warning font-weight-bold", true);
    selection.append("div").text("Age:").classed("card-text text-info", true);
    selection.append("div").text(sample_metadata["AGE"]).classed("card-text text-warning font-weight-bold", true);
    selection.append("div").text("Location:").classed("card-text text-info", true);
    selection.append("div").text(sample_metadata["LOCATION"]).classed("card-text text-warning font-weight-bold", true);
    selection.append("div").text("BBTYPE:").classed("card-text text-info", true);
    if (sample_metadata["BBTYPE"] !== null) {
      selection.append("div").text(sample_metadata["BBTYPE"]).classed("card-text text-warning font-weight-bold", true);
    }
    else {
      selection.append("div").text(" ").classed("card-text text-warning", true);
    }
    selection.append("div").text("WFREQ:").classed("card-text text-info", true);
    if (sample_metadata["WFREQ"] !== null) {
      wfreq = sample_metadata["WFREQ"];
      selection.append("div").text(wfreq).classed("card-text text-warning font-weight-bold", true);
    }
    else {
      selection.append("div").text(" ").classed("card-text text-warning", true);
    }

   // Build the Gauge Chart
   buildGauge(wfreq, sample);

  });
}

function buildCharts(sample) {
  // Use `d3.json` to fetch the sample data for the plots
    var url = "/samples/" + sample;
    d3.json(url).then(function(sampledata){

    // Build a Bubble Chart using the sample data
    // Use otu_ids for the x values
    var x = sampledata["otu_ids"];
    // Use sample_values for the y values
    var y = sampledata["sample_values"];
    // Use otu_labels for the text values
    var labels = sampledata["otu_labels"];
    var trace1 = {
      "x": x,
      "y": y,
      "text": labels, //(x,y,labels)=>{ return ('(' + x + ',' + y + ')' + labels)}, 
      "mode": 'markers',
      "hoverinfo": 'x+y+text',
      "marker": {
        // Use sample_values for the marker size
        "size": sampledata["sample_values"],
        // Use otu_ids for the marker colors
        "color": sampledata["otu_ids"]
      }
    };
    var bdata = [trace1];
    var blayout = {
      title: '<b>Operational Taxonomic Units<br>Sample : ' + sample + '</b>',
      hovermode: "closest",
      height: 800,
      width: 900,
      showlegend: false
    };

    Plotly.newPlot("bubble", bdata, blayout);
 
    // Build a Pie Chart
    // Use slice() to grab the top 10 sample_values, otu_ids, and labels
       var data = [{
           "values": sampledata["sample_values"].slice(0,10),
           "labels": sampledata["otu_ids"].slice(0,10),
           "text": sampledata["otu_labels"].slice(0,10),
           "hoverinfo": 'label+text+value+percent',
           "textinfo": 'percent',
           "marker": {
           "colors": ['#20c997', '#6610f2', '#6f42c1', '#e83e8c', '#d9eee8', 
                    '#FFCE67', '#fcf8e3', '#6CC3D5', '#fd7e14', '#F3969A']
                  },
           "type": "pie"}]
       var layout = {
           title : "<b>Top Ten Operational Taxonomic Units<br> Sample : " + sample + '</b>'
         }  
       Plotly.newPlot("pie", data, layout);
   });
}

function updateAPIurls(sample) {

  var urlmeta = "/metadata/" + sample;
  var urlsamp = "/samples/" + sample;

  d3.select("a.btn.btn-outline-info").attr('href', urlmeta).text(urlmeta);
  d3.select("a.btn.btn-outline-warning").attr('href', urlsamp).text(urlsamp);

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    updateAPIurls(firstSample);

  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  updateAPIurls(newSample);
}

// Initialize the dashboard
init();
