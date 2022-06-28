////////////////////////////////////////
/////// Cross-browser implementation of element.addEventListener()
////////////////////////////////////////
function listen( evnt, elem, func ) {
    if ( elem.addEventListener )  // W3C DOM
        elem.addEventListener( evnt, func, false )
    else if (elem.attachEvent) { // IE DOM
         var r = elem.attachEvent( "on"+evnt, func )
         return r
    }
    else window.alert( 'I\'m sorry Dave, I\'m afraid I can\'t do that.' )
}
// Use: listen( 'event name', elem, func )



////////////////////////////////////////
///////  Retrieve GET parameters from JavaScript
////////////////////////////////////////
function getSearchParameters() {
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



////////////////////////////////////////
/////// Check if the user are Loged in
////////////////////////////////////////
function checkLogin( block ) {
    
    const login = localStorage.getItem('OP_PLUGIN_DATA_BOOKINGS')
    //console.log( login )

    if ( ! login ) {
        //console.log( 'Ohhh!!!' )
        document.body.setAttribute( 'data-loged-in', false )
        if ( block ) return { login : false }
    } else {
        //console.log( 'Yeah!!!' )       
        document.body.setAttribute('data-loged-in', true )
        if ( block ) return { login : true }
    }
    
}
listen( 'load', window, checkLogin() )



////////////////////////////////////////
/////// Time Converter
////////////////////////////////////////
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



////////////////////////////////////////
/////// Open Content
////////////////////////////////////////
function openContent() {
    event.target.parentElement.classList.toggle('active')
}