<template>
	<div class="user-search">
		<div class="form-wrapper">
			<FormInput
				v-model="keyword"
				:error="errors.keyword"
				@keyup.enter="submit"
				@focus="clearError"
				@blur="clearError"
				@keyup="clearError"
				type="text"
				name="keyword"
				floating-label
				placeholder="Ключова дума"
			></FormInput>

			<FormButton @click="submit" :disabled="submitting">
				Търси
			</FormButton>
		</div>

		<template v-if="searchDone">
			<StatusMessage v-if="users.length === 0">
				<img src="/img/icons/sad.png" />
				<p>
					Няма намерени резултати
				</p>
			</StatusMessage>
			<ResultsTable v-else>
				<thead>
					<tr>
						<td>Потребител</td>
						<td>Пол</td>
						<td>Възраст</td>
						<td>Местоположение</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in users" :key="user.ID">
						<td>
							<router-link :to="{name: 'profile', params: {id: user.ID}}" class="red">
								{{ user.username}}
							</router-link>
						</td>
						<td>
							<GenderIcon :gender="user.gender" />
						</td>
						<td>
							{{ user.birthday | age }} години
						</td>
						<td>
							{{ user.location || 'Няма информация' }}
						</td>
					</tr>
				</tbody>
			</ResultsTable>

			<Pagination
				v-show="totalPages > 1"
				:total-pages="totalPages"
				:current-page="page"
				@change-page="getUsers"
			/>
		</template>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import ResultsTable from '@/components/ResultsTable';
	import GenderIcon from '@/components/GenderIcon';
	import Pagination from '@/components/Pagination';

	const formName = 'userSearch';

	export default {
		components: {
			GenderIcon,
			ResultsTable,
			Pagination
		},
		data() {
			return {
				keyword: '',
				searchDone: false,
				submitting: false
			};
		},
		computed: {
			...mapState('forms', {
				errors: state => state.errors[formName]
			}),
			...mapState('user', [
				'users',
				'total',
				'page',
				'perPage'
			]),
			totalPages() {
				return Math.ceil(this.total / this.perPage);
			}
		},
		methods: {
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('user', [
				'search'
			]),
			/**
			 * Submits the user search form
			 */
			submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;

				this.getUsers(0).then((res) => {
					const data = res.data;

					if (data.error) {
						this.setFormError({
							...data.error,
							form: formName
						});
					} else {
						this.searchDone = true;
					}

					this.submitting = false;
				});
			},
			/**
			 * Fetches the user by page
			 * @param {Number} page
			 */
			getUsers(page) {
				const params = {
					keyword: this.keyword,
					page
				};

				return this.search(params);
			},
			/**
			 * Clears the form errors related to this input
			 * @param {Object} e
			 */
			clearError(e) {
				const field = e.target.name;
				this.clearFormError({
					form: formName,
					field
				});
			}
		}
	};
</script>

<style lang="scss">
	.user-search {
		.form-wrapper {
			display: flex;
			width: 60%;
			margin: 20px auto;

			.form-input {
				flex: 1;
				margin-bottom: 0;
			}

			.form-button {
				margin-left: 5px;
			}
		}

		.results-table {
			td {
				&:last-child {
					max-width: 200px;
				}
			}
		}
	}
</style>
