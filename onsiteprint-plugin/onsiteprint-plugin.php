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
	wp_enqueue_script( 'onsiteprint-datagridxl-js', 'https://code.datagridxl.com/datagridxl2.js', array(),  '', true );

	wp_enqueue_script( 'onsiteprint-plugin-js', ONSITEPRINT_DIR . '/assets/js/plugin.js', array(),  wp_get_theme()->get( 'Version' ), true );

	wp_enqueue_script( 'onsiteprint-validate-js', ONSITEPRINT_DIR . '/assets/js/validate.js', array(),  wp_get_theme()->get( 'Version' ), true );
	wp_script_add_data( 'onsiteprint-validate-js', 'async', true );

	wp_enqueue_script( 'onsiteprint-fetch-js', ONSITEPRINT_DIR . '/assets/js/fetch.js', array(),  wp_get_theme()->get( 'Version' ), true );
	wp_script_add_data( 'onsiteprint-fetch-js', 'async', true );

	wp_enqueue_script( 'onsiteprint-log-switch-js', ONSITEPRINT_DIR . '/assets/js/log-switch.js', array(),  wp_get_theme()->get( 'Version' ), true );

	wp_enqueue_script( 'onsiteprint-fast-api-js', ONSITEPRINT_DIR . '/assets/js/fast-api.js', array(),  wp_get_theme()->get( 'Version' ), true );
	wp_script_add_data( 'onsiteprint-fast-api-js', 'async', true );
	
	wp_enqueue_script( 'onsiteprint-bookings-js', ONSITEPRINT_DIR . '/assets/js/bookings.js', array(),  wp_get_theme()->get( 'Version' ), true );
	wp_script_add_data( 'onsiteprint-bookings-js', 'async', true );

	wp_enqueue_script( 'onsiteprint-template-js', ONSITEPRINT_DIR . '/assets/js/template.js', array(),  wp_get_theme()->get( 'Version' ), true );
	wp_script_add_data( 'onsiteprint-template-js', 'async', true );

	wp_enqueue_script( 'onsiteprint-event-js', ONSITEPRINT_DIR . '/assets/js/event.js', array(),  wp_get_theme()->get( 'Version' ), true );
	wp_script_add_data( 'onsiteprint-event-js', 'async', true );
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
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/booking/get-booking.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'calendar-alt',
			'keywords'			=> array( 'page', 'booking', 'onsiteprint' ),
		));
	
		// register the [Log in/out] block.
		acf_register_block(array(
			'name'				=> 'onsiteprint-log-switch',
			'title'				=> __('Log in/out'),
			'description'		=> __('Log in with a booking code.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/login/login-switch.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'lock',
			'keywords'			=> array( 'page', 'booking', 'login', 'logout', 'onsiteprint' ),
		));

		// register the [Create Template] block.
		acf_register_block(array(
			'name'				=> 'onsiteprint-create-template',
			'title'				=> __('Create new Template'),
			'description'		=> __('Create new Template'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/template/create-template.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'admin-appearance',
			'keywords'			=> array( 'page', 'template', 'create', 'onsiteprint' ),
		));

		// register the [Create Event] block.
		acf_register_block(array(
			'name'				=> 'onsiteprint-create-event',
			'title'				=> __('Create new Event'),
			'description'		=> __('[Front-end] Create new Event.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event/create-event.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'list-view',
			'keywords'			=> array( 'page', 'event', 'create', 'onsiteprint' ),
		));

		// register the [Show List of Event URL's] block.
		acf_register_block(array(
			'name'				=> 'onsiteprint-get-event-lists-urls',
			'title'				=> __('Show List of Event URL\'s'),
			'description'		=> __('[Front-end] Shows a URL list of Events.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event/show-list-of-event-urls.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'list-view',
			'keywords'			=> array( 'page', 'event', 'show', 'list', 'onsiteprint' ),
		));

		// register the [Show Event Participants] block.
		acf_register_block(array(
			'name'				=> 'onsiteprint-show-event-list',
			'title'				=> __('Show Event List'),
			'description'		=> __('[Front-end] Shows a Single Event List.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event/show-event-participants.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'list-view',
			'keywords'			=> array( 'page', 'event', 'show', 'participants', 'onsiteprint' ),
		));

	}
}
add_action('acf/init', 'onsiteprint_acf_init');