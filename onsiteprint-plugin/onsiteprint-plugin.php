<?php
/* ------------------------------------------------------------------------

 *	Plugin Name: OnsitePrint Plugin
 *	Plugin URI: http://onsiteprint.dk/
 *	Description: This is a plugin to the site http://onsiteprint.dk/.
 *	Author: Gerdes Group
 *	Author URI: https://www.clarify.nu/
 *	Version: 1.0.0.23
 ?	(Check the Version variable)
 ?	Updated: 2022-11-07 - 16:20 (Y:M:D - H:M)

---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	0. 	List of upcoming tasks 
	1. 	Plugin Setup
		a. 	Definition of variables
		b. 	Enqueue Scripts
        c. 	Enqueue Styles
	2. 	Custom Block Category Registration
	3. 	ACF Custom Blocks Registration
		a. 	Block: Link Button
		b. 	Block: Log In/Out Button
        c. 	Block: Toggle Button
		d. 	Block: Booking Information
		e. 	Block: Printer Information
		f. 	Block: Event Information
		g. 	Block: Event Template Information
		h. 	Block: Event Participant List


		x. 	Block: Log in/out (Switch)
		x. 	Block: Log in
		x. 	Block: Create new Template
		x. 	Block: Create new Event
		x. 	Block: Show List of Event URL's
		x. 	Block: Show Event Participants
		x. 	Block: Search for Event Participants
		x. 	Block: Print Event Participants

---------------------------------------------------------------------------
 &  0. List of upcoming tasks
---------------------------------------------------------------------------

    1. More Blocks

---------------------------------------------------------------------------
 #  1. Plugin Setup
---------------------------------------------------------------------------
 >  1a. Definition of variables
------------------------------------------------------------ */
define( 'ONSITEPRINT_DIR', plugins_url( '', __FILE__ ) );
define( 'ONSITEPRINT_VERSION', '1.0.0.23' );


/* ---------------------------------------------------------
 >  1b. Enqueue Scripts
------------------------------------------------------------ */
function onsiteprint_enqueue_scripts() {
	wp_enqueue_script( 'onsiteprint-datagridxl', 'https://code.datagridxl.com/datagridxl2.js', array(),  '', true );

	wp_enqueue_script( 'onsiteprint-plugin', ONSITEPRINT_DIR . '/assets/js/plugin.js', array(),  ONSITEPRINT_VERSION, true );

	wp_enqueue_script( 'onsiteprint-validate', ONSITEPRINT_DIR . '/assets/js/validate.js', array(),  ONSITEPRINT_VERSION, true );
	wp_script_add_data( 'onsiteprint-validate', 'async', true );

	wp_enqueue_script( 'onsiteprint-fetch', ONSITEPRINT_DIR . '/assets/js/fetch.js', array(),  ONSITEPRINT_VERSION, true );
	wp_script_add_data( 'onsiteprint-fetch', 'async', true );

	wp_enqueue_script( 'onsiteprint-fast-api', ONSITEPRINT_DIR . '/assets/js/fast-api.js', array(),  ONSITEPRINT_VERSION, true );
	wp_script_add_data( 'onsiteprint-fast-api', 'async', true );


	wp_enqueue_script( 'onsiteprint-elements', ONSITEPRINT_DIR . '/assets/js/elements.js', array(),  ONSITEPRINT_VERSION, true );
	

	wp_enqueue_script( 'onsiteprint-log-switch', ONSITEPRINT_DIR . '/assets/js/log-switch.js', array(),  ONSITEPRINT_VERSION, true );

	wp_enqueue_script( 'onsiteprint-bookings', ONSITEPRINT_DIR . '/assets/js/bookings.js', array(),  ONSITEPRINT_VERSION, true );
	wp_script_add_data( 'onsiteprint-bookings', 'async', true );

	wp_enqueue_script( 'onsiteprint-template', ONSITEPRINT_DIR . '/assets/js/template.js', array(),  ONSITEPRINT_VERSION, true );
	wp_script_add_data( 'onsiteprint-template', 'async', true );

	wp_enqueue_script( 'onsiteprint-event', ONSITEPRINT_DIR . '/assets/js/event.js', array(),  ONSITEPRINT_VERSION, true );
	wp_script_add_data( 'onsiteprint-event', 'async', true );

	wp_enqueue_script( 'onsiteprint-print', ONSITEPRINT_DIR . '/assets/js/print.js', array(),  ONSITEPRINT_VERSION, true );
	wp_script_add_data( 'onsiteprint-print', 'async', true );
}
add_action( 'wp_enqueue_scripts', 'onsiteprint_enqueue_scripts' );


/* ---------------------------------------------------------
 >  1c. Enqueue Styles
------------------------------------------------------------ */
function onsiteprint_enqueue_styles() {
	wp_enqueue_style( 'onsiteprint-plugin-styles', ONSITEPRINT_DIR . '/assets/css/onsiteprint-styles.css', array(), ONSITEPRINT_VERSION );
}
add_action( 'wp_enqueue_scripts', 'onsiteprint_enqueue_styles', 20, 1 );


/* ------------------------------------------------------------------------
 #  2. Custom Block Category Registration
 *	Create a new category to the Block view in the Wordpress page/post editor.
--------------------------------------------------------------------------- */
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


