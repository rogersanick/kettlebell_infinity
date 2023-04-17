import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PlayButtonProps {
  onClick: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className='z-100 absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform text-white'
  >
    <FontAwesomeIcon icon={faPlayCircle} className='text-8xl opacity-80' />
  </button>
);

export default PlayButton;
