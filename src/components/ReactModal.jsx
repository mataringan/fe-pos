import Modal from "react-modal";

// Inisialisasi modal
Modal.setAppElement("#root"); // Atur elemen akar aplikasi Anda

const PhoneNumberModal = ({ isOpen, phoneNumber, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Phone Number Modal"
        >
            <p>Nomor Telepon: {phoneNumber}</p>
            <button onClick={onRequestClose}>Tutup</button>
        </Modal>
    );
};
