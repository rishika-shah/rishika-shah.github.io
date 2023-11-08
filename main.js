
let svg = d3.select("#svg");
let keyframeIndex = 0;
const width = 650;
const height = 550;
let state_name = "all";

// load all data
async function loadData(){
    await d3.csv("yearwise_data.csv").then(data => {
        crimeData = data;
    });
}

// load statewise data
async function loadStateData(){
    await d3.csv("statewise_data.csv").then(data => {
        allStateCrimeData = data;
    });
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function drawLineChart(data) {

    // if any lines are on the plot, remove them
    const paths = svg.selectAll(".path");
    paths.exit()
    .transition()
    .duration(1000)
    .remove();

    initialiseSVG();

    svg.attr("width", width);
    svg.attr("height", height);

    // Margin
    const margin = { top: 120, right: 30, bottom: 50, left: 90 };
    let chartWidth = width - margin.left - margin.right;
    let chartHeight = height - margin.top - margin.bottom;

    // 'group' variable for all elements of the SVG
    let chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X scale for all years
    let xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
        .range([0, chartWidth]);

    // finding max for Y axis

    let max = 0; 

    data.forEach(item => {

        if (parseInt(item["Rape"]) > max) {
            max = item["Rape"];
        }
        if (parseInt(item["Kidnapping and Abduction"]) > max) {
            max = parseInt(item["Kidnapping and Abduction"]);
        }
        if (parseInt(item["Dowry Deaths"]) > max) {
            max = parseInt(item["Dowry Deaths"]);
        }
        if (parseInt(item["Assault on women with intent to outrage her modesty"]) > max) {
            max = parseInt(item["Assault on women with intent to outrage her modesty"]);
        }
        if (parseInt(item["Insult to modesty of Women"]) > max) {
            max = parseInt(item["Insult to modesty of Women"]);
        }
        if (parseInt(item["Cruelty by Husband or his Relatives"]) > max) {
            max = parseInt(item["Cruelty by Husband or his Relatives"]);
        }
        if (parseInt(item["Importation of Girls"]) > max) {
            max = parseInt(item["Importation of Girls"]);
        }

    });


    // Y scale for number of crimes
    let yScale = d3.scaleLinear()
        .domain([0, 1.2 * max])
        .nice()
        .range([chartHeight, 0]);

    // line 1: Rape
    const line1 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.Rape));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line1)
        .attr("fill", "none")
        .attr("stroke", "#f52f2f")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5)
        .style("opacity", 0.5);

    // line 2: Dowry Deaths
    const line2 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d["Dowry Deaths"]));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line2)
        .attr("fill", "none")
        .attr("stroke", "#04c911")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);

    // line 3: Cruelty by Husband or his Relatives
    const line3 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d["Cruelty by Husband or his Relatives"]));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line3)
        .attr("fill", "none")
        .attr("stroke", "#57d1f2")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);

    // line 4: Kidnapping and Abduction
    const line4 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d["Kidnapping and Abduction"]));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line4)
        .attr("fill", "none")
        .attr("stroke", "#fc7600")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);

    // line 5: Assault on women with intent to outrage her modesty
    const line5 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d["Assault on women with intent to outrage her modesty"]));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line5)
        .attr("fill", "none")
        .attr("stroke", "#edf502")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);

    // line 6: Insult to modesty of Women
    const line6 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d["Insult to modesty of Women"]));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line6)
        .attr("fill", "none")
        .attr("stroke", "#a121fc")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);


    // making dots for datapoints:

    const colors = ["#f52f2f", "#04c911", "#57d1f2", "#fc7600", "#edf502", "#a121fc"];
    const crimes = ["Rape", "Dowry Deaths", "Cruelty by Husband or his Relatives", "Kidnapping and Abduction", "Assault on women with intent to outrage her modesty", "Insult to modesty of Women"];

    const lineGroups = svg.selectAll(".line-group")
    .data(crimes)
    .enter()
    .append("g")
    .attr("class", "line-group");
  
  // Loop through each line group
  lineGroups.each(function (crime, i) {
    const color = colors[i];
    const circleGroup = d3.select(this);

    // tooltip for hovering interaction
    const tooltip = d3.select("#tooltip");
    const tooltipContentYear = d3.select("#tooltip-content-year");
    const tooltipContentNum = d3.select("#tooltip-content-num");
    const tooltipContentCrime = d3.select("#tooltip-content-crime");

    // adding circles
    circleGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d["Year"]))
      .attr("cy", d => yScale(d[crime]))
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("r", 4)
      .style("fill", color)
      .style("opacity", 0.5)
      .on("mouseover", (event, d) => {
        tooltip.style("display", "block");
        tooltipContentYear.text(`Year: ${d.Year}`);
        tooltipContentNum.text(`${d[crime]}`);
        tooltipContentNum.style("color", color);
        tooltipContentCrime.text(crime);
        tooltipContentCrime.style("color", color);
    })
    .on("mousemove", (event) => {
        tooltip.style("left", (event.pageX + 10) + "px");
        tooltip.style("top", (event.pageY + 10) + "px");
    })
    .on("mouseout", () => {
        tooltip.style("display", "none");
    });

});


    // Add x-axis
    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
        .style("color", "grey")
        .selectAll("text");

    // Add y-axis
    chart.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale))
        .style("color", "grey")
        .selectAll("text");

    // Add title
    let title = "Crimes Against Women in India";
    if (state_name != "all") {
        let tcsn = toTitleCase(state_name);
        title = "Crimes Against Women in " + tcsn;
    }
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("fill", "white")
        .style("font-family", "Gill Sans")
        .style("font-weight", 100)
        .text(title);

    // Add label to X axis
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("x", chartWidth / 2 + margin.left)
        .attr("y", chartHeight + margin.bottom + margin.top - 10)
        .style("font-size", "16px")
        .style("fill", "lightgrey")
        .style("font-family", "Gill Sans")
        .style("font-weight", 100)
        .text("Year");

    // Add label to Y-axis
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartWidth / 2)
        .attr("y", 30)
        .style("font-size", "16px")
        .style("fill", "lightgrey")
        .style("font-family", "Gill Sans")
        .style("font-weight", 100)
        .text("Number of Crimes");

    // Create legend
    const legendData = [
        { name: "Rape", color: "#f52f2f" }, // Custom legend label and color for Series A
        { name: "Cruelty by Husband or his Relatives", color: "#57d1f2" }, // Custom legend label and color for Series B
        { name: "Dowry Deaths", color: "#04c911" },
        { name: "Kidnapping and Abduction", color: "#fc7600" },
        { name: "Assault on women with intent to outrage her modesty", color: "#edf502" },
        { name: "Insult to modesty of Women", color: "#a121fc" }
    ];

    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (chartWidth - margin.right - margin.left - 10) + ", 50)"); // Adjust the position of the legend
    
    const legendItems = legend.selectAll(".legend-item")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`); // Adjust the vertical spacing between legend items

    legendItems.append("rect")
        .attr("width", 15)
        .attr("height", 2)
        .attr("fill", d => d.color); 

    legendItems.append("text")
        .attr("x", 25)
        .attr("y", 0)
        .attr("dy", "0.3em")
        .text(d => d.name)
        .style("fill", "lightgrey")
        .style("font-family", "Gill Sans")
        .style("font-size", "10px")
        .style("font-weight", 100); 
    
}

async function initialiseSVG() {

    svg.attr("width", width);
    svg.attr("height", height);

    svg.selectAll("*")
    .remove()
    .transition()
    .duration(1000);

    // margin
    const margin = { top: 120, right: 30, bottom: 50, left: 90 };
    chartWidth = width - margin.left - margin.right;
    chartHeight = height - margin.top - margin.bottom;

    chart = svg.append("g") 
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale = d3.scaleLinear()
        .domain([])
        .range([0, chartWidth]);

    yScale = d3.scaleLinear()
        .domain([])
        .nice()
        .range([chartHeight, 0]);

    // Add x-axis
    chart.append("g")
        // .transition()
        // .duration(1000)
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text");

    // Add y-axis
    chart.append("g")
        // .transition()
        // .duration(1000)
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale))
        .selectAll("text");

    // Add title
    svg.append("text")
        .attr("id", "chart-title")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "white")
        .text("");

    const dropdownGroup = svg.append("g")
        .attr("transform", "translate(20, 20)")
        .attr("class", "dropdown-group"); // Adjust the position as needed

    const dropdown = dropdownGroup.append("foreignObject")
        .attr("width", 200)
        .attr("height", 70)
        .attr("transform", "translate(120, 50)")
        .append("xhtml:select")
        .attr("id", "dropdown")
        .style("font-size", "14px"); // Set font size
    
    dropdown.append("xhtml:option")
        .attr("value", "select")
        .text("Select State");
    dropdown.append("xhtml:option")
        .attr("value", "all")
        .text("All states");
    dropdown.append("xhtml:option")
        .attr("value", "A & N ISLANDS")
        .text("A & N ISLANDS");
    dropdown.append("xhtml:option")
        .attr("value", "ANDHRA PRADESH")
        .text("ANDHRA PRADESH");
    dropdown.append("xhtml:option")
        .attr("value", "ARUNACHAL PRADESH")
        .text("ARUNACHAL PRADESH");
    dropdown.append("xhtml:option")
        .attr("value", "ASSAM")
        .text("ASSAM");
    dropdown.append("xhtml:option")
        .attr("value", "BIHAR")
        .text("BIHAR");
    dropdown.append("xhtml:option")
        .attr("value", "CHANDIGARH")
        .text("CHANDIGARH");
    dropdown.append("xhtml:option")
        .attr("value", "CHHATTISGARH")
        .text("CHHATTISGARH");
    dropdown.append("xhtml:option")
        .attr("value", "D & N HAVELI")
        .text("D & N HAVELI");
    dropdown.append("xhtml:option")
        .attr("value", "DAMAN & DIU")
        .text("DAMAN & DIU");
    dropdown.append("xhtml:option")
        .attr("value", "DELHI")
        .text("DELHI");
    dropdown.append("xhtml:option")
        .attr("value", "GOA")
        .text("GOA");
    dropdown.append("xhtml:option")
        .attr("value", "GUJARAT")
        .text("GUJARAT");
    dropdown.append("xhtml:option")
        .attr("value", "HARYANA")
        .text("HARYANA");
    dropdown.append("xhtml:option")
        .attr("value", "HIMACHAL PRADESH")
        .text("HIMACHAL PRADESH");
    dropdown.append("xhtml:option")
        .attr("value", "JAMMU & KASHMIR")
        .text("JAMMU & KASHMIR");
    dropdown.append("xhtml:option")
        .attr("value", "JHARKHAND")
        .text("JHARKHAND");
    dropdown.append("xhtml:option")
        .attr("value", "KARNATAKA")
        .text("KARNATAKA");
    dropdown.append("xhtml:option")
        .attr("value", "KERALA")
        .text("KERALA");
    dropdown.append("xhtml:option")
        .attr("value", "LAKSHADWEEP")
        .text("LAKSHADWEEP");
    dropdown.append("xhtml:option")
        .attr("value", "MADHYA PRADESH")
        .text("MADHYA PRADESH");
    dropdown.append("xhtml:option")
        .attr("value", "MAHARASHTRA")
        .text("MAHARASHTRA");
    dropdown.append("xhtml:option")
        .attr("value", "MANIPUR")
        .text("MANIPUR");
    dropdown.append("xhtml:option")
        .attr("value", "MEGHALAYA")
        .text("MEGHALAYA");
    dropdown.append("xhtml:option")
        .attr("value", "MIZORAM")
        .text("MIZORAM");
    dropdown.append("xhtml:option")
        .attr("value", "NAGALAND")
        .text("NAGALAND");
    dropdown.append("xhtml:option")
        .attr("value", "ODISHA")
        .text("ODISHA");
    dropdown.append("xhtml:option")
        .attr("value", "PUDUCHERRY")
        .text("PUDUCHERRY");
    dropdown.append("xhtml:option")
        .attr("value", "PUNJAB")
        .text("PUNJAB");
    dropdown.append("xhtml:option")
        .attr("value", "RAJASTHAN")
        .text("RAJASTHAN");
    dropdown.append("xhtml:option")
        .attr("value", "SIKKIM")
        .text("SIKKIM");
    dropdown.append("xhtml:option")
        .attr("value", "TAMIL NADU")
        .text("TAMIL NADU");
    dropdown.append("xhtml:option")
        .attr("value", "TRIPURA")
        .text("TRIPURA");
    dropdown.append("xhtml:option")
        .attr("value", "UTTAR PRADESH")
        .text("UTTAR PRADESH");
    dropdown.append("xhtml:option")
        .attr("value", "UTTARAKHAND")
        .text("UTTARAKHAND");
    dropdown.append("xhtml:option")
        .attr("value", "WEST BENGAL")
        .text("WEST BENGAL");

        
    dropdown.on("change", function () {
        state_name = dropdown.node().value;


        dropdown.text(state_name);

        if (state_name != "all") {
            stateCrimeData = allStateCrimeData.filter(val => val["STATE/UT"] == state_name);
            drawLineChart(stateCrimeData);

        } else {
            drawLineChart(crimeData);
        }

    });
}

async function initialise() {

    initialiseSVG();

    await loadData();
    await loadStateData();

    drawLineChart(crimeData);



}


initialise();

