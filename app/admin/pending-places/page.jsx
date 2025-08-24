"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Divider,
  Container,
  Avatar,
  Rating,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { motion } from "framer-motion";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CategoryIcon from "@mui/icons-material/Category";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PendingPlaces = () => {
  const { darkMode, theme } = useTheme();
  const router = useRouter();

  const [pendingPlaces, setPendingPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPendingPlaces = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:4000/api/admin/places/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPendingPlaces(response.data);
      } catch (error) {
        console.error("Error fetching pending places:", error);
        setError("فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.");
        if (error.response && error.response.status === 403) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPlaces();
  }, [router]);

  const handleApprove = async (placeId) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:4000/api/admin/places/${placeId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the approved place from the list
      setPendingPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place._id !== placeId)
      );
    } catch (error) {
      console.error("Error approving place:", error);
      alert("فشل في الموافقة على المكان. يرجى المحاولة مرة أخرى.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("يرجى إدخال سبب الرفض");
      return;
    }

    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:4000/api/admin/places/${selectedPlace._id}/reject`,
        { rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the rejected place from the list
      setPendingPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place._id !== selectedPlace._id)
      );
      setRejectDialogOpen(false);
      setSelectedPlace(null);
      setRejectionReason("");
    } catch (error) {
      console.error("Error rejecting place:", error);
      alert("فشل في رفض المكان. يرجى المحاولة مرة أخرى.");
    } finally {
      setActionLoading(false);
    }
  };

  const openRejectDialog = (place) => {
    setSelectedPlace(place);
    setRejectDialogOpen(true);
  };

  const openDetailsDialog = (place) => {
    setSelectedPlace(place);
    setCurrentImageIndex(0);
    setDetailsDialogOpen(true);
  };

  const handleNextImage = () => {
    if (selectedPlace && selectedPlace.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedPlace.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (selectedPlace && selectedPlace.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedPlace.images.length - 1 : prevIndex - 1
      );
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      restaurants: "مطاعم وكافيهات",
      tourism: "أماكن سياحية",
      hotels: "فنادق ومنتجعات",
      shopping: "تسوق ومولات",
      entertainment: "أنشطة ترفيهية",
      museums: "متاحف ومعارض",
    };

    return categories[category] || category;
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Paper
          sx={{
            p: 3,
            textAlign: "center",
            backgroundColor: darkMode ? theme.colors.surface : "#fff",
            color: theme.colors.text,
          }}
        >
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            إعادة المحاولة
          </Button>
        </Paper>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: theme.colors.primary,
              mb: 4,
            }}
          >
            الأماكن المعلقة في انتظار الموافقة
          </Typography>

          {pendingPlaces.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "#f7f9fc",
                borderRadius: 2,
                width: "100%",
                color: theme.colors.textSecondary,
                border: "1px dashed",
                borderColor: theme.colors.border,
              }}
            >
              <StorefrontIcon
                sx={{
                  fontSize: 60,
                  color: theme.colors.textSecondary,
                  opacity: 0.5,
                  mb: 2,
                }}
              />
              <Typography variant="h6">
                لا توجد أماكن في انتظار المراجعة!
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                سيظهر هنا الأماكن التي قام أصحاب الأعمال بتسجيلها عندما تكون
                متاحة للمراجعة
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {pendingPlaces.map((place) => (
                <Grid item xs={12} md={6} lg={4} key={place._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: darkMode
                          ? theme.colors.surface
                          : "#fff",
                        borderRadius: 2,
                        overflow: "hidden",
                        transition:
                          "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        },
                        position: "relative",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="180"
                        image={
                          place.images[0] ||
                          "https://via.placeholder.com/300x180?text=No+Image"
                        }
                        alt={place.name}
                      />
                      <Chip
                        label={getCategoryLabel(place.category)}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          backgroundColor: darkMode ? "#3b5898CC" : "#3b5898CC",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                        <Typography
                          variant="h6"
                          component="h2"
                          gutterBottom
                          sx={{
                            fontWeight: "bold",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            color: theme.colors.text,
                          }}
                        >
                          {place.name}
                        </Typography>
                        <Box
                          sx={{ mb: 2, display: "flex", alignItems: "center" }}
                        >
                          <LocationOnIcon
                            fontSize="small"
                            sx={{ color: theme.colors.primary, mr: 0.5 }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              color: theme.colors.textSecondary,
                            }}
                          >
                            {place.city} - {place.address}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            mb: 2,
                            color: theme.colors.text,
                          }}
                        >
                          {place.description}
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                          <Tooltip title="عرض التفاصيل">
                            <Button
                              variant="outlined"
                              startIcon={<VisibilityIcon />}
                              onClick={() => openDetailsDialog(place)}
                              sx={{
                                flex: 1,
                                borderColor: theme.colors.primary,
                                color: theme.colors.primary,
                              }}
                            >
                              التفاصيل
                            </Button>
                          </Tooltip>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleApprove(place._id)}
                            disabled={actionLoading}
                            sx={{
                              flex: 1,
                              backgroundColor: darkMode
                                ? theme.colors.primary
                                : "#4caf50",
                              "&:hover": {
                                backgroundColor: darkMode
                                  ? "#e69b54"
                                  : "#388e3c",
                              },
                            }}
                          >
                            موافقة
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<CancelIcon />}
                            onClick={() => openRejectDialog(place)}
                            disabled={actionLoading}
                            sx={{
                              flex: 1,
                              borderColor: "#f44336",
                              color: "#f44336",
                              "&:hover": {
                                backgroundColor: "rgba(244, 67, 54, 0.04)",
                              },
                            }}
                          >
                            رفض
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>

      {/* Rejection Dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={() => !actionLoading && setRejectDialogOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: darkMode ? theme.colors.surface : "#fff",
            color: theme.colors.text,
            maxWidth: "500px",
            width: "100%",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: darkMode
              ? "rgba(244, 67, 54, 0.1)"
              : "rgba(244, 67, 54, 0.05)",
            color: "#f44336",
          }}
        >
          رفض طلب إضافة مكان
          <IconButton
            aria-label="close"
            onClick={() => !actionLoading && setRejectDialogOpen(false)}
            sx={{
              position: "absolute",
              left: 8,
              top: 8,
              color: theme.colors.textSecondary,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" gutterBottom>
            أنت على وشك رفض إضافة المكان: <strong>{selectedPlace?.name}</strong>
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 3, color: theme.colors.textSecondary }}
          >
            سيتم إعلام صاحب المكان بسبب الرفض لمساعدته في تحسين الطلب للموافقة
            عليه مستقبلاً.
          </Typography>
          <TextField
            autoFocus
            multiline
            rows={4}
            margin="dense"
            id="rejection-reason"
            label="سبب الرفض"
            fullWidth
            variant="outlined"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            required
            error={!rejectionReason.trim()}
            helperText={!rejectionReason.trim() ? "حقل مطلوب" : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "transparent",
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => !actionLoading && setRejectDialogOpen(false)}
            disabled={actionLoading}
            sx={{ color: theme.colors.textSecondary }}
          >
            إلغاء
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleReject}
            disabled={actionLoading || !rejectionReason.trim()}
          >
            {actionLoading ? <CircularProgress size={24} /> : "تأكيد الرفض"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Place Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: darkMode ? theme.colors.surface : "#fff",
            color: theme.colors.text,
            borderRadius: "12px",
          },
        }}
      >
        {selectedPlace && (
          <>
            <DialogTitle
              sx={{
                borderBottom: "1px solid",
                borderColor: theme.colors.border,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StorefrontIcon sx={{ mr: 1, color: theme.colors.primary }} />
                <Typography variant="h6">{selectedPlace.name}</Typography>
              </Box>
              <IconButton
                aria-label="close"
                onClick={() => setDetailsDialogOpen(false)}
                sx={{ color: theme.colors.textSecondary }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 3, pb: 1 }}>
              <Grid container spacing={3}>
                {/* Image gallery */}
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      position: "relative",
                      height: 300,
                      backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "#f5f5f5",
                      borderRadius: "8px",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectedPlace.images && selectedPlace.images.length > 0 ? (
                      <>
                        <img
                          src={selectedPlace.images[currentImageIndex]}
                          alt={`${selectedPlace.name} - صورة ${
                            currentImageIndex + 1
                          }`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                        {selectedPlace.images.length > 1 && (
                          <>
                            <IconButton
                              sx={{
                                position: "absolute",
                                right: 8,
                                top: "50%",
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                },
                              }}
                              onClick={handleNextImage}
                            >
                              <ArrowForwardIcon />
                            </IconButton>
                            <IconButton
                              sx={{
                                position: "absolute",
                                left: 8,
                                top: "50%",
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                },
                              }}
                              onClick={handlePreviousImage}
                            >
                              <ArrowBackIcon />
                            </IconButton>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 8,
                                right: 8,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "white",
                                px: 1,
                                py: 0.5,
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                              }}
                            >
                              {currentImageIndex + 1} /{" "}
                              {selectedPlace.images.length}
                            </Box>
                          </>
                        )}
                      </>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        لا توجد صور متاحة
                      </Typography>
                    )}
                  </Paper>

                  {/* Image thumbnails */}
                  {selectedPlace.images && selectedPlace.images.length > 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        mt: 2,
                        gap: 1,
                        overflowX: "auto",
                        pb: 1,
                      }}
                    >
                      {selectedPlace.images.map((img, idx) => (
                        <Box
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          sx={{
                            width: 60,
                            height: 60,
                            flexShrink: 0,
                            borderRadius: "4px",
                            overflow: "hidden",
                            cursor: "pointer",
                            border:
                              idx === currentImageIndex
                                ? "2px solid"
                                : "2px solid transparent",
                            borderColor:
                              idx === currentImageIndex
                                ? theme.colors.primary
                                : "transparent",
                          }}
                        >
                          <img
                            src={img}
                            alt={`${selectedPlace.name} - صورة ${idx + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Grid>

                {/* Place details */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 0.5 }}
                    >
                      الفئة
                    </Typography>
                    <Chip
                      icon={<CategoryIcon />}
                      label={getCategoryLabel(selectedPlace.category)}
                      sx={{
                        backgroundColor: darkMode
                          ? "rgba(59, 88, 152, 0.1)"
                          : "rgba(59, 88, 152, 0.1)",
                        color: theme.colors.primary,
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 0.5 }}
                    >
                      الوصف
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedPlace.description}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
                  >
                    <LocationOnIcon
                      sx={{ color: theme.colors.primary, mr: 1, mt: 0.3 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        العنوان
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedPlace.address}, {selectedPlace.city}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
                  >
                    <PhoneIcon
                      sx={{ color: theme.colors.primary, mr: 1, mt: 0.3 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        رقم الهاتف
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedPlace.phone || "غير متاح"}
                      </Typography>
                    </Box>
                  </Box>

                  {selectedPlace.email && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 1.5,
                      }}
                    >
                      <EmailIcon
                        sx={{ color: theme.colors.primary, mr: 1, mt: 0.3 }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          البريد الإلكتروني
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedPlace.email}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {selectedPlace.website && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 1.5,
                      }}
                    >
                      <LanguageIcon
                        sx={{ color: theme.colors.primary, mr: 1, mt: 0.3 }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          الموقع الإلكتروني
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedPlace.website}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {(selectedPlace.weekdayHours ||
                    selectedPlace.weekendHours) && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 1.5,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{ color: theme.colors.primary, mr: 1, mt: 0.3 }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          مواعيد العمل
                        </Typography>
                        {selectedPlace.weekdayHours && (
                          <Typography variant="body2" color="text.secondary">
                            أيام الأسبوع: {selectedPlace.weekdayHours.from} -{" "}
                            {selectedPlace.weekdayHours.to}
                          </Typography>
                        )}
                        {selectedPlace.weekendHours && (
                          <Typography variant="body2" color="text.secondary">
                            عطلة نهاية الأسبوع:{" "}
                            {selectedPlace.weekendHours.from} -{" "}
                            {selectedPlace.weekendHours.to}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}

                  {selectedPlace.amenities &&
                    selectedPlace.amenities.length > 0 && (
                      <Box sx={{ mb: 1.5 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", mb: 0.5 }}
                        >
                          المرافق والخدمات
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {selectedPlace.amenities.map((amenity, idx) => (
                            <Chip
                              key={idx}
                              label={amenity.label}
                              size="small"
                              sx={{
                                backgroundColor: darkMode
                                  ? "rgba(255,255,255,0.05)"
                                  : "rgba(0,0,0,0.05)",
                                color: theme.colors.text,
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions
              sx={{
                p: 2,
                borderTop: "1px solid",
                borderColor: theme.colors.border,
              }}
            >
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={() => {
                  setDetailsDialogOpen(false);
                  openRejectDialog(selectedPlace);
                }}
                sx={{
                  borderColor: "#f44336",
                  color: "#f44336",
                }}
              >
                رفض
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckCircleIcon />}
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleApprove(selectedPlace._id);
                }}
                sx={{
                  backgroundColor: darkMode ? theme.colors.primary : "#4caf50",
                  "&:hover": {
                    backgroundColor: darkMode ? "#e69b54" : "#388e3c",
                  },
                }}
              >
                موافقة
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </AdminLayout>
  );
};

export default PendingPlaces;
