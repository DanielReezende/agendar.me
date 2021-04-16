import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';

import styles from './modal.module.scss';


export function ModalNewSchedule({ isOpen, onRequestClose, time }) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <FiX />
      </button>

      <form className={styles.container}>
        <h2>Agendar o horário das: {time}</h2>

        <label htmlFor="title">Tool Name</label>
        <input
          type="text"
          placeholder="Enter the name of your tool.."
          name="title"
        />

        <label htmlFor="link">Tool link</label>
        <input
          type="text"
          placeholder="Enter the link of your tool.."
          name="link"
        />

        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          placeholder="Enter the tags of your tool.."
          name="tags"
        />


        <button type="submit">Reservar horário</button>


      </form>
    </Modal>
  )
}