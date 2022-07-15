import {context, PersistentUnorderedMap} from "near-sdk-as";

@nearBindgen
export class Book {
    id: string;
    name: string;
    description: string;
    image: string;
    genre: string;
    owner: string;
    appreciation: u32;

    public static fromPayload(payload: Book): Book {
        const book = new Book();
        book.id = payload.id;
        book.name = payload.name;
        book.description = payload.description;
        book.image = payload.image;
        book.genre = payload.genre;
        book.owner = context.sender;
        return book;
    }

    public receiveAppreciation(appreciationAmount: u32): void {
        this.appreciation = this.appreciation + appreciationAmount;
    }
}

export const listedBooks = new PersistentUnorderedMap<string, Book>("LISTED_BOOKS");