<?php
/* ------------------------------------------------------------------------

 #  API Name: Convert Grid Data into JSON
 *  This PHP file provides an API endpoint to convert Grid Data (uploaded via POST) into a JSON array.
 ?  Updated: 2025-09-19 - 04:45 (Y:m:d - H:i)
 ?  Info: Modified the file to handle QR Code Column and added some more error handling.

--------------------------------------------------------------------------- */

try {

    ///// Get POST parameters
    $gridData = $_POST[ 'json-from-grid' ] ?? '';
    $templateLayout = $_POST[ 'templateLayout' ] ?? '';
    $templateColumns = $_POST[ 'templateColumns' ] ?? '';

    ///// Validate required fields
    if ( empty( $gridData ) ) {
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"Missing Grid Data"}';
        exit();
    }
    if ( empty( $templateLayout ) ) {
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"Missing Template Layout"}';
        exit();
    }
    if ( empty( $templateColumns ) || ! is_numeric( $templateColumns ) || $templateColumns < 1 || $templateColumns > 5 ) {
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"Missing or invalid Template Columns"}';
        exit();
    }
    $templateColumns = (int)$templateColumns;

    ///// Decode JSON
    $aUsers = json_decode( $gridData, true );
    if ( ! is_array( $aUsers ) ) {
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"Invalid JSON data"}';
        exit();
    }

    ///// Define the header for the output JSON
    $newHeader = [ 'id', 'line1', 'line2', 'line3', 'line4', 'line5', 'qrCode', 'time', 'active', 'prints' ];
    $result = [];

    ///// Process each row
    foreach ( $aUsers as $row ) {
        ///// Ensure row is array and not empty
        if ( ! is_array( $row ) || count( array_filter( $row, 'strlen' ) ) === 0 ) {
            continue;
        }
        $array = array_values( $row );

        ///// Assign values to each line based on the number of template columns
        $lines = [];
        for ( $i = 0; $i < 5; $i++ ) {
            $lines[] = ( $i < $templateColumns ) ? ( $array[$i] ?? '' ) : '';
        }

        ///// If the template layout includes a QR code, assign its value
        $qrCode = ( strpos( $templateLayout, 'Q' ) !== false ) ? ( $array[ $templateColumns ] ?? '' ) : '';

        ///// Create a new row with all required fields
        $newLine = array_merge( [ uniqid() ], $lines, [ $qrCode, '', 0, 0 ] );

        ///// Only add rows with at least one non-empty line or QR code
        if ( count( array_filter( $newLine, 'strlen' ) ) > 1 ) {
            $result[] = array_combine( $newHeader, $newLine );
        }
    }

    ///// Check if any valid data rows exist
    if ( count( $result ) === 0 ) {
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"No valid data rows found in Grid Data"}';
        exit();
    }

    ///// Return the result array as JSON with pretty print formatting
    header('Content-Type: application/json');
    echo json_encode( $result, JSON_PRETTY_PRINT );

} catch ( Exception $ex ) {
    ///// Handle any unexpected errors and return a 500 error code
    http_response_code(500);
    header( 'Content-Type: application/json' );
    echo '{"message":"Error ' . __LINE__ . '"}';
}