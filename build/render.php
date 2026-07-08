<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<p <?php echo get_block_wrapper_attributes( array( 'class' => 'sbird-post-slug-block' ) ); ?>>
	<?php
	$post = get_post();
	$slug = '';
	$queried_object = get_queried_object();

	if ( $queried_object instanceof WP_Post_Type ) {
		$slug = ! empty( $queried_object->rewrite['slug'] ) ? (string) $queried_object->rewrite['slug'] : (string) $queried_object->name;
	} elseif ( $queried_object instanceof WP_Term && 'category' === $queried_object->taxonomy ) {
		$slug = (string) $queried_object->slug;
	} elseif ( $post ) {
		$slug = (string) $post->post_name;
	}

	// Decode percent-encoded slugs and attempt common Japanese encodings if needed.
	$slug = rawurldecode( $slug );
	if ( ! mb_check_encoding( $slug, 'UTF-8' ) ) {
		$try = mb_convert_encoding( $slug, 'UTF-8', 'SJIS' );
		if ( mb_check_encoding( $try, 'UTF-8' ) ) {
			$slug = $try;
		} else {
			$slug = mb_convert_encoding( $slug, 'UTF-8', 'EUC-JP' );
		}
	}
	echo esc_html( $slug );
	?>
</p>
