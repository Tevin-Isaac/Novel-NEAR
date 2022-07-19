## Install CLI Tools

```
yarn global add near-cli
yarn global add assemblyscript
yarn global add asbuild
```

## Create Accounts

### Create a Top-Level Account

### Login to the NEAR CLI

```
near login
```

### Create a Sub-account via NEAR CLI
https://wallet.near.org/create
```
near create-account contract.tevinprime.testnet --masterAccount tevinprime.testnet --initialBalance 10
```


### Compile the Contract

```
yarn asb
```

### Deploy the Contract

```
near deploy --accountId=contract.tevinprime.testnet --wasmFile=build/release/Bookshop-near-contract.wasm
```

## Contract Calls

### Calling a Change Function

```
near call contract.tevinprime.testnet setBook "{\"book\": {\"id\": \"0\", \"name\": \"Harry Potter\"}}" --accountId=tevinprime.testnet
near call contract.tevinprime.testnet setBook "{\"book\": {\"id\": \"1\", \"name\": \"The Lord of the Rings\"}}" --accountId=tevinprime.testnet
near call contract.tevinprime.testnet setBook "{\"book\": {\"id\": \"2\", \"name\": \"Chonicles of Narnia\"}}" --accountId=tevinprime.testnet
```

### Calling a View Function

```
near view contract.tevinprime.testnet getBook "{\"id\": \"0\"}"
near view contract.tevinprime.testnet getBook "{\"id\": \"1\"}"
near view contract.tevinprime.testnet getBook "{\"id\": \"2\"}"
```

## Contract Redeployment(repeat compile and deploy)

```
yarn asb
near deploy --accountId=contract.tevinprime.testnet --wasmFile=build/release/Bookshop-near-contract.wasm
```

### Add new book corresponding to model and view the result

```
near call contract.tevinprime.testnet setBook "{\"book\": {\"id\": \"0\", \"name\": \"Harry Potter\", \"description\": \"Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.\", \"image\": \"https://wallpaperboat.com/wp-content/uploads/2019/06/harry-potter-53.jpg\", \"genre\": \"Fantasy & Adventure\"}}" --accountId=tevinprime.testnet
near call contract.tevinprime.testnet setBook "{\"book\": {\"id\": \"1\", \"name\": \"The Lord of the Rings\", \"description\": \"The Lord of the Rings, fantasy novel by J.R.R. Tolkien initially published in three parts as The Fellowship of the Ring (1954), The Two Towers (1955), and The Return of the King (1955). The novel, set in the Third Age of Middle-earth, formed a sequel to Tolkien’s The Hobbit (1937) and was succeeded by his posthumous The Silmarillion (1977). The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien’s extensive knowledge of philology and folklore.\", \"image\": \"https://images7.alphacoders.com/112/1123161.jpg\", \"genre\": \"Fantasy\"}}" --accountId=tevinprime.testnet
near call contract.tevinprime.testnet setBook "{\"book\": {\"id\": \"2\", \"name\": \"Chronicles of Narnia\", \"description\": \"The series is set in the fictional realm of Narnia, a fantasy world of magic, mythical beasts and talking animals. It narrates the adventures of various children who play central roles in the unfolding history of the Narnian world.\", \"image\": \"https://wallpaperaccess.com/full/1715646.jpg\", \"genre\": \"fantasy\"}}" --accountId=tevinprime.testnet
near view contract.tevinprime.testnet getBook "{\"id\": \"0\"}"
```

### Delete book(only for an book owner)

```
near call contract.tev.testnet deleteBook "{\"id\": \"0\", \"owner\": \"contract.tevinprime.testnet\"}" --accountId=tev.testnet
```

### Reset all books` data if needed

```
near call contract.tevinprime.testnet resetBooks --accountId=tev.testnet
```

## Contract with Appreciate Function

### Create a new sub-account that will act as the appreciator

```
near create-account appreciator.tevinprime.testnet --masterAccount tevinprime.testnet --initialBalance 7
```

### Perform appreciation call and view the result

```
near call contract.tevinprime.testnet AppreciateOneNear "{\"id\": \"1\"}" --depositYocto=1000000000000000000000000 --accountId=appreciator.tevinprime.testnet
near view contract.tevinprime.testnet getBook "{\"id\": \"0\"}"
```
Test account phrase(tevinprime.testnet):inherit wisdom trend stumble vital crazy puppy sunny rough canoe pulse bullet
