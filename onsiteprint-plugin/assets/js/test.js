if ( detail ) {
    let detailErrors = []
    let error

    for( let i = 0; i < detail.length; i++ ){

        ///// If loc array in the Detail array contains 'image'.
        if ( detail[i].loc[1] ) {
            console.log( 'Message:', detail[i].loc[1], detail[i].msg )

            error = { 'loc' : detail[i].loc[1], 'msg' : detail[i].msg }

            ///// Push Design variable to Detail Errors.
            detailErrors.push( error )
        } else {
            console.log( 'Error:', response )
        }

    }
}