/* ------------------------------------------------------------------------
 #  3. ACF Custom Blocks Registration
 *	Create a new custom block to the Block view.
--------------------------------------------------------------------------- */
function onsiteprint_acf_init() {
	if( function_exists('acf_register_block') ) {
	
		/* ---------------------------------------------------------
		 >  2a. Block: Link Button
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-button-link',
			'title'				=> __('Link Button'),
			'description'		=> __('Displaying a Button with a Custom Link.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/button-link.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'button',
			'supports'          => array(
                'align' 		=> false,
            ),
			'keywords'			=> array(  'onsiteprint', 'button', 'link' ),
		));
	
		/* ---------------------------------------------------------
		 >  2b. Block: Log In/Out Button
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-button-loginout',
			'title'				=> __('Log In/Out Button'),
			'description'		=> __('Displaying a Button to Log In/Out of the website.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/button-loginout.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'lock',
			'keywords'			=> array(  'onsiteprint', 'button', 'login', 'logout', 'booking' ),
		));

		/* ---------------------------------------------------------
		 >  2c. Block: Toggle Button
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-button-toggle',
			'title'				=> __('Toggle Button'),
			'description'		=> __('Displaying a Toggle Button. Adding an Additional Data Attribute to the parent or sibling element.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/button-toggle.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'menu-alt',
			'keywords'			=> array( 'onsiteprint', 'button', 'navigation', 'menu', 'toggle' ),
		));

		/* ---------------------------------------------------------
		 >  2d. Block: Booking Information
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-booking-information',
			'title'				=> __('Booking Information'),
			'description'		=> __('Displaying Booking Information, if the User is logged in.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/booking-information.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'info',
			'keywords'			=> array( 'onsiteprint', 'booking', 'information' ),
		));
	
		/* ---------------------------------------------------------
		 >  2e. Block: Printer Information
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-printer-information',
			'title'				=> __('Printer Information'),
			'description'		=> __('Displaying Printer Information, if the User is logged in.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/printer-information.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'info',
			'keywords'			=> array( 'onsiteprint', 'printer', 'information' ),
		));
	
		/* ---------------------------------------------------------
		 >  2f. Block: Event Information
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-event-information',
			'title'				=> __('Event Information'),
			'description'		=> __('Displaying Event Information of the current Event, if the User is logged in.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event-information.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'info',
			'keywords'			=> array( 'onsiteprint', 'event', 'information' ),
		));
	
		/* ---------------------------------------------------------
		 >  2g. Block: Event Template Information
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-event-template-information',
			'title'				=> __('Event Template Information'),
			'description'		=> __('Displaying Event Template Information of the current Event, if the User is logged in.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event-template-information.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'info',
			'keywords'			=> array( 'onsiteprint', 'event', 'template,', 'information' ),
		));
	
		/* ---------------------------------------------------------
		 >  2h. Block: Event Participant List
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-event-participant-list',
			'title'				=> __('Event Participant List'),
			'description'		=> __('Displaying the current Event List of Participants, if the User is logged in.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event-participant-list.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'list-view',
			'keywords'			=> array( 'onsiteprint', 'event', 'participant', 'list' ),
		));






		/* ---------------------------------------------------------
		 >  2x. Block: Log In/Out (Switch)
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-log-switch',
			'title'				=> __('Log in/out'),
			'description'		=> __('Log in with a booking code.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/login/login-switch.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'lock',
			'keywords'			=> array( 'onsiteprint', 'login', 'logout', 'booking' ),
		));
	
		/* ---------------------------------------------------------
		 >  2x. Block: Log In
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-log-in',
			'title'				=> __('Log in'),
			'description'		=> __('Log in with a booking code.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/login/login-in.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'unlock',
			'keywords'			=> array( 'onsiteprint', 'login', 'booking' ),
		));

		/* ---------------------------------------------------------
		 >  2x. Block: Create new Template
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-create-template',
			'title'				=> __('Create new Template'),
			'description'		=> __('Create new Template'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/template/create-template.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'admin-appearance',
			'keywords'			=> array( 'onsiteprint', 'template', 'create' ),
		));

		/* ---------------------------------------------------------
		 >  2x. Block: Create new Event
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-create-event',
			'title'				=> __('Create new Event'),
			'description'		=> __('[Front-end] Create new Event.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event/create-event.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'list-view',
			'keywords'			=> array( 'onsiteprint', 'event', 'create' ),
		));

		/* ---------------------------------------------------------
		 >  2x. Block: Show List of Event URL's
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-get-event-lists-urls',
			'title'				=> __('Show List of Event URL\'s'),
			'description'		=> __('[Front-end] Shows a URL list of Events.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event/show-list-of-event-urls.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'list-view',
			'keywords'			=> array( 'onsiteprint', 'event', 'show', 'list' ),
		));

		/* ---------------------------------------------------------
		 >  2x. Block: Show Event Participants
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-show-event-participants',
			'title'				=> __('Show Event Participants'),
			'description'		=> __('[Front-end] Shows a list of Event Participants.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event/show-event-participants.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'list-view',
			'keywords'			=> array( 'onsiteprint', 'event', 'show', 'participants' ),
		));

		/* ---------------------------------------------------------
		 >  2x. Block: Search for Event Participants
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-search-event-participants',
			'title'				=> __('Search for Event Participants'),
			'description'		=> __('[Front-end] Search for Event Participants.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event/search-event-participants.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'search',
			'keywords'			=> array( 'onsiteprint', 'event', 'search', 'participants' ),
		));

		/* ---------------------------------------------------------
		 >  2x. Block: Print Event Participants
		------------------------------------------------------------ */
		acf_register_block(array(
			'name'				=> 'onsiteprint-print-event-participants',
			'title'				=> __('Print Event Participants'),
			'description'		=> __('[Front-end] Print Event Participants.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event/print-event-participants.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'printer',
			'keywords'			=> array( 'onsiteprint', 'event', 'print', 'participants' ),
		));

	}
}
add_action('acf/init', 'onsiteprint_acf_init');