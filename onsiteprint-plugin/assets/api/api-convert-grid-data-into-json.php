<?php
    ////////////////////////////////////////
    /////// Convert Grid Data into Json
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

            $newHeader = [ 'id', 'line1', 'line2', 'line3', 'line4', 'line5', 'time', 'active', 'prints' ];

            for( $i=0; $i < count($aUsers); $i++ ) {
                //print_r($aUsers[$i]);
                $array = [];

                foreach( $aUsers[$i] as $key ){
                    $array[] = $key;
                }
                
                $line1 = $array[0] ? $array[0] : '';
                $line2 = $array[1] ? $array[1] : '';
                $line3 = $array[2] ? $array[2] : '';
                $line4 = $array[3] ? $array[3] : '';
                $line5 = $array[4] ? $array[4] : '';

                $newLine = [ uniqid(), $line1, $line2, $line3, $line4, $line5, '', 0, 0 ];
/*                 $newLine = [ uniqid(), $array[0], $array[1], $array[2], $array[3], $array[4], '', 0, 0 ];
 */
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