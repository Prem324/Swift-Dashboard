import React from "react";
import Swift_Logo from "../assets/Swift logo.svg";
import { Box, useMediaQuery } from "@mui/material";

export default function Header({ user }) {
  // Use string queries so ThemeProvider is NOT required
  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(min-width:600px) and (max-width:900px)");

  let paddingX = "8rem";
  if (isXs) paddingX = "1rem";
  else if (isSm) paddingX = "3rem";

  return (
    <Box
      component="header"
      sx={{
        background: "#232a47",
        color: "#fff",
        px: paddingX,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: { xs: 1, sm: 0 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img
          style={{ color: "white", height: 32 }}
          src={Swift_Logo}
          alt="Swift"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#e5e7ef",
            color: "#232a47",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {user?.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            : "EH"}
        </Box>
        <Box component="span" sx={{ fontWeight: 500, fontSize: 16 }}>
          {user?.name || "Ervin Howell"}
        </Box>
      </Box>
    </Box>
  );
}
