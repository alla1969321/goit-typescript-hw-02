import { Image } from "../App/App.types";
import css from "./ImageCard.module.css";



interface ImageCardProps {
  image: Image;
  openModal: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <div className={css.galleryItem} onClick={() => openModal(image)}>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard; 



