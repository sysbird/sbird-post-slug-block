<?php
/**
 * Plugin Name:			sBird Post Slug Block
 * Plugin URI:			https://wordpress.org/plugins/sbird-post-slug-block/
 * Description:			A custom block that displays the slug of posts.
 * Version:				1.0
 * Requires at least:	7.0
 * Requires PHP:		7.4
 * Author:				sysbird
 * License:				GPL-2.0-or-later
 * License URI:			https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:			sbird-post-slug-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block and assets from the build directory.
 */
function sbird_posts_slug_block() {
	$build_path = __DIR__ . '/build';
	if ( is_dir( $build_path ) ) {
		register_block_type_from_metadata( $build_path );
		return;
	}

	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'sbird_posts_slug_block' );
