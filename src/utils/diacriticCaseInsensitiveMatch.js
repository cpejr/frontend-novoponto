export default function diacriticCaseInsensitiveMatch(match, input) {
	return match
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.includes(
			input
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.trim()
		);
}
