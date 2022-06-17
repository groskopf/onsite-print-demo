////////////////////////////////////////
/////// Create new Design
////////////////////////////////////////
async function createNewDesign() {
    ///// Debug the function
    let debug = false //true 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let loginValidation = block.querySelector( '.login-validation' )
    let formElement = block.querySelector( '.create-design-form' )
      
    ///// Clear all elements in the element. 
	loginValidation.innerHTML = ''
    loginValidation.classList.remove( 'active' )

    ///// Get Local Storages.
    let bookingStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_BOOKING' ) )   
    let designsStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_DESIGNS' ) )   
    
    ///// Create Designs Storage if empty.
    if ( ! designsStorage ) {
        designsStorage = { 'designs' : [] }
    }

    ///// Get Designs in Designs Storage
    let designsArray = designsStorage.designs

    ///// Validate Booking Storage.
    if ( ! bookingStorage || bookingStorage.booking_code !== '6H7MQZVUUZFIJNI' ) {
        console.log( 'Error: You are not loged in!' )

        ///// Add element to the validate.
        loginValidation.insertAdjacentHTML( 'afterbegin', `<div><p class="validate-info"><span>*</span> You are not loged in!</p></div>` )
        loginValidation.classList.add( 'active' )

        ///// End the function.
        return
    } else {
        
        const validateFormResponse = validateForm( formElement )
        //console.log(validateFormResponse)

        if ( validateFormResponse.error !== false ) return console.log( validateFormResponse )   
       
        ///// Get data from the form element.
        let formData = new FormData( formElement )
        
        ///// Request Options for fetch.
        let options = {
            ///// *GET, POST, PUT, DELETE, etc.
            method: 'POST',
            body: formData
        }

        ///// The URL to the API.
        var url = 'https://api.printerboks.dk/api/v1/images/'

        ///// Request the data from the API.
        ///// fetchAPI( *url, options, 'blob/json', debug ).
        let request = fetchAPI( url, options, 'json', debug )
        
        ///// Wait for Response of the Request.
        let fetchResponse = await request
        //console.log(fetchResponse)

        let validateResponse = validateFetchResponse( fetchResponse )
        //console.log(validateResponse)
        
        const response = validateResponse.response
    
        if ( validateResponse.error == true ) {
            loginValidation.insertAdjacentHTML( 'afterBegin', '<p>* '+response+'</p>' )
            loginValidation.classList.add( 'active' )
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
        let design = { 'creationDate' : Date.now(), 'name' : formElement[ 'name' ].value, 'filename' : filename, 'layouts' : nameTagType }
        
        ///// Push Design variable to Designs.
        designsArray.push( design )
        
        ///// Overwite Designs in Lacal Storage.
        localStorage.setItem( 'OP_PLUGIN_DATA_DESIGNS', JSON.stringify( designsStorage ) )

    }

}