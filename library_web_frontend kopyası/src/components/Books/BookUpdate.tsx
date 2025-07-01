import { useState } from "react";
import { Book } from "./Book";
import { Modal } from "react-bootstrap";
import BookForm from "./BookForm";


interface Props {
  book: Book;
  handleFetch: () => void;
}
const BookUpdate = ({ book, handleFetch }: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  return (
    <>
      <li>
        <a className="dropdown-item" href="#" onClick={handleShow}>
          <i className="bi bi-pencil"></i> Update
        </a>
      </li>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book {book.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm
            book={book}
            handleClose={handleClose}
            handleFetch={handleFetch}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookUpdate;
