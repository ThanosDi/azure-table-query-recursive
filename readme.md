# Azure Table Query Recursive

Exports an async recursive function to fetch more than 1000 entities from azure storage using continuation token. :rocket:

[![Coverage Status](https://coveralls.io/repos/github/ThanosDi/azure-table-query-recursive/badge.svg?branch=master)](https://coveralls.io/github/ThanosDi/azure-table-query-recursive?branch=master)
* Master [![CircleCI](https://circleci.com/gh/ThanosDi/azure-table-query-recursive/tree/master.svg?style=svg)](https://circleci.com/gh/ThanosDi/azure-table-query-recursive/tree/master)

## Development :computer:
```bash
$ git clone git@github.com:azure-table-query-recursive.git
$ cd azure-table-query-recursive
$ yarn install
```

## Install :hammer:
```bash
$ yarn add azure-table-query-recursive
or
$ npm install azure-table-query-recursive
```

## Usage
```javascript
const {queryAzureTableStorage, TableQuery, createTableService} = require('azure-table-query-recursive');

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
