/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes } ) {
	const previewSlug = useSelect( ( select ) => {
		const editor = select( 'core/editor' );
		if ( ! editor ) {
			return '';
		}
		const raw = ( editor.getEditedPostAttribute && editor.getEditedPostAttribute( 'slug' ) ) || '';
		try {
			return decodeURIComponent( raw ).replace( /-/g, ' ' );
		} catch ( e ) {
			return raw.replace( /-/g, ' ' );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: 'sbird-post-slug-block',
		style: attributes?.style,
	} );

	return <p { ...blockProps }>{ previewSlug || '' }</p>;
}
