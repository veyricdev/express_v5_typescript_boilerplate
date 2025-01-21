/**
 * @type {import('stylelint').Config}
 */
module.exports = {
	'*.{js,ts,cjs,mjs,d.cts,d.mts,json,jsonc}': ['biome check --apply --no-errors-on-unmatched'],
}
