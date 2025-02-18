import React, { createContext, useContext, useState, useEffect } from "react";

const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState(() => {
    const savedAlerts = localStorage.getItem("alerts");
    return savedAlerts ? JSON.parse(savedAlerts) : [];
  });

  useEffect(() => {
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = (message) => {
    const newAlert = { id: Date.now(), message, read: false };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  const cleanAlert = () => {
    setAlerts([]);
    localStorage.removeItem("alerts");
  };

  const markAllAsRead = () => {
    const updatedAlerts = alerts.map((alert) => ({ ...alert, read: true }));
    setAlerts(updatedAlerts);
    localStorage.setItem("alerts", JSON.stringify(updatedAlerts));
  };

  return (
    <AlertsContext.Provider
      value={{ alerts, addAlert, cleanAlert, markAllAsRead }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertsProvider");
  }
  return context;
};
