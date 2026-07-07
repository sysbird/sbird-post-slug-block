const fs = require( 'fs' );
const path = require( 'path' );

const rootDir = path.resolve( __dirname, '..' );
const buildDir = path.join( rootDir, 'build' );

const renameEditorCss = ( destinationDir ) => {
	if ( ! fs.existsSync( destinationDir ) ) {
		return;
	}

	const sourceCss = path.join( destinationDir, 'index.css' );
	const targetCss = path.join( destinationDir, 'editor.css' );
	if ( fs.existsSync( sourceCss ) ) {
		fs.renameSync( sourceCss, targetCss );
	}
};

const renameStyleIndexCss = ( destinationDir ) => {
	if ( ! fs.existsSync( destinationDir ) ) {
		return;
	}

	const sourceCss = path.join( destinationDir, 'style-index.css' );
	const targetCss = path.join( destinationDir, 'style.css' );
	if ( fs.existsSync( sourceCss ) ) {
		fs.renameSync( sourceCss, targetCss );
	}
};

const replaceCssReferences = ( filePath ) => {
	if ( ! fs.existsSync( filePath ) ) {
		return;
	}

	const contents = fs.readFileSync( filePath, 'utf8' );
	let updated = contents.replace(
		/file:\.\/index\.css/g,
		'file:./editor.css'
	);
	updated = updated.replace(
		/file:\.\/style-index\.css/g,
		'file:./style.css'
	);
	if ( updated !== contents ) {
		fs.writeFileSync( filePath, updated );
	}
};

const removeRtlCss = ( destinationDir ) => {
	if ( ! fs.existsSync( destinationDir ) ) {
		return;
	}

	for ( const entry of fs.readdirSync( destinationDir ) ) {
		if ( ! entry.endsWith( '-rtl.css' ) ) {
			continue;
		}
		fs.rmSync( path.join( destinationDir, entry ), { force: true } );
	}
};

renameEditorCss( buildDir );
renameStyleIndexCss( buildDir );
replaceCssReferences( path.join( buildDir, 'block.json' ) );
removeRtlCss( buildDir );
