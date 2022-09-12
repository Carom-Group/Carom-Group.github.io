
const frame_id = [];
const frameOfFrames = [];
const vehicle_id = [];
const x_pos = [];
const y_pos = [];
const heading = [];
const left_pos = [];
const length = [];
const width = [];
const distinct = [];
const tracked_vehicles = [];
const tracked_vehicles_int = [];
const colors = [];
const colorTag = [];
let parsed_data = [];
let parsed_json = [];
const tracked_frames = [];
const numFrames = [];
let dur1;
let dur2;
let preprocessedJSON;

var animate;
const img = new Image();

//let dataFile = 'test.csv';
let dataFile = '/assets/data/A/A2_0_simple_lmap_data.csv';
//let jsonFile = './A2_0_simple_lmap_data_test(2).json';
let jsonFile  = '/assets/data/A/A2_0_simple_lmap_data_FULL(1).json';
//! PNG file ajustments are further down in the code see line 140;

let c_ratio;
let revert_ratio;
let frame_tracker = 0;


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvas_width = canvas.width = window.innerWidth;
const canvas_height = canvas.height = (window.innerHeight-100);


async function getData() {
    // This function turns the data into a parsed csv format to easy distinct vehicle detection
    
    const start1 = performance.now();

    //TODO: DATA

    const response = await fetch(dataFile);
    const tabledata = await response.text();

    /*
    try {
        // Parse a JSON
        jsonData = JSON.parse(preprocessed); 
    } catch (e) {
        // You can read e for more info
        // Let's assume the error is that we already have parsed the payload
        // So just return that
        jsonData = preprocessed;
    }

    */
    //* json parsing ----------------------------------------------------------------

    const json_respoonse = await fetch(jsonFile);
    const jsonData = await json_respoonse.json();
    parsed_json = jsonData;
    console.log(parsed_json);

    frameOfFrames.push(parsed_json);

    // manual parser
    const table = tabledata.split('\n');

    table.forEach(row => {   
        const column = row.split(',');
 
        const vehicle = column[1];
        vehicle_id.push(vehicle);

    });

    //! Finding the all disctinct values column
    distinct.push(... new Set(vehicle_id));
    distinct.shift(); // correction for named column not needed if lables are removed
    console.log('Number of distinct values detected:', distinct.length);
    //console.log(distinct);
    //console.log(x_pos);

    dur1 = performance.now() - start1;

    //vehicleObjectDrawing();

    init();
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function hsvToRgb(h, s, v) {
    var r, g, b;
    
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    r *= 255; g *= 255; b *= 255;
    //return [ r * 255, g * 255, b * 255 ];
    return `rgb(${r},${g},${b})`;
    //return `rgb(${random(0, 255) * ID},${random(0, 255) * ID},${random(0, 255) * ID})`;

  }

function init() {

    frame_id.shift();
    vehicle_id.shift();
    x_pos.shift();
    y_pos.shift();
    heading.shift();
    left_pos.shift();
    length.shift();
    width.shift();
    
    img.src = '/assets/data/A/A2/map_local.png';

    const scale_width = img.width;
    const scale_height = img.height;

    const ratio = Math.min(
        canvas_width / scale_width,
        canvas_height / scale_height
    );
    const revert_rat = Math.max(
        scale_width / canvas_width,
        scale_height / canvas_height
    );
    c_ratio = ratio;
    revert_ratio = revert_rat;
    ctx.drawImage(img, 0, 0);

    ctx.fillStyle = 'rgba(100, 1, 0, 0.25)';
    //ctx.fillRect(0, 0,  canvas_width, canvas_height);
    // TODO ctx.scale(.2, .2);
    //! Scaler
    ctx.scale(ratio, ratio);
    ctx.beginPath();

    for ( i in distinct) {
        let id = distinct[i];
        id = parseInt(id);
        let hue = ((4 * id) % 19 / 19);
        let vehicle_color = hsvToRgb(hue,1,1, id);
        colors.push(vehicle_color);
        console.log('vehicle color',vehicle_color);

    }

    

    //! ----------------------------------------------------------------  
    //renderFrame();  
}

function renderFrame() {
    
    ctx.scale(revert_ratio, revert_ratio);

    //ctx.scale(c_ratio, c_ratio);
    let currFrame = frameOfFrames[0][frame_tracker];
    console.log('curr frame', currFrame);
    // TODO ctx.scale(5, 5);
    ctx.scale(revert_ratio, revert_ratio);
    ctx.clearRect(0, 0, canvas_width, canvas_height);            
    // TODO ctx.scale(.2,.2,);
    ctx.scale(c_ratio, c_ratio);
    ctx.drawImage(img, 0, 0);

    currFrame.forEach(detection => {

        let vehicle = parseInt(detection.vehicle_id);
                //console.log(vehicle);
                //console.log('detection', detection);
                //* fix for the vehicle color identification
        let vehicle_color = colors[vehicle];

        ctx.fill();
        ctx.stroke();

        let car = new Detected_Vehicle(detection.frame_id, detection.vehicle_id, detection.x_pos, detection.y_pos,
            detection.heading, detection.left_pos, detection.length, detection.width, vehicle_color);

        car.drawVehicle();
        //console.log('drawing vehicle ', detection);


    });

    frame_tracker += 1;
    ctx.scale(c_ratio, c_ratio);


    animate = setTimeout(renderFrame, 33);
    
}

function stop() {
    clearTimeout(animate);
}
/*
function isDone() {
    if (done = false) {
        console.log('animiation not done');
    }
    else {console.log('animiation complete');}
}
*/




class Detected_Vehicle {

    constructor(frame_id, vehicle_id, x_pos, y_pos, headingX, headingY, length, width, color) {
       this.frame_id = frame_id;
       this.vehicle_id = vehicle_id;
       this.x_pos = x_pos;
       this.y_pos = y_pos;
       this.hx = headingX;
       this.hy = headingY;
       //this.leftX = leftX;
       //this.leftY = leftY;
       this.length = length;
       this.width = width;
       this.color = color;
       //this.nextFrame = nextFrame;
    } 
  
    drawVehicle() {
       
      // all passed args are elements of index i of arrays hold their respective values, to be iterarted upon creating distinct objects per iteration.
       
      //*console.log('THIS hx', this.hx);
       ctx.beginPath();
       ctx.fillStyle = this.color;
       //ctx.scale(.2, .2);
       this.frame_id = parseFloat(this.frame_id);
       this.vehicle_id = parseFloat(this.vehicle_id);
       this.x_pos = parseFloat(this.x_pos);
       this.y_pos = parseFloat(this.y_pos);
       this.hx =  parseFloat(this.hx);
       this.hy = parseFloat(this.hy);
       this.length = parseFloat(this.length);
       this.width = parseFloat(this.width);
       this.lx = (-this.hy);
       this.ly = (this.hx);

        //*console.log('lx and ly\n', this.lx, this.ly); //! lx is working

       // normalize vector positions
       let hr = Math.sqrt(this.hx*this.hx + this.hy*this.hy);
       let lr = Math.sqrt(this.lx*this.lx + this.ly*this.ly);
       let normH = [(this.hx/hr),(this.hy/lr)];
       let normL = [(this.lx/lr),(this.ly/lr)];    // access via normL[0] etc...
  
       // Frontal left corner position
       // based upon: (xa, xb) = (this.x_pos, this.y_pos) + this.length * (normH[0], normH[1]) / 2 + this.width * (normL[0], normL[1]) / 2;
       
       // Corner position a
       let ax = (this.x_pos) + (this.length * normH[0]) / 2 + ((this.width * normL[0])/2);
       let ay = (this.y_pos) + (this.length * normH[1]) / 2 + ((this.width * normL[1])/2);
       //console.log(typeof ax);
       // Corner position b
       let bx = (this.x_pos) + (this.length * normH[0]) / 2 - ((this.width * normL[0])/2);
       let by = (this.y_pos) + (this.length * normH[1]) / 2 - ((this.width * normL[1])/2);
       //console.log(typeof bx);
       //bx = parseFloat(bx.toFixed(2));
       //console.log(bx);
       // Corner position c
       let cx = (this.x_pos) - (this.length * normH[0]) / 2 + ((this.width * normL[0])/2);
       let cy = (this.y_pos) - (this.length * normH[1]) / 2 + ((this.width * normL[1])/2);
       // Corner position d
       let dx = (this.x_pos) - (this.length * normH[0]) / 2 - ((this.width * normL[0])/2);
       let dy = (this.y_pos) - (this.length * normH[1]) / 2 - ((this.width * normL[1])/2);

        //*console.log('ax value: ' + ax);
       ctx.beginPath();       // start new path 

       ctx.moveTo(ax, ay);    // move the pen to ax, ay
       ctx.lineTo(bx, by);    // draw line from ax, ay to bx, by
       
       ctx.moveTo(bx, by);
       ctx.lineTo(dx, dy);

       ctx.moveTo(cx, cy);
       ctx.lineTo(ax, ay);

       ctx.moveTo(dx, dy);
       ctx.lineTo(cx, cy);

       ctx.lineWidth = 5;
       ctx.strokeStyle = this.color;
       ctx.stroke();          // render the bounding box

       //console.log('\na', ax, ay, '\nb', bx, by, '\nc', cx, cy, '\nd', dx, dy);
       //console.log('Vehicle ID:', this.vehicle_id);

       //ctx.fill();
    }
    
  }

getData();  
window.onload = init;

