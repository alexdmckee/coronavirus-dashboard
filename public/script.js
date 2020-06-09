

//document.addEventListener("DOMContentLoaded", () => { loadStateData(); loadWorldData(); });
$(document).ready(function() { $('#states-table').DataTable({
                                ajax: {
                                    url: "data/statesData.json",
                                    dataSrc: 'data'
                                },
                                "paging" : false,
                                "order": [[1,"desc"]]
});
                                $('#asia-table').DataTable({
                                    
                                    "language": { "thousands" : "," },
                                    
                                    "columnDefs": [{
                                        // The `data` parameter refers to the data for the cell (defined by the
                                        // `data` option, which defaults to the column being worked with, in
                                        // this case `data: 0`.
                                        "render": function ( data, type, row ) {
                                            if (type == 'display')
                                            {
                                                return '↑ ' + data +' (%'+ ((row[2] / row[1]) * 100).toFixed(2) +')';
                                            }
                                            return data;
                                        },
                                        "targets": 2
                                    }],
                                    
                                    ajax: {
                                        url: "data/asiaData.json",
                                        dataSrc: 'data'
                                    },
                                    createdRow: function ( row, data, index ) {
                                        if ( data[2] != "0" ) {
                                            $('td', row).eq(2).addClass('alert');
                                        }
                                    

                                    },
                                    "paging" : false,
                                    "order": [[1,"desc"]]
                                });                 
                                $('#NA-table').DataTable({

                                    "language": { "thousands" : "," },
                                    
                                    "columnDefs": [{
                                        // The `data` parameter refers to the data for the cell (defined by the
                                        // `data` option, which defaults to the column being worked with, in
                                        // this case `data: 0`.
                                        "render": function ( data, type, row ) {
                                            if (type == 'display')
                                            {
                                                return '↑ ' + data +' (%'+ ((row[2] / row[1]) * 100).toFixed(2) +')';
                                            }
                                            return data;
                                        },
                                        "targets": 2
                                    }],
                                    // "columnDefs": [{
                                    //     // The `data` parameter refers to the data for the cell (defined by the
                                    //     // `data` option, which defaults to the column being worked with, in
                                    //     // this case `data: 0`.
                                    //     "render": function ( data, type, row ) {
                                    //         if (type == 'display')
                                    //         {
                                    //             return ' ' + data +' number ('+ ((parseInt(row[12].replace(/,/g, ''), 10) * parseInt(row[13].replace(/,/g, ''), 10))).toLocaleString('en') +')';
                                    //         }
                                    //         return data;
                                    //     },
                                    //     "targets": 14
                                    // }],
                                    ajax: {
                                        url: "data/NAData.json",
                                        dataSrc: 'data'
                                    },
                                    "paging" : false,
                                    "order": [[1,"desc"]]
                                });              
                               $('#world-table').DataTable({
                                   ajax: {
                                       url: "data/worldData.json",
                                       dataSrc: "data"
                                   },
                                   "paging" : false,
                                   "order": [[1,"desc"]],
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



