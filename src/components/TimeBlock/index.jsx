import React, { useState } from 'react';

import styles from './timeblock.module.scss';

import { ModalNewSchedule } from '../ModalNewSchedule';

function TimeBlock({ time, agendado }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
    console.log(isOpen);
  }

  function handleCloseModal() {
    setIsOpen(!isOpen);
  }


  return (
    <button className={agendado ? styles.agendado : styles.timeButton} onClick={handleOpenModal}>
      <span>{time}</span>

      <ModalNewSchedule isOpen={isOpen} onRequestClose={handleCloseModal} time={time}/>
    </button>
  );
}

export default TimeBlock;