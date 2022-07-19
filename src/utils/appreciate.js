import {v4 as uuid4} from "uuid";
import {parseNearAmount} from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createBook(book) {
    book.id = uuid4();
    return window.contract.setBook({book});
}

export function getBooks() {
    return window.contract.getBooks();
}

export async function AppreciateOneNear(id) {
    await window.contract.AppreciateOneNear({id: id}, GAS, parseNearAmount("1"));
}

export async function deleteBook(id, owner) {
    return window.contract.deleteBook({id, owner});
}