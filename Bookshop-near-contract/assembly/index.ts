import {Book, listedBooks} from './model';
import {context, ContractPromiseBatch} from 'near-sdk-as';

const contractOwner = 'contract.tevinprime.testnet'

export function resetBooks(): void {
    assert(contractOwner == context.sender, "can only be called by contractOwner")
    listedBooks.clear(); 
}

export function setBook(book: Book): void {
    let storedBook = listedBooks.get(book.id);
    if (storedBook !== null) {
        throw new Error(`a product with ${book.id} already exists`);
    }
    listedBooks.set(book.id, Book.fromPayload(book));
}

export function getBook(id: string): Book | null {
    let book = listedBooks.get(id);
    if (book == null) {
        throw new Error(`book with ${id} not found`);
    } else {
        return book;
    }
}

export function getBooks(): Book[] {
    return listedBooks.values();
}

export function AppreciateOneNear(id: string): void {
    const book = getBook(id);
    if (book == null) {
        throw new Error(`book with ${id} not found`);
    }
    if ("1000000000000000000000000" != context.attachedDeposit.toString()) {
        throw new Error("attached appreciation deposit should equal to one near");
    }
    ContractPromiseBatch.create(book.owner).transfer(context.attachedDeposit);
    book.receiveAppreciation(1);
    listedBooks.set(book.id, book);
}

export function deleteBook(id: string, owner: string): void {
    let book = listedBooks.get(id);
    if (book == null) {
        throw new Error(`book with ${id} not found`);
    } else if (owner == book.owner) {
        listedBooks.delete(id);
    } else {
        throw new Error("only owner can delete book");
    }
}
