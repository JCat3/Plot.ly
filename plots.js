// code written in Doms office hours 12/11 
console.log("This is plots.js");




function InitDashboard()
{
    console.log("Initializing Dashboard");

    let selector = d3.select('#selDataset');

    d3.json("samples.json").then(data => {

        console.log(data);

        let sampleNames = data.names;

        sampleNames.array.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId)

        });
    });
}
InitDashboard();

