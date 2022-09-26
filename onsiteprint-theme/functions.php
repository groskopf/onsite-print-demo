<?php
/* ------------------------------------------------------------------------

 *	OnsitePrint Theme functions and definitions
 *	@link https://developer.wordpress.org/themes/basics/theme-functions/
 *	@package WordPress
 *	@subpackage OnsitePrint_Theme
 *	@since OnsitePrint Theme 1.0
 ?	Updated: (Y:M:D - H:M) 2022-05-08 - 13:15

---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	0. 	List of upcoming tasks
	1. 	WordPress Support
	2. 	Enqueue Styles
	3. 	Add Block Patterns
    
---------------------------------------------------------------------------
 &  0. List of upcoming tasks
---------------------------------------------------------------------------

    1. There are no tasks at the moment!

---------------------------------------------------------------------------
 #  1. WordPress Support
--------------------------------------------------------------------------- */

if ( ! function_exists( 'onsiteprint_support' ) ) :

	/* --------------------------------------------------------------------
	 *	Sets up theme defaults and registers support for various WordPress features.
	 *	@since OnsitePrint Theme 1.0
	 *	@return void
	----------------------------------------------------------------------- */

	function onsiteprint_support() {

		// Add Support for Block Styles.
		add_theme_support( 'wp-block-styles' );

		// Enqueue Editor Styles.
		add_editor_style( 'style.css' );

	}

endif;
add_action( 'after_setup_theme', 'onsiteprint_support' );


/* ------------------------------------------------------------------------
 #  2. Enqueue Styles
--------------------------------------------------------------------------- */

if ( ! function_exists( 'onsiteprint_styles' ) ) :

	/* --------------------------------------------------------------------
	 *	Enqueue Styles.
	 *	@since OnsitePrint Theme 1.0
	 *	@return void
	----------------------------------------------------------------------- */

	function onsiteprint_styles() {
		// Register Theme Stylesheet.
		$theme_version = wp_get_theme()->get( 'Version' );

		$version_string = is_string( $theme_version ) ? $theme_version : false;
		wp_register_style(
			'onsiteprint-style',
			get_template_directory_uri() . '/style.css',
			array(),
			$version_string
		);

		// Enqueue Theme Stylesheet.
		wp_enqueue_style( 'onsiteprint-style' );

	}

endif;
add_action( 'wp_enqueue_scripts', 'onsiteprint_styles' );


/* ------------------------------------------------------------------------
 #  3. Add Block Patterns
--------------------------------------------------------------------------- */

if ( ! function_exists( 'onsiteprint_require_patterns' ) ) :

	/* --------------------------------------------------------------------
	 *	Require Block Patterns.
	 *	@since OnsitePrint Theme 1.0
	 *	@return void
	----------------------------------------------------------------------- */

	function onsiteprint_require_patterns() {
		// Add Block Patterns.
		require get_template_directory() . '/inc/block-patterns.php';
	}

endif;
add_action( 'wp_enqueue_scripts', 'onsiteprint_require_patterns' );