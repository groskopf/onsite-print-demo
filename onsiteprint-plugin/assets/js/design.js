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

    ///// Validate Bookings Storage.
    const bookingsStorageValidation = validateBookingsStorage()
    consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return validationReturn( validationElement, bookingsStorageValidation.response )
    let bookingsStorageResponse = bookingsStorageValidation.response.bookingList[0].booking.nameTagType

    ///// Validate Templates Storage.
    const templatesStorageValidation = validateTemplatesStorage()
    consoleDebug( debug, 'templatesStorageValidation:', templatesStorageValidation )
    if ( templatesStorageValidation.error !== false ) return validationReturn( validationElement, templatesStorageValidation.response )
    let templatesStorageResponse = templatesStorageValidation.response    
    
    ///// Validate Form Data.
    const formValidation = validateForm( formElement )
    consoleDebug( debug, 'formValidation:', formValidation )
    if ( formValidation.error !== false ) return validationReturn( validationElement, formValidation.response )
    
    ///// Get Upload new Image Response from FastAPI.
    const newImageValidation = await uploadNewImage( formData, validationElement )
    consoleDebug( debug, 'newImageValidation:', newImageValidation )
    let newImageResponse = newImageValidation.response
    
    ///// Get Name Tag Type Response from FastAPI.
    const nameTagTypeValidation = await getNameTagType( bookingsStorageResponse.nameTagTypeId, validationElement )
    consoleDebug( debug, 'nameTagTypeValidation:', nameTagTypeValidation )
    let nameTagTypeResponse = nameTagTypeValidation.response
    
    ///// Get Layouts from Name Tag Type Response.
    let nameTagTypeLaouts = nameTagTypeResponse.layouts

    ///// Get the element for output.
    let container = block.querySelector( '.inner' )
    let filename = newImageResponse.filename.slice(7)      
   
    ///// Define new Template Item variable.
    let templateItem = { 
        'templateCreationDate' : Date.now(), 
        'templateName' : formElement[ 'name' ].value, 
        'templateFilename' : filename, 
        'templateLayouts' : nameTagTypeLaouts
    }
    
    ///// Push Template Item variable into Template List in Lacal Storage.
    templatesStorageResponse.templateList.push( templateItem )
    consoleDebug( debug, 'templatesStorageResponse:', templatesStorageResponse )
    
    ///// Set TEMPLATES in Lacal Storage.
    localStorage.setItem( 'OP_PLUGIN_DATA_TEMPLATES', JSON.stringify( templatesStorageResponse ) )


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