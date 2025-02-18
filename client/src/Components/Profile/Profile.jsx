import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import SettingsIcon from "@mui/icons-material/Settings";
import EditModal from "./EditModal";
import { useAlerts } from "../../Context/alertContext";

const UserProfile = () => {
  const { addAlert } = useAlerts();
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserData(currentUser);
    }
  }, []);

  const handleOpen = (type) => {
    setModalType(type);
    setModalValue(userData[type]);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (newValue) => {
    const updatedUserData = { ...userData, [modalType]: newValue };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.login === userData.login ? updatedUserData : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
    addAlert("User data was update!! " + new Date().toLocaleString());

    setUserData(updatedUserData);
    handleClose();
  };

  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.profileDetails}>
        <h2>Account Management</h2>
        <button
          className={`${styles.profileTabBtn} ${
            activeTab === "profile" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>

      <div className={styles.sidebar}>
        {activeTab === "profile" && (
          <div className={styles.userInfo}>
            <div className={styles.inputRow}>
              <p>
                Name:{" "}
                <input
                  type="text"
                  value={userData.name}
                  disabled
                  className={styles.inputField}
                />
              </p>
              <button
                className={styles.editBtn}
                onClick={() => handleOpen("name")}
              >
                <SettingsIcon />
              </button>
            </div>
            <div className={styles.inputRow}>
              <p>
                Login:{" "}
                <input
                  type="text"
                  value={userData.login}
                  disabled
                  className={styles.inputField}
                />
              </p>
              <button
                className={styles.editBtn}
                onClick={() => handleOpen("login")}
              >
                <SettingsIcon />
              </button>
            </div>
            <div className={styles.inputRow}>
              <p>
                Password:{" "}
                <input
                  type="password"
                  value="********"
                  disabled
                  className={styles.inputField}
                />
              </p>
              <button
                className={styles.editBtn}
                onClick={() => handleOpen("password")}
              >
                <SettingsIcon />
              </button>
            </div>
          </div>
        )}
      </div>

      <EditModal
        open={isModalOpen}
        field={modalType}
        value={modalValue}
        onChange={setModalValue}
        onClose={handleClose}
        onSave={handleSave}
        currentPassword={userData.password}
      />
    </div>
  );
};

export default UserProfile;
