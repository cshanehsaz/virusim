//using d3
let boundary;
let qt;
let points;

//params
let timeStep=1;
let width = 400;
let height = 400;
let number_infected_start = 1;
let number_vaccinated_start = 0;
let number_of_nodes = 50;
let dot_radius = 2;
let fps = 120;
let velocity_scale = 1;
//----------

let end = 0;

let center_x = width/2;
let center_y = height/2;
let setup_complete = false;


boundary = new Rectangle(center_x, center_y, width/2, height/2)
qt = new QuadTree(boundary, 6)
points = [];

//initializes the points
for(let i=0; i<number_of_nodes; i++) {
    let p = new Point(Math.random()*width, Math.random()*height, dot_radius, (Math.random()-.5)*velocity_scale, (Math.random()-.5)*velocity_scale);
    points.push(p);
    qt.insert(p);
}

//sets up infected and vaccinated points
QuadTree.infectSetup(points, number_infected_start);
QuadTree.vaccinateSetup(points, number_vaccinated_start);

//gets initial counts
qt.countPoints(points)
printCounts()

//does the initial drawing
circles()


var svg = d3.select(".canvas")
    .attr("width", width)
    .attr("height", height)
    .attr("x", width/2)
    .attr("y", height/2)
    .style("background", "black")

function wipe() {
    d3.selectAll(".circle").remove();
}

function circles() { 
    d3.select(".canvas")
    .selectAll(".circle")
    .data(points)
    .enter()
    .append("circle")
    .attr("cx", function(p) {return p.x})
    .attr("cy", function(p) {return p.y})
    .attr("r", function(p) {return p.r})
    .attr("fill", function(p) {return p.color})
    .attr("class", "circle")
}

let intervalID = setInterval(function(){
    wipe()
    let end = qt.advance(timeStep, points, width, height);
    printCounts();
    //qt.checkCollision(width, height);
    qt = new QuadTree(boundary, 6);
    for(let p of points) {
        qt.insert(p);
    }
    circles()
    //if(end === 1){endInterval()}
}, 1000/fps);

function endInterval() {
    clearInterval(intervalID)
}

function printCounts() {
    printIndividualCount("count_not", "■ Healthy: ", qt.count_not)
    printIndividualCount("count_inf", "■ Infected: ",qt.count_inf)
    printIndividualCount("count_rec", "■ Recovered: ", qt.count_rec)
    printIndividualCount("count_dead", "■ Dead: ", qt.count_dead)
    printIndividualCount("count_vac", "■ Vaccinated: ", qt.count_vac)
}

function printIndividualCount(count_name, label, count_num) {
    document.getElementById(count_name).innerHTML = label + String(count_num)
}