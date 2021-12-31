import React from 'react';

const JumpToContent = () => {
	return (
		<a
			href="#main-content"
			className="rounded-none absolute text-neutral-50 bg-neutral-800 font-semibold top-0 left-0  p-2 transition ease-in-out bg-opacity-80 -translate-y-10 focus:translate-y-0"
		>
			Jump to Content
		</a>
	);
};

export default JumpToContent;
