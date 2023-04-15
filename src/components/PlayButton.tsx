import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PlayButtonProps {
  onClick: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white'
  >
    <FontAwesomeIcon icon={faPlayCircle} className='text-8xl opacity-80' />
  </div>
);

export default PlayButton;
