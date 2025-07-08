import React, { useState, useEffect } from "react";
import Header from "./Header";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Stack,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

const PAGE_SIZE_OPTIONS = [10, 50, 100];

// Helper to capitalize first letter
const capitalize = (str) =>
  str && typeof str === "string"
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : "";

// Helper to truncate comment
const truncate = (str, n = 40) =>
  str.length > n ? str.slice(0, n).replace(/\s+\S*$/, "") + "..." : str;

function CommentsDashboard() {
  // Load persisted state
  const getInitialState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("dashboardState") || "{}");
      return {
        page: saved.page || 0,
        rowsPerPage: saved.rowsPerPage || 10,
        search: saved.search || "",
        sort: saved.sort || { key: null, direction: null },
      };
    } catch {
      return {
        page: 0,
        rowsPerPage: 10,
        search: "",
        sort: { key: null, direction: null },
      };
    }
  };
  const initial = getInitialState();

  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState(initial.search);
  const [sort, setSort] = useState(initial.sort);
  const [page, setPage] = useState(initial.page);
  const [rowsPerPage, setRowsPerPage] = useState(initial.rowsPerPage);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then(setComments);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "dashboardState",
      JSON.stringify({ page, rowsPerPage, search, sort })
    );
  }, [page, rowsPerPage, search, sort]);

  const filtered = comments.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.body.toLowerCase().includes(search.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = "asc";
    if (sort.key === key) {
      if (sort.direction === "asc") direction = "desc";
      else if (sort.direction === "desc") direction = null;
    }
    setSort(direction ? { key, direction } : { key: null, direction: null });
  };

  const sorted = React.useMemo(() => {
    if (!sort.key || !sort.direction) return filtered;
    return [...filtered].sort((a, b) => {
      let aVal = a[sort.key];
      let bVal = b[sort.key];
      if (sort.key === "postId") {
        aVal = parseInt(aVal);
        bVal = parseInt(bVal);
      } else {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (sort.direction === "asc") return aVal > bVal ? 1 : -1;
      else return aVal < bVal ? 1 : -1;
    });
  }, [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / rowsPerPage);
  const paged = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sort icon logic
  const getSortIcon = (key) => {
    if (sort.key !== key) return <FiArrowUp style={{ opacity: 0.3 }} />;
    if (sort.direction === "asc") return <FiArrowUp />;
    if (sort.direction === "desc") return <FiArrowDown />;
    return <FiArrowUp style={{ opacity: 0.3 }} />;
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      <Header user={null} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mx: { md: "auto" },
          mt: 4,
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "90%" },
          }}
        >
          <CardContent>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", sm: "center" }}
              sx={{ mb: 2 }}
            >
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => handleSort("postId")}
                  sx={{
                    textTransform: "none",
                    minWidth: 120,
                    mb: { xs: 1, sm: 0 },
                    bgcolor: "#fff",
                    borderColor: "#e0e0e0",
                    color: "#232a47",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: "none",
                  }}
                  endIcon={getSortIcon("postId")}
                >
                  Sort Post ID
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => handleSort("name")}
                  sx={{
                    textTransform: "none",
                    minWidth: 120,
                    mb: { xs: 1, sm: 0 },
                    bgcolor: "#fff",
                    borderColor: "#e0e0e0",
                    color: "#232a47",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: "none",
                  }}
                  endIcon={getSortIcon("name")}
                >
                  Sort Name
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => handleSort("email")}
                  sx={{
                    textTransform: "none",
                    minWidth: 120,
                    mb: { xs: 1, sm: 0 },
                    bgcolor: "#fff",
                    borderColor: "#e0e0e0",
                    color: "#232a47",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: "none",
                  }}
                  endIcon={getSortIcon("email")}
                >
                  Sort Email
                </Button>
              </Stack>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search name, email, comment"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                sx={{
                  width: { xs: "100%", sm: 350 },
                  bgcolor: "#fff",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#fff",
                  },
                }}
                InputProps={{
                  style: { background: "#fff" },
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <FiSearch
                        style={{ color: "gray", width: 20, height: 20 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <TableContainer
              sx={{
                borderRadius: 2,
                minWidth: 320,
                width: "100%",
                overflowX: "auto",
                background: "#fff",
                border: "1px solid #ececec",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#f5f7fa" }}>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: "#232a47",
                        borderBottom: "1.5px solid #e0e0e0",
                        fontSize: 16,
                        letterSpacing: 0.2,
                      }}
                    >
                      Post ID
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: "#232a47",
                        borderBottom: "1.5px solid #e0e0e0",
                        fontSize: 16,
                        letterSpacing: 0.2,
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: "#232a47",
                        borderBottom: "1.5px solid #e0e0e0",
                        fontSize: 16,
                        letterSpacing: 0.2,
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: "#232a47",
                        borderBottom: "1.5px solid #e0e0e0",
                        fontSize: 16,
                        letterSpacing: 0.2,
                      }}
                    >
                      Comment
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paged.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        borderBottom: "1px solid #ececec",
                        "&:last-child td": { borderBottom: "none" },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 500,
                          color: "#232a47",
                          fontSize: 15,
                          borderBottom: "1px solid #ececec",
                        }}
                      >
                        {row.postId}
                      </TableCell>
                      <TableCell
                        sx={{
                          wordBreak: "break-word",
                          maxWidth: 180,
                          fontWeight: 500,
                          color: "#232a47",
                          fontSize: 15,
                          borderBottom: "1px solid #ececec",
                        }}
                      >
                        {capitalize(row.name)}
                      </TableCell>
                      <TableCell
                        sx={{
                          wordBreak: "break-word",
                          maxWidth: 180,
                          color: "#232a47",
                          fontSize: 15,
                          borderBottom: "1px solid #ececec",
                          textTransform: "lowercase",
                        }}
                      >
                        {row.email.toLowerCase()}
                      </TableCell>
                      <TableCell
                        sx={{
                          wordBreak: "break-word",
                          maxWidth: 300,
                          color: "#232a47",
                          fontSize: 15,
                          borderBottom: "1px solid #ececec",
                        }}
                      >
                        {capitalize(truncate(row.body, 40))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* --- CUSTOM PAGINATION CONTROLS START --- */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Typography variant="body2" sx={{ color: "#888", minWidth: 120 }}>
                {paged.length > 0
                  ? `${page * rowsPerPage + 1}-${Math.min(
                      (page + 1) * rowsPerPage,
                      sorted.length
                    )} of ${sorted.length} items`
                  : "No results"}
              </Typography>
              <Stack direction="row" alignItems="center">
                <IconButton
                  onClick={() => handleChangePage(page - 1)}
                  disabled={page === 0}
                  sx={{ minWidth: 32, minHeight: 32, px: 0 }}
                >
                  <FiChevronLeft />
                </IconButton>
                {Array.from({ length: totalPages }, (_, i) => i)
                  .slice(Math.max(0, page - 1), Math.min(totalPages, page + 2))
                  .map((i) => (
                    <Box
                      key={i}
                      sx={{
                        border: i === page ? "1.5px solid #bdbdbd" : "none",
                        borderRadius: 1,
                        py: 0.5,
                        minWidth: 28,
                        minHeight: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: i === page ? 600 : 400,
                        bgcolor: i === page ? "#fff" : "transparent",
                        color: "#232a47",
                        fontSize: 16,
                        mx: 0.5,
                        boxShadow: i === page ? "0 1px 2px #0001" : "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleChangePage(i)}
                    >
                      {i + 1}
                    </Box>
                  ))}
                <IconButton
                  onClick={() => handleChangePage(page + 1)}
                  disabled={page >= totalPages - 1}
                  sx={{ minWidth: 32, minHeight: 32, px: 0 }}
                >
                  <FiChevronRight />
                </IconButton>
              </Stack>
              <TextField
                select
                size="small"
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                sx={{
                  bgcolor: "#f6f8fa",
                  "& .MuiSelect-select": { py: 1.2, pr: 2 },
                  "& fieldset": { border: "none" },
                  minWidth: 110,
                }}
                SelectProps={{
                  renderValue: (value) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {value} / Page <FiChevronDown style={{ marginLeft: 6 }} />
                    </Box>
                  ),
                  IconComponent: () => null,
                }}
              >
                {PAGE_SIZE_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt} / Page
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            {/* --- CUSTOM PAGINATION CONTROLS END --- */}
          </CardContent>
        </Box>
      </Box>
    </Box>
  );
}

export default CommentsDashboard;
