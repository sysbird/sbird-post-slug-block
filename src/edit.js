/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const previewSlug = useSelect( ( select ) => {
		const editor = select( 'core/editor' );
		if ( ! editor ) {
			return '';
		}
		const raw = ( editor.getEditedPostAttribute && editor.getEditedPostAttribute( 'slug' ) ) || '';
		try {
			return decodeURIComponent( raw );
		} catch ( e ) {
			return raw;
		}
	}, [] );

	return (
		<p { ...useBlockProps( { className: 'sbird-post-slug-block' } ) }>
			{ previewSlug }
		</p>
	);
}
