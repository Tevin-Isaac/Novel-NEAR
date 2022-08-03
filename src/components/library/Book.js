import React from "react";
import PropTypes from "prop-types";
import {Badge, Button, Card, Col, Stack} from "react-bootstrap";

const Book = ({book,vote, Appreciate, deleteBook}) => {
    const {id, name, description, image, genre, owner, Appreciation,upvotes_count, downvotes_count} =
        book;

    const triggerAppreciate = () => {
        Appreciate(id);
    };
    const triggerVote = (voteType) => {
        vote(id, voteType);
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

                        <button type="button" class="btn btn-success position-relative btn-xs ms-auto"  onClick={() => triggerVote(1)}>
                        <i class="bi bi-emoji-smile"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
               {upvotes_count}            
              </span>
            </button>

            <button type="button" class="btn btn-danger position-relative btn-xs ms-auto" onClick={() => triggerVote(0)}>
            <i class="bi bi-emoji-frown-fill"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
               {downvotes_count}            
              </span>
            </button>
                        <Badge bg="secondary" className="ms-auto">
                            {Appreciation} kudos
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
    vote : PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
};

export default Book;