export const ensureTargetIsArray = <T>(target: T | T[]): T[] => {
	if (!target) return [];

	return Array.isArray(target) ? target : [target];
};

export const slugify = (str: string): string =>
	str
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.trim() // trim leading or trailing whitespace
		.toLowerCase() // convert to lowercase
		.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/-+/g, '-'); // remove consecutive hyphens

export const escapeRegExp = (text: string): string =>
	text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
