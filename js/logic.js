
// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
   //let new_rand = 0;
   //new_rand = (random(0,1) * vehicle_tag);
   return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// function to generate rbg values from hsv color schema

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
   return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
 }

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0,  width, height);
 
    for (const vehicle of vehicles) {
       vehicle.draw();
       vehicle.update();
       vehicle.collisionDetect();
    }
 
    requestAnimationFrame(loop);
 }

 //! Vehicle related functions

function search_vehicle(vehicle_ID) {

    let result = [];
    console.log('len of v array',tracked_vehicles_int.length);
    // showing vehicle id 0 
    console.log('vehicle 0 hopefully',tracked_vehicles_int[0]);
    // this works
    console.log('vehicle 7 hopefully',tracked_vehicles_int[7]);

    console.log('vehicle x hopefully',tracked_vehicles_int[vehicle_ID]);
    result = tracked_vehicles_int[vehicle_ID];

    // also works
    // attempts of accessing obj properties within their respective indecies

    /*
    ! working method
    var i = 0, len = tracked_vehicles_int.length;
    while (i < len) {
        // code here
        console.log('array of tracked vehicle ', i, '\n', tracked_vehicles_int[i]);
        i++
    }   // works as intended

    */
    // attemp to access vehicle object parameters
    // static version for vehicle 3

    console.log(tracked_vehicles_int[3][0].x_pos);  // first set of [] for vehicle index
    console.log(tracked_vehicles_int[3][0].y_pos);  // second set of [] for instance number of that vehicle
    result.push(tracked_vehicles_int[3][0].x_pos)
    result.push(tracked_vehicles_int[3][0].y_pos)

    /*
    //! working method
    var i = 0, len = tracked_vehicles_int[3].length;
    while (i < len) {
        // code here
        console.log('array of tracked vehicle positions', i, '\n', tracked_vehicles_int[3][i].x_pos);
        i++
    }   
    */

    return result;
}


async function vehicleObjectGenerator(distinct, value_arr, tracked_vehicles, tracked_vehicles_int) {

    //! converting string array into number & create and array for each element
     /*
     const arrOfNum = distinct.map(str => {
         let num = Number(str).toFixed(2);
         tracked_vehicles_int.push([parseFloat(num)]); // array of array based on vehicle ID
     }); //* this section of code is most likely safte to be deleted as of 6/7/2022
     */
     console.log('vehicleObj gen value_arr',value_arr);

     distinct.forEach(element => {
         tracked_vehicles.push(element);
         //tracked_vehicles[parseInt(element)];
     });
     console.log('vehicleObj gen tracked_vehicles',tracked_vehicles);
     tracked_vehicles.forEach(vehicle => {
         //let id = vehicle;
         let vechile_filtered = value_arr[0].filter(vehicle1 => vehicle1.vehicle_id === vehicle);
         tracked_vehicles_int.splice(vehicle,0,vechile_filtered);
     });
 
     console.log('tracked complete',tracked_vehicles_int);
     search_vehicle(9);
 }


async function getData(parsed_arr, distinct, value_arr, tracked_vehicles, tracked_vehicles_int, num_V) {
    // This function turns the data into a parsed csv format to easy distinct vehicle detection
    //! uncomment to match above selection of data
    //const response = await fetch('A2_0_simple_lmap_data.csv');
    const response = await fetch('test.csv');
    const tabledata = await response.text();
    let count = 0;

    const parsed_data = Papa.parse(tabledata, {
        header: true,
        complete: function (results) {
            console.log('papa parse results', results);
            parsed_results.push(results);
        }
    });

    const values = Object.values(parsed_data.data);
    value_arr.push(values);
   // console.log('get data value_arr',value_arr);
    parsed_arr.push(parsed_data);
    // manual parser
    const table = tabledata.split('\n');

    table.forEach(row => {   
        const column = row.split(',');
        const frame = column[0];
        frame_id.push(frame);
        const vehicle = column[1];
        vehicle_id.push(vehicle);
        const x = column[2];
        x_pos.push(x);
        const y = column[3];
        y_pos.push(y);
        const head = column[4];
        heading.push(head);
        const left = column[5];
        left_pos.push(left);
        const len = column[6];
        length.push(len);
        const wdth = column[7];
        width.push(wdth);
    });

    //! Finding the all disctinct values column
    distinct.push(... new Set(vehicle_id));
    distinct.shift(); // correction for named column not needed if lables are removed
    console.log('Number of distinct values detected:', distinct.length);
    num_V.push(distinct.length);
    console.log(distinct);
    vehicleObjectGenerator(distinct, value_arr, tracked_vehicles, tracked_vehicles_int);
}
