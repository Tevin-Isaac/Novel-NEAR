import {Book, listedBooks} from './model';
import {context, ContractPromiseBatch,PersistentSet} from 'near-sdk-as';



export function resetBooks(): void {
    listedBooks.clear(); // not available from site, for dev purpose only
}

export function setBook(book: Book): void {
    let storedBook = listedBooks.get(book.id);
    if (storedBook !== null) {
        throw new Error(`a product with ${book.id} already exists`);
    }
    const bookLength = listedBooks.length;
    book.up_votes = new PersistentSet<string>(`upvote${bookLength}`);
    book.down_votes = new PersistentSet<string>(`downvote${bookLength}`);  
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

 export function voteBook(bookId: string, voteType: u8) : bool {    
    const book = listedBooks.get(bookId);
    //check if book is null, in case book is null we can't access its properties
    if(book == null){
       return false;
    } else {
       return book.vote(voteType);
    } 
}

export function getBookVotes(bookId: string) : Array<u32> | null {    
    const book = listedBooks.get(bookId);
    //check if book is null, in case book is null we can't access its properties
    if(book == null){
       return null;
    } else {
        let votes_length_array = new Array<u32>(2);
        votes_length_array[0] = book.down_votes.size;
        votes_length_array[1] = book.up_votes.size;
        return votes_length_array;
    } 
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
    book.receiveAppreciation();
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
