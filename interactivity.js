// Sample data from the original tutorial's Altair chart.
const data = [
    { category: "A", value: 28 },
    { category: "B", value: 55 },
    { category: "C", value: 43 },
    { category: "D", value: 91 },
    { category: "E", value: 81 },
    { category: "F", value: 53 },
    { category: "G", value: 19 },
    { category: "H", value: 87 },
    { category: "I", value: 52 }
];

const width = 700;
const height = 360;
const margin = { top: 30, right: 20, bottom: 55, left: 60 };

const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Bar chart of sample values for categories A through I. D is highest at 91 and G is lowest at 19.");

const x = d3.scaleBand()
    .domain(data.map(d => d.category))
    .range([margin.left, width - margin.right])
    .padding(0.25);

const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(5));

svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => x(d.category))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - margin.bottom - y(d.value))
    .attr("fill", "#397bad");

svg.selectAll(".value")
    .data(data)
    .join("text")
    .attr("class", "value")
    .attr("x", d => x(d.category) + x.bandwidth() / 2)
    .attr("y", d => y(d.value) - 7)
    .attr("text-anchor", "middle")
    .attr("font-size", 14)
    .text(d => d.value);

svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text("Category");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .text("Value");
