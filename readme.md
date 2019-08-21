# Azure Table Query Recursive

Exports an async recursive function to fetch more than 1000 entities from azure storage using continuation token. :rocket:

## Development :computer:
```bash
$ git clone git@github.com:azure-table-query-recursive.git
$ cd azure-table-query-recursive
$ yarn install
```

## Install :hammer:
```bash
$ yarn install azure-table-query-recursive
```

## Usage
```javascript
const {queryAzureTableStorage,TableQuery} = require('azure-table-query-recursive');

const validConnectionString = 'DefaultEndpointsProtocol=https;AccountName=xxxxxxx;AccountKey=xxxxxxxxxxxxxxxxxxxxxxx==;EndpointSuffix=core.windows.net';
const query = `PartitionKey eq 'apartitionkey'`;
const table = 'aTable';

//Constract a tableStorage object
const tableStorage = createTableService(validConnectionString);
//Constract an azure table query
const azureQuery = new TableQuery().where(query);

const tableResults = await queryAzureTableStorage(azureQuery, table, tableStorage);

```

## Sample results
```javascript
[
    {
        PartitionKey: {
            $: 'Edm.String',
            _: 'apartitionkey',
        },
        RowKey: {
            $: 'Edm.String',
            _: 'rowkey1',
        },
        Timestamp: {
            $: 'Edm.DateTime',
            _: '2018-12-04T11:40:22.992Z',
        },
        column1: {
            _: 'column1-value',
        },
        column2: {
            _: 'column2-value',
        },
        column3: {
            _: 'column3-value',
        },
    },
    {
        PartitionKey: {
            $: 'Edm.String',
            _: 'apartitionkey',
        },
        RowKey: {
            $: 'Edm.String',
            _: 'rowkey2',
        },
        Timestamp: {
            $: 'Edm.DateTime',
            _: '2018-12-04T11:40:22.992Z',
        },
        column1: {
            _: 'column1-value',
        },
        column2: {
            _: 'column2-value',
        },
        column3: {
            _: 'column3-value',
        },
    },
    ...
]
```

## Testing :bomb:
```bash
$ yarn test
```

## Coverage
```
---------------------------|----------|----------|----------|----------|-------------------|
File                       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------------|----------|----------|----------|----------|-------------------|
All files                  |      100 |      100 |      100 |      100 |                   |
 src                       |      100 |      100 |      100 |      100 |                   |
  index.js                 |      100 |      100 |      100 |      100 |                   |
 src/fixtures              |      100 |      100 |      100 |      100 |                   |
  azure-storage-results.js |      100 |      100 |      100 |      100 |                   |
---------------------------|----------|----------|----------|----------|-------------------|


```
