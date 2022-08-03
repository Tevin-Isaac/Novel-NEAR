import {context, PersistentUnorderedMap,PersistentSet} from "near-sdk-as";

@nearBindgen
export class Book {
    id: string;
    name: string;
    description: string;
    image: string;
    genre: string;
    owner: string;
    up_votes:  PersistentSet<string>;
    down_votes: PersistentSet<string>;
    appreciation: u32;

    public static fromPayload(payload: Book): Book {
        const book = new Book();
        book.id = payload.id;
        book.name = payload.name;
        book.description = payload.description;
        book.image = payload.image;
        book.genre = payload.genre;
        book.owner = context.sender;
        book.up_votes = payload.up_votes;
        book.down_votes = payload.down_votes;
        return book;
    }

    public receiveAppreciation(): void {
        this.appreciation = this.appreciation + 1;
    }

 // 0 if upvote, 1 is downvote
    public vote(voteType: u8): bool {
    const senderAccount = context.sender;
    assert(!(this.down_votes.has(senderAccount)), "already voted");
    assert(!(this.up_votes.has(senderAccount)), "already voted");
    assert((voteType ==0 || voteType ==1), "not a valid vote");
    switch (voteType) {
        case 0:
            this.down_votes.add(senderAccount);
            return true;
            
        case 1:
            this.up_votes.add(senderAccount);
            return true;
    }
    return false;
}
}


export const listedBooks = new PersistentUnorderedMap<string, Book>("LISTED_BOOKS");