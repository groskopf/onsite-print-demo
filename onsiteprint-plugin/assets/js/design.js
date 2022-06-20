////////////////////////////////////////
/////// Create new Design
////////////////////////////////////////
async function createNewDesign() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let validationElement = block.querySelector( '.validation-info' )
    let formElement = block.querySelector( '.create-design-form' )
      
    ///// Clear the Validation Info Element. 
	validationElement.innerHTML = ''
    validationElement.classList.remove( 'active' )
    
    ///// Get data from the form element.
    let formData = new FormData( formElement )

    ///// Validate Booking Storage.
    const bookingStorageValidation = validateBookingStorage()
    consoleDebug( debug, 'bookingStorageValidation:', bookingStorageValidation )
    if ( bookingStorageValidation.error !== false ) return validationReturn( validationElement, bookingStorageValidation.response )
    let bookingStorageResponse = bookingStorageValidation.response   

    ///// Validate Designs Storage.
    const designsStorageValidation = validateDesignsStorage()
    consoleDebug( debug, 'designsStorageValidation:', designsStorageValidation )
    if ( designsStorageValidation.error !== false ) return validationReturn( validationElement, designsStorageValidation.response )
    let designsStorageResponse = designsStorageValidation.response
    
    ///// Validate Form Data.
    const formValidation = validateForm( formElement )
    consoleDebug( debug, 'formValidation:', formValidation )
    if ( formValidation.error !== false ) return validationReturn( validationElement, formValidation.response )
    
    ///// Get Upload new Image Response from FastAPI.
    const newImageValidation = await uploadNewImage( formData, validationElement )
    consoleDebug( debug, 'newImageValidation:', newImageValidation )
    let newImageResponse = newImageValidation.response
    
    ///// Get Name Tag Type Response from FastAPI.
    const nameTagTypeValidation = await getNameTagType( bookingStorageResponse.name_tag_type, validationElement )
    consoleDebug( debug, 'nameTagTypeValidation:', nameTagTypeValidation )
    let nameTagTypeResponse = nameTagTypeValidation.response
    
    ///// Get Layouts from Name Tag Type Response.
    let nameTagTypeLaouts = nameTagTypeResponse.layouts

    ///// Get the element for output.
    let container = block.querySelector( '.inner' )
    let filename = newImageResponse.filename.slice(7)      
   
    ///// Define new Design variable.
    let design = { 'creationDate' : Date.now(), 'name' : formElement[ 'name' ].value, 'filename' : filename, 'layouts' : nameTagTypeLaouts }
    
    ///// Push Design variable to Designs.
    designsStorageResponse.designs.push( design )
    consoleDebug( debug, 'designsStorageResponse:', designsStorageResponse )
    
    ///// Overwite Designs in Lacal Storage.
    localStorage.setItem( 'OP_PLUGIN_DATA_DESIGNS', JSON.stringify( designsStorageResponse ) )


    //////////////////////////////////////////
    ///// #NG Below must be changed later.
    //////////////////////////////////////////


    ///// Clear all elements in the element. 
    container.innerHTML = ''
    
    ///// Create new element.
    let element = `
        <article>
            <p>${filename}</p>
            <img src="https://api.printerboks.dk/api/v1/${newImageResponse.filename}" width="100%" height="auto">
        </article>
    `

    ///// Add element to the container.
    container.insertAdjacentHTML( 'afterbegin', element )

    ///// Add class to the responses.
    block.querySelector( '.responses' ).classList.add( 'active' )
    
}