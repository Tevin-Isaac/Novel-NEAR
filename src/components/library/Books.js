import React, {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import AddBook from "./AddBook";
import Book from "./Book";
import Loader from "../utils/Loader";
import {Row} from "react-bootstrap";
import {NotificationError, NotificationSuccess} from "../utils/Notifications";
import {createBook, deleteBook, AppreciateOneNear, getBooks as getBookList} from "../../utils/appreciate";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const getBooks = useCallback(async () => {
        try {
            setLoading(true);
            setBooks(await getBookList());
        } catch (error) {
            console.log({error});
        } finally {
            setLoading(false);
        }
    }, []);

    const addBook = async (data) => {
        try {
            setLoading(true);
            createBook(data).then(() => {
                getBooks();
            });
            toast(<NotificationSuccess text="Book added successfully🎉."/>);
        } catch (error) {
            console.log({error});
            toast(<NotificationError text="Failed to create an book."/>);
        } finally {
            setLoading(false);
        }
    };

    const Appreciate = async (id) => {
        try {
            await AppreciateOneNear(id).then(() => getBooks());
            toast(<NotificationSuccess text="Appreciated successfully🎉"/>);
        } catch (error) {
            toast(<NotificationError text="Failed to Appreciate"/>);
        } finally {
            setLoading(false);
        }
    };

    const deleteOwnerBook = async (id, owner) => {
        try {
            await deleteBook(id, owner).then(() => getBooks());
            toast(<NotificationSuccess text="Deleted successfully"/>);
        } catch (error) {
            toast(<NotificationError text="Failed to delete"/>);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBooks().then();
    }, [getBooks]);

    return (
        <>
            {!loading ? (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="fs-4 fw-bold mb-0">Best All Time Novels</h1>
                        <AddBook save={addBook}/>
                    </div>
                    <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                        {books.map((_book) => (
                            <Book
                                key={_book.id}
                                book={{
                                    ..._book,
                                }}
                                Appreciate={Appreciate}
                                deleteBook={deleteOwnerBook}
                            />
                        ))}
                    </Row>
                </>
            ) : (
                <Loader/>
            )}
        </>
    );
};

export default Books;