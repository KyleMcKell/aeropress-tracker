import type { AeropressBrew } from '@prisma/client';
import type { NextPage } from 'next';
import type { ReactNode } from 'react';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Data as CreateBrewData } from '../api/brew';

import Button from '~/components/Button';
import Layout from '~/components/Layout';
import LogInButton from '~/components/LogInButton';
import VisuallyHidden from '~/components/VisuallyHidden';

type FormData = Omit<AeropressBrew, 'userId' | 'id' | 'brewTime'> & {
	brewMinutes: number;
	brewSeconds: number;
};

const ErrorText = ({ error }: { error: string }) => (
	<span role="alert" className="text-danger-500 text-sm font-semibold">
		{error}
	</span>
);

interface FormFieldProps {
	children: ReactNode;
}

const FormField = ({ children }: FormFieldProps) => {
	return (
		<div className="flex flex-col border-b-2 border-neutral-300 bg-none pb-1 gap-1">
			{children}
		</div>
	);
};

const RequiredSpan = () => <span className="font-bold">*</span>;

const defaultValues: FormData = {
	name: '',
	description: '',
	brewMinutes: 1,
	brewSeconds: 30,
	waterTemp: 100,
	coffeeWeight: 15,
	waterWeight: 200,
	grindSize: 'Any',
	roastType: 'Any',
	inverted: false,
	favorite: false,
	info: '',
};

const CreateBrew: NextPage = () => {
	const { data: session, status } = useSession();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({ defaultValues });
	const [newBrew, setNewBrew] = useState<Omit<CreateBrewData, 'brews'>>();
	const router = useRouter();

	// render data
	const onSubmit = handleSubmit(async (data: FormData) => {
		let brewToCreate: Omit<AeropressBrew, 'id'> = {
			...data,
			userId: session!.userId,
			brewTime: Number(data.brewMinutes) * 60 + Number(data.brewSeconds),
		};

		const response = await fetch('/api/brew', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
			body: JSON.stringify(brewToCreate),
		});

		const newBrew: Omit<CreateBrewData, 'brews'> = await response.json();

		setNewBrew(newBrew);

		await router.push('/brew/[id]', `/brew/${newBrew.brew?.id}`);

		return newBrew;
	});

	return (
		<Layout
			title="Create a Brew"
			description="Add another brew to your list of created brews"
		>
			{status === 'unauthenticated' && (
				<div className="flex flex-col items-center gap-6">
					<p className="text-neutral-500 dark:text-neutral-200 text-lg font-semibold">
						You must be logged in to create a brew.
					</p>
					<LogInButton />
				</div>
			)}
			{status === 'authenticated' && (
				<div className="flex flex-col gap-10 items-center text-neutral-900 dark:text-neutral-200">
					<h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
						Create A New Brew
					</h1>
					<form
						onSubmit={onSubmit}
						className="grid sm:grid-cols-2 w-fit gap-8 border-4 font-medium border-neutral-600 bg-neutral-50 text-black p-8 rounded-lg dark:border-neutral-900 dark:bg-neutral-900 dark:text-neutral-200"
					>
						<FormField>
							<label htmlFor="name">
								Give your Brew a Name
								<RequiredSpan />
							</label>
							<input
								id="name"
								placeholder="My Awesome Brew"
								aria-invalid={errors.name ? 'true' : 'false'}
								{...register('name', {
									required: true,
									maxLength: 25,
									minLength: 3,
								})}
								className="bg-black bg-opacity-0"
							/>
							{errors.name && errors.name.type === 'required' && (
								<ErrorText error="Name is Required" />
							)}
							{errors.name && errors.name.type === 'maxLength' && (
								<ErrorText error="Your name must be less than 25 characters" />
							)}
							{errors.name && errors.name.type === 'minLength' && (
								<ErrorText error="Your name must be more than 3 characters" />
							)}
						</FormField>

						<FormField>
							<label htmlFor="description">
								Short Description of your Brew{' '}
							</label>
							<input
								id="description"
								placeholder="A nice brew"
								{...register('description', { maxLength: 250 })}
								className="bg-black bg-opacity-0"
							/>
							{errors.description &&
								errors.description?.type === 'maxLength' && (
									<ErrorText error="Max length of 250 exceeded" />
								)}
						</FormField>

						<FormField>
							<label htmlFor="inverted">Is your brew inverted?</label>
							<input
								type={'checkbox'}
								id="inverted"
								{...register('inverted')}
								className="bg-black bg-opacity-0  checked:bg-neutral-500 indeterminate:bg-gray-300"
							/>
						</FormField>

						<FormField>
							<label htmlFor="brewMinutes">How long does your brew take?</label>
							<div>
								<VisuallyHidden>
									<label htmlFor="brewMinutes">How many minutes?</label>
								</VisuallyHidden>
								<input
									id="brewMinutes"
									type="number"
									min={0}
									max={99}
									{...register('brewMinutes', { required: true, max: 99 })}
									className="bg-black bg-opacity-0"
									onChange={(e) => {
										e.target.value = String(
											Math.min(99, Math.max(0, Number(e.target.value)))
										);
									}}
								/>
								<span className="mx-1">:</span>
								<VisuallyHidden>
									<label htmlFor="brewSeconds">How many seconds?</label>
								</VisuallyHidden>
								<input
									id="brewSeconds"
									type="number"
									min={0}
									max={59}
									{...register('brewSeconds', { required: true, max: 59 })}
									className="bg-black bg-opacity-0"
									onChange={(e) => {
										e.target.value = String(
											Math.min(59, Math.max(0, Number(e.target.value)))
										);
									}}
								/>
							</div>
						</FormField>

						<FormField>
							<label htmlFor="coffeeWeight">
								How much coffee would you like to use? (grams)
								<RequiredSpan />
							</label>
							<input
								id="coffeeWeight"
								type="number"
								{...register('coffeeWeight', { required: true })}
								className="bg-black bg-opacity-0"
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
								min={0}
								max={999}
								{...register('waterWeight', { required: true })}
								className="bg-black bg-opacity-0"
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
								className="bg-black bg-opacity-0"
							/>
							{errors.waterTemp && errors.waterTemp.type === 'required' && (
								<ErrorText error="Water Temperature is Required" />
							)}
						</FormField>

						<FormField>
							<label htmlFor="grindSize">
								What is the grind size?
								<RequiredSpan />
							</label>
							<select
								id="grindSize"
								{...register('grindSize')}
								className="bg-neutral-50 dark:bg-neutral-900"
							>
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
							<select
								id="roastType"
								{...register('roastType')}
								className="bg-neutral-50 dark:bg-neutral-900"
							>
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

						<div className="place-self-end">
							<Button
								type="submit"
								variant="boring"
								disabled={isSubmitting ? true : false}
							>
								{isSubmitting ? 'Loading' : 'Submit'}
							</Button>
						</div>
					</form>
					{newBrew?.error && <div>{newBrew.error}</div>}
				</div>
			)}
		</Layout>
	);
};

export default CreateBrew;
