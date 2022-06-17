////////////////////////////////////////
/////// Return the Response
////////////////////////////////////////
function returnResponse( error, code, response ) {

    return {
        error : error,
        code : code,
        response : response
    }

}



////////////////////////////////////////
/////// Validate the Fetch Response
////////////////////////////////////////
function validateFetchResponse( validateRequest ) {

    let validateMessage = validateRequest.response
    let validateDetail = validateMessage.detail
    let validateErrorCode = validateRequest.code

    try {
        
        if ( validateMessage == '' ) throw 'Empty string!'

        if ( validateMessage == undefined ) throw 'Undefined string!'

        ///// If the Response is 'detail' or empty ).
        if ( validateDetail ) throw validateDetail

        return returnResponse( false, validateErrorCode, validateMessage )
    
    } catch( validateError ) {
        return returnResponse( true, validateErrorCode, validateError )
    }

}



////////////////////////////////////////
/////// Validate Form
////////////////////////////////////////
function validateForm( formElemnet ) {
    
    let validatedformResponse

    let validateErrorCode

    let formInputs = formElemnet.querySelectorAll( 'input[required]' )
    //console.log(formInputs)

    let validateErrorArray = []

    formInputs.forEach( formInput => {
        let inputId = formInput.getAttribute( 'id' )
        let inputType = formInput.getAttribute( 'type' )
        let inputValidation = document.querySelector( `#${ inputId }-validation` )   
        
        inputValidation.innerHTML = ''
        inputValidation.classList.remove( 'active' )

        try {
            ///// If the Input value is empty.
            if ( ! formInput.value ) {
                validateErrorCode = 400
                throw 'The input field is empty!'
            }
            validatedformResponse = returnResponse( false, 200, 'Validation is approved!' )
        } catch( validateError ) {
            inputValidation.classList.add( 'active' )
            inputValidation.insertAdjacentHTML( 'afterBegin', `<p>* ${ validateError }</p>` )
            validateErrorArray.push( { id : inputId, type : inputType, message : validateError } )
            validatedformResponse = returnResponse( true, validateErrorCode, validateErrorArray )
        }
    })

    return validatedformResponse
}