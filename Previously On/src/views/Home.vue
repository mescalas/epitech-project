<template>
	<div class="min-h-screen bg-gray-900">
		<div class="max-w-2xl px-4 py-16 mx-auto sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
			<div class="flex flex-col sm:flex-row sm:justify-between">
				<h2 class="font-bold text-white text-7xl">Séries</h2>
				<div class="flex justify-end">
					<svg
						v-on:click="this.showModal = 5"
						class="w-10 h-10 mt-5 mr-5 text-white cursor-pointer"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="{2}"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<svg
						v-on:click="showFriends()"
						xmlns="http://www.w3.org/2000/svg"
						class="w-10 h-10 mt-5 text-white cursor-pointer"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
					</svg>
				</div>
			</div>

			<div class="grid grid-cols-1 mt-8 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
				<div
					v-for="product in products"
					v-on:click="
						() => {
							openModal(product.title);
						}
					"
					:key="product.id"
					class="transition duration-300 ease-in-out transform cursor-pointer hover:scale-110"
				>
					<div class="relative">
						<div class="relative w-full overflow-hidden rounded-lg h-72">
							<img
								:src="product.images.poster"
								loading="lazy"
								:alt="product.title"
								class="object-cover object-center w-full h-full"
							/>
						</div>
						<div class="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-lg h-72">
							<div class="absolute text-white top-2 right-2">
								<svg
									v-if="product.in_account"
									v-on:click="
										() => {
											deleteShow(product.id);
										}
									"
									class="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									></path>
								</svg>
								<svg
									v-else
									v-on:click="
										() => {
											addShow(product.id);
										}
									"
									class="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>
							<div
								aria-hidden="true"
								class="absolute inset-x-0 bottom-0 h-48 opacity-100 bg-gradient-to-t from-black"
							/>
							<p class="relative text-lg font-semibold text-white">{{ product.title }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Modal serie -->
		<div
			v-if="showModal !== 0"
			class="fixed inset-0 z-10 overflow-y-auto"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				<div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

				<div
					class="inline-block overflow-hidden text-left text-white align-bottom transition-all transform bg-gray-800 rounded-lg shadow-xl sm:my-16 2xl:my-24 sm:align-middle sm:max-w-lg sm:w-full"
				>
					<div id="resume" v-if="showModal === 1">
						<div class="relative">
							<div class="relative w-full overflow-hidden rounded-t-lg h-72">
								<img
									:src="products[indexOfModal].images.show"
									loading="lazy"
									:alt="products[indexOfModal].title"
									class="object-cover object-center w-full h-full cursor-default"
								/>
							</div>
							<div class="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-t-lg h-72">
								<div class="absolute text-white top-2 left-2">
									<div v-if="products[indexOfModal].in_account" class="cursor-pointer">
										<svg
											v-on:click="
												() => {
													deleteShow(products[indexOfModal].id, products[indexOfModal].title);
												}
											"
											class="w-6 h-6"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<p class="text-xs">Suivi</p>
									</div>
									<div v-else class="cursor-pointer">
										<svg
											v-on:click="
												() => {
													addShow(products[indexOfModal].id, products[indexOfModal].title);
												}
											"
											class="w-6 h-6 ml-1 cursor-pointer"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clip-rule="evenodd"
											></path>
										</svg>
										<p class="text-xs">Suivre</p>
									</div>
								</div>
								<div v-if="products[indexOfModal].in_account" class="absolute top-2 left-12">
									<div v-if="products[indexOfModal].user.archived">
										<svg
											v-on:click="
												() => {
													deleteArchive(products[indexOfModal].id, products[indexOfModal].title);
												}
											"
											class="w-6 h-6 ml-5 cursor-pointer"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
											<path
												fill-rule="evenodd"
												d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
												clip-rule="evenodd"
											></path>
										</svg>
										<p class="text-xs">Désarchiver</p>
									</div>
									<div v-else>
										<svg
											v-on:click="
												() => {
													addArchive(products[indexOfModal].id, products[indexOfModal].title);
												}
											"
											class="w-6 h-6 ml-2 cursor-pointer"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
											></path>
										</svg>
										<p class="text-xs">Archiver</p>
									</div>
								</div>
								<div
									class="absolute cursor-pointer top-2 right-2"
									v-on:click="
										() => {
											closeModal();
										}
									"
								>
									<svg
										class="w-6 h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clip-rule="evenodd"
										></path>
									</svg>
								</div>
								<div
									aria-hidden="true"
									class="absolute inset-x-0 bottom-0 h-48 opacity-100 bg-gradient-to-t from-black"
								/>
								<p
									v-on:click="this.showModal = 2"
									class="relative text-2xl font-semibold tracking-wide text-white cursor-pointer hover:underline"
								>
									{{ products[indexOfModal].title }}
								</p>
							</div>
						</div>

						<div>
							<div class="p-5">
								<p class="pb-3 border-b border-gray-600">
									{{ products[indexOfModal].description }}
								</p>
								<div class="flex justify-around p-3 border-b border-gray-600 flex-nowrap">
									<p>{{ products[indexOfModal].seasons }} Saison(s)</p>
									<p>{{ products[indexOfModal].episodes }} Épisode(s)</p>
								</div>

								<div class="flex flex-wrap justify-between py-5">
									<div class="flex">
										<p class="mt-2 mr-3">Note :</p>
										<star-rating
											:increment="0.01"
											:rating="products[indexOfModal].notes.mean"
											:showRating="true"
											:read-only="true"
											:star-size="30"
										></star-rating>
									</div>
									<p
										v-on:click="this.showModal = 2"
										class="mt-2 text-sm text-indigo-500 cursor-pointer hover:underline hover:text-indigo-400"
									>
										Voir les épisodes...
									</p>
								</div>

								<div class="flex flex-wrap">
									<p
										v-for="value in products[indexOfModal].genres"
										:key="value"
										class="inline-block p-2 m-1 bg-gray-600 border border-gray-500 rounded-lg"
									>
										{{ value }}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div id="episode" v-if="showModal === 2">
						<div class="relative">
							<div class="relative w-full overflow-hidden rounded-t-lg h-72">
								<img
									:src="products[indexOfModal].images.show"
									loading="lazy"
									:alt="products[indexOfModal].title"
									class="object-cover object-center w-full h-full cursor-default"
								/>
							</div>
							<div class="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-t-lg h-72">
								<div v-on:click="showModal = 1" class="absolute text-white top-2 left-2">
									<svg
										class="w-6 h-6 cursor-pointer"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 19l-7-7m0 0l7-7m-7 7h18"
										></path>
									</svg>
								</div>
								<div
									class="absolute cursor-pointer top-2 right-2"
									v-on:click="
										() => {
											closeModal();
										}
									"
								>
									<svg
										class="w-6 h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clip-rule="evenodd"
										></path>
									</svg>
								</div>
								<div
									aria-hidden="true"
									class="absolute inset-x-0 bottom-0 h-48 opacity-100 bg-gradient-to-t from-black"
								/>
								<p
									v-on:click="showModal = 2"
									class="relative text-2xl font-semibold tracking-wide text-white cursor-pointer hover:underline"
								>
									{{ products[indexOfModal].title }}
								</p>
							</div>
						</div>

						<div>
							<select
								name="season"
								class="m-5 bg-gray-600 rounded-lg"
								@change="displaySeason($event, products[indexOfModal].id)"
							>
								<option v-for="i in seasonCount" :key="i" :value="i"> Saison {{ i }}</option>
							</select>

							<div
								class="flex flex-col overflow-auto divide-y divide-gray-600 max-h-80 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500"
							>
								<div v-for="episode in modalEpisode" :key="episode" class="py-4 mx-5">
									<div class="flex justify-between mb-4">
										<div class="flex">
											<span
												class="inline-flex items-center px-3 py-1 mr-5 text-sm font-medium text-gray-800 bg-gray-300 rounded-md"
											>
												{{ episode.code }}
											</span>
											<h1 class="text-lg font-bold">{{ episode.title }}</h1>
										</div>
										<div v-if="products[indexOfModal].in_account" class="flex">
											<svg
												v-on:click="showComments(episode.id, episode)"
												class="w-6 h-6 mr-2 cursor-pointer"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
												></path>
											</svg>
											<svg
												v-if="episode.user.seen"
												v-on:click="deleteSeen(episode.id, episode.season)"
												class="w-6 h-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												></path>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
												></path>
											</svg>
											<svg
												v-else
												v-on:click="setSeen(episode.id, episode.season)"
												class="w-6 h-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
												></path>
											</svg>
										</div>
									</div>

									<p class="mb-4 overflow-hidden text-sm max-h-20 overflow-ellipsis">{{ episode.description }}</p>
									<div class="flex justify-between">
										<star-rating
											:increment="0.01"
											:rating="episode.note.mean"
											:showRating="false"
											:read-only="true"
											:star-size="20"
										></star-rating>
										<p class="text-sm italic">
											{{ episode.date }}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="comments" v-if="showModal === 3">
						<div class="relative">
							<div class="relative w-full overflow-hidden rounded-t-lg h-72">
								<img
									:src="products[indexOfModal].images.show"
									loading="lazy"
									:alt="products[indexOfModal].title"
									class="object-cover object-center w-full h-full cursor-default"
								/>
							</div>
							<div class="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-t-lg h-72">
								<div v-on:click="showModal = 2" class="absolute text-white top-2 left-2">
									<svg
										class="w-6 h-6 cursor-pointer"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 19l-7-7m0 0l7-7m-7 7h18"
										></path>
									</svg>
								</div>
								<div
									class="absolute cursor-pointer top-2 right-2"
									v-on:click="
										() => {
											closeModal();
										}
									"
								>
									<svg
										class="w-6 h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clip-rule="evenodd"
										></path>
									</svg>
								</div>
								<div
									aria-hidden="true"
									class="absolute inset-x-0 bottom-0 h-48 opacity-100 bg-gradient-to-t from-black"
								/>
								<p
									v-on:click="showModal = 2"
									class="relative text-2xl font-semibold tracking-wide text-white cursor-pointer hover:underline"
								>
									{{ products[indexOfModal].title }}
								</p>
							</div>
						</div>

						<div>
							<div class="relative flex p-5 border-b border-gray-700">
								<span
									class="inline-flex items-center px-3 py-1 mr-5 text-sm font-medium text-gray-800 bg-gray-300 rounded-md"
								>
									{{ currentEpisode.code }}
								</span>
								<h1 class="text-lg font-bold">{{ currentEpisode.title }}</h1>
							</div>

							<div v-if="currentEpisode.user.seen" class="p-5 border-b border-gray-700">
								<p>Poster son commentaire :</p>
								<textarea
									v-model="commentContent"
									name="commentaire"
									placeholder="Entrez votre commentaire... (10 caractères minimum)"
									class="w-full h-20 text-white placeholder-white bg-gray-500 border border-gray-700 rounded resize-none focus:outline-none focus:ring focus:ring-indigo-600 focus:border-indigo-500"
								></textarea>
								<div class="flex justify-end">
									<button
										:disabled="commentContent.length <= 10"
										v-on:click="postComment()"
										type="button"
										class="px-3 py-2 mt-3 text-white transition duration-500 transform bg-indigo-600 rounded focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 active:scale-90 disabled:bg-gray-200"
									>
										Envoyer
									</button>
								</div>
							</div>

							<div
								class="flex flex-col overflow-auto divide-y divide-gray-600 max-h-96 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500"
							>
								<div v-for="comment in modalComments" :key="comment" class="flex flex-col py-5 mx-5">
									<div class="flex flex-row">
										<img
											loading="lazy"
											:src="comment.avatar"
											:alt="comment.login"
											class="w-20 h-20 mb-3 mr-3 rounded-full"
										/>
										<div class="flex flex-col">
											<p class="mb-2 text-lg font-bold">{{ comment.login }}</p>
											<p class="mb-3">{{ comment.text }}</p>
										</div>
									</div>
									<div class="flex justify-end">
										<p class="inline-block italic">{{ comment.date }}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="friends" v-if="showModal === 4">
						<div class="flex justify-between">
							<h1 class="m-5 text-4xl font-bold">Ami(s)</h1>
							<svg
								v-on:click="
									() => {
										closeModal();
									}
								"
								class="w-6 h-6 m-2 text-white cursor-pointer"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</div>
						<div class="pb-5 border-b border-gray-600 ">
							<div class="flex">
								<input
									type="text"
									name="Recherche amis"
									placeholder="Recherche d'ami par email"
									v-model.trim="inputSearchFriend"
									class="w-6/12 mx-5 text-white bg-gray-600 focus:outline-none focus:ring focus:ring-indigo-600 focus:border-indigo-600"
								/>
								<button
									v-on:click="searchFriend()"
									type="button"
									class="px-3 py-2 text-white transition duration-500 transform bg-indigo-600 rounded focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 active:scale-90 disabled:bg-gray-200"
								>
									Rechercher
								</button>
							</div>

							<!-- Alert Error Message -->
							<div v-if="errorAlertFriend" class="w-1/2 p-4 mx-5 mt-5 border border-red-800 rounded bg-red-50">
								<div class="flex">
									<div class="flex-shrink-0">
										<svg
											class="w-5 h-5 text-red-400"
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
											Aucun utilisateur trouvé à cette adresse mail.
										</h3>
									</div>
								</div>
							</div>

							<!-- Success Alert Message -->
							<div v-if="successAlertFriend" class="w-1/2 p-4 mx-5 mt-5 border border-green-800 rounded bg-green-50">
								<div class="flex">
									<div class="flex-shrink-0">
										<svg
											class="w-5 h-5 text-green-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>
									<div class="ml-3">
										<p class="text-sm font-medium text-green-800">
											Ami ajouté !
										</p>
									</div>
								</div>
							</div>
						</div>
						<div v-if="friendRequest.length > 0" class="border-b border-gray-600 ">
							<div class="m-5 divider-y divider-gray-600">
								<p class="text-xl font-bold">Demande d'amis :</p>
								<div v-for="request in friendRequest" :key="request" class="flex justify-between pt-3 ">
									<div class="relative">
										<span class="inline-block w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
											<svg class="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
												<path
													d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
												/>
											</svg>
										</span>
										<span
											class="absolute top-0 right-0 block w-3 h-3 bg-indigo-600 rounded-full ring-2 ring-gray-800"
										></span>
									</div>

									<div class="flex justify-between w-10/12">
										<p class="mt-2">{{ request.login }}</p>
										<div class="flex">
											<svg
												v-on:click="addFriend(request.id)"
												xmlns="http://www.w3.org/2000/svg"
												class="h-6 w-6 mr-2 mt-1.5 cursor-pointer"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
											<svg
												v-on:click="deleteFriend(request.id)"
												xmlns="http://www.w3.org/2000/svg"
												class="h-6 w-6 mt-1.5 cursor-pointer"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div v-if="friendList.length === 0">
							<p class="mx-5 my-10 text-xl font-bold">Vous n'avez pas d'amis...</p>
						</div>
						<div v-else class="m-5 divider-y divider-gray-600">
							<p class="text-xl font-bold">Liste d'ami(s) :</p>
							<div v-for="friend in friendList" :key="friend" class="flex justify-between py-3 ">
								<span class="inline-block w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
									<svg class="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
								</span>
								<div class="flex justify-between w-10/12">
									<p class="mt-2">{{ friend.login }}</p>
									<div class="flex">
										<svg
											v-on:click="blockFriend(friend.id)"
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-white mt-1.5 mr-2 cursor-pointer"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
											/>
										</svg>
										<svg
											v-on:click="deleteFriend(friend.id)"
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 mt-1.5 text-white cursor-pointer"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="search" v-if="showModal === 5">
						<div class="flex justify-between">
							<h1 class="m-5 text-4xl font-bold">Recherche</h1>
							<svg
								v-on:click="
									() => {
										closeModal();
									}
								"
								class="w-6 h-6 m-2 text-white cursor-pointer"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</div>
						<div class="pb-5 border-b border-gray-600 ">
							<div class="flex">
								<input
									type="text"
									name="Recherche series"
									placeholder="Rechercher votre série"
									v-model.trim="inputSearchSeries"
									class="w-6/12 mx-5 text-white bg-gray-600 focus:outline-none focus:ring focus:ring-indigo-600 focus:border-indigo-600"
								/>
								<button
									v-on:click="searchSeries()"
									type="button"
									class="px-3 py-2 text-white transition duration-500 transform bg-indigo-600 rounded focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 active:scale-90 disabled:bg-gray-200"
								>
									Rechercher
								</button>
							</div>
						</div>
						<div v-if="resultSearchSeries.length === 0 && isLoading === false">
							<p class="m-5 text-xl">Aucun résultat...</p>
						</div>
						<div v-if="isLoading === true">
							<p class="m-5 text-xl">Chargement...</p>
						</div>
						<div
							v-else
							class="m-5 overflow-auto divide-y divide-gray-600 max-h-96 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500"
						>
							<div v-for="series in resultSearchSeries" :key="series" class="flex justify-between w-full py-3">
								<p
									class="cursor-pointer hover:underline"
									v-on:click="
										() => {
											specificSerie(series['title']);
										}
									"
								>
									{{ series['title'] }}
								</p>
								<p class="mr-4">{{ series['creation'] }}</p>
							</div>
						</div>
					</div>
					<div id="searchResume" v-if="showModal === 6">
						<div class="relative">
							<div class="relative w-full overflow-hidden rounded-t-lg h-72">
								<img
									:src="speSerie.images.show"
									loading="lazy"
									:alt="speSerie.title"
									class="object-cover object-center w-full h-full cursor-default"
								/>
							</div>
							<div class="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-t-lg h-72">
								<div class="absolute text-white top-2 left-2">
									<div v-if="speSerie.in_account" class="cursor-pointer">
										<svg
											v-on:click="
												() => {
													deleteShow(speSerie.id, speSerie.title);
												}
											"
											class="w-6 h-6"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<p class="text-xs">Suivi</p>
									</div>
									<div v-else class="cursor-pointer">
										<svg
											v-on:click="
												() => {
													addShow(speSerie.id, speSerie.title);
												}
											"
											class="w-6 h-6 ml-1 cursor-pointer"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clip-rule="evenodd"
											></path>
										</svg>
										<p class="text-xs">Suivre</p>
									</div>
								</div>
								<div v-if="speSerie.in_account" class="absolute top-2 left-12">
									<div v-if="speSerie.user.archived">
										<svg
											v-on:click="
												() => {
													deleteArchive(speSerie.id, speSerie.title);
												}
											"
											class="w-6 h-6 ml-5 cursor-pointer"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
											<path
												fill-rule="evenodd"
												d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
												clip-rule="evenodd"
											></path>
										</svg>
										<p class="text-xs">Désarchiver</p>
									</div>
									<div v-else>
										<svg
											v-on:click="
												() => {
													addArchive(speSerie.id, speSerie.title);
												}
											"
											class="w-6 h-6 ml-2 cursor-pointer"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
											></path>
										</svg>
										<p class="text-xs">Archiver</p>
									</div>
								</div>
								<div
									class="absolute cursor-pointer top-2 right-2"
									v-on:click="
										() => {
											closeModal();
										}
									"
								>
									<svg
										class="w-6 h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clip-rule="evenodd"
										></path>
									</svg>
								</div>
								<div
									aria-hidden="true"
									class="absolute inset-x-0 bottom-0 h-48 opacity-100 bg-gradient-to-t from-black"
								/>
								<p
									v-on:click="this.showModal = 6"
									class="relative text-2xl font-semibold tracking-wide text-white cursor-pointer hover:underline"
								>
									{{ speSerie.title }}
								</p>
							</div>
						</div>

						<div>
							<div class="p-5">
								<p class="pb-3 border-b border-gray-600">
									{{ speSerie.description }}
								</p>
								<div class="flex justify-around p-3 border-b border-gray-600 flex-nowrap">
									<p>{{ speSerie.seasons }} Saison(s)</p>
									<p>{{ speSerie.episodes }} Épisode(s)</p>
								</div>

								<div class="flex flex-wrap justify-between py-5">
									<div class="flex">
										<p class="mt-2 mr-3">Note :</p>
										<star-rating
											:increment="0.01"
											:rating="speSerie.notes.mean"
											:showRating="true"
											:read-only="true"
											:star-size="30"
										></star-rating>
									</div>
									<p
										v-on:click="this.showModal = 7"
										class="mt-2 text-sm text-indigo-500 cursor-pointer hover:underline hover:text-indigo-400"
									>
										Voir les épisodes...
									</p>
								</div>

								<div class="flex flex-wrap">
									<p
										v-for="value in speSerie.genres"
										:key="value"
										class="inline-block p-2 m-1 bg-gray-600 border border-gray-500 rounded-lg"
									>
										{{ value }}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div id="searchEpisode" v-if="showModal === 7">
						<div class="relative">
							<div class="relative w-full overflow-hidden rounded-t-lg h-72">
								<img
									:src="speSerie.images.show"
									loading="lazy"
									:alt="speSerie.title"
									class="object-cover object-center w-full h-full cursor-default"
								/>
							</div>
							<div class="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-t-lg h-72">
								<div v-on:click="showModal = 6" class="absolute text-white top-2 left-2">
									<svg
										class="w-6 h-6 cursor-pointer"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 19l-7-7m0 0l7-7m-7 7h18"
										></path>
									</svg>
								</div>
								<div
									class="absolute cursor-pointer top-2 right-2"
									v-on:click="
										() => {
											closeModal();
										}
									"
								>
									<svg
										class="w-6 h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clip-rule="evenodd"
										></path>
									</svg>
								</div>
								<div
									aria-hidden="true"
									class="absolute inset-x-0 bottom-0 h-48 opacity-100 bg-gradient-to-t from-black"
								/>
								<p
									v-on:click="showModal = 6"
									class="relative text-2xl font-semibold tracking-wide text-white cursor-pointer hover:underline"
								>
									{{ speSerie.title }}
								</p>
							</div>
						</div>

						<div>
							<select name="season" class="m-5 bg-gray-600 rounded-lg" @change="displaySeason($event, speSerie.id)">
								<option v-for="i in seasonCount" :key="i" :value="i"> Saison {{ i }}</option>
							</select>

							<div
								class="flex flex-col overflow-auto divide-y divide-gray-600 max-h-80 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500"
							>
								<div v-for="episode in modalEpisode" :key="episode" class="py-4 mx-5">
									<div class="flex justify-between mb-4">
										<div class="flex">
											<span
												class="inline-flex items-center px-3 py-1 mr-5 text-sm font-medium text-gray-800 bg-gray-300 rounded-md"
											>
												{{ episode.code }}
											</span>
											<h1 class="text-lg font-bold">{{ episode.title }}</h1>
										</div>
										<div v-if="speSerie.in_account" class="flex">
											<svg
												v-on:click="showComments(episode.id, episode)"
												class="w-6 h-6 mr-2 cursor-pointer"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
												></path>
											</svg>
											<svg
												v-if="episode.user.seen"
												v-on:click="deleteSeen(episode.id, episode.season)"
												class="w-6 h-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												></path>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
												></path>
											</svg>
											<svg
												v-else
												v-on:click="setSeen(episode.id, episode.season)"
												class="w-6 h-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
												></path>
											</svg>
										</div>
									</div>

									<p class="mb-4 overflow-hidden text-sm max-h-20 overflow-ellipsis">{{ episode.description }}</p>
									<div class="flex justify-between">
										<star-rating
											:increment="0.01"
											:rating="episode.note.mean"
											:showRating="false"
											:read-only="true"
											:star-size="20"
										></star-rating>
										<p class="text-sm italic">
											{{ episode.date }}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import StarRating from 'vue-star-rating';
	export default {
		components: {
			StarRating,
		},
		data() {
			return {
				products: [],
				data: false,
				modalOpen: false,
				indexOfModal: null,
				isLoading: false,
				showModal: 0,
				seasonCount: 0,
				modalEpisode: [],
				modalComments: [],
				currentSerie: 0,
				currentEpisode: [],
				commentContent: '',
				friendList: [],
				friendRequest: [],
				inputSearchFriend: '',
				inputSearchSeries: '',
				errorAlertFriend: null,
				successAlertFriend: false,
				resultSearchSeries: [],
				speSerie: [],
			};
		},
		methods: {
			getSeries: async function() {
				this.data = JSON.parse(localStorage.getItem('BC'));
				let response = await this.axios.get('https://api.betaseries.com/shows/list', {
					params: { access_token: this.data.token, order: 'popularity', limit: 50, summary: false },
				});
				this.products = response.data.shows;
			},
			addShow: async function(id, title) {
				try {
					await this.axios.post('https://api.betaseries.com/shows/show', {
						id: id,
						token: this.data.token,
					});
					this.specificSerie(title);
				} catch (error) {
					console.log(error);
				}
			},
			deleteShow: async function(id, title) {
				try {
					await this.axios.delete('https://api.betaseries.com/shows/show', {
						data: {
							id: id,
							token: this.data.token,
						},
					});
					this.specificSerie(title);
				} catch (error) {
					console.log(error);
				}
			},
			addArchive: async function(id, title) {
				try {
					await this.axios.post('https://api.betaseries.com/shows/archive', {
						id: id,
						token: this.data.token,
					});
					this.specificSerie(title);
				} catch (error) {
					console.log(error);
				}
			},
			deleteArchive: async function(id, title) {
				try {
					await this.axios.delete('https://api.betaseries.com/shows/archive', {
						data: {
							id: id,
							token: this.data.token,
						},
					});
					this.specificSerie(title);
				} catch (error) {
					console.log(error);
				}
			},
			displaySeason: async function(event, id) {
				let season = 1;
				if (event) {
					season = Number(event.target.value);
				}
				try {
					let response = await this.axios.get('https://api.betaseries.com/shows/episodes', {
						params: { access_token: this.data.token, season: season, id: id },
					});
					console.log(response.data.episodes);
					this.modalEpisode = response.data.episodes;
				} catch (error) {
					console.log(error);
				}
			},
			setSeen: async function(id, season) {
				try {
					await this.axios.post('https://api.betaseries.com/episodes/watched', {
						id: id,
						delete: true,
						bulk: true,
						access_token: this.data.token,
					});
					let response = await this.axios.get('https://api.betaseries.com/shows/episodes', {
						params: { access_token: this.data.token, season: season, id: this.currentEpisode },
					});
					this.modalEpisode = response.data.episodes;
				} catch (error) {
					console.log(error);
				}
			},
			deleteSeen: async function(id, season) {
				try {
					await this.axios.delete('https://api.betaseries.com/episodes/watched', {
						data: {
							id: id,
							access_token: this.data.token,
						},
					});
					let response = await this.axios.get('https://api.betaseries.com/shows/episodes', {
						params: { access_token: this.data.token, season: season, id: this.currentEpisode },
					});
					this.modalEpisode = response.data.episodes;
				} catch (error) {
					console.log(error);
				}
			},
			showComments: async function(id, episode) {
				try {
					let responses = await this.axios.get('https://api.betaseries.com/comments/comments', {
						params: { access_token: this.data.token, type: 'episode', order: 'desc', id: id, replies: 0 },
					});
					this.modalComments = responses.data.comments;
					this.showModal = 3;
					this.currentEpisode = episode;
				} catch (error) {
					console.log(error);
				}
			},
			postComment: async function() {
				try {
					await this.axios.post('https://api.betaseries.com/comments/comment', {
						type: 'episode',
						id: this.currentEpisode.id,
						access_token: this.data.token,
						text: this.commentContent,
					});
					this.showComments(this.currentEpisode.id, this.currentEpisode);
					this.commentContent = '';
				} catch (error) {
					console.log(error);
				}
			},
			showFriends: async function() {
				this.showModal = 4;
				try {
					let res = await this.axios.get('https://api.betaseries.com/friends/requests', {
						params: {
							access_token: this.data.token,
							received: true,
						},
					});
					let response = await this.axios.get('https://api.betaseries.com/friends/list', {
						params: {
							access_token: this.data.token,
						},
					});
					console.log(res.data);
					this.friendRequest = res.data.users;
					this.friendList = response.data.users;
				} catch (error) {
					console.log(error);
				}
			},
			searchFriend: async function() {
				try {
					let response = await this.axios.get('https://api.betaseries.com/friends/find', {
						params: {
							type: 'email',
							emails: this.inputSearchFriend,
							access_token: this.data.token,
						},
					});
					if (response.data.users.length > 0) {
						this.addFriend(response.data.users[0].id);
						this.errorAlertFriend = false;
						this.successAlertFriend = true;
						setTimeout(
							function() {
								this.successAlertFriend = false;
							}.bind(this),
							3000
						);
					} else {
						this.successAlertFriend = false;
						this.errorAlertFriend = true;
						setTimeout(
							function() {
								this.errorAlertFriend = false;
							}.bind(this),
							3000
						);
					}
				} catch (error) {
					console.log(error);
				}
			},
			searchSeries: async function() {
				this.isLoading = true;
				try {
					if (this.inputSearchSeries.length !== 0) {
						let response = await this.axios.get('https://api.betaseries.com/search/all', {
							params: {
								query: this.inputSearchSeries,
								limit: 200,
							},
						});
						this.isLoading = false;
						this.resultSearchSeries = response.data.shows;
					}
				} catch (error) {
					console.log(error);
				}
			},
			specificSerie: async function(title) {
				try {
					let response = await this.axios.get('https://api.betaseries.com/shows/search', {
						params: {
							access_token: this.data.token,
							title: title,
							summary: false,
						},
					});
					this.speSerie = response.data.shows[0];
					this.currentSerie = this.speSerie.id;
					this.seasonCount = Number(this.speSerie.seasons);
					this.showModal = 6;
				} catch (error) {
					console.log(error);
				}
			},
			addFriend: async function(id) {
				try {
					await this.axios.post('https://api.betaseries.com/friends/friend', {
						id: id,
						access_token: this.data.token,
					});
					this.showFriends();
				} catch (error) {
					console.log(error);
				}
			},
			deleteFriend: async function(id) {
				try {
					await this.axios.delete('https://api.betaseries.com/friends/friend', {
						data: {
							id: id,
							access_token: this.data.token,
						},
					});
					this.showFriends();
				} catch (error) {
					console.log(error);
				}
			},
			blockFriend: async function(id) {
				try {
					await this.axios.post('https://api.betaseries.com/friends/block', {
						id: id,
						access_token: this.data.token,
					});
				} catch (error) {
					console.log(error);
				}
			},
			openModal: async function(title) {
				this.indexOfModal = this.products.map((el) => el.title).indexOf(title);
				this.seasonCount = Number(this.products[this.indexOfModal].seasons);
				this.currentSerie = Number(this.products[this.indexOfModal].id);
				this.showModal = 1;

				try {
					let response = await this.axios.get('https://api.betaseries.com/shows/episodes', {
						params: { access_token: this.data.token, season: 1, id: this.products[this.indexOfModal].id },
					});
					this.modalEpisode = response.data.episodes;
				} catch (error) {
					console.log(error);
				}
			},
			closeModal: function() {
				this.showModal = 0;
			},
		},
		async beforeMount() {
			this.getSeries();
		},
		name: 'Home',
	};
</script>
