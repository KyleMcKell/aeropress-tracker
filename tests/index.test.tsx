import { render, screen, waitFor } from '@testing-library/react';
import Home from '~/pages/index';
import { SessionProvider } from 'next-auth/react';

describe('Home', () => {
	it('renders a heading', async () => {
		render(
			<SessionProvider
				session={{
					userId: 1,
					user: { name: 'Kyle', email: 'email', image: 'a' },
					expires: '1',
				}}
			>
				<Home />
			</SessionProvider>,
		);

		const heading = screen.getByRole('heading', {
			name: 'Welcome to AeroPress Tracker!',
		});

		await waitFor(() => expect(heading).toBeInTheDocument());
	});
});
