<?php
/* ------------------------------------------------------------------------

 *	Plugin Name: OnsitePrint Plugin
 *	Plugin URI: http://onsiteprint.dk/
 *	Description: This is a plugin to the site http://onsiteprint.dk/.
 *	Author: Gerdes Group
 *	Author URI: https://www.clarify.nu/
 *	Text Domain: onsiteprint.dk
 *	@package OnsitePrint
 *	Version: 1.0.0.51
 ?	(Check the Version variable)
 ?	Updated: 2023-03-27 - 00:27 (Y:M:D - H:M)

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
	4.	Custom Functions
		a. 	Check if Gutenberg block editor is currently in use.
		b. 	Get highest User Role.

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
define( 'OP_VERSION', '1.0.0.51' );
define( 'OP_ROOT_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'OP_ROOT_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );



/* ---------------------------------------------------------
 >  1c. Enqueue Scripts
------------------------------------------------------------ */
function onsiteprint_enqueue_scripts() {
//	wp_enqueue_script( 'onsiteprint-datagridxl', 'https://code.datagridxl.com/datagridxl2.js', array(),  '', true );
	wp_enqueue_script( 'onsiteprint-grid', OP_ROOT_URL . 'assets/js/datagridxl2.js', array(),  OP_VERSION, true );
	wp_enqueue_script( 'onsiteprint-elements', OP_ROOT_URL . 'assets/js/elements.js', array(),  OP_VERSION, true );


	wp_enqueue_script( 'onsiteprint-plugin', OP_ROOT_URL . 'assets/js/plugin.js', array(),  OP_VERSION, true );
	
	wp_enqueue_script( 'onsiteprint-validate', OP_ROOT_URL . 'assets/js/validate.js', array(),  OP_VERSION, true );
	wp_script_add_data( 'onsiteprint-validate', 'async', true );
	
	wp_enqueue_script( 'onsiteprint-fetch', OP_ROOT_URL . 'assets/js/fetch.js', array(),  OP_VERSION, true );
	wp_script_add_data( 'onsiteprint-fetch', 'async', true );
	
	wp_enqueue_script( 'onsiteprint-fast-api', OP_ROOT_URL . 'assets/js/fast-api.js', array(),  OP_VERSION, true );
	wp_script_add_data( 'onsiteprint-fast-api', 'async', true );
	
	wp_enqueue_script( 'onsiteprint-log-switch', OP_ROOT_URL . 'assets/js/log-switch.js', array(),  OP_VERSION, true );

	wp_enqueue_script( 'onsiteprint-bookings', OP_ROOT_URL . 'assets/js/bookings.js', array(),  OP_VERSION, true );
	wp_script_add_data( 'onsiteprint-bookings', 'async', true );

	wp_enqueue_script( 'onsiteprint-template', OP_ROOT_URL . 'assets/js/template.js', array(),  OP_VERSION, true );
	wp_script_add_data( 'onsiteprint-template', 'async', true );

	wp_enqueue_script( 'onsiteprint-event', OP_ROOT_URL . 'assets/js/event.js', array(),  OP_VERSION, true );
	wp_script_add_data( 'onsiteprint-event', 'async', true );

	wp_enqueue_script( 'onsiteprint-print', OP_ROOT_URL . 'assets/js/print.js', array(),  OP_VERSION, true );
	wp_script_add_data( 'onsiteprint-print', 'async', true );
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\onsiteprint_enqueue_scripts' );


/* ---------------------------------------------------------
 >  1d. Enqueue Styles
------------------------------------------------------------ */
function onsiteprint_enqueue_styles() {
	wp_enqueue_style( 'onsiteprint-plugin-styles', OP_ROOT_URL . 'assets/css/onsiteprint-styles.css', array(), OP_VERSION );
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\onsiteprint_enqueue_styles', 20, 1 );

//////////////////// #NG: Needs to be looked at again.
function onsiteprint_enqueue_editor_styles() {
	wp_enqueue_style( 'onsiteprint-plugin-editor-styles', OP_ROOT_URL . 'assets/css/onsiteprint-styles.css', array(), OP_VERSION );
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\onsiteprint_enqueue_editor_styles', 20, 1 );

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
add_filter( 'block_categories', __NAMESPACE__ . '\onsiteprint_plugin_block_categories', 10, 2 );


/* ------------------------------------------------------------------------
 #  3. ACF Custom Blocks Registration
 *	Create a new custom block to the Block view.
 --------------------------------------------------------------------------- */
/** @return void * @author Niels Gerdes * @since 1.0.0.38
 --------------------------------------------------------------------------- */
function op_acf_register_blocks() {
	$op_acf_blocks = glob( OP_ROOT_PATH . 'blocks/*' );

	foreach ( $op_acf_blocks as $block ) {
		register_block_type( $block );
	}
}
add_action( 'acf/init', __NAMESPACE__ . '\op_acf_register_blocks' );


/* ------------------------------------------------------------------------
 #  3X. OLD ACF Custom Blocks Registration
 *	Create a new custom block to the Block view.
--------------------------------------------------------------------------- */
function onsiteprint_acf_init() {
	if( function_exists('acf_register_block_type') ) {
	
		/* ---------------------------------------------------------
		 >  2a. Block: Link Button
		------------------------------------------------------------ */
		acf_register_block_type( array(
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
			'keywords'			=> array(  'onsiteprint', 'button', 'link' ),
		));
	
		/* ---------------------------------------------------------
		 >  2b. Block: Log In/Out Button
		------------------------------------------------------------ */
/* 		acf_register_block_type( array(
			'name'				=> 'onsiteprint-button-loginout',
			'title'				=> __('Log In/Out Button'),
			'description'		=> __('Displaying a Button to Log In/Out of the website.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/button-loginout.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'lock',
			'keywords'			=> array(  'onsiteprint', 'button', 'login', 'logout', 'booking' ),
		));
 */
		/* ---------------------------------------------------------
		 >  2c. Block: Toggle Button
		------------------------------------------------------------ */
		acf_register_block_type( array(
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
		acf_register_block_type( array(
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
		acf_register_block_type( array(
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
		acf_register_block_type( array(
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
		acf_register_block_type( array(
			'name'				=> 'onsiteprint-event-template-information',
			'title'				=> __('Event Template Information'),
			'description'		=> __('Displaying Event Template Information of the current Event, if the User is logged in.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event-template-information.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'info',
			'keywords'			=> array( 'onsiteprint', 'event', 'template', 'information' ),
		));
	
		/* ---------------------------------------------------------
		 >  2h. Block: Event Participant List
		------------------------------------------------------------ */
		acf_register_block_type( array(
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
/* 		acf_register_block_type( array(
			'name'				=> 'onsiteprint-log-switch',
			'title'				=> __('Log in/out'),
			'description'		=> __('Log in with a booking code.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/login/login-switch.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'lock',
			'keywords'			=> array( 'onsiteprint', 'login', 'logout', 'booking' ),
		));
	 */
		/* ---------------------------------------------------------
		 >  2x. Block: Log In
		------------------------------------------------------------ */
/* 		acf_register_block_type( array(
			'name'				=> 'onsiteprint-log-in',
			'title'				=> __('Log in'),
			'description'		=> __('Log in with a booking code.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/login/login-in.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'unlock',
			'keywords'			=> array( 'onsiteprint', 'login', 'booking' ),
		));
 */
		/* ---------------------------------------------------------
		 >  2x. Block: Create new Template
		------------------------------------------------------------ */
		/* acf_register_block_type( array(
			'name'				=> 'onsiteprint-create-template',
			'title'				=> __('Create new Template'),
			'description'		=> __('Create new Template'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/template/create-template.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'admin-appearance',
			'keywords'			=> array( 'onsiteprint', 'template', 'create' ),
		)); */

		/* ---------------------------------------------------------
		 >  2x. Block: Create new Event
		------------------------------------------------------------ */
		/* acf_register_block_type( array(
			'name'				=> 'onsiteprint-create-event',
			'title'				=> __('Create new Event'),
			'description'		=> __('[Front-end] Create new Event.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event/create-event.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'list-view',
			'keywords'			=> array( 'onsiteprint', 'event', 'create' ),
		)); */

		/* ---------------------------------------------------------
		 >  2x. Block: Show List of Event URL's
		------------------------------------------------------------ */
		/* acf_register_block_type( array(
			'name'				=> 'onsiteprint-get-event-lists-urls',
			'title'				=> __('Show List of Event URL\'s'),
			'description'		=> __('[Front-end] Shows a URL list of Events.'),
			'render_template'	=> plugin_dir_path(__FILE__) . 'acf-blocks/event/show-list-of-event-urls.php',
			'category'			=> 'onsiteprint',
			'icon'				=> 'list-view',
			'keywords'			=> array( 'onsiteprint', 'event', 'show', 'list' ),
		)); */

		/* ---------------------------------------------------------
		 >  2x. Block: Show Event Participants
		------------------------------------------------------------ */
		acf_register_block_type( array(
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
		acf_register_block_type( array(
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
		acf_register_block_type( array(
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
add_action('acf/init', __NAMESPACE__ . '\onsiteprint_acf_init');


/* ------------------------------------------------------------------------
 #  4. Custom Functions
 ---------------------------------------------------------------------------
 >  4a. Check if Gutenberg block editor is currently in use.
 *  The code below is from Freemius SDK, props to their team.
 * 	https://github.com/Freemius/wordpress-sdk/commit/8a87d389c647b4588bfe96fc7d420d62a48cbac5
 ------------------------------------------------------------ */
/** @return void * @author Niels Gerdes * @since 1.0.0.49
 --------------------------------------------------------------------------- */
 function op_is_gutenberg_editor_active() {

	if ( function_exists( 'is_gutenberg_page' ) && is_gutenberg_page() ) {
        ///// The Gutenberg plugin is on.
        return true;
    }

	$current_screen = get_current_screen();

	if ( method_exists( $current_screen, 'is_block_editor' ) && $current_screen->is_block_editor() ) {
        ///// Gutenberg page on 5+.
        return true;
    }

    return false;

}


/* ---------------------------------------------------------
 >  4b. Get highest User Role.
------------------------------------------------------------ */
// This function or its code might be handy other places. TG-2021-06-28 	
// Eller benyt fx current_user_can('upload_files') når man blot vil tjekke den aktuelle bruger.
function get_highest_user_role( $user_ID ) {
	//Se https://wordpress.org/support/article/roles-and-capabilities/  
	//	 https://developer.wordpress.org/reference/functions/user_can/
	//Andre steder kan det være relevant blot at spørge current_user_can(), fx if (current_user_can('activate_plugins')) 
	/*
		De engelske betegnelser for standardrollerne og det de giver adgang til i Wordpress:
		Administrator – nothing is off limits
		Editor – has access to all posts, pages, comments, categories, tags, and links.
		Author – can write, upload photos to, edit, and publish their own posts.
		Contributor – has no publishing or uploading capability, but can write and edit their own posts until they are published
		(Follower - (public sites) / Viewer (private sites only) – can read and comment on posts and pages)
		Subscriber - (Business plan or higher with active plugins) – similar to the Follower / Viewer role; can read and comment on posts and pages.
	*/

	$userRole = 'WP-unknown role';

	if ( user_can( $user_ID, 'activate_plugins') ) {
		///// da: Administrator
		$userRole = 'Administrator';
	} elseif ( user_can( $user_ID, 'edit_pages') ) {
		///// da: Redaktør
		$userRole = 'Editor';
	} elseif ( user_can( $user_ID, 'upload_files') ) {
		///// da: Forfatter
		$userRole = 'Author';
	} elseif ( user_can( $user_ID, 'edit_posts' ) ) {
		///// da: Bidragyder
		$userRole = 'Contributer';
	} elseif ( user_can( $user_ID, 'read' ) ) {
		///// da: Abonnent
		$userRole = 'Subscriber';
	}

	return $userRole;

}