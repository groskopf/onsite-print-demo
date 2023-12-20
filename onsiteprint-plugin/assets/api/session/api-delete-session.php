<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Delete Session) API.
 *  Deleting the PHP Session in the Browser with Booking Information.
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2023-02-19 - 15:23 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The API Content
--------------------------------------------------------------------------- */

try {

    if ( $_SERVER['REQUEST_METHOD'] === 'DELETE' ) { 
        
        ///// Start Session.
        session_start();

        ///// Validate Booking Item.
        if ( ! isset( $_SESSION['OP_PLUGIN_DATA_BOOKING'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Could not find any Session to Delete!"}';
            exit();
        } else {
            
            ///// Destroy Session.
            session_destroy();
            
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