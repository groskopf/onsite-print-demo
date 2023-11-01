<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Basic functions to the Plugin.
 *  Author: Gerdes Group
 *  Author URL: https://www.clarify.nu/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2023-11-01 - 05:30 (Y:m:d - H:i)

 ---------------------------------------------------------------------------
 #	TABLE OF CONTENTS:
---------------------------------------------------------------------------

	0. 	List of upcoming tasks 
	1. 	Basic Functions
		a. 	Send an Error as JSON

---------------------------------------------------------------------------
 &	0. List of upcoming tasks
---------------------------------------------------------------------------

---------------------------------------------------------------------------
 #  1. Basic Functions
---------------------------------------------------------------------------
 >  1a. Send an Error as JSON
------------------------------------------------------------ */
function sendError( $iErrorCode, $sMessage, $iLine ) {
    http_response_code( $iErrorCode );
    header( 'Content-Type: application/json' );
    echo '{ "error": "true", "code": "'.$iErrorCode.'", "response": { "message": "'.$sMessage.'", "line": "'.$iLine.'" } }';
    exit();
}