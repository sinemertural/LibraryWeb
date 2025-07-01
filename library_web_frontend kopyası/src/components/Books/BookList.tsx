import { useEffect, useState } from "react";
import { Book } from "./Book";
import BookCreate from "./BookCreate";
import BookUpdate from "./BookUpdate";
import BookDelete from "./BookDelete";
import { toast } from "sonner";
import { useLoggedInInfoContext } from "../Context/LoggedInInfoContext";

const BookList = () => {
  const { loggedInInfo } = useLoggedInInfoContext();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = () => {
    setLoading(true);
    fetch("http://localhost:5196/api/Books", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        const updatedBooks = response.map((book: Book) => ({
          ...book,
          bookTypes: Array.isArray(book.bookTypes) ? book.bookTypes : [],
        }));
        setBooks(updatedBooks);
      })
      .catch((error) => {
        toast.error("Kitaplar yüklenirken bir hata oluştu.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="card">
      <h3 className="card-header d-flex justify-content-between align-items-center">
        Books
        {loggedInInfo?.role === "Admin" && (
          <BookCreate handleFetch={fetchBooks} />
        )}
      </h3>
      <div className="card-body">
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Count</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Categories</th>
                {loggedInInfo?.role === "Admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {books.map((p: Book) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.count}</td>
                  <td>
                    {p.author
                      ? `${p.author.name} ${p.author.surname}`
                      : "Unknown Author"}
                  </td>
                  <td>
                    {p.publisher ? p.publisher.name : "Unknown Publisher"}
                  </td>
                  <td>
                    {p.bookTypes && p.bookTypes.length > 0
                      ? p.bookTypes.map((bt) => bt.name).join(", ")
                      : "No types assigned"}
                  </td>
                  <td>
                    {loggedInInfo?.role === "Admin" && (
                      <div className="dropdown">
                        <button
                          className="btn dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-gear"></i>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="settings"
                        >
                          <li>
                              <BookUpdate book={p} handleFetch={fetchBooks} />
                          </li>
                          <li>
                             <BookDelete book={p} handleFetch={fetchBooks} />
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookList;
