export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, date, eventId) => {
  return {
    type: OPEN_MODAL,
    modal,
    date,
    eventId
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};
