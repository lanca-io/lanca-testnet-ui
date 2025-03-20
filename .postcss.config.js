import precss from 'precss'
import autoprefixer from 'autoprefixer'

export default {
	plugins: [
		precss(),
		autoprefixer(),
		postcssModules({
			generateScopedName: '[name]__[local]__[hash:base64:5]',
		}),
	],
}
