const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const RtlCssPlugin = require( '@wordpress/scripts/plugins/rtlcss-webpack-plugin' );

const { dirname } = require( 'path' );

const styleCacheGroup = defaultConfig.optimization.splitChunks.cacheGroups.style;

module.exports = {
	...defaultConfig,
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			...defaultConfig.optimization.splitChunks,
			cacheGroups: {
				...defaultConfig.optimization.splitChunks.cacheGroups,
				style: {
					...styleCacheGroup,
					name( module, chunks, cacheGroupKey ) {
						const chunkName = chunks[ 0 ].name;
						const chunkDir = dirname( chunkName );

						return chunkDir === '.' ? 'style' : `${ chunkDir }/style`;
					},
				},
			},
		},
	},
	plugins: defaultConfig.plugins.filter(
		( plugin ) => ! ( plugin instanceof RtlCssPlugin )
	),
};
