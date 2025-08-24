"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Divider,
  IconButton,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Container,
} from "@mui/material";
import { useTheme } from "../../../context/ThemeContext";
import AdminLayout from "../../../components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HistoryIcon from "@mui/icons-material/History";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AccessibleIcon from "@mui/icons-material/Accessible";
import CloseIcon from "@mui/icons-material/Close";

const PlaceDetails = () => {
  const { darkMode, theme } = useTheme();
  const router = useRouter();
  const params = useParams();
  const placeId = params.id;

  // State variables
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [seller, setSeller] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  // Fetch place details on component mount
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/api/admin/places/${placeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlace(response.data);
        if (response.data.seller_id) {
          setSeller(response.data.seller_id);
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
        setError("فشل في تحميل بيانات المكان. يرجى المحاولة مرة أخرى.");
        if (error.response && error.response.status === 403) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (placeId) {
      fetchPlaceDetails();
    }
  }, [placeId, router]);

  // Handle image navigation
  const handleNextImage = () => {
    if (place && place.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === place.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (place && place.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? place.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Convert category to readable format
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

  // Handle approve action
  const handleApprove = async () => {
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

      // Update the place status in the state
      setPlace((prevPlace) => ({
        ...prevPlace,
        isApproved: true,
      }));

      setActionSuccess("تمت الموافقة على المكان بنجاح");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setActionSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error approving place:", error);
      setError("فشل في الموافقة على المكان. يرجى المحاولة مرة أخرى.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle reject action
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      return;
    }

    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:4000/api/admin/places/${placeId}/reject`,
        { rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the place in the state
      setPlace((prevPlace) => ({
        ...prevPlace,
        isApproved: false,
        rejectionReason,
      }));

      setRejectDialogOpen(false);
      setRejectionReason("");
      setActionSuccess("تم رفض المكان بنجاح");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setActionSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error rejecting place:", error);
      setError("فشل في رفض المكان. يرجى المحاولة مرة أخرى.");
    } finally {
      setActionLoading(false);
    }
  };

  // Open reject dialog
  const openRejectDialog = () => {
    setRejectionReason(place.rejectionReason || "");
    setRejectDialogOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress color="primary" />
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

  if (!place) {
    return (
      <AdminLayout>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">لم يتم العثور على هذا المكان</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/admin/all-places")}
            sx={{ mt: 2 }}
          >
            العودة إلى قائمة الأماكن
          </Button>
        </Paper>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            العودة
          </Button>

          {actionSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {actionSuccess}
            </Alert>
          )}

          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: darkMode ? theme.colors.surface : "#fff",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CategoryIcon sx={{ color: theme.colors.primary, mr: 1 }} />
                    <Typography variant="h4" component="h1" fontWeight="bold">
                      {place.name}
                    </Typography>
                  </Box>

                  <Box>
                    {place.isApproved ? (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="تمت الموافقة"
                        color="success"
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      />
                    ) : place.rejectionReason ? (
                      <Chip
                        icon={<CancelIcon />}
                        label="مرفوض"
                        color="error"
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      />
                    ) : (
                      <Chip
                        icon={<HistoryIcon />}
                        label="قيد المراجعة"
                        color="warning"
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Images */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    position: "relative",
                    height: 400,
                    backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "#f5f5f5",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {place.images && place.images.length > 0 ? (
                    <>
                      <img
                        src={place.images[currentImageIndex]}
                        alt={`${place.name} - صورة ${currentImageIndex + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                      {place.images.length > 1 && (
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
                            {currentImageIndex + 1} / {place.images.length}
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
                {place.images && place.images.length > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      mt: 2,
                      gap: 1,
                      overflowX: "auto",
                      pb: 1,
                    }}
                  >
                    {place.images.map((img, idx) => (
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
                          alt={`${place.name} - صورة ${idx + 1}`}
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

                {/* Seller Information */}
                {seller && (
                  <Card sx={{ mt: 3, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        معلومات البائع
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        {seller.profileImage ? (
                          <Box
                            component="img"
                            src={seller.profileImage}
                            alt={`${seller.firstname} ${seller.lastname}`}
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: theme.colors.primary,
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                            }}
                          >
                            {seller.firstname.charAt(0)}
                            {seller.lastname.charAt(0)}
                          </Box>
                        )}
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {seller.firstname} {seller.lastname}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {seller.email}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Grid>

              {/* Details */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    تفاصيل المكان
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={<CategoryIcon />}
                      label={getCategoryLabel(place.category)}
                      sx={{
                        backgroundColor: darkMode
                          ? "rgba(59, 88, 152, 0.1)"
                          : "rgba(59, 88, 152, 0.1)",
                        color: theme.colors.primary,
                        fontWeight: "bold",
                        mb: 2,
                      }}
                    />

                    <Typography variant="body1" paragraph>
                      {place.description}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon sx={{ color: theme.colors.primary }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="العنوان"
                        secondary={`${place.address}، ${place.city}`}
                      />
                    </ListItem>

                    {place.phone && (
                      <ListItem>
                        <ListItemIcon>
                          <PhoneIcon sx={{ color: theme.colors.primary }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="رقم الهاتف"
                          secondary={place.phone}
                        />
                      </ListItem>
                    )}

                    {place.email && (
                      <ListItem>
                        <ListItemIcon>
                          <EmailIcon sx={{ color: theme.colors.primary }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="البريد الإلكتروني"
                          secondary={place.email}
                        />
                      </ListItem>
                    )}

                    {place.website && (
                      <ListItem>
                        <ListItemIcon>
                          <LanguageIcon sx={{ color: theme.colors.primary }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="الموقع الإلكتروني"
                          secondary={place.website}
                        />
                      </ListItem>
                    )}

                    {place.priceRange && (
                      <ListItem>
                        <ListItemIcon>
                          <AttachMoneyIcon
                            sx={{ color: theme.colors.primary }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="متوسط الأسعار"
                          secondary={place.priceRange}
                        />
                      </ListItem>
                    )}

                    {(place.weekdayHours || place.weekendHours) && (
                      <ListItem>
                        <ListItemIcon>
                          <AccessTimeIcon
                            sx={{ color: theme.colors.primary }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="مواعيد العمل"
                          secondary={
                            <>
                              {place.weekdayHours && (
                                <Typography
                                  variant="body2"
                                  component="span"
                                  display="block"
                                >
                                  أيام الأسبوع: {place.weekdayHours.from} -{" "}
                                  {place.weekdayHours.to}
                                </Typography>
                              )}
                              {place.weekendHours && (
                                <Typography variant="body2" component="span">
                                  عطلة نهاية الأسبوع: {place.weekendHours.from}{" "}
                                  - {place.weekendHours.to}
                                </Typography>
                              )}
                            </>
                          }
                        />
                      </ListItem>
                    )}

                    {place.hasParkingSpace && (
                      <ListItem>
                        <ListItemIcon>
                          <LocalParkingIcon
                            sx={{ color: theme.colors.primary }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="مواقف سيارات"
                          secondary="متوفر"
                        />
                      </ListItem>
                    )}

                    {place.isAccessible && (
                      <ListItem>
                        <ListItemIcon>
                          <AccessibleIcon
                            sx={{ color: theme.colors.primary }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="مناسب لذوي الاحتياجات الخاصة"
                          secondary="نعم"
                        />
                      </ListItem>
                    )}
                  </List>

                  {/* Amenities */}
                  {place.amenities && place.amenities.length > 0 && (
                    <Box sx={{ mb: 3, mt: 2 }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        المرافق والخدمات
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {place.amenities.map((amenity, idx) => (
                          <Chip
                            key={idx}
                            label={
                              typeof amenity === "string"
                                ? amenity
                                : amenity.label
                            }
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

                  {/* Rejection reason if place is rejected */}
                  {place.rejectionReason && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        سبب الرفض:
                      </Typography>
                      <Typography variant="body2">
                        {place.rejectionReason}
                      </Typography>
                    </Alert>
                  )}

                  {/* Action buttons */}
                  <Box
                    sx={{
                      mt: 3,
                      pt: 2,
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      borderTop: "1px solid",
                      borderColor: theme.colors.border,
                    }}
                  >
                    {!place.isApproved && !place.rejectionReason && (
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={openRejectDialog}
                        disabled={actionLoading}
                      >
                        رفض
                      </Button>
                    )}

                    {place.rejectionReason && !place.isApproved && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CheckCircleIcon />}
                        onClick={handleApprove}
                        disabled={actionLoading}
                        sx={{
                          backgroundColor: darkMode
                            ? theme.colors.primary
                            : "#4caf50",
                          "&:hover": {
                            backgroundColor: darkMode ? "#e69b54" : "#388e3c",
                          },
                        }}
                      >
                        الموافقة بعد التعديل
                      </Button>
                    )}

                    {!place.isApproved && !place.rejectionReason && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CheckCircleIcon />}
                        onClick={handleApprove}
                        disabled={actionLoading}
                        sx={{
                          backgroundColor: darkMode
                            ? theme.colors.primary
                            : "#4caf50",
                          "&:hover": {
                            backgroundColor: darkMode ? "#e69b54" : "#388e3c",
                          },
                        }}
                      >
                        موافقة
                      </Button>
                    )}

                    {place.isApproved && (
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={openRejectDialog}
                        disabled={actionLoading}
                      >
                        إلغاء الموافقة
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {place.isApproved
            ? "إلغاء الموافقة على المكان"
            : "رفض طلب إضافة مكان"}
          <IconButton
            aria-label="close"
            onClick={() => !actionLoading && setRejectDialogOpen(false)}
            sx={{ color: theme.colors.textSecondary }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" gutterBottom>
            {place.isApproved
              ? "أنت على وشك إلغاء الموافقة على المكان:"
              : "أنت على وشك رفض إضافة المكان:"}{" "}
            <strong>{place.name}</strong>
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
            {actionLoading ? <CircularProgress size={24} /> : "تأكيد"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default PlaceDetails;
