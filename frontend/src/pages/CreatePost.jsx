import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { usePostStore } from '../store/Posts';

const CreatePost = ({ open, handleClose, editMode = false, postToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const createPost = usePostStore((state) => state.createPost);
  const editPost = usePostStore((state) => state.editPost);

  useEffect(() => {
    if (editMode && postToEdit) {
      setTitle(postToEdit.title);
      setDescription(postToEdit.description || '');
      setImageUrl(postToEdit.imageUrl || '');
    } else {
      setTitle('');
      setDescription('');
      setImageUrl('');
    }
  }, [editMode, postToEdit]);

  const handleSubmit = async () => {
    const postData = { title, description, img: imageUrl };
    if (editMode) {
      await editPost(postToEdit._id, postData);
    } else {
      await createPost(postData);
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {editMode ? 'Edit Post' : 'Create Post'}
        </Typography>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          {editMode ? 'Update' : 'Post'}
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePost;
