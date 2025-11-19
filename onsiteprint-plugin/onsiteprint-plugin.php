<?php
/* ------------------------------------------------------------------------

 *	Plugin Name: OnsitePrint Plugin
 *	Plugin URI: http://onsiteprint.dk/
 *	Description: This is a plugin to the site http://onsiteprint.dk/.
 *	Author: Gerdes Group
 *	Author URI: https://www.clarify.nu/
 *	Text Domain: onsiteprint.dk
 *	@package OnsitePrint
 *	Version: 1.2.4
 ?	(Check the Version variable)
 ?  Updated: 2025-11-19 - 01:53 (Y:m:d - H:i)
 ?  Info: Removed unused Functions and cleaned up the code.

---------------------------------------------------------------------------
 #	TABLE OF CONTENTS:
---------------------------------------------------------------------------

	0. 	List of upcoming tasks

	1. 	Plugin Setup
		a. 	Definition of the Name Space
		b. 	Definition of variables
		c. 	Enqueue Scripts
        d. 	Enqueue Styles

	2. 	Custom Block Category Registration

	3. 	ACF Custom Blocks Registration

	3X. OLD ACF Custom Blocks Registration
		1. 	Block: Link Button
        2. 	Block: Toggle Button
		3. 	Block: Booking Information
		4. 	Block: Printer Information
		5. 	Block: Event Information
		6. 	Block: Event Template Information

	4.	Custom Functions
		a. 	Get the URL of the current Path.
		b. 	Performs a case-sensitive check indicating if needle is contained in haystack.
		c. 	Adding the correct type attribute to the script tag.

---------------------------------------------------------------------------
 &	0. List of upcoming tasks
---------------------------------------------------------------------------

    1. Enqueue Styles - Editor

---------------------------------------------------------------------------
 #  1. Plugin Setup
---------------------------------------------------------------------------
 >	1a. Definition of the Name Space
 *	namespace: op (OnsitePrint)
------------------------------------------------------------ */

namespace GerdesGroup\op;

/* ---------------------------------------------------------
 >  1b. Definition of variables
------------------------------------------------------------ */

define('OP_VERSION', '1.2.4');
define('OP_ROOT_PATH', trailingslashit(plugin_dir_path(__FILE__)));
define('OP_ROOT_URL', trailingslashit(plugin_dir_url(__FILE__)));

