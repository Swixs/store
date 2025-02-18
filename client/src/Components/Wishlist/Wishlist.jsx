import React, { useState, useEffect } from "react";
import styles from "./Wishlist.module.css";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAlerts } from "../../Context/alertContext";

const Wishlist = () => {
  const { alerts, markAllAsRead } = useAlerts();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const reversedAlerts = alerts.slice().reverse();
  const displayedItems = reversedAlerts.slice(startIndex, endIndex);

  useEffect(() => {
    markAllAsRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wishlist}>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "60px",
        }}
      >
        Wishlist
      </h1>
      {displayedItems.length > 0 ? (
        displayedItems.map((item) => (
          <div key={item.id} className={styles.message}>
            {item.message}
          </div>
        ))
      ) : (
        <div
          className={styles.message}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Wishlist empty
        </div>
      )}
      <Stack
        spacing={2}
        style={{
          marginTop: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={Math.ceil(alerts.length / itemsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default Wishlist;
