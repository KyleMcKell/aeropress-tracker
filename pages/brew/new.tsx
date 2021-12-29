import { AeropressBrew } from '@prisma/client';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '~/components/Button';
import Layout from '~/components/Layout';
import LogInButton from '~/components/LogInButton';

import { Data as CreateBrewData } from '../api/brew';

type FormData = Omit<AeropressBrew, 'userId' | 'id'>;

const ErrorText = ({ error }: { error: string }) => (
	<span role="alert" className="text-danger-500 text-sm font-semibold">
		{error}
	</span>
);

interface FormFieldProps {
	children: React.ReactNode;
}

const FormField = ({ children }: FormFieldProps) => {
	return (
		<div className="flex flex-col border-b-2 border-neutral-300 pb-1">
			{children}
		</div>
	);
};

const RequiredSpan = () => <span className="font-bold">*</span>;

const defaultValues: FormData = {
	name: '',
	description: '',
	brewTime: 150,
	waterTemp: 100,
	coffeeWeight: 15,
	waterWeight: 200,
	grindSize: 'Any',
	roastType: 'Any',
	inverted: false,
	favorite: false,
	instructions: '',
};

const CreateBrew: NextPage = () => {
	const { data: session, status } = useSession();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ defaultValues });
	const [newBrew, setNewBrew] = useState<Omit<CreateBrewData, 'brews'>>();

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

		const newBrew: Omit<CreateBrewData, 'brews'> = await response.json();

		setNewBrew(newBrew);

		return newBrew;
	});

	return (
		<Layout
			title="Create a Brew"
			description="Add another brew to your list of created brews"
		>
			{status === 'unauthenticated' && (
				<div className="flex flex-col items-center gap-6">
					<p className="text-neutral-500 text-sm">
						You must be logged in to create a brew.
					</p>
					<LogInButton />
				</div>
			)}
			{status === 'authenticated' && (
				<div className="flex flex-col gap-4 items-center text-neutral-900">
					<h1 className="text-2xl font-bold text-neutral-800">
						Create A New Brew
					</h1>
					{newBrew?.brew && (
						<div className="text-lg">
							Congrats! Your brew has been created. You can find it here:{' '}
							<Link href={`/brew/${newBrew.brew.id}`} passHref>
								<a className="underline font-medium text-neutral-600">
									{newBrew.brew.name}
								</a>
							</Link>
						</div>
					)}
					<form onSubmit={onSubmit} className="grid sm:grid-cols-2 w-fit gap-8">
						<FormField>
							<label htmlFor="name">
								Give your Brew a Name
								<RequiredSpan />
							</label>
							<input
								id="name"
								placeholder="My Awesome Brew"
								aria-invalid={errors.name ? 'true' : 'false'}
								{...register('name', { required: true, maxLength: 255 })}
							/>
							{errors.name && errors.name.type === 'required' && (
								<ErrorText error="Name is Required" />
							)}
							{errors.name && errors.name.type === 'maxLength' && (
								<ErrorText error="Max length exceeded" />
							)}
						</FormField>

						<FormField>
							<label htmlFor="description">
								Short Description of your Brew{' '}
							</label>
							<input
								id="description"
								placeholder="A nice brew"
								{...register('description', { maxLength: 255 })}
							/>
							{errors.description &&
								errors.description?.type === 'maxLength' && (
									<ErrorText error="Max length exceeded" />
								)}
						</FormField>

						<FormField>
							<label htmlFor="inverted">Is your brew inverted?</label>
							<input
								type={'checkbox'}
								id="inverted"
								{...register('inverted')}
							/>
						</FormField>

						<FormField>
							<label htmlFor="brewTime">
								How long does your brew take? (seconds)
								<RequiredSpan />
							</label>
							<input
								id="brewTime"
								type="number"
								{...register('brewTime', { required: true })}
							/>
							{errors.brewTime && errors.brewTime.type === 'required' && (
								<ErrorText error="Brew Time is Required" />
							)}
						</FormField>

						<FormField>
							<label htmlFor="coffeeWeight">
								How much coffee do you want to use? (grams)
								<RequiredSpan />
							</label>
							<input
								id="coffeeWeight"
								type="number"
								{...register('coffeeWeight', { required: true })}
							/>
							{errors.coffeeWeight &&
								errors.coffeeWeight.type === 'required' && (
									<ErrorText error="Coffee Weight is Required" />
								)}
						</FormField>

						<FormField>
							<label htmlFor="waterWeight">
								How much water do you want to use? (ml)
								<RequiredSpan />
							</label>
							<input
								id="waterWeight"
								type="number"
								{...register('waterWeight', { required: true })}
							/>
							{errors.waterWeight && errors.waterWeight.type === 'required' && (
								<ErrorText error="Water Weight is Required" />
							)}
						</FormField>

						<FormField>
							<label htmlFor="waterTemp">
								What is the water temperature? (celcius)
								<RequiredSpan />
							</label>
							<input
								id="waterTemp"
								type="number"
								{...register('waterTemp', { required: true })}
							/>
							{errors.waterTemp && errors.waterTemp.type === 'required' && (
								<ErrorText error="Water Temperature is Required" />
							)}
						</FormField>

						<FormField>
							<label htmlFor="favorite">
								Is this one of your favorite brews?
							</label>
							<input
								type={'checkbox'}
								id="favorite"
								{...register('favorite')}
							/>
						</FormField>

						<FormField>
							<label htmlFor="grindSize">
								What is the grind size?
								<RequiredSpan />
							</label>
							<select id="grindSize" {...register('grindSize')}>
								<option value="Any">Any</option>
								<option value="Extra Fine">Extra Fine</option>
								<option value="Fine">Fine</option>
								<option value="Medium">Medium</option>
								<option value="Medium Coarse">Medium Coarse</option>
								<option value="Coarse">Coarse</option>
							</select>
							{errors.grindSize && errors.grindSize.type === 'required' && (
								<ErrorText error="Grind Size is Required (put any if you don't have a preferance)" />
							)}
						</FormField>

						<FormField>
							<label htmlFor="roastType">
								What is the roast type?
								<RequiredSpan />
							</label>
							<select id="roastType" {...register('roastType')}>
								<option value="Any">Any</option>
								<option value="Light">Light</option>
								<option value="Medium Light">Medium Light</option>
								<option value="Medium">Medium</option>
								<option value="Medium Dark">Medium Dark</option>
								<option value="Dark">Dark</option>
							</select>
							{errors.roastType && errors.roastType.type === 'required' && (
								<ErrorText error="Roast Type is Required (put any if you don't have a preferance)" />
							)}
						</FormField>

						<FormField>
							<label htmlFor="instructions">What are the instructions?</label>
							<textarea
								id="instructions"
								placeholder="Add your instructions here"
								{...register('instructions')}
							/>
						</FormField>

						<div className="place-self-end">
							<Button type="submit">Submit</Button>
						</div>
					</form>
					{newBrew?.error && <div>{newBrew.error}</div>}
					{newBrew?.brew && (
						<div className="text-lg">
							Congrats! Your brew has been created. You can find it here:{' '}
							<Link href={`/brew/${newBrew.brew.id}`} passHref>
								<a className="underline font-medium text-neutral-600">
									{newBrew.brew.name}
								</a>
							</Link>
						</div>
					)}
				</div>
			)}
		</Layout>
	);
};

export default CreateBrew;
