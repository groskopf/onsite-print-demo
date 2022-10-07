////////////////////////////////////////
/////// Check if multible [Create new Template] Blocks is on page
////////////////////////////////////////
function checkCreateNewTemplateBlock() {

    ///// Debug the function
    let debug = false // true or false 

    let blocks = document.querySelectorAll( '.op-create-template' )
    consoleDebug( debug, 'blocks:', blocks )

    let layoutElement

    if ( blocks ) {
        blocks.forEach( block => {
            
            let blockId = block.getAttribute( 'id' )
            let container = block.querySelector( `#${ blockId }-radio-input` )

            ///// Validate Bookings Storage.
            const bookingsStorageValidation = validateBookingsStorage()
            consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
            if ( bookingsStorageValidation.error !== false ) return validationReturn( validationElement, bookingsStorageValidation.response )
            let nameTagTypeLayouts = bookingsStorageValidation.response.bookingList[0].booking.nameTagType.nameTagTypeLayouts

            for( var i = 0; i < nameTagTypeLayouts.length; i++ ) {
                consoleDebug( debug, 'nameTagTypeLayout-'+i+':', nameTagTypeLayouts[i] )

                layoutElement = `
                    <div class="input-inner">
                        <input type="radio" id="${ blockId }-${ nameTagTypeLayouts[i] }-input" name="layout" value="${ nameTagTypeLayouts[i] }">
                        <label for="${ blockId }-${ nameTagTypeLayouts[i] }-input" class="input-outer flex-wrap">
                            ${ nameTagTypeLayouts[i] }
                            <img src="https://www.ejl.dk/images/joomlart/supported-layout/magazine.png" alt="Prøve" width="100" height="auto">
                        </label>
                    </div>
                `

                ///// Add element to the container.
                container.insertAdjacentHTML( 'beforeEnd', layoutElement )
            }           
        })
    }
}
listen( 'load', window, checkCreateNewTemplateBlock() )



////////////////////////////////////////
/////// Create new Template
////////////////////////////////////////
async function createNewTemplate( relocate ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let validationElement = block.querySelector( '.validation-info' )
    let formElement = block.querySelector( '.create-template-form' )
      
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
    
    ///// Get the element for output.
    let filenameUploaded = newImageResponse.filename.slice(7)      
   
    let dateNow = Date.now()

    let fileInput = formElement[ 'image' ];   
    let filenameOriginal = fileInput.files[0].name;

    ///// Define new Template Item variable.
    let templateItem = { 
        'templateCreationDate' : dateNow, 
        'templateName' : formElement[ 'name' ].value, 
        'templateFilenameOriginal' : filenameOriginal,
        'templateFilenameUploaded' : filenameUploaded,
        'templateLayout' : formElement[ 'layout' ].value
    }
    
    ///// Push Template Item variable into Template List in Lacal Storage.
    templatesStorageResponse.templateList.push( templateItem )
    consoleDebug( debug, 'templatesStorageResponse:', templatesStorageResponse )
    
    ///// Set TEMPLATES in Lacal Storage.
    localStorage.setItem( 'OP_PLUGIN_DATA_TEMPLATES', JSON.stringify( templatesStorageResponse ) )

    //////////////////////////////////////////
    ///// #NG Below must be changed later.
    //////////////////////////////////////////

    if ( relocate ) return window.location.replace( `${ relocate }` )

    window.location.replace(`opret-event/?template=${ dateNow }`)

}