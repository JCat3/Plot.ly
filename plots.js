// code written in Doms office hours 12/11 
console.log("This is plots.js");


function DrawBarchart(sampleId) {
    console.log(`DrawBarchart(${sampleId})`);

    d3.json("samples.json").then(data => {

        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        console.log(result);

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h",
            hoverinfo: sample_values
        };

        let barArray = [barData];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 50, l: 100}
        }

        Plotly.newPlot("bar", barArray, barLayout)

    });
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("samples.json").then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        console.log(result);

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        console.log(otu_labels);

        let bubbleData = {
            x: otu_ids.slice(0,10).reverse(),
            y: sample_values,
            type: "bubble",
            text: otu_labels.slice(0,10),
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Blues',
                colorbar: {
                    title: 'Cultures',
                },
            hoverinfo: sample_values
            }

        }

        let bubbleArray = [bubbleData];

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 100, l: 350},
            showlegend: false,
            xaxis:{title: "OTU ID"}
            
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
}

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);

    d3.json("samples.json").then(data => {
       
        let metadata = data.metadata;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        console.log(metadata);

        Plotly.newPlot("panel-title", result)

    });
}

function optionChanged(id) {
    console.log(`optionChanged(${id})`);

    DrawBarchart(id);
    DrawBubblechart(id);
    ShowMetaData(id);

    // display barchart
    //display bubble chart 
    //populate demographic data
}


function InitDashboard()
{
    console.log("Initializing Dashboard");

    let selector = d3.select('#selDataset');

    d3.json("samples.json").then(data => {

        let sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId)
        });

        let sampleId = sampleNames[0];

        DrawBarchart(sampleId);
        DrawBubblechart(sampleId);
        ShowMetadata(sampleId);
    });


}
InitDashboard();

