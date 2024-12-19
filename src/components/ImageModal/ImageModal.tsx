import Modal from "react-modal";
import css from './ImageModal.module.css'

interface ImageModalProps {
  isOpen: boolean;
  image: RegularImage | SmallImage; // Використання об'єднання типів
  onRequestClose: () => void;
}

interface RegularImage {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface SmallImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, image, onRequestClose }) => {
  const closeModal = () => {
    onRequestClose(); // Викликаємо функцію onRequestClose
  };

  // Перевірка типу об'єкта image
  const isRegularImage = "regular" in image.urls;
  return (
    <Modal
      className={css.ReactModal__Content}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
    >
      <img className={css.imgRegular} src={isRegularImage ? (image.urls as RegularImage['urls']).regular : (image.urls as SmallImage['urls']).small} alt={image.alt_description} />
    </Modal>
  );
};

export default ImageModal; 