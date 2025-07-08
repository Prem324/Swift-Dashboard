import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => setUser(users[0]));
  }, []);

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Loading Profile...</Typography>
      </Box>
    );
  }

  // Get initials
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "EH";

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header user={user} />
      <Box
        sx={{
          mx: "auto",
          mt: 4,
          px: { xs: 1, sm: 3, md: 6 },
          width: { md: "90%", sm: "100%" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton
            onClick={() => navigate("/dashboard")}
            sx={{ color: "#232a47", mr: 1 }}
            aria-label="back"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Welcome, {user.name}
          </Typography>
        </Box>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: "0 2px 8px #0001",
            width: "100%",
            minHeight: 400,
            border: "1px solid #ececec",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <Grid container spacing={4} alignItems="flex-start">
              {/* Avatar, name, email */}
              <Grid
                item
                xs={12}
                md={3}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: { xs: "center", md: "center" },
                  justifyContent: "center",
                  mb: { xs: 2, md: 0 },
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 75,
                    height: 75,
                    bgcolor: "#e5e7ef",
                    color: "#232a47",
                    fontWeight: "bold",
                    fontSize: 32,
                    mb: 2,
                  }}
                >
                  {initials}
                </Avatar>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#232a47",
                      fontWeight: 600,
                      textAlign: { xs: "center", md: "left" },
                      fontSize: 20,
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#888",
                      textAlign: { xs: "center", md: "left" },
                      wordBreak: "break-all",
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>
              </Grid>
              {/* Fields */}
              <Grid item xs={12} md={9}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        User ID
                      </Typography>
                      <TextField
                        value={user.id}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        sx={{
                          width: { md: 450 },
                          background: "#f6f8fa",
                          borderRadius: 1,
                          "& .MuiFilledInput-root": {
                            borderRadius: 1,
                            fontWeight: 500,
                            fontSize: 16,
                            boxShadow: "none",
                            border: "none",
                          },
                          "& .MuiFilledInput-input": {
                            padding: "12px 0",
                          },
                          "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                            {
                              borderBottom: "none",
                            },
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        Name
                      </Typography>
                      <TextField
                        value={user.name}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        fullWidth
                        sx={{
                          width: { md: 450 },
                          background: "#f6f8fa",
                          borderRadius: 1,
                          "& .MuiFilledInput-root": {
                            background: "#f6f8fa",
                            borderRadius: 1,
                            fontWeight: 500,
                            fontSize: 16,
                            px: 2,
                            py: 1,
                            boxShadow: "none",
                            border: "none",
                          },
                          "& .MuiFilledInput-input": {
                            padding: "12px 0",
                          },
                          "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                            {
                              borderBottom: "none",
                            },
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        Email ID
                      </Typography>
                      <TextField
                        value={user.email}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        fullWidth
                        sx={{
                          width: { md: 450 },
                          background: "#f6f8fa",
                          borderRadius: 1,
                          "& .MuiFilledInput-root": {
                            background: "#f6f8fa",
                            borderRadius: 1,
                            fontWeight: 500,
                            fontSize: 16,
                            px: 2,
                            py: 1,
                            boxShadow: "none",
                            border: "none",
                          },
                          "& .MuiFilledInput-input": {
                            padding: "12px 0",
                          },
                          "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                            {
                              borderBottom: "none",
                            },
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        Address
                      </Typography>
                      <TextField
                        value={
                          user.address
                            ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
                            : ""
                        }
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        fullWidth
                        sx={{
                          width: { md: 450 },
                          background: "#f6f8fa",
                          borderRadius: 1,
                          "& .MuiFilledInput-root": {
                            background: "#f6f8fa",
                            borderRadius: 1,
                            fontWeight: 500,
                            fontSize: 16,
                            px: 2,
                            py: 1,
                            boxShadow: "none",
                            border: "none",
                          },
                          "& .MuiFilledInput-input": {
                            padding: "12px 0",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          },
                          "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                            {
                              borderBottom: "none",
                            },
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        Phone
                      </Typography>
                      <TextField
                        value={user.phone}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        fullWidth
                        sx={{
                          width: { md: 450 },
                          background: "#f6f8fa",
                          borderRadius: 1,
                          "& .MuiFilledInput-root": {
                            background: "#f6f8fa",
                            borderRadius: 1,
                            fontWeight: 500,
                            fontSize: 16,
                            px: 2,
                            py: 1,
                            boxShadow: "none",
                            border: "none",
                          },
                          "& .MuiFilledInput-input": {
                            padding: "12px 0",
                          },
                          "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                            {
                              borderBottom: "none",
                            },
                        }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Profile;
