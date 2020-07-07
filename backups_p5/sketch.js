//using p5
let boundary;

let qt;
let points;

//params
let timeStep=1;
let width = 600;
let height = 600;
let number_infected_start = 3;
let number_vaccinated_start = 800;
let dot_radius = 4;
//----------

let center_x = width/2;
let center_y = height/2;
let setup_complete = false;


function setup() {
    createCanvas(width, height);
    frameRate(60);

    boundary = new Rectangle(center_x, center_y, width/2, height/2)
    qt = new QuadTree(boundary, 8)
    points = [];

    //redraw the quadtree every frame
    for(let i=0; i<1000; i++) {
        let p = new Point(Math.random()*width, Math.random()*height, (Math.random()-.5), (Math.random()-.5))
        points.push(p);
        qt.insert(p)
    }

    //sets up infected and vaccinated points
    QuadTree.infectSetup(points, number_infected_start)
    QuadTree.vaccinateSetup(points, number_vaccinated_start)

    //draws the initial frame and does one time step
    background(0);
    qt.show(points, radius);
    qt.advance(timeStep, points, width, height)
}

function draw() {
    qt.advance(timeStep, points, width, height);
    printCounts();
    //qt.checkCollision(width, height);
    qt = new QuadTree(boundary, 8);
    for(let p of points) {
        qt.insert(p);
    }
    background(0);
    qt.show(points, radius);
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