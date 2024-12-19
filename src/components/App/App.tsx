import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "react-modal";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Image }  from "./App.types"

axios.defaults.baseURL = `https://api.unsplash.com/`;
const ACCESS_KEY = `NYBFJtaT_RoW2_1AK1s-PHUz15VPsDdDFtpazbBjIE0`;




const App = () => {
  const [images, setImages] = useState<Image[]>([]); // Стан для зберігання списку зображень
  const [page, setPage] = useState<number>(1);// Стан для зберігання поточної сторінки результатів
  const [loading, setLoading] = useState<boolean>(false); // Стан для відображення завантаження
  const [error, setError] = useState<any>(null); // Стан для відображення помилки
 const [selectedImage, setSelectedImage] = useState<Image | null>(null); // Стан для зберіг ання вибраного зображення
  const [searchQuery, setSearchQuery] = useState<string>(""); // Стан для зберігання поточного пошукового запиту
  const [isSearching, setIsSearching] = useState<boolean>(false); // Стан для відображення процесу пошуку нових зображень

  useEffect(() => {
    Modal.setAppElement("#root");
    fetchData();
  }, [searchQuery, page]);

  const fetchData = async () => {
    try {
      setIsSearching(true);
      setLoading(true);
      setError(null);

      if (searchQuery.trim() === "") {
        toast.error("The search field cannot be empty!");
        return;
      }

      const params = {
  query: searchQuery,
  page: String(page), // Перетворення числа на строку
  per_page: String(10), // Перетворення числа на строку
  client_id: ACCESS_KEY,
};

      const response = await axios.get(
        `search/photos/?${new URLSearchParams(params).toString()}`
      );

      const { data } = response;

      if (data.total === 0) {
        toast.error(
          "Sorry, we have not found the photos for your request. Try to write it differently.",
          { duration: 5000 }
        );
        return;
      }

      setImages((prevImages) =>
        page === 1 ? data.results : [...prevImages, ...data.results]
      );
      toast.success(`Wow! We found ${data.total} pictures`);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleSubmit = (search: string) => {
    if (!search.trim()) {
      toast.error("The search field cannot be empty!");
    } else {
      setPage(1);
      setSearchQuery(search);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Image) => {
    if (image) {
      setSelectedImage(image);
    }
  };

  const closeModal = () => {
    if (selectedImage) {
      setSelectedImage(null);
    }
  };

  const handleRequestClose = () => {
  closeModal(); // Викликаємо функцію closeModal, щоб закрити модальне вікно
};

  // Повертаємо JSX з компонентами
  return (
    <div className="app">
      <SearchBar onSubmit={handleSubmit} />{" "}
      {/* Передаємо функцію handleSubmit у компонент SearchBar */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: css.toastTextCenter,
        }}
      />
      {loading && <Loader />} {/* Відображаємо Loader при завантаженні */}
      {error && <ErrorMessage message={error} />}{" "}
      {/* Відображаємо ErrorMessage при помилці */}
      <ImageGallery imageList={images} openModal={openModal} />
      <LoadMoreBtn
        onLoadMore={handleLoadMore} // Передаємо функцію handleLoadMore у компонент LoadMoreBtn
        hasMore={!loading && images.length > 0 && !isSearching} // Перевірка чи є ще зображення для завантаження
      />
      {selectedImage !== null && (
        <ImageModal
          isOpen={true}
          image={selectedImage}
          onRequestClose={handleRequestClose}
        />
      )}
    </div>
  );
};

export default App; 
