/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RadioControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const slugSource = attributes.slugSource || 'post';
	const { previewSlug, isSingleTemplate } = useSelect( ( select ) => {
		const editor = select( 'core/editor' );
		if ( ! editor ) {
			return { previewSlug: '', isSingleTemplate: false };
		}
		const raw = ( editor.getEditedPostAttribute && editor.getEditedPostAttribute( 'slug' ) ) || '';
		const postType = editor.getCurrentPostType ? editor.getCurrentPostType() : '';
		const templateSlug = raw.split( '//' ).pop();
		const isSingle =
			'wp_template' === postType &&
			( 'single' === templateSlug || templateSlug.startsWith( 'single-' ) );
		let decodedSlug = raw;

		try {
			decodedSlug = decodeURIComponent( raw );
		} catch ( e ) {
			// Keep the original slug if it cannot be decoded.
		}

		return {
			previewSlug: decodedSlug.replace( /-/g, ' ' ),
			isSingleTemplate: isSingle,
		};
	}, [] );

	const blockProps = useBlockProps( {
		className: 'sbird-post-slug-block',
	} );

	return (
		<>
			{ isSingleTemplate && (
				<InspectorControls>
					<PanelBody title={ __( 'Slug settings', 'sbird-post-slug-block' ) }>
						<RadioControl
							label={ __( 'Display slug', 'sbird-post-slug-block' ) }
							selected={ slugSource }
							options={ [
								{
									label: __( 'Post slug', 'sbird-post-slug-block' ),
									value: 'post',
								},
								{
									label: __( 'First category slug', 'sbird-post-slug-block' ),
									value: 'category',
								},
							] }
							onChange={ ( value ) => setAttributes( { slugSource: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<p { ...blockProps }>{ previewSlug || '' }</p>
		</>
	);
}
