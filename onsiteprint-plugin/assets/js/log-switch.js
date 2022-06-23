////////////////////////////////////////
/////// Log in with Booking Code
////////////////////////////////////////
async function loginWithBookingCode() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let validationElement = block.querySelector( '.validation-info' )
    let formElement = block.querySelector('.login-form')
    
    ///// Clear the Validation Info Element. 
	validationElement.innerHTML = ''
    validationElement.classList.remove( 'active' )

    ///// Get booking-code (text) value form form.
    let bookingCode = formElement['booking-code'].value   

    ///// Validate Form Data.
    const formValidation = validateForm( formElement )
    consoleDebug( debug, 'formValidation:', formValidation )
    if ( formValidation.error !== false ) return validationReturn( validationElement, formValidation.response )
          
    ///// Get Booking from FastAPI.
    const bookingValidation = await getBookingWithBookingCode( bookingCode, false )
    consoleDebug( debug, 'bookingValidation:', bookingValidation )
    if ( bookingValidation.error !== false ) return validationReturn( validationElement, bookingValidation.response )
    let bookingResponse = bookingValidation.response

    ///// Validate Login.
    const loginValidation = validateLogin( bookingCode )
    consoleDebug( debug, 'loginValidation:', loginValidation )
    if ( loginValidation.error !== false ) return validationReturn( validationElement, loginValidation.response )
    let loginResponse = loginValidation.response

    ///// Get Name Tag Type Response from FastAPI.
    const nameTagTypeValidation = await getNameTagType( bookingResponse.name_tag_type, validationElement )
    consoleDebug( debug, 'nameTagTypeValidation:', nameTagTypeValidation )
    let nameTagTypeResponse = nameTagTypeValidation.response

    ///// Validate Templates Storage.
    const templatesStorageValidation = validateTemplatesStorage()
    consoleDebug( debug, 'templatesStorageValidation:', templatesStorageValidation )
    if ( templatesStorageValidation.error !== false ) return validationReturn( validationElement, templatesStorageValidation.response )
    let templatesStorageResponse = templatesStorageValidation.response    
    
    ///// Validate Events Storage.
    const eventsStorageValidation = validateEventsStorage()
    consoleDebug( debug, 'eventsStorageValidation:', eventsStorageValidation )
    if ( eventsStorageValidation.error !== false ) return validationReturn( validationElement, eventsStorageValidation.response )
    let eventsStorageResponse = eventsStorageValidation.response
    
    let bookingList = loginResponse.bookingList

    if ( loginValidation.code === 204 ) { 
        consoleDebug( debug, `${ bookingResponse.booking_code }:`, 'New Booking created!' )

        ///// Get Layouts from Name Tag Type Response.
        let nameTagTypeLaouts = nameTagTypeResponse.layouts
    
        ///// Define new Booking Item variable.
        let bookingItem = {
            'booking' : { 
                'bookingId' : bookingResponse.booking_code, 
                'bookingStartDate' : bookingResponse.start_date, 
                'bookingEndDate' : bookingResponse.end_date,
                'printerId' : bookingResponse.printer_code, 
                'nameTagType' : {
                    'nameTagTypeId' : bookingResponse.name_tag_type, 
                    'nameTagTypeLayouts' : nameTagTypeLaouts
                }
            },
            'firstLoginDate' : Date.now(), 
            'lastLoginDate' : Date.now()
        }
    
        ///// Push Booking Item variable into Booking List in Lacal Storage.
        bookingList.push( bookingItem )

    } else if ( loginValidation.code === 302 ) { 
    
        for( var i = 0; i < bookingList.length; i++ ) {   

            if ( bookingList[i].booking.bookingId === bookingResponse.booking_code ) {
                consoleDebug( debug, `${ bookingResponse.booking_code }:`, 'Booking was updated!' )
                bookingList[i].lastLoginDate = Date.now()
            }

        }        
    }
    
    ///// Set Lacal Storage.
    localStorage.setItem( 'OP_PLUGIN_DATA_BOOKINGS', JSON.stringify( loginResponse ) )
    localStorage.setItem( 'OP_PLUGIN_DATA_TEMPLATES', JSON.stringify( templatesStorageResponse ) )
    localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( eventsStorageResponse ) )


    //////////////////////////////////////////
    ///// #NG Below must be changed later.
    //////////////////////////////////////////


    window.location.reload()

}