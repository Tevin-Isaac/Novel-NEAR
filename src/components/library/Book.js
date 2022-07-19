import React from "react";
import PropTypes from "prop-types";
import {Badge, Button, Card, Col, Stack} from "react-bootstrap";

const Book = ({book, Appreciate, deleteBook}) => {
    const {id, name, description, image, genre, owner, Appreciation} =
        book;

    const triggerAppreciate = () => {
        Appreciate(id);
    };

    const triggerDelete = () => {
        deleteBook(id, owner);
    }

    const isOwner = window.walletConnection.account().accountId === owner;

    return (
        <Col>
            <Card className=" h-100">
                <Card.Header>
                    <Stack direction="horizontal" gap={2}>
                        <span className="font-monospace text-secondary">{owner}</span>
                        <Badge bg="secondary" className="ms-auto">
                            {Appreciation} Appreciated
                        </Badge>
                    </Stack>
                </Card.Header>
                <div className=" ratio ratio-4x3">
                    <img src={image} alt={name} style={{objectFit: "cover"}}/>
                </div>
                <Card.Body className="d-flex  flex-column text-center">
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className="flex-grow-1 ">{description}</Card.Text>
                    <Card.Text className="text-secondary">
                        <span>Genre: {genre}</span>
                    </Card.Text>
                    {isOwner ?
                        <Button
                            variant="outline-dark"
                            onClick={triggerDelete}
                            className="w-100 py-3 btn-danger"
                        >
                            Delete book
                        </Button> :
                        <Button
                            variant="outline-dark"
                            onClick={triggerAppreciate}
                            className="w-100 py-3"
                        >
                            Appreciate One NEAR
                        </Button>}
                </Card.Body>
            </Card>
        </Col>
    );
};

Book.propTypes = {
    book: PropTypes.instanceOf(Object).isRequired,
    Appreciate: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
};

export default Book;