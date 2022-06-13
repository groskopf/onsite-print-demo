<?php
/**
 * Plugin Name: OnsitePrint Plugin
 * Plugin URI: http://onsiteprint.dk/
 * Description: This is a plugin to the site http://onsiteprint.dk/.
 * Version: 1.0
 * Author: Gerdes Group
 * Author URI: https://www.clarify.nu/
 */


define( 'ONSITEPRINT_DIR', plugins_url( '', __FILE__ ) );


/*	Enqueue scripts. */ 
function onsiteprint_enqueue_scripts() {
	wp_enqueue_script( 'onsiteprint-fetch-js', ONSITEPRINT_DIR . '/assets/js/fetch.js', array(),  wp_get_theme()->get( 'Version' ), true );
	wp_script_add_data( 'onsiteprint-fetch-js', 'async', true );
	wp_enqueue_script( 'onsiteprint-bookings-js', ONSITEPRINT_DIR . '/assets/js/bookings.js', array(),  wp_get_theme()->get( 'Version' ), true );
	wp_script_add_data( 'onsiteprint-bookings-js', 'async', true );
}
add_action( 'wp_enqueue_scripts', 'onsiteprint_enqueue_scripts' );


/*	Enqueue styles. */ 
function onsiteprint_enqueue_styles() {
	wp_enqueue_style( 'onsiteprint-styles-css', ONSITEPRINT_DIR . '/assets/css/onsiteprint-styles.css', array(), wp_get_theme()->get( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', 'onsiteprint_enqueue_styles', 20, 1 );


/*	Create a new category to the Block view in the Wordpress page/post editor. */ 
function onsiteprint_plugin_block_categories( $categories, $post ) {
    if ( $post->post_type !== 'page' ) {
      return $categories;
    }
    $onsiteprint = array(
      'slug' => 'onsiteprint',
      'title' => __( 'OnsitePrint Blocks', 'onsiteprint-blocks' ),
      'icon'  => 'printer',
    );
  
    array_unshift( $categories, $onsiteprint );
    return $categories;
}
add_filter( 'block_categories', 'onsiteprint_plugin_block_categories', 10, 2 );


/*	Create a new custom block to the Block view. */ 
function onsiteprint_acf_init() {
	// check function exists
	if( function_exists('acf_register_block') ) {
		
		// register the [Get Booking] block.
		acf_register_block(array(
			'name'				=> 'onsiteprint-get-booking',
			'title'				=> __('Get Booking'),
			'description'		=> __('Get Booking infomation with a booking code from FastAPI.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/onsiteprint-get-booking/onsiteprint-get-booking.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'admin-settings',
			'keywords'			=> array( 'page', 'list', 'onsiteprint' ),
		));
	}
}
add_action('acf/init', 'onsiteprint_acf_init');