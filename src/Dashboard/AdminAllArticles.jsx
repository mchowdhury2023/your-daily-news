import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Pagination } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";

const PAGE_SIZE = 5;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AdminAllArticles = () => {
  const axiosPublic = useAxiosPublic();
  const [articles, setArticles] = useState([]);
  const [declineReason, setDeclineReason] = useState("");
  const [currentArticleId, setCurrentArticleId] = useState("");
  const [openDeclineModal, setOpenDeclineModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axiosPublic.get("/adminarticles", {
          params: { page: currentPage, limit: PAGE_SIZE },
        });

        // Log the response for debugging
        console.log("Response data:", response.data);

        // Check if the articles data is present and is an array
        if (response.data && Array.isArray(response.data.articles)) {
          setArticles(response.data.articles);
          setTotalArticles(response.data.totalCount);
        } else {
          // Handle the case where articles is not an array or not present
          console.error("Invalid format of articles data", response.data);
          setArticles([]);
          setTotalArticles(0);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Set default state in case of an error
        setArticles([]);
        setTotalArticles(0);
      }
    };

    getArticles();
  }, [currentPage]);

  const updateArticle = async (articleId, updatedFields) => {
    try {
      const response = await axiosPublic.patch(
        `/articles/${articleId}`,
        updatedFields
      );
      if (response.data.modifiedCount > 0) {
        setOpenSnackbar(true);
        setSnackbarMessage(`Article updated successfully!`);
        setArticles(
          articles.map((article) =>
            article._id === articleId
              ? { ...article, ...updatedFields }
              : article
          )
        );
      }
    } catch (error) {
      console.error(`Error updating article:`, error);
    }
  };

  const handleStatusChange = (articleId, newStatus) => {
    if (newStatus === "declined") {
      setCurrentArticleId(articleId);
      setOpenDeclineModal(true);
    } else {
      updateArticle(articleId, { status: newStatus });
    }
  };

  const handleDeclineSubmit = () => {
    updateArticle(currentArticleId, { status: "declined", declineReason });
    setOpenDeclineModal(false);
  };

  const handleMakePremium = async (articleId, isCurrentlyPremium) => {
    const newPremiumStatus = isCurrentlyPremium === "Yes" ? "No" : "Yes";
    try {
      const response = await axiosPublic.patch(`/articles/${articleId}`, {
        isPremium: newPremiumStatus,
      });
      if (response.data.modifiedCount > 0) {
        setOpenSnackbar(true);
        setSnackbarMessage(`Article premium status updated successfully!`);
        setArticles(
          articles.map((article) =>
            article._id === articleId
              ? { ...article, isPremium: newPremiumStatus }
              : article
          )
        );
      }
    } catch (error) {
      console.error("Error updating article's premium status:", error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/articles/${id}`)
          .then(() => {
            setArticles(articles.filter((article) => article._id !== id));
            Swal.fire("Deleted!", "Your article has been deleted.", "success");
          })
          .catch((error) => console.error("Error deleting article:", error));
      }
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h2>All Articles</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#e0e0e0" }}>
            <TableRow>
              <TableCell
                style={{
                  fontWeight: "bold",
                  borderRight: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                Author Photo
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  borderRight: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                Title
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  borderRight: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                Author Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  borderRight: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                Author Email
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  borderRight: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                Posted Date
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  borderRight: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  borderRight: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                Publisher
              </TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {articles.map((article) => (
              <TableRow key={article._id}>
                <TableCell style={{ borderRight: "1px solid #eee" }}>
                  <img
                    src={article.authorPhotoURL}
                    alt="Author"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell style={{ borderRight: "1px solid #eee" }}>
                  {article.title}
                </TableCell>
                <TableCell style={{ borderRight: "1px solid #eee" }}>
                  {article.authorName}
                </TableCell>
                <TableCell style={{ borderRight: "1px solid #eee" }}>
                  {article.authorEmail}
                </TableCell>
                <TableCell style={{ borderRight: "1px solid #eee" }}>
                  {new Date(article.postedDate).toLocaleDateString()}
                </TableCell>
                <TableCell style={{ borderRight: "1px solid #eee" }}>
                  <Select
                    value={article.status}
                    onChange={(e) =>
                      handleStatusChange(article._id, e.target.value)
                    }
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approve</MenuItem>
                    <MenuItem value="declined">Decline</MenuItem>
                  </Select>
                </TableCell>
                <TableCell style={{ borderRight: "1px solid #eee" }}>
                  {article.publisher}
                </TableCell>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                      onClick={() =>
                        handleMakePremium(article._id, article.isPremium)
                      }
                      color={
                        article.isPremium === "Yes" ? "secondary" : "primary"
                      }
                      variant="contained"
                      size="small"
                      style={{ marginRight: "10px" }}
                    >
                      {article.isPremium === "Yes"
                        ? "Cancel Premium"
                        : "Make Premium"}
                    </Button>
                    <Button
                      onClick={() => handleDelete(article._id)}
                      color="error"
                      variant="contained"
                      size="small"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openDeclineModal}
        onClose={() => setOpenDeclineModal(false)}
        aria-labelledby="decline-reason-modal-title"
        aria-describedby="decline-reason-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="decline-reason-modal-title"
            variant="h6"
            component="h2"
          >
            Enter Decline Reason
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            margin="normal"
          />
          <Button
            onClick={handleDeclineSubmit}
            color="primary"
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Submit Reason
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(totalArticles / PAGE_SIZE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default AdminAllArticles;
