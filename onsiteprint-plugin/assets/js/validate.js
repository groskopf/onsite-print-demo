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