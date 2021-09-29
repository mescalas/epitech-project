<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div>
				<h2 class="text-7xl font-extrabold text-white">Previously On</h2>
				<h2 class="mt-6 text-center text-3xl font-extrabold text-white">
					Connection à votre compte
				</h2>
			</div>
			<form class="mt-8 space-y-6" method="POST">
				<input type="hidden" name="remember" value="true" />
				<div class="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="email-address" class="sr-only">Adresse Mail</label>
						<input
							id="email-address"
							name="email"
							type="email"
							autocomplete="email"
							required=""
							v-model.trim="email"
							class="bg-gray-500 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-white text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Adresse Mail"
						/>
					</div>
					<div>
						<label for="password" class="sr-only">Mot de passe</label>
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required=""
							v-model.trim="password"
							class="bg-gray-500 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-white text-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:bg-gray-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Mot de passe"
						/>
					</div>

					<div class="flex justify-end pt-2">
						<div class="text-sm">
							<a
								href="https://www.betaseries.com/inscription/"
								target="_blank"
								class="font-medium text-indigo-500 hover:text-indigo-400"
							>
								Pas encore inscrit ?
							</a>
						</div>
					</div>
				</div>

				<!-- Message Alerte -->
				<div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg
								class="h-5 w-5 text-red-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-800">
								{{ errorMessage }}
							</h3>
						</div>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						v-on:click.prevent="login()"
					>
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
						</span>
						Connection
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { LockClosedIcon } from '@heroicons/vue/solid';
	const md5 = require('md5');

	export default {
		data() {
			return {
				email: '',
				password: '',
				errorMessage: false,
			};
		},
		methods: {
			login: async function() {
				try {
					let login = await this.axios.post('https://api.betaseries.com/members/auth', {
						login: this.email,
						password: md5(this.password),
					});

					localStorage.setItem('BC', JSON.stringify(login.data));
					this.$router.push({ name: 'Home' });
				} catch (error) {
					this.errorMessage = error.response.data.errors[0].text;
				}
			},
		},

		components: {
			LockClosedIcon,
		},
	};
</script>
