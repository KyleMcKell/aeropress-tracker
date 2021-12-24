import React from 'react';

import Header from '~/components/Header';
import SessionMounter from '~/components/SessionMounter';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className="font-ui">
			<SessionMounter>
				<Header />
				{children}
			</SessionMounter>
		</div>
	);
};

export default Layout;
