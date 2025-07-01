import { useState } from "react";
import { Book } from "./Book";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";

interface Props {
    book: Book;
    handleFetch: () => void;
  }
  const BookDelete = ({ book, handleFetch }: Props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    function handleDelete() {
      fetch(`http://localhost:5196/api/Books/${book.id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json", 
        },
        credentials: "include", // Kimlik bilgilerini göndermek için
      }).then((response) => {
        if (!response.ok) toast.error("Bir hata var");
        else {
          toast.success("Basariyla silindi");
          handleFetch();
          handleClose();
        }
      });
    }
  
    return (
      <>
        <li>
          <a className="dropdown-item text-danger" href="#" onClick={handleShow}>
            <i className="bi bi-trash"></i> Delete
          </a>
        </li>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Book {book.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure to delete book {book.id}?</Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete();
                handleClose();
              }}
            >
              Yes
            </button>
            <button className="btn btn-primary" onClick={handleClose}>
              No
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  export default BookDelete;