const fs = require( 'fs' );
const path = require( 'path' );
const { execFileSync } = require( 'child_process' );

const rootDir = path.resolve( __dirname, '..' );
const distRoot = path.join( rootDir, 'dist' );
const distDir = path.join( distRoot, 'sbird-post-slug-block' );
const zipPath = path.join( distRoot, 'sbird-post-slug-block.zip' );

const copyTargets = [
	'build',
	'sbird-post-slug-block.php',
	'readme.txt',
	'README.md',
	'LICENSE',
];

const copyRecursive = ( source, destination ) => {
	const stats = fs.statSync( source );

	if ( stats.isDirectory() ) {
		fs.mkdirSync( destination, { recursive: true } );
		for ( const entry of fs.readdirSync( source ) ) {
			copyRecursive(
				path.join( source, entry ),
				path.join( destination, entry )
			);
		}
		return;
	}

	fs.copyFileSync( source, destination );
};

const copyDirectoryContents = ( sourceDir, destinationDir ) => {
	for ( const entry of fs.readdirSync( sourceDir ) ) {
		copyRecursive(
			path.join( sourceDir, entry ),
			path.join( destinationDir, entry )
		);
	}
};

if ( fs.existsSync( distDir ) ) {
	fs.rmSync( distDir, { recursive: true, force: true } );
}
fs.mkdirSync( distDir, { recursive: true } );

for ( const target of copyTargets ) {
	const sourcePath = path.join( rootDir, target );
	if ( ! fs.existsSync( sourcePath ) ) {
		continue;
	}

	if ( target === 'build' ) {
		copyDirectoryContents( sourcePath, distDir );
		continue;
	}

	copyRecursive( sourcePath, path.join( distDir, target ) );
}

console.log( 'dist ready:', distDir );

try {
	if ( fs.existsSync( zipPath ) ) {
		fs.rmSync( zipPath, { force: true } );
	}
	execFileSync( 'zip', [ '-r', zipPath, 'sbird-post-slug-block' ], {
		cwd: distRoot,
		stdio: 'inherit',
	} );
	console.log( 'zip ready:', zipPath );
} catch ( error ) {
	console.warn( 'zip skipped:', error.message );
}
