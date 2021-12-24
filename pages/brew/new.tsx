import { AeropressBrew } from '@prisma/client';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import { useForm } from 'react-hook-form';

import Button from '~/components/Button';
import Layout from '~/components/Layout';

type FormData = Pick<
	AeropressBrew,
	| 'name'
	| 'description'
	| 'inverted'
	| 'brewTime'
	| 'coffeeWeight'
	| 'waterWeight'
	| 'waterTemp'
	| 'favorite'
	| 'grindSize'
	| 'roastType'
	| 'instructions'
>;

const ErrorText = ({ error }: { error: string }) => (
	<span role="alert" className="text-danger-500 text-sm font-semibold">
		{error}
	</span>
);

interface FormFieldProps {
	children: React.ReactNode;
}

const FormField = ({ children }: FormFieldProps) => {
	return <div className="flex flex-col">{children}</div>;
};

const CreateBrew: NextPage = () => {
	const { data: session, status } = useSession();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	// render data
	const onSubmit = handleSubmit(async (data: AeropressBrew) => {
		if (session) {
			data.userId = session.userId;
		}

		data.brewTime = parseInt(String(data.brewTime));
		data.waterTemp = parseInt(String(data.waterTemp));
		data.coffeeWeight = parseInt(String(data.coffeeWeight));
		data.waterWeight = parseInt(String(data.waterWeight));

		const response = await fetch('/api/brew', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		// if (!response.ok) {
		// 	throw new Error(response.statusText);
		// }

		const newBrew: AeropressBrew | string = await response.json();

		return newBrew;
	});

	return (
		<Layout>
			<div>Create A New Brew</div>
			<form onSubmit={onSubmit} className="flex flex-col w-fit gap-4">
				<FormField>
					<label htmlFor="name">Give your Brew a Name</label>
					<input
						id="name"
						placeholder="My Awesome Brew"
						aria-invalid={errors.name ? 'true' : 'false'}
						{...register('name', { required: true, maxLength: 255 })}
					/>
					{errors.name && errors.name.type === 'required' && (
						<ErrorText error="Name is required" />
					)}
					{errors.name && errors.name.type === 'maxLength' && (
						<ErrorText error="Max length exceeded" />
					)}
				</FormField>
				<FormField>
					<label htmlFor="description">Short Description of your Brew </label>
					<input
						id="description"
						placeholder="A nice brew"
						{...register('description', { maxLength: 255 })}
					/>
					{errors.description && errors.description?.type === 'maxLength' && (
						<ErrorText error="Max length exceeded" />
					)}
				</FormField>
				<FormField>
					<label htmlFor="inverted">Is your brew inverted?</label>
					<input type={'checkbox'} id="inverted" {...register('inverted')} />
				</FormField>
				<FormField>
					<label htmlFor="brewTime">
						How long does your brew take in seconds?
					</label>
					<input id="brewTime" type="number" {...register('brewTime')} />
				</FormField>
				<FormField>
					<label htmlFor="coffeeWeight">
						How much coffee do you want to use?
					</label>
					<input
						id="coffeeWeight"
						type="number"
						{...register('coffeeWeight')}
					/>
				</FormField>
				<FormField>
					<label htmlFor="waterWeight">
						How much water do you want to use?
					</label>
					<input id="waterWeight" type="number" {...register('waterWeight')} />
				</FormField>
				<FormField>
					<label htmlFor="waterTemp">
						What is the water temperature? (Celcius)
					</label>
					<input id="waterTemp" type="number" {...register('waterTemp')} />
				</FormField>
				<FormField>
					<label htmlFor="favorite">Is this your favorite brew?</label>
					<input type={'checkbox'} id="favorite" {...register('favorite')} />
				</FormField>
				<FormField>
					<label htmlFor="grindSize">What is the grind size?</label>
					<input id="grindSize" type="text" {...register('grindSize')} />
				</FormField>
				<FormField>
					<label htmlFor="roastType">What is the roast type?</label>
					<input id="roastType" type="text" {...register('roastType')} />
				</FormField>
				<FormField>
					<label htmlFor="instructions">What are the instructions?</label>
					<textarea
						id="instructions"
						placeholder="Add your instructions here"
						{...register('instructions')}
					/>
				</FormField>
				<Button type="submit" disabled={status === 'loading'}>
					{status === 'loading' ? 'Loading...' : 'Submit'}
				</Button>
			</form>
		</Layout>
	);
};

export default CreateBrew;
