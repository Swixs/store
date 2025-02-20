import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import styles from "./Profile.module.css";

const EditModal = ({
  open,
  field,
  value,
  onChange,
  onClose,
  onSave,
  currentPassword,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (field === "password") {
      if (oldPassword !== currentPassword) {
        setError("The old password is incorrect");
        return;
      }
      if (newPassword === oldPassword) {
        setError("The new password must not be the same as the old one.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New password and confirmation do not match");
        return;
      }
      onSave(newPassword);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    } else {
      onSave(value);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {field === "password" ? "Change password" : `Edit ${field}`}
      </DialogTitle>
      <DialogContent style={{ width: "400px" }}>
        {field === "password" ? (
          <>
            <input
              className={styles.inputModal}
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={{ width: "90%", padding: "8px", margin: "5px 0" }}
            />
            <input
              className={styles.inputModal}
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "90%", padding: "8px", margin: "5px 0" }}
            />
            <input
              className={styles.inputModal}
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: "90%", padding: "8px", margin: "5px 0" }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </>
        ) : (
          <input
            className={styles.inputModal}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: "80%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
