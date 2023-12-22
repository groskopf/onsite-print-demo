<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Delete Session) API.
 *  Deleting the PHP Session in the Browser with Booking Information.
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2023-12-22 - 04:30 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The API Content
--------------------------------------------------------------------------- */

try {

    if ( $_SERVER['REQUEST_METHOD'] === 'DELETE' ) { 
        
        ///// Start Session.
        //session_start();

        ///// Validate Booking Item.
        if ( ! $_COOKIE['OP_PLUGIN_DATA_SESSION'] ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Could not find any Session to Delete!"}';
            exit();
        } else {
            
            //// Destroy Session.
            //// Important if the cookie is used later in the code.
            unset( $_COOKIE['OP_PLUGIN_DATA_SESSION'] ); 
            setcookie( 'OP_PLUGIN_DATA_SESSION', '', -1, '/' );
            
            ///// Return the Response.
            http_response_code(200);
            header( 'Content-Type: application/json' );
            echo '{"message":"Session was Deleted!"}';
        
        }

    } else {
        http_response_code(400);
        header('Content-Type: application/json');
        echo '{"message":"Wrong Request Method!"}';
        exit();
    }

}

catch( Exception $ex ) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo '{"message":"Error at line: '.__LINE__.'"}';
}