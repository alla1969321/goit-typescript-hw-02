import css from './LoadMoreBtn.module.css'

interface LoadMoreBtnProps {
  onLoadMore: () => void;
  hasMore: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore, hasMore }) => {
  if (!hasMore) {
    return null;
  }
  
  return (
    <button className={css.loadMoreBtn} onClick={onLoadMore}>
      Load more
    </button>
  );
};


export default LoadMoreBtn; 
