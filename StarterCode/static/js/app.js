let data = d3.json('samples.json');


// function that populates the metadata
function demoInfo(sample)
{
    
    d3.json("samples.json").then((data) => {
        let metaData = data.metadata;
        let results = metaData.filter(sampleResult => sampleResult.id == sample);
        let resultData = results[0];
        d3.select("#sample-metadata").html("")
        Object.entries(resultData).forEach(([key, value]) =>{
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

    });
}
// function that builds the graphs
function buildBarChart(sample)
{
    let data = d3.json("samples.json");
    d3.json("samples.json").then((data) => {
        let sampleData = data.samples;
        let results = sampleData.filter(sampleResult => sampleResult.id == sample);
        let resultData = results[0];
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);
        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels,
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);
        
    });

}

function buildBubbleChart(sample)
{
    let data = d3.json("samples.json");
    d3.json("samples.json").then((data) => {
        let sampleData = data.samples;
        let results = sampleData.filter(sampleResult => sampleResult.id == sample);
        let resultData = results[0];
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
            
        }

        let layout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);
        
    });
}
// initialize the dashboard
function initialize()
{
    
    var select = d3.select("#selDataset");
    d3.json('samples.json').then((data) => {
        let sampleNames = data.names;
        sampleNames.forEach((sample) => {
        select.append("option").text(sample).property("value", sample);
        });
        let sample1 = sampleNames[0];
        demoInfo(sample1);
        demoInfo(sample1);
        buildBarChart(sample1);
        buildBubbleChart(sample1);
    });
}

// update the dashboard
function optionChanged(item)
{
    demoInfo(item);
    buildBarChart(item);
    buildBubbleChart(item);
}

// call the initialize function
initialize();