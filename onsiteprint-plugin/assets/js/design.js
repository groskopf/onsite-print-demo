////////////////////////////////////////
/////// Get Name Tag Type Layouts
////////////////////////////////////////
async function getNameTagTypeLayouts( nameTagType ) {

    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/layouts/name_tags/'+nameTagType

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'GET'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' ).
    let request = fetchAPI( url, options )
    
    ///// Wait for Response of the Request.
    let response = await request

    ///// Show the Response in Console Log.
    //console.log(response)

    ///// If the Response is empty or undefined.
    if ( response == '' || response == undefined ) {
        console.log( 'Error: The Response is empty or undefined.' )

        ///// End the function.
        return
    }

    ///// If the Response is 'detail' or empty ).
    ///// Can be used in if statement instead ( Object.keys(response) == 'detail' ).
    else if ( response.detail ) {

        ///// Get the Detail array.
        let detail = response.detail

        for( let i = 0; i < detail.length; i++ ){

            ///// If loc array in the Detail array contains 'image'.
            if ( detail[i].loc[1] ) {
                console.log( 'Message:', detail[i].loc[1], detail[i].msg )
            } else {
                console.log( 'Error:', response )
            }
       
        }
        
        ///// End the function.
        return
    }

    ///// All layouts in the Element. 
    return response.layouts

}



////////////////////////////////////////
/////// Create new Design
////////////////////////////////////////
async function createNewDesign() {
   
    ///// Get Local Storages.
    let bookingStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_BOOKING' ) )   
    let designsStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_DESIGNS' ) )   
    
    ///// Create Designs Storage if empty.
    if ( ! designsStorage ) {
        designsStorage = { 'designs' : [] }
    }

    ///// Get Designs in Designs Storage
    let designsArray = designsStorage.designs

    ///// Get [Block] Elenment.
    let block = event.target.closest( '.OP-block' )

    ///// Get the element for output.
    let validate = block.querySelector( '.form-container' ).querySelector( '.form-validate' )

    ///// Clear all elements in the element. 
	validate.innerHTML = ''

    ///// Validate Booking Storage.
    if ( ! bookingStorage || bookingStorage.booking_code !== '6H7MQZVUUZFIJNI' ) {
        console.log( 'Error: You are not loged in!' )

        ///// Add element to the validate.
        validate.insertAdjacentHTML( 'afterbegin', `<div><p class="validate-info"><span>*</span> You are not loged in!</p></div>` )

        ///// End the function.
        return
    } else {
        
        ///// Get the form element.
        let formElemnet = block.querySelector( '.upload-new-image' )
        
        ///// Get data from the form element.
        let formData = new FormData( formElemnet )
        
        ///// If the image (file) value is empty.
        if ( formElemnet[ 'image' ].value == '' || formElemnet[ 'name' ].value == '' ) {
            console.log( 'Error: One of the input fields are empty!' )

            ///// Add element to the validate.
            validate.insertAdjacentHTML( 'afterbegin', `<div><p class="validate-info"><span>*</span> One of the input fields are empty!</p></div>` )

            ///// End the function.
            return
        }

        ///// Request Options for fetch.
        let options = {
            ///// *GET, POST, PUT, DELETE, etc.
            method: 'POST',
            body: formData
        }

        ///// The URL to the API.
        var url = 'https://api.printerboks.dk/api/v1/images/'

        ///// Request the data from the API.
        ///// fetchAPI( *url, options, 'blob', 'debug' ).
        let request = fetchAPI( url, options )
        
        ///// Wait for Response of the Request.
        let response = await request

        ///// Show the Response in Console Log.
        console.log(response)

        ///// If the Response is empty or undefined.
        if ( response == '' || response == undefined ) {
            console.log( 'Error: The Response is empty or undefined.' )

            ///// End the function.
            return
        }

        ///// If the Response is 'detail' or empty ).
        ///// Can be used in if statement instead ( Object.keys(response) == 'detail' ).
        else if ( response.detail ) {

            ///// Get the Detail array.
            let detail = response.detail[0]
            
            ///// If loc array in the Detail array contains 'image'.
            if ( detail.loc.includes( 'image' ) ) {
                console.log( 'Message:', detail.msg )
            } else {
                console.log( 'Error:', response )
            }
            
            ///// End the function.
            return
        }
    
        ///// Get the element for output.
        let container = block.querySelector( '.inner' )
        let filename = response.filename.slice(7)      

        ///// Clear all elements in the element. 
        container.innerHTML = ''
        
        ///// Create new element.
        let element = `
            <article>
                <p>${filename}</p>
                <img src="https://api.printerboks.dk/api/v1/${response.filename}" width="100%" height="auto">
            </article>
        `

        ///// Add element to the container.
        container.insertAdjacentHTML( 'afterbegin', element )

        ///// Add class to the responses.
        block.querySelector( '.responses' ).classList.add( 'active' )
    
        ///// Get layouts from FastAPI.
        let nameTagType = await getNameTagTypeLayouts( bookingStorage.name_tag_type )
        
         ///// Define new Design variable.
        let design = { 'creationDate' : Date.now(), 'name' : formElemnet[ 'name' ].value, 'filename' : filename, 'layouts' : nameTagType }
        
        ///// Push Design variable to Designs.
        designsArray.push( design )
        
        ///// Overwite Designs in Lacal Storage.
        localStorage.setItem( 'OP_PLUGIN_DATA_DESIGNS', JSON.stringify( designsStorage ) )

    }

}
