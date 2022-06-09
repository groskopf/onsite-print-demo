<?php
    ////////////////////////////////////////
    /////// Get List from CSV with Semicolon
    ////////////////////////////////////////
    try {
        
        ///// Get POST (csv-file).
        $file = $_POST['json-from-grid'];

        ///// Validate CSV file.
        if( ! isset($file) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"error":"Missing File"}';
            exit();
        } else {

            //////// Convert the string(text) to an array
            $aUsers = json_decode($file);
                      
            $result = [];

            $newHeader = [ 'id', 'line_1', 'line_2', 'line_3', 'line_4', 'line_5', 'date', 'active', 'prints' ];

            date_default_timezone_set('Europe/Copenhagen');
            ///// Epoch Timestamp - https://www.epochconverter.com/

            for( $i=0; $i < count($aUsers); $i++ ) {
                //print_r($aUsers[$i]);
                $array = [];

                foreach( $aUsers[$i] as $key ){
                    $array[] = $key;
                }
                
                $newLine = [ uniqid(), $array[0], $array[1], $array[2], 'line_4', 'line_5', date(time()), 0, 0 ];

                ///// Combine header(keys) with the new array.
                $result[] = array_combine($newHeader, $newLine);
            }

            ///// Return array as json.
            header('Content-Type: application/json');
            echo json_encode($result, JSON_PRETTY_PRINT);
        
        }
    }

    catch( Exception $ex ) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo '{"message":"Error '.__LINE__.'"}';
    }