import React from 'react';
import {
  Modal,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';


const GenericModal = ({
  open,
  onClose,
  title,
  children,
  height,
  width
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : '80%',
    maxWidth: width ? width : 800,
    maxHeight: height ? height : '90vh',
    boxShadow: 24,
    borderRadius: 2,
    overflow: 'auto',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    >
        <Box id="modal-description" sx={modalStyle}>
          {children}
        </Box>
    </Modal>
  );
};

export default GenericModal;

