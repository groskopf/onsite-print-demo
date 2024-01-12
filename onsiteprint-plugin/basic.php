<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Basic functions to the Plugin.
 *  Author: Gerdes Group
 *  Author URL: https://www.clarify.nu/
 *
 *  @link: https://stackoverflow.com/questions/22221807/session-cookies-http-secure-flag-how-do-you-set-these
 *  @link: https://stackoverflow.com/questions/686155/remove-a-cookie
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 * 
 *  Version: 1.0.2
 ?  Updated: 2024-01-09 - 02:32 (Y:m:d - H:i)

 ---------------------------------------------------------------------------
 #	TABLE OF CONTENTS:
---------------------------------------------------------------------------

	0. 	List of upcoming tasks 
	1. 	Basic Functions
		a. 	Send Response as JSON
		b. 	Check the Server Connection
		c. Get Plugin Url
		d. Return an API Request
		e. Send an Error if Login Session exist
		f. Destroy Login Session.

---------------------------------------------------------------------------
 &	0. List of upcoming tasks
---------------------------------------------------------------------------

---------------------------------------------------------------------------
 #  1. Basic Functions
---------------------------------------------------------------------------
 >  1a. Send Response as JSON.
------------------------------------------------------------ */
function sendResponse( $iHttpCode, $sMessage, $iLine ) {
    http_response_code( $iHttpCode );
    header( 'Content-Type: application/json' );

	if ( ( $iHttpCode >= 200 ) && ( $iHttpCode <= 399 ) ) {
		$error = false;
	} else {
		$error = true;
	}

	$response = array(
		'error'		=> $error, 
		'code'		=> $iHttpCode, 
		'response'	=> $sMessage
	);

	if ( $iHttpCode == 500 ) $response['line'] = $iLine;

	echo json_encode( $response );
    exit();

}

/* ---------------------------------------------------------
 >  1b. Check the Server Connection.
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

		//// Connection is made through HTTP 
		sendResponse( 500, array( 'details' => 'Connection is not secured and page is called from HTTP!' ), __LINE__ );

	}
}

/* ---------------------------------------------------------
 >  1c. Get Plugin Url.
------------------------------------------------------------ */
function getPluginUrl() {

	//// This script returns the URL of the current folder.
    $realDocRoot = realpath($_SERVER['DOCUMENT_ROOT']);
    $realDirPath = realpath(__DIR__);
    $suffix = str_replace($realDocRoot, '', $realDirPath);
    $prefix = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
    $folderUrl = $prefix . $_SERVER['HTTP_HOST'] . $suffix;
    return $folderUrl; 

}

/* ---------------------------------------------------------
 >  1d. Return an API Request.
------------------------------------------------------------ */
class opApiRequest {
	public $url;
	public $fields;
	public $httpHeader;
	
	public function get() {

		//// Initiate cURL session in a variable (resource).
		$curlHandle = curl_init();
		
		//// Set the cURL option.
		curl_setopt_array( $curlHandle, array(
			CURLOPT_URL => $this->url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
		));

		if ( $this->httpHeader ) {
			curl_setopt_array( $curlHandle, array(
				CURLOPT_HTTPHEADER => $this->httpHeader,
			));
		}

		//// Execute cURL & store data in variables.
		$curlResponse = curl_exec( $curlHandle );
		$httpStatus = curl_getinfo( $curlHandle, CURLINFO_HTTP_CODE );
	
		//// Close the cURL session.
		curl_close( $curlHandle );
	
		return $curlResponse;
	
	}
	
	public function post() {

		//// Initiate cURL session in a variable (resource).
		$curlHandle = curl_init();
		
		//// Set the cURL option.
		curl_setopt_array( $curlHandle, array(
			CURLOPT_URL => $this->url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_POSTFIELDS => $this->fields,
		));

		if ( $this->httpHeader ) {
			curl_setopt_array( $curlHandle, array(
				CURLOPT_HTTPHEADER => $this->httpHeader,
			));
		}

		//// Execute cURL & store data in variables.
		$curlResponse = curl_exec( $curlHandle );
		$httpStatus = curl_getinfo( $curlHandle, CURLINFO_HTTP_CODE );
	
		//// Close the cURL session.
		curl_close( $curlHandle );
	
		return $curlResponse;
	
	}

}

/* ---------------------------------------------------------
 >  1e. Send TRUE or FALSE if Login Session exist.
------------------------------------------------------------ */
function checkLoginSession() {

	$opUser = $_COOKIE['OP_PLUGIN_DATA_USER'];
	$opSession = $_COOKIE['OP_PLUGIN_DATA_SESSION'];

	//// Check Login Session (Cookies).
	$checkLogin = new opApiRequest();
	$checkLogin -> url = getPluginUrl() . '/assets/api/session/api-check-session.php';
	$checkLogin -> httpHeader = array(
		'Cookie:OP_PLUGIN_DATA_USER='. $opUser . '; OP_PLUGIN_DATA_SESSION=' . $opSession
	);
	
	//// The Response from the API Request.
	$sessionLogin = json_decode( $checkLogin -> get() );
	
	//// Return TRUE or FALSE.
	return ( $sessionLogin->error ) ? false : true;

}

/* ---------------------------------------------------------
 >  1f. Destroy Login Session.
------------------------------------------------------------ */
function destroyLoginSession() {

	//// Destroy Login Session (Cookies).
	//// Important if the cookie is used later in the code.
	unset( $_COOKIE['OP_PLUGIN_DATA_USER'] );
	setcookie( 'OP_PLUGIN_DATA_USER', '', -1, '/' );
	unset( $_COOKIE['OP_PLUGIN_DATA_SESSION'] );
	setcookie( 'OP_PLUGIN_DATA_SESSION', '', -1, '/' );

}