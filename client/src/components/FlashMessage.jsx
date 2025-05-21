import { useFlash } from '../contexts/FlashContext';
import '../styles/FlashMessage.css';

const FlashMessage = () => {
    const { message, type } = useFlash();
    if (!message) return null;
    return (
        <div className={`flash-message ${type}`}>{message}</div>
    );
};

export default FlashMessage;
