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
  Box,
  Typography,
} from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from '@tanstack/react-query';

const style = {
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

const MyArticles = () => {
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();

  const { data: articles, error, isLoading } = useQuery({
    queryKey: ['myarticles', user?.email], 
    queryFn: () => axiosPublic.get(`/myarticles?email=${user?.email}`).then(res => res.data),
    enabled: !!user?.email, 
});

if (isLoading) {
    return <div>Loading articles...</div>;
}

if (error) {
    console.error('Error fetching articles:', error);
    return <div>Error loading articles.</div>;
}

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

  const handleUpdate = (id) => {
    navigate(`/updatearticles/${id}`);
  };

  const handleOpenModal = (reason) => {
    setDeclineReason(reason);
    setOpenModal(true);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "1em" }}>
        Articles by {user?.displayName}
      </h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Is Premium</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article, index) => (
              <TableRow key={article._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>
                  {article.status}
                  {article.status === "declined" && (
                    <Button
                      onClick={() => handleOpenModal(article.declineReason)}
                    >
                      View Reason
                    </Button>
                  )}
                </TableCell>

                <TableCell>
                  {article.isPremium === "no" ? "No" : "Yes"}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdate(article._id)}>
                    Update
                  </Button>
                  <Button onClick={() => handleDelete(article._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Decline Reason
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {declineReason}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MyArticles;
