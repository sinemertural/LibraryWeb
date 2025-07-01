import { useEffect, useState } from "react";
import { Book } from "./Book";
import { toast } from "sonner";
import { Author } from "../Authors/Author";
import { Publisher } from "../Publishers/Publisher";
import { BookType } from "../BookTypes/BookType";

interface Props {
  book: Book | null;
  handleClose: () => void;
  handleFetch: () => void;
}

const BookForm = ({ book, handleClose, handleFetch }: Props) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [bookTypes, setBookTypes] = useState<BookType[]>([]); // Kategori listesi
  const [name, setName] = useState(book?.name || "");
  const [count, setCount] = useState(book?.count || "0");
  const [authorId, setAuthorId] = useState(book?.author?.id || 0);
  const [publisherId, setPublisherId] = useState(book?.publisher?.id || 0);
  const [selectedBookTypes, setSelectedBookTypes] = useState<number[]>(
    book?.bookTypes?.map((bt) => bt.id) || []
  );

  const fetchUrl = book
    ? `http://localhost:5196/api/Books/${book.id}` // Güncelleme işlemi
    : "http://localhost:5196/api/Books"; // Oluşturma işlemi

  const method = book ? "PUT" : "POST";
  const successMessage = book
    ? "Kitap başarıyla güncellendi."
    : "Kitap başarıyla oluşturuldu.";

  const handleSubmit = () => {
    const requestBody = {
      name,
      authorId,
      publisherId,
      count: Number(count),
      bookTypes: selectedBookTypes, // Seçilen kategoriler backend'e gönderilir
    };

    fetch(fetchUrl, {
      method: method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`HTTP Error: ${response.status}`);
      })
      .then((data) => {
        console.log("Response Data:", data);
        toast.success(successMessage);
        handleFetch(); // Listeyi yenile
        handleClose(); // Modal'ı kapat
      })
      .catch((err) => {
        console.error("Submit Error:", err);
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  };

  const fetchData = (url: string, setState: Function) => {
    fetch(url, { credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setState(data))
      .catch((err) => console.error(`Error fetching data from ${url}:`, err));
  };

  useEffect(() => {
    fetchData("http://localhost:5196/api/Authors", setAuthors);
    fetchData("http://localhost:5196/api/Publishers", setPublishers);
    fetchData("http://localhost:5196/api/BookTypes", setBookTypes); // Kategori verilerini çek
  }, []);

  const handleCheckboxChange = (bookTypeId: number) => {
    setSelectedBookTypes((prev) =>
      prev.includes(bookTypeId)
        ? prev.filter((id) => id !== bookTypeId) // Eğer seçiliyse kaldır
        : [...prev, bookTypeId] // Eğer seçili değilse ekle
    );
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Kitap Adı
        </label>
        <input
          id="name"
          name="name"
          value={name}
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="count" className="form-label">
          Kitap Sayısı
        </label>
        <input
          id="count"
          name="count"
          value={count}
          type="number"
          className="form-control"
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Yazar
        </label>
        <select
          id="author"
          name="author"
          value={authorId}
          className="form-control"
          onChange={(e) => setAuthorId(Number(e.target.value))}
        >
          <option value={0}>Bir yazar seçin</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name} {author.surname}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="publisher" className="form-label">
          Yayıncı
        </label>
        <select
          id="publisher"
          name="publisher"
          value={publisherId}
          className="form-control"
          onChange={(e) => setPublisherId(Number(e.target.value))}
        >
          <option value={0}>Bir yayıncı seçin</option>
          {publishers.map((publisher) => (
            <option key={publisher.id} value={publisher.id}>
              {publisher.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Kitap Kategorileri</label>
        <div>
          {bookTypes.map((bookType) => (
            <div key={bookType.id} className="form-check">
              <input
                type="checkbox"
                id={`category-${bookType.id}`}
                className="form-check-input"
                checked={selectedBookTypes.includes(bookType.id)}
                onChange={() => handleCheckboxChange(bookType.id)}
              />
              <label
                htmlFor={`category-${bookType.id}`}
                className="form-check-label"
              >
                {bookType.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Kaydet
        </button>
      </div>
    </>
  );
};

export default BookForm;
