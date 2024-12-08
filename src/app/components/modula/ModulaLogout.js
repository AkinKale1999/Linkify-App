"use client"

import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function SignOutModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Wollen Sie sich wirklich abmelden?
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ mr: 2 }}
        >
          Ja
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Nein
        </Button>
      </Box>
    </Modal>
  );
}

SignOutModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default SignOutModal;