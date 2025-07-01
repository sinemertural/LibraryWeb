import { Author } from "../Authors/Author";
import { Publisher } from "../Publishers/Publisher";
import { BookType } from "../BookTypes/BookType";

export type Book = {
    id: number;
    name: string;
    count: number;
    publisher: Publisher;
    author: Author;
    publisherId: number;
    authorId: number;
    bookTypes: BookType[]; 
};