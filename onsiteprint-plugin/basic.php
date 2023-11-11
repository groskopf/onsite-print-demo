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
		b. 	Check the Server Connection

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

/* ---------------------------------------------------------
 >  1b. Check the Server Connection
------------------------------------------------------------ */
function checkConnection() {
	// checking if $_SERVER['HTTPS'] is set and its value is 'on'  
	// or '1' and if server port number is 443 then we can say the  
	// connection is made through HTTPS 
	if ( isset( $_SERVER['HTTPS'] ) ) {
		
		if ( $_SERVER['HTTPS'] == 'on' && $_SERVER['SERVER_PORT'] == 443 ) {
			///// Connection is secured and page is called from HTTPS.
			return true;
		}

	} else { 
		// Connection is made through HTTP 
		sendError( 500, 'Connection is not secured and page is called from HTTP!', __LINE__ );
	}
}