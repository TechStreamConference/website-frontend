type LoginDict = {
	[key: string]: string;
};

const lookup: LoginDict = {
	'Username/email or password missing': 'Name/E-Mail oder Passwort fehlt.',
	'Unknown username or email': 'Name oder E-Mail ungültig.',
	'Invalid password': 'Passwort ungültig.'
};

export function loginLookup(key: string): string {
	if (key in lookup) {
		return lookup[key];
	}

	return key;
}
