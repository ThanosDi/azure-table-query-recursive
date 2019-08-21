const azureStorageData = require('./fixtures/azure-storage-results');
const {queryAzureTableStorage, TableQuery} = require('.');

const tableStorage = {
	queryEntities: jest.fn(),
};
const query = `PartitionKey eq 'apartitionkey'`;
const table = 'aTable';

describe('azure-storage-tables-async-recursive', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('queryAzureTableStorage recursion', async () => {
		tableStorage.queryEntities.mockImplementationOnce((_, __, ___, callback) =>
			callback(null, azureStorageData(true)),
		);
		tableStorage.queryEntities.mockImplementationOnce((_, __, ___, callback) =>
			callback(null, azureStorageData(null)),
		);

		const azureQuery = new TableQuery().where(query);

		const result = await queryAzureTableStorage(
			azureQuery,
			table,
			tableStorage,
		);
		expect(result.length).toBe(20);
		expect(tableStorage.queryEntities).toHaveBeenCalledWith(
			'aTable',
			{
				_fields: [],
				_top: null,
				_where: ["PartitionKey eq 'apartitionkey'"],
			},
			null,
			expect.any(Function),
		);
		expect(tableStorage.queryEntities).toHaveBeenCalledTimes(2);
	});

	test('queryAzureTableStorage error', async () => {
		tableStorage.queryEntities.mockImplementationOnce((_, __, ___, callback) =>
			callback('An error occured', azureStorageData(true)),
		);

		const azureQuery = new TableQuery().where(query);

		await expect(
			queryAzureTableStorage(azureQuery, table, tableStorage),
		).rejects.toEqual(new Error('An error occured'));
		expect(tableStorage.queryEntities).toHaveBeenCalledTimes(1);
	});
});
