const {createTableService, TableQuery} = require('azure-storage');

const queryAzureTableStorage = async (
	query,
	table,
	tableStorage,
	res = [],
	continuationToken = null,
) =>
	new Promise((resolve, reject) => {
		tableStorage.queryEntities(
			table,
			query,
			continuationToken,
			async (error, result) => {
				if (error) {
					return reject(new Error(error));
				}

				const results = res.concat(result.entries);
				if (result.continuationToken) {
					return resolve(
						queryAzureTableStorage(
							query,
							table,
							tableStorage,
							results,
							result.continuationToken,
						),
					);
				}

				return resolve(results);
			},
		);
	});

module.exports = {
	queryAzureTableStorage,
	createTableService,
	TableQuery,
};
