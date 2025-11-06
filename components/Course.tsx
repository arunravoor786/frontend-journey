import React, { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  IconButton,
  Collapse,
  TextField,
  Alert,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  ShoppingCart,
  Delete,
  Discount as DiscountIcon,
} from '@mui/icons-material';
import type { CourseProps } from '../types';

/**
 * Course Component - Displays individual course information
 */
const Course: React.FC<CourseProps> = ({
  id,
  name,
  price,
  rating,
  image,      // dynamic URL from JSON
  onDelete,
  isDeleting = false,
}) => {
  const [purchased, setPurchased] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountInput, setDiscountInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const calcPrice = (orig: number, pct: number) => orig - (orig * pct) / 100;
  const finalPrice = calcPrice(price, discount);
  const savings = price - finalPrice;

  // 1) Log course.image to verify correct URL
  useEffect(() => {
    console.log(`Course ${id} image URL:`, image);
  }, [id, image]);

  const handlePurchase = () => {
    setPurchased(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const applyDiscount = () => {
    const pct = parseFloat(discountInput);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      alert('Enter discount 0–100');
      return;
    }
    setDiscount(pct);
    setShowDiscountInput(false);
    setDiscountInput('');
  };

  const quickDiscount = (pct: number) => setDiscount(pct);
  const resetDiscount = () => setDiscount(0);

  const handleDelete = () => {
    if (isDeleting) return;
    if (window.confirm(`Delete "${name}"?`)) {
      onDelete(id);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
      }}
    >
      {/* 2) Dynamic image binding: use course.image */}
      <CardMedia
        component="img"
        height="200"
        image={image}                       
        alt={`${name} course`}             
        sx={{ objectFit: 'cover', backgroundColor: 'grey.200' }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          {name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={rating} readOnly size="small" precision={0.1} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({rating}/5)
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          {discount > 0 ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                >
                  ${price}
                </Typography>
                <Chip
                  icon={<DiscountIcon />}
                  label={`${discount}% OFF`}
                  color="secondary"
                  size="small"
                />
              </Box>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                ${finalPrice.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="success.main">
                You save ${savings.toFixed(2)}!
              </Typography>
            </>
          ) : (
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              ${price}
            </Typography>
          )}
        </Box>

        <Collapse in={showSuccess}>
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setShowSuccess(false)}>
            Purchased successfully! 🎉
          </Alert>
        </Collapse>

        {purchased && (
          <Chip label="✅ Owned" color="success" sx={{ mb: 2 }} />
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={purchased ? 'outlined' : 'contained'}
            startIcon={<ShoppingCart />}
            onClick={handlePurchase}
            disabled={purchased}
            size="small"
          >
            {purchased ? 'Owned' : 'Buy Now'}
          </Button>
          <Tooltip title="Apply Discount">
            <IconButton
              color="primary"
              size="small"
              onClick={() => setShowDiscountInput((prev) => !prev)}
            >
              <DiscountIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {discount > 0 && (
            <Button size="small" onClick={resetDiscount}>
              Reset
            </Button>
          )}
          <Tooltip title={isDeleting ? 'Deleting...' : 'Delete Course'}>
            <IconButton
              onClick={handleDelete}
              disabled={isDeleting}
              color="error"
              size="small"
            >
              {isDeleting ? <CircularProgress size={16} /> : <Delete />}
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>

      <Collapse in={showDiscountInput}>
        <Box sx={{ p: 2, pt: 0, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" gutterBottom>
            Apply Custom Discount
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {[5, 10, 15, 20].map((pct) => (
              <Button
                key={pct}
                size="small"
                variant="outlined"
                onClick={() => quickDiscount(pct)}
              >
                {pct}%
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              size="small"
              type="number"
              label="Custom %"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              inputProps={{ min: 0, max: 100, step: 1 }}
              sx={{ flex: 1 }}
            />
            <Button
              size="small"
              variant="contained"
              onClick={applyDiscount}
              disabled={!discountInput}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
};

export default Course;
