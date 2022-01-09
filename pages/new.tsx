import type { AeropressBrew } from '@prisma/client';
import type { NextPage } from 'next';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Data as CreateBrewData } from './api/brew';

import Button from '~/components/Button';
import ErrorText from '~/components/ErrorText';
import FormField from '~/components/FormField';
import Layout from '~/components/Layout';
import LogInButton from '~/components/LogInButton';
import VisuallyHidden from '~/components/VisuallyHidden';
import FormLabel from '~/components/FormLabel';
import Icon from '~/components/Icon';

type FormData = Omit<AeropressBrew, 'userId' | 'id' | 'brewTime'> & {
	brewMinutes: number;
	brewSeconds: number;
};

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
		watch,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({ defaultValues });
	const [newBrew, setNewBrew] = useState<Omit<CreateBrewData, 'brews'>>();
	const router = useRouter();
	const watchInverted = watch('inverted');

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

		await router.push('/[id]', `/${newBrew.brew?.id}`);

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
						className="relative shadow-md shadow-neutral-800 w-full max-w-3xl rounded-lg p-8 grid grid-cols-1 gap-4 border-4 border-neutral-900 bg-neutral-50 dark:border-neutral-300 dark:bg-neutral-900 dark:text-neutral-50"
					>
						<FormField>
							<FormLabel htmlFor="name" isRequired>
								Name Your Brew
							</FormLabel>

							<input
								id="name"
								placeholder="My Awesome Brew"
								aria-invalid={errors.name ? 'true' : 'false'}
								{...register('name', {
									required: true,
									maxLength: 25,
									minLength: 3,
								})}
								className="placeholder:text-neutral-600 rounded-full text-md font-medium w-full px-8 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-200 dark:text-black"
							/>
							<div className="pl-8">
								{errors.name && errors.name.type === 'required' && (
									<ErrorText error="Name is Required" />
								)}
								{errors.name && errors.name.type === 'maxLength' && (
									<ErrorText error="Your name must be less than 25 characters" />
								)}
								{errors.name && errors.name.type === 'minLength' && (
									<ErrorText error="Your name must be more than 3 characters" />
								)}
							</div>
						</FormField>

						<FormField>
							<FormLabel htmlFor="description">Tell us about it!</FormLabel>
							<input
								id="description"
								placeholder="A nice brew"
								{...register('description', { maxLength: 250 })}
								className="placeholder:text-neutral-600 rounded-full text-md font-medium w-full px-8 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-200 dark:text-black"
							/>
							<div className="pl-8">
								{errors.description &&
									errors.description?.type === 'maxLength' && (
										<ErrorText error="Max length of 250 exceeded" />
									)}
							</div>
						</FormField>

						<FormField>
							<FormLabel htmlFor="brewMinutes" isRequired>
								How long does your brew take?
							</FormLabel>
							<div className="flex justify-start rounded-full text-xl font-semibold w-full px-8 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-200 dark:text-black">
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
								<span className="mx-1 mr-8">:</span>
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

						<section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
							<FormField>
								<FormLabel htmlFor="inverted">Inverted? </FormLabel>
								<div className="h-full flex items-center justify-between rounded-full px-8 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-200 dark:text-black">
									<div
										className={`${
											watchInverted ? 'rotate-180' : ''
										} inline-block focus-within:outline rounded-sm`}
									>
										<label htmlFor="inverted">
											<Icon id="coffee" strokeWidth={3} size={28} />
										</label>
										<VisuallyHidden>
											<input
												type={'checkbox'}
												id="inverted"
												{...register('inverted')}
											/>
										</VisuallyHidden>
									</div>
								</div>
							</FormField>

							<FormField>
								<FormLabel htmlFor="waterTemp">Water Temp</FormLabel>
								<input
									id="waterTemp"
									type="number"
									{...register('waterTemp', { required: true })}
									className="rounded-full text-xl font-semibold w-full px-8 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-200 dark:text-black"
								/>
								<div className="pl-8">
									{errors.waterTemp && errors.waterTemp.type === 'required' && (
										<ErrorText error="Water Temperature is Required" />
									)}
								</div>
							</FormField>

							<FormField>
								<FormLabel htmlFor="coffeeWeight">Coffee Weight</FormLabel>
								<input
									id="coffeeWeight"
									type="number"
									{...register('coffeeWeight', { required: true })}
									className=" rounded-full text-xl font-semibold w-full px-8 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-200 dark:text-black"
								/>
								<div className="pl-8">
									{errors.coffeeWeight &&
										errors.coffeeWeight.type === 'required' && (
											<ErrorText error="Coffee Weight is Required" />
										)}
								</div>
							</FormField>

							<FormField>
								<FormLabel htmlFor="waterWeight">Water Volume</FormLabel>
								<input
									id="waterWeight"
									type="number"
									min={0}
									max={999}
									{...register('waterWeight', { required: true })}
									className="rounded-full text-xl font-semibold w-full px-8 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-200 dark:text-black"
								/>
								<div className="pl-8">
									{errors.waterWeight &&
										errors.waterWeight.type === 'required' && (
											<ErrorText error="Water Weight is Required" />
										)}
								</div>
							</FormField>

							<FormField>
								<FormLabel htmlFor="grindSize">Grind Size</FormLabel>
								<select
									id="grindSize"
									{...register('grindSize')}
									className="rounded-full text-xl font-semibold w-full px-8 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-200 dark:text-black"
								>
									<option value="Any">Any</option>
									<option value="Extra Fine">Extra Fine</option>
									<option value="Fine">Fine</option>
									<option value="Medium">Medium</option>
									<option value="Medium Coarse">Medium Coarse</option>
									<option value="Coarse">Coarse</option>
								</select>
								<div className="pl-8">
									{errors.grindSize && errors.grindSize.type === 'required' && (
										<ErrorText error="Grind Size is Required (put any if you don't have a preferance)" />
									)}
								</div>
							</FormField>

							<FormField>
								<FormLabel htmlFor="roastType">Roast Type</FormLabel>
								<select
									id="roastType"
									{...register('roastType')}
									className="rounded-full text-xl flex items-center justify-center font-semibold w-full px-8 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-200 dark:text-black"
								>
									<option value="Any">Any</option>
									<option value="Light">Light</option>
									<option value="Medium Light">Medium Light</option>
									<option value="Medium">Medium</option>
									<option value="Medium Dark">Medium Dark</option>
									<option value="Dark">Dark</option>
								</select>
								<div className="pl-8">
									{errors.roastType && errors.roastType.type === 'required' && (
										<ErrorText error="Roast Type is Required (put any if you don't have a preferance)" />
									)}
								</div>
							</FormField>
						</section>

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
