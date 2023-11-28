import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AdminAllArticles = () => {
  const axiosPublic = useAxiosPublic();
  const [articles, setArticles] = useState([]);
  const [declineReason, setDeclineReason] = useState("");
  const [currentArticleId, setCurrentArticleId] = useState("");
  const [openDeclineModal, setOpenDeclineModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axiosPublic.get("/articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    getArticles();
  }, []);

  const handleAction = async (articleId, actionType, reason = "") => {
    try {
      const response = await axiosPublic.patch(`/articles/${articleId}`, {
        actionType,
        reason,
      });
      if (response.data.modifiedCount > 0) {
        setOpenSnackbar(true);
        setSnackbarMessage(`Article ${actionType} successfully!`);
        setArticles(
          articles.map((article) =>
            article._id === articleId
              ? { ...article, status: actionType }
              : article
          )
        );
      }
    } catch (error) {
      console.error(`Error on ${actionType} article:`, error);
    }
  };
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
    updateArticle(articleId, { status: newStatus });
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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/articles/${id}`)
          .then(() => {
            setArticles(articles.filter(article => article._id !== id));
            Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
          })
          .catch(error => console.error('Error deleting article:', error));
      }
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h2>All Articles</h2>
      <TableContainer component={Paper}>
        <Table>
        <TableHead style={{ backgroundColor: '#e0e0e0' }}>
    <TableRow>
        <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign:'center' }}>Title</TableCell>
        <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign:'center' }}>Author Name</TableCell>
        <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign:'center' }}>Author Email</TableCell>
        <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign:'center' }}>Posted Date</TableCell>
        <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign:'center' }}>Status</TableCell>
        <TableCell style={{ fontWeight: 'bold', borderRight: '1px solid #ccc', textAlign:'center' }}>Publisher</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign:'center' }}>Actions</TableCell>
    </TableRow>
</TableHead>

          <TableBody>
            {articles.map((article) => (
              <TableRow key={article._id}>
                  <TableCell style={{ borderRight: '1px solid #eee' }}>{article.title}</TableCell>
            <TableCell style={{ borderRight: '1px solid #eee' }}>{article.authorName}</TableCell>
            <TableCell style={{ borderRight: '1px solid #eee' }}>{article.authorEmail}</TableCell>
            <TableCell style={{ borderRight: '1px solid #eee' }}>{new Date(article.postedDate).toLocaleDateString()}</TableCell>
            <TableCell style={{ borderRight: '1px solid #eee' }}>
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
                <TableCell style={{ borderRight: '1px solid #eee' }}>{article.publisher}</TableCell>
                <TableCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button 
                        onClick={() => handleMakePremium(article._id, article.isPremium)}
                        color={article.isPremium === 'Yes' ? "secondary" : "primary"}
                        variant="contained"
                        size="small"
                        style={{ marginRight: '10px' }}
                    >
                        {article.isPremium === 'Yes' ? 'Cancel Premium' : 'Make Premium'}
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

      {/* Modal and Snackbar components remain the same */}
    </div>
  );
};

export default AdminAllArticles;
