import './ModalContent.css';
import '../Header.css'; 

const ModalContent = ({ showModal,  modalContent }) => {

  return (
    <div>
    {showModal && (
      <div className="modal">
        <div className="modal-content">

          <div>
            {modalContent}
          </div>

        </div>
      </div>
    )}
  </div>
  );
};

export default ModalContent;
