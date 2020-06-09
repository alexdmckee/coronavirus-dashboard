const statesBody = document.querySelector("#states-table > tbody");
const worldBody = document.querySelector("#world-table > tbody");
const worldHeaders = document.querySelector("#world-table > thead > tr")
//console.log(statesBody)


function loadStateData (){
    const request = new XMLHttpRequest();
    console.log("in load state data");
    /*const fs = require('fs');
    let rawdata = fs.readFileSync('data/statesJSON.json');
    let states = JSON.parse(rawdata);*/

    // const jsonString = 'data/statesJSON.json';
    request.open("GET", "data/statesJSON.json");
    request.onload = () => {
       try {
        console.log("in try of loadStateData");
        const json = JSON.parse(request.responseText);  // responseText is the actual json
        populateStates(json);
    } catch(e) {
        console.warn("Could not load state data :(");
    }
};

request.send()
}

function populateStates(json){
        //clear out existing table date
     console.log("in populateStates");   
    console.log(json);
        while(statesBody.firstChild) {
            statesBody.removeChild(statesBody.firstChild);
        }

        //populate table
        json.forEach((row) => {
            //console.log(row);
            const tr = document.createElement("tr");
            row.forEach((cell) => {
               // console.log(cell);
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });

            statesBody.appendChild(tr);
        });
}
// -------------------------------------------- POPULATE WORLD DATA ---------------------------------------------------
function loadWorldData() {
    console.log("in populate world");

    const request1 = new XMLHttpRequest();
    request1.open("GET", "data/worldData.json" )

    request1.onload = () => {
       try {
        console.log("in try of loadWorldData");
        const json1 = JSON.parse(request1.responseText);  // responseText is the actual json
        populateWorldTable(json1);
    } catch(e) {
        console.warn("Could not load world data :(");
    }
    
}
request1.send();
}

function populateWorldTable(json)
{
    // Clear headers and body
    while(worldHeaders.firstChild)
    {
        worldHeaders.removeChild(worldHeaders.firstChild);
    }
    while(worldBody.firstChild)
    {
        worldBody.removeChild(worldBody.firstChild);
    }

    data = json.data;
    columns = json.columns;
    console.log(json);


      // Iterate each column and print table headers for Datatables
      columns.forEach((colName) => {
        str = '<th>' + colName + '</th>';
        $(str).appendTo("#world-table"+'>thead>tr');
    });
   
    data.forEach((row) => {
        tr = document.createElement("tr");
        row.forEach((cell) => {
               // console.log(cell);
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });

            worldBody.appendChild(tr);
        
    });

 
}

//document.addEventListener("DOMContentLoaded", () => { loadStateData(); loadWorldData(); });
$(document).ready(function() { $('#states-table').DataTable({
                                ajax: {
                                    url: "../data/statesJSON.json",
                                    dataSrc: ''
                                }
});
                                $('#asia-table').DataTable({
                                    ajax: {
                                        url: "../data/asiaData.json",
                                        dataSrc: 'data'
                                    },
                                    createdRow: function ( row, data, index ) {
                                        if ( data[2] != "0" ) {
                                            $('td', row).eq(2).addClass('alert');
                                        }
                                    },
                                    "paging" : false
                                });                 
                                $('#NA-table').DataTable({
                                    ajax: {
                                        url: "../data/NAData.json",
                                        dataSrc: 'data'
                                    },
                                    "paging" : false
                                });              
                               $('#world-table').DataTable({
                                   ajax: {
                                       url: "../data/worldData.json",
                                       dataSrc: "data"
                                   }
                                   
                               }
// //                                 {
                                   
// // "order": [[2,"desc"]],
// // "paging" : false,
// // "columnDefs": [ {
// // "targets": 2,
// // "searchable": false,
// // "className" : "my_class"
// // }, 
// // {
// // "targets": 3,
// // "className" : "my_class"
// // }]
// }
                                   
                               ); } ); 