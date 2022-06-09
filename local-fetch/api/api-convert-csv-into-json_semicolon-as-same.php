<?php
    ////////////////////////////////////////
    /////// Get List from CSV with Semicolon
    ////////////////////////////////////////
    try {
        
        ///// Get POST (csv-file).
        $file = $_FILES['csv-file'];

        ///// Validate CSV file.
        if( ! isset($file) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"error":"Missing File"}';
            exit();
        } else {

            ///// Get CSV file.
            $fileContent = file_get_contents($file['tmp_name']);
            //print_r($fileContent);
            
            ///// Convert file to array with one line for each element. 
            $data = explode(PHP_EOL, $fileContent);
            //print_r($data);

            ///// Function to convert to UTF8. 
            function utf8_converter($array) {
                array_walk_recursive($array, function(&$item, $key){
                    if(!mb_detect_encoding($item, 'utf-8', true)){
                            $item = utf8_encode($item);
                    }
                });

                ///// Return array as UTF8.
                return $array;
            }      

            ///// Convert array to UTF8.
            $lines = array_filter(utf8_converter($data));
            //print_r($lines);

            ///// Get first element in array header(keys).
            $header = str_getcsv(array_shift($lines), ';');
            //print_r($header);
            
            date_default_timezone_set('Europe/Copenhagen');
            ///// Epoch Timestamp - https://www.epochconverter.com/
            
            ///// Create array for each element in the array.
            for ($i=0; $i < count($lines) ; $i++) { 
                ///// Create array of the element.
                $line = str_getcsv($lines[$i], ';');

                ///// Combine header(keys) with the new array.
                $result[] = array_combine($header, $line);
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


