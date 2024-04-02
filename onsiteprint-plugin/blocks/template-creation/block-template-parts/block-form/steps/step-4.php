<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 4
 ?  Updated: 2024-04-02 - 11:04 (Y:m:d - H:i)
 ?  Info: Changed variables and Step 4.
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
            <div class="op-form-layouts op-form-radio-inputs" data-layout-lines="0" data-layout-image="0">

                <?php 

                    foreach ( glob( OP_ROOT_PATH . 'assets/img/svg/layouts/*/*.svg' ) as $file ) { 
                        
                        //$folderName = basename( dirname( $filePath ) );
                        $fileParts = pathinfo( $file );
                        $fileBasename = $fileParts[ 'basename' ];
                        $fileName = $fileParts[ 'filename' ];
                        $amountOfLines = substr( $fileName, 0, 2 );
                        $layoutName = substr( $fileName, 3 );
                        $layoutImage = str_contains( $fileName, 'P') ? 'yes' : 'no';
                        $filePath = OP_ROOT_URL . 'assets/img/svg/layouts/' . $amountOfLines . '/' . $fileBasename;

                        ?>
                    
                        <div class="op-radio-input" data-layout-lines="<?= $amountOfLines ?>" data-layout-image="<?= $layoutImage ?>">
                            <input type="radio" id="<?= esc_attr( $id ) ?>-<?= $fileName ?>-input" oninput="opFormInputValidation()" name="layout" value="<?= $fileName ?>" required>
                            <label for="<?= esc_attr( $id ) ?>-<?= $fileName ?>-input">
                                <div class="op-radio-check" data-icon="circle-check">
                                    <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                                </div>
                                <div class="op-radio-info">
                                    <div class="op-image op-flex-col">
                                        <img src="<?= esc_attr( $filePath ) ?>" alt="Amount of Lines: <?= $amountOfLines ?>, Layout: <?= $layoutName ?>, Image: <?= $layoutImage ?>" width="100%" height="auto">
                                    </div>
                                </div>
                            </label>
                        </div>

                <?php } ?>

            </div>
        </div>

    </div>
</fieldset>
