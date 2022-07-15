import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";

const AddBook = ({save}) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const isFormFilled = () => name && image && description && genre;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i class="bi bi-book"></i>
      </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Novel</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <FloatingLabel
                            controlId="inputName"
                            label="Book name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                placeholder="Enter name of book"
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="inputUrl"
                            label="Image URL"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Image URL"
                                onChange={(e) => {
                                    setImage(e.target.value);
                                }}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="inputDescription"
                            label="Description"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="description"
                                style={{height: "80px"}}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="inputGenre"
                            label="genre"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Genre"
                                onChange={(e) => {
                                    setGenre(e.target.value);
                                }}
                            />
                        </FloatingLabel>
                    </Modal.Body>
                </Form>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="dark"
                        disabled={!isFormFilled()}
                        onClick={() => {
                            save({
                                name,
                                image,
                                description,
                                genre,
                            });
                            handleClose();
                        }}
                    >
                        Add Novel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

AddBook.propTypes = {
    save: PropTypes.func.isRequired,
};

export default AddBook;