/* ---------------------------------------------------------
 >  1c. Enqueue Scripts
------------------------------------------------------------ */
function onsiteprint_enqueue_scripts()
{
	wp_enqueue_script('onsiteprint-grid', OP_ROOT_URL . 'assets/js/datagridxl2.js', array(),  OP_VERSION, true);
	wp_enqueue_script('onsiteprint-plugin', OP_ROOT_URL . 'assets/js/plugin.js?type=module', array(),  OP_VERSION, true);
	wp_enqueue_script('onsiteprint-elements', OP_ROOT_URL . 'assets/js/elements.js', array(),  OP_VERSION, true);
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\onsiteprint_enqueue_scripts');

/* ---------------------------------------------------------
 >  1d. Enqueue Styles
------------------------------------------------------------ */
function onsiteprint_enqueue_styles()
{
	wp_enqueue_style('onsiteprint-plugin-styles', OP_ROOT_URL . 'assets/css/onsiteprint-styles.css', array(), OP_VERSION);
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\onsiteprint_enqueue_styles', 20, 1);

//////////////////// #NG: Needs to be looked at again.
function onsiteprint_enqueue_editor_styles()
{
	wp_enqueue_style('onsiteprint-plugin-editor-styles', OP_ROOT_URL . 'assets/css/onsiteprint-styles.css', array(), OP_VERSION);
}
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\onsiteprint_enqueue_editor_styles', 20, 1);


/* ------------------------------------------------------------------------
 #  2. Custom Block Category Registration
 *	Create a new category to the Block view in the Wordpress page/post editor.
--------------------------------------------------------------------------- */
function onsiteprint_plugin_block_categories($categories)
{

	$onsiteprint = array(
		'slug' => 'onsiteprint',
		'title' => __('OnsitePrint Blocks', 'onsiteprint-blocks'),
		'icon'  => 'printer',
	);

	array_unshift($categories, $onsiteprint);
	return $categories;
}
add_filter('block_categories_all', __NAMESPACE__ . '\onsiteprint_plugin_block_categories', 10, 2);


/* ------------------------------------------------------------------------
 #  3. ACF Custom Blocks Registration
 *	Create a new custom block to the Block view.
 --------------------------------------------------------------------------- */
/** @return void * @author Niels Gerdes * @since 1.0.0.38
 --------------------------------------------------------------------------- */
function op_acf_register_blocks()
{
	$op_acf_blocks = glob(OP_ROOT_PATH . 'blocks/*');

	foreach ($op_acf_blocks as $block) {
		register_block_type($block);
	}
}
add_action('acf/init', __NAMESPACE__ . '\op_acf_register_blocks');


/* ------------------------------------------------------------------------
 #  3X. OLD ACF Custom Blocks Registration
 *	Create a new custom block to the Block view.
--------------------------------------------------------------------------- */
function onsiteprint_acf_init()
{
	if (function_exists('acf_register_block_type')) {

		/* ---------------------------------------------------------
		 >  3x1. Block: Link Button
		------------------------------------------------------------ */
		acf_register_block_type(array(
			'name'				=> 'onsiteprint-button-link',
			'title'				=> __('Link Button'),
			'description'		=> __('Displaying a Button with a Custom Link.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/button-link.php',
			//'enqueue_style'     => plugin_dir_path(__FILE__) . 'acf-blocks/testimonial/testimonial.css',
			'category'			=> 'onsiteprint',
			'icon'				=> 'button',
			'supports'          => array(
				'align' 		=> false,
			),
			'keywords'			=> array('onsiteprint', 'button', 'link'),
		));

		/* ---------------------------------------------------------
		 >  3x2. Block: Toggle Button
		------------------------------------------------------------ */
		acf_register_block_type(array(
			'name'				=> 'onsiteprint-button-toggle',
			'title'				=> __('Toggle Button'),
			'description'		=> __('Displaying a Toggle Button. Adding an Additional Data Attribute to the parent or sibling element.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/button-toggle.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'menu-alt',
			'keywords'			=> array('onsiteprint', 'button', 'navigation', 'menu', 'toggle'),
		));

		/* ---------------------------------------------------------
		 >  3x3. Block: Booking Information
		------------------------------------------------------------ */
		acf_register_block_type(array(
			'name'				=> 'onsiteprint-booking-information',
			'title'				=> __('Booking Information'),
			'description'		=> __('Displaying Booking Information, if the User is logged in.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/booking-information.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'info',
			'keywords'			=> array('onsiteprint', 'booking', 'information'),
		));

		/* ---------------------------------------------------------
		 >  3x4. Block: Printer Information
		------------------------------------------------------------ */
		acf_register_block_type(array(
			'name'				=> 'onsiteprint-printer-information',
			'title'				=> __('Printer Information'),
			'description'		=> __('Displaying Printer Information, if the User is logged in.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/printer-information.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'info',
			'keywords'			=> array('onsiteprint', 'printer', 'information'),
		));

		/* ---------------------------------------------------------
		 >  3x5. Block: Event Information
		------------------------------------------------------------ */
		acf_register_block_type(array(
			'name'				=> 'onsiteprint-event-information',
			'title'				=> __('Event Information'),
			'description'		=> __('Displaying Event Information of the current Event, if the User is logged in.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event-information.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'info',
			'keywords'			=> array('onsiteprint', 'event', 'information'),
		));

		/* ---------------------------------------------------------
		 >  3x6. Block: Event Template Information
		------------------------------------------------------------ */
		acf_register_block_type(array(
			'name'				=> 'onsiteprint-event-template-information',
			'title'				=> __('Event Template Information'),
			'description'		=> __('Displaying Event Template Information of the current Event, if the User is logged in.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event-template-information.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'info',
			'keywords'			=> array('onsiteprint', 'event', 'template', 'information'),
		));
	}
}
add_action('acf/init', __NAMESPACE__ . '\onsiteprint_acf_init');


/* ------------------------------------------------------------------------
 #  4. Custom Functions
---------------------------------------------------------------------------
 >  4a. Get the URL of the current Path. (Not used)
------------------------------------------------------------ */
function get_dir_path($dirPath)
{
	$realDocRoot = realpath($_SERVER['DOCUMENT_ROOT']);
	$realDirPath = realpath($dirPath);
	$suffix = str_replace($realDocRoot, '', $realDirPath);
	$prefix = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
	$folderUrl = $prefix . $_SERVER['HTTP_HOST'] . $suffix;
	return $folderUrl;
}

/* ---------------------------------------------------------
 >  4b. Performs a case-sensitive check indicating if needle is contained in haystack.
------------------------------------------------------------ */
// If your PHP version is < 8
if (! function_exists('str_contains')) {
	/**
	 * Based on original work from the PHP Laravel framework.
	 *
	 * @author scm6079
	 * @link https://www.php.net/manual/en/function.str-contains.php#125977 Original Source
	 *
	 * @param string $haystack The string to search in.
	 * @param string $needle   The substring to search for in the haystack.
	 *
	 * @return boolean Returns true if needle is in haystack, false otherwise.
	 */
	function str_contains($haystack, $needle)
	{
		return $needle !== '' && mb_strpos($haystack, $needle) !== false;
	}
}

/* ---------------------------------------------------------
 >  4c. Adding the correct type attribute to the script tag.
------------------------------------------------------------ */
if (! function_exists('ct_set_script_type')) {
	/**
	 * Allows you to indicate that a script should be treated as a module or
	 * importmap by adding the correct type attribute to the script tag that
	 * WordPress will output. When using wp_enqueue_script() you should add
	 * a type parameter to the source indicating what type this file should
	 * be treated as:
	 *
	 * Type module      =>  your-file.js?type=module
	 * Type import map  =>  your-file.json?type=importmap
	 *
	 * @author Christopher Keers (Caboodle Tech)
	 * @link https://gist.github.com/blizzardengle/3e4d5c789f1a13ff8ab86e83738a46c4 Original Source
	 *
	 * @param string $tag    The current HTML script tag WordPress is about to output.
	 * @param string $handle The handle (id) used for this script tag.
	 * @param string $src    The source of the JavaScript file.
	 *
	 * @return string The original HTML from $tag or a modified version with type added to the script tag.
	 */
	function ct_set_script_type($tag, $handle, $src)
	{
		$url = wp_parse_url($src, PHP_URL_QUERY);
		if ($url === false) {
			return $tag;
		}
		parse_str($url, $query);
		if (array_key_exists('type', $query)) {
			$type = 'module';
			if (str_contains($query['type'], 'map')) {
				$type = 'importmap';
			}
			if (str_contains($tag, 'type="')) {
				$tag = preg_replace('/type=".*?"/', 'type="' . $type . '"', $tag);
			} else {
				$tag = str_replace('src=', 'type="' . $type . '" src=', $tag);
			}
			return $tag;
		}
		return $tag;
	}
	add_filter('script_loader_tag', __NAMESPACE__ . '\ct_set_script_type', 10, 3);
}