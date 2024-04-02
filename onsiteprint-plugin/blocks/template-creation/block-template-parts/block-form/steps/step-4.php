<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 4
 ?  Updated: 2024-04-02 - 08:16 (Y:m:d - H:i)
 ?  Info: Step (4), Added Radio Input. 
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */

$stepNumber = 4;

?>

<fieldset class="op-fieldset-step-<?= esc_attr( $stepNumber ) ?>">
    <header class="op-fieldset-header">
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number"><?= esc_attr( $stepNumber ) ?>/<?= esc_attr( $amountOfSteps ) ?></span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_'.$stepNumber.'_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_'.$stepNumber.'_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">
 
       <div id="<?= esc_attr($id) ?>-radio-inputs" class="op-input-wrapper" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_title'] ) ?></p>
            <div class="op-input-validation" data-icon="circle-exclamation">
                <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                <span class="op-message"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_val'] ) ?></span>
            </div>
            <div class="op-form-layouts op-form-radio-inputs">


            <?php 
            
                function get_dir_path( $dirPath ) {
                    // This script displays the URL of the current folder
                    $realDocRoot = realpath ( $_SERVER[ 'DOCUMENT_ROOT' ] );
                    $realDirPath = realpath( $dirPath );
                    $suffix = str_replace( $realDocRoot, '', $realDirPath );
                    $prefix = isset( $_SERVER[ 'HTTPS' ] ) ? 'https://' : 'http://';
                    $folderUrl = $prefix . $_SERVER[ 'HTTP_HOST' ] . $suffix;
                    echo $folderUrl;
                }

                foreach ( glob( OP_ROOT_PATH . 'assets/img/svg/layouts/*/*.svg' ) as $filePath ) { 
                    
                    //$folderName = basename( dirname( $filePath ) );
                    $fileParts = pathinfo( $filePath );
                    $fileBasename = $fileParts[ 'basename' ];
                    $fileName = $fileParts[ 'filename' ];
                    $amountOfLines = substr( $fileName, 0, 2 );
                    $layoutName = substr( $fileName, 3 );
                    $layoutImage = str_contains( $fileName, 'P') ? 'yes' : 'no';

                    ?>
                
                    <div class="op-radio-input" data-layout-lines="<?= $amountOfLines ?>" data-layout-image="<?= $layoutImage ?>">
                        <input type="radio" id="<?= esc_attr( $id ) ?>-<?= $fileName ?>-input" oninput="opFormInputValidation()" name="layout" value="<?= $fileName ?>" required>
                        <label for="<?= esc_attr( $id ) ?>-<?= $fileName ?>-input">
                            <div class="op-radio-check" data-icon="circle-check">
                                <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                            </div>
                            <div class="op-radio-info">
                                <div class="op-image op-flex-col">
                                    <img src="<?= esc_attr( get_dir_path( $filePath ) ) ?> " alt="Amount of Lines: <?= $amountOfLines ?>, Layout: <?= $layoutName ?>, Image: <?= $layoutImage ?>" width="100%" height="auto">
                                </div>
                            </div>
                        </label>
                    </div>

                <?php } ?>
                    

            </div>
        </div>

    </div>
</fieldset>
