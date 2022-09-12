
const seg_id = [];
const red = [];
const green = [];
const blue = [];
const rgbStrings = [];
const dataTable = [];
const img = new Image();

dataFile = '/assets/data/A/A2/map_local_seg.csv';

const background = document.getElementById('bground');
const btx = background.getContext('2d');
const w = background.width = (window.innerWidth);
const h = background.height = (window.innerHeight);
btx.beginPath();
btx.rect(0, 0, w, h);
btx.fillStyle = "black";
btx.fill();


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvas_width = canvas.width = (window.innerWidth-200);
const canvas_height = canvas.height = (window.innerHeight-200);


async function getData() {

    const response = await fetch(dataFile);
    const tabledata = await response.text();

    // manual parser
    const table = tabledata.split('\n');
    table.forEach(row => {   
        const column = row.split(',');
        const id = column[0];
        seg_id.push(id);
        const r = column[1];
        red.push(r);
        const g = column[2];
        green.push(g);
        const b = column[3];
        blue.push(b);


        rgbStrings.push(`rgb(${r},${g},${b})`);
        console.log(`rgb(${r},${g},${b})`);

    });

    console.log(table);
    displayImg();
}

async function displayImg() {
    img.src = '/assets/data/A/A2/map_local_seg.png';

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

    
    img.onload = () => {          
        ctx.scale(ratio,ratio);
        ctx.drawImage(img, 200, 50);        
    };
    
    detect();

}

async function detect() {

    //const detectedRGB = [];
    const seg_log = [];


    // Get the modal
    var modal = document.getElementById("segmentModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    document.getElementById("fileName").innerHTML = "Road Identifier: A2"; 

/*
    // Get the button that opens the modal
    var btn = document.getElementById("modalBtn");
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    } 
*/
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    var content = document.getElementById("infoPopup").innerHTML;

    

    document.addEventListener("mousemove", () => {
        let detectedRGB;
        let mousex = event.clientX; // Gets Mouse X
        let mousey = event.clientY; // Gets Mouse Y
        console.log('Coords: ',[mousex, mousey]); // Prints data
        var imageData = ctx.getImageData(mousex, mousey, 1, 1);
        var pixel = imageData.data;

        let color = [];

        //console.log(pixel.length);
        pixel.forEach(e => {
            color.push(e);
        })
        //console.log(color);
        r = color[0];
        g = color[1];
        b = color[2];

        //console.log('Pixel value: ' + pixel);
        detectedRGB = (`rgb(${r},${g},${b})`);
        let temp = detectedRGB;
        seg_log.push(detectedRGB);

 
        if (detectedRGB == 'rgb(0,0,0)') {
            return null;
        } else {
            console.log('Pixel value: ' + detectedRGB);
            let res = matchVals(detectedRGB, rgbStrings);   
            console.log(res);
            console.log('This segment: ',seg_id[res[1]]);
            //console.log(typeof(seg_id[res[1]]));
            //* modal summonings
            //content = seg_id[res[1]];
            document.getElementById("infoPopup").innerHTML = "Selected Segment ID: " + seg_id[res[1]]; 
            //modal.style.display = "block";
            id_parsed = parseInt(seg_id[res[1]]);
            //console.log(typeof(id_parsed));


            if (temp == seg_log[0] || id_parsed == 0) {
                seg_log.shift();
                seg_log.push(temp);
                modal.style.display = "none"; // auto minimize modal for annoyance mitigation
                return null;

            } else {
                document.getElementById("infoPopup").innerHTML = "Selected Segment ID: " + seg_id[res[1]]; 
                //  + "\n RGB reference value: " + seg_id[res[0]
                document.getElementById("rgb_vals").innerHTML = "RGB value of this segment: " + res[0];
                modal.style.display = "inline-block";
            }

            //dispoStats();
            // temp != seg_log[0] && 

        }
        //console.log('Pixel value: ' + detectedRGB);    
      });

      //var displayInfo = document.getElementById('displayInfo');
      //displayInfo.addEventListener('mouseover', displayStats);

      //dispoStats();



      function dispoStats() {

        document.getElementById("segment_view").addEventListener('mouseover', mouseOver);
        document.getElementById("segment_view").addEventListener('mouseout', mouseOut);
    
        function mouseOver() {
            //document.getElementById("segment_view").style.color = "red";
            modal.style.display = "block";
        }
          
        function mouseOut() {
            //document.getElementById("segment_view").style.color = "black";
            modal.style.display = "none";
        }
    
    
    }

}

function matchVals (input, data) {
    let text = input;
    let target = text.substring(4);
    target = String(target);
    let iter = 0;
    let value;
    let key;

    
    data.forEach(color => {

        let targetText = color.substring(4);
        targetText = String(targetText);
        if (target != targetText) {
            iter +=1;
            return 0;
        } else {
            //console.log('Target: ' + target, targetText);
            //console.log(iter);
            let res = data[iter];
            //console.log('Results:', res);
            key = iter;
            iter +=1;
            value = res; 
        }
        
    });
    let valArr = [value, key];
    return valArr;

}

function displayStats() {

    document.addEventListener('DOMContentLoaded', function() {
        var button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = 'Press me';
        button.className = 'btn-styled-dynamic';
     
        button.onclick = function() {
            // …
        };
     
        var container = document.getElementById('container');
        container.appendChild(button);
    }, false);


    var id = document.getElementById("id").value;
    var x = document.getElementById("x_pos").value;
    var y = document.getElementById("y_pos").value;

}



getData();