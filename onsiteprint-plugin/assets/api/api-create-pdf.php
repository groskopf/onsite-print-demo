<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8" />
    <title>jQuery Shield UI Demos</title>
    <link id="themecss" rel="stylesheet" type="text/css" href="//www.shieldui.com/shared/components/latest/css/light/all.min.css" />
    <script type="text/javascript" src="//www.shieldui.com/shared/components/latest/js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="//www.shieldui.com/shared/components/latest/js/shieldui-all.min.js"></script>
</head>
<body class="theme-light">
<div id="grid"></div>
<script type="text/javascript">
$(document).ready(function () {
    function timeConverter( timestamp, display ){
    
        let time
        let a = new Date( timestamp )

        if ( a == 'Invalid Date' ) {
            return ''
        }

        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let year = a.getFullYear()
        let month = months[ a.getMonth() ]
        let date = a.getDate()
        let hour = a.getHours()
        let min = a.getMinutes()
        let sec = a.getSeconds()

        if ( display == 'time' ) {
            time = `${hour}:${min}`
        } if ( display == 'fuld' ) {
            time = `${date}. ${month} - ${year} (${hour}:${min}:${sec})`
        }

        return time

    }
    function consoleDebug( debug, name, response ) {
        if ( debug == true ) console.log( name, response )
    }
    function getUrlParameters() {
        let prmstr = window.location.search.substr(1)
        return prmstr != null && prmstr != '' ? transformToAssocArray( prmstr ) : {}
    }
    function transformToAssocArray( prmstr ) {
        let params = {}
        let prmarr = prmstr.split('&')
        for ( let i = 0; i < prmarr.length; i++) {
            let tmparr = prmarr[i].split('=')
            params[tmparr[0]] = tmparr[1]
        }
        return params
    }

    ///// Debug the function
    let debug = false // true or false 
    
    let validationElement = document.body

    let eventListId = getUrlParameters().event

    ///// Get Events Storage. 
    let eventStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_EVENTS' ) )   
    
    ///// Validate Event List. 
    if ( eventListId == false || ! eventStorage || ! eventStorage.eventList ) return validationReturn( validationElement, 'Block [Show Event Participants] - This Page has no Event to Show!' )

    ///// Get Event List. 
    let eventList = eventStorage.eventList
    consoleDebug( debug, 'eventList:', eventList )
    
    ///// Get Event Item. 
    let eventItem = eventList.filter( eventList => eventList.eventCreationDate === Number( eventListId ) )
    consoleDebug( debug, eventListId+':', eventItem )
    
    ///// Validate Event Item from Storage. 
    if ( ! eventItem[0] ) return validationReturn( validationElement, 'Block [Show Event Participants] - This Page could not find any Event to Show!' )
    
    ///// Get Participants. 
    let eventParticipants = eventItem[0].eventParticipants
    consoleDebug( true, 'eventParticipants:', eventParticipants )
    
    ///// Create Participant variables. 
    let participantId, participantline1, participantline2, participantline3, participantline4, participantline5, participantPrints, participantTime, participantActive, participantElement
    
    let participantList = []

    ///// For each Participant create Participant Element. 
    for( var i = 0; i < eventParticipants.length; i++ ) {

        participantId = i+1
        participantline1 = eventParticipants[i].line1
        participantline2 = eventParticipants[i].line2
        participantline3 = eventParticipants[i].line3
        participantline4 = eventParticipants[i].line4
        participantline5 = eventParticipants[i].line5
        participantTime = timeConverter( eventParticipants[i].time, 'time' )
        
        participantElement = {
            id: participantId,
            line1: participantline1,
            line2: participantline2,
            line3: participantline3,
            line4: participantline4,
            line5: participantline5,
            time: participantTime
        }

        participantList.push( participantElement )

    }

        $("#grid").shieldGrid({

            exportOptions: {
                proxy: "/filesaver/save",
                pdf: {
                    fileName: "shieldui-export",
                    author: "John Smith",
                    dataSource: {
                        data: participantList
                    },
                    readDataSource: true,
                    header: {
                        cells: [
                            { field: "id", width: 30, title: "ID" },
                            { field: "line1", width: 80, title: "Line 1" },
                            { field: "line2", width: 80, title: "Line 2" },
                            { field: "line3", width: 80, title: "Line 3" },
                            { field: "line4", width: 80, title: "Line 4" },
                            { field: "line5", width: 80, title: "Line 5" },
                            { field: "time", width: 30, title: "Time" }
                        ]
                    }
                }
            }
        });
    });
</script>
</body>
</html>