<?php
/* ------------------------------------------------------------------------
 *  Template Name: Step 1
 ?  Updated: 2022-12-16 - 09:45 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Template Data
--------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------
 #  The Template Content
--------------------------------------------------------------------------- */
?>

<label for="<?= esc_attr($id) ?>-name-input">Template Name</label>
<div id="<?= esc_attr($id) ?>-name-input-validation" class="validation-error"></div>
<input id="<?= esc_attr($id) ?>-name-input" name="name" type="text" required>