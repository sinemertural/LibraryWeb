import { useState } from "react";
import { Book } from "./Book";
import BookForm from "./BookForm";
import { Modal } from "react-bootstrap";

interface Props {
    handleFetch: () => void;
}
const BookCreate = ({ handleFetch }: Props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
          <button className="btn btn-success" onClick={handleShow}>
            <i className="bi bi-plus-lg"></i> Add New Book
          </button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BookForm
                book={null}
                handleClose={handleClose}
                handleFetch={handleFetch}
              />
            </Modal.Body>
          </Modal>
        </>
      );
    };

    export default BookCreate;