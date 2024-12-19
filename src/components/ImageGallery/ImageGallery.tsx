import { Image } from "../App/App.types";
import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  imageList: Image[];
  openModal: (image: Image) => void;

  }

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageList, openModal }) => {
  if (imageList.length === 0) {
    return null;
  }

  return (
    <ul className={css.gallery}>
      {imageList.map((image, index) => (
        <li className={css.galleryItem} key={index}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}; 

export default ImageGallery;


