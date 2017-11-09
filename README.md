# To Run

* Install dependencies 
* Start testrpc
* In the root folder run `truffle deploy`
* In the frontend folder install depedencies and get famillar with Angular CLI
* in the frontend folder run `ng serve`
* open `blockchain.service.ts`
* replace `kwhAddress` and `DRProgramAddress` from the `truffle deploy` output
    - This output looks like:
    `
        Running migration: 1_initial_migrations.js
        Deploying Migrations...
        ... 0x25dd589cccec05c8e6e5b220574215564e378ca482f5e640c0e747c9cb2a28d0
        Migrations: 0x36743614660e249cfa568e97fea9b86cc04976ac
        Saving successful migration to network...
        ... 0x03d75a204a10bb232ad664a5477853102ec994ad198191eae646830c68be183a
        Saving artifacts...
        Running migration: 2_deploy_contracts.js
        Deploying Kwh...
        ... 0x5383ce37ad93c67e9393b3fe4a915637d84ef332f638a505362945e1adeef8c6
        Kwh: 0xdfefb183451308284d8842768b60bf491c1a46b3
        Deploying DRProgram...
        ... 0x479caecc637a430f558882d5b0f9f543c20dfc8ef3deca9eb3024c0a1ff03e58
        DRProgram: 0xd3849f4b57a0d5ce0fc6a4edac0633042cb1d367
        ... 0x5c9a5f855fc6161dc7fafdf07b9b456161b65a72f5a7ec7ad07c519197e9ca6c
        Saving successful migration to network...
        ... 0x492c15a3c32e953222bd113417100b1d96ef936649041fd7133c4fb1c0d2abd3
        Saving artifacts...
    `
    - You want to take Kwh: 0xdfefb183451308284d8842768b60bf491c1a46b3 and DRProgram: 0xd3849f4b57a0d5ce0fc6a4edac0633042cb1d367 respectively. 