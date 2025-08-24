"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// ...existing code...
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
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Divider,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { motion } from "framer-motion";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AllPlaces = () => {
  const { darkMode, theme } = useTheme();
  const router = useRouter();

  // State
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Categories for filter
  const categories = [
    { value: "all", label: "جميع الفئات" },
    { value: "restaurants", label: "مطاعم وكافيهات" },
    { value: "tourism", label: "أماكن سياحية" },
    { value: "hotels", label: "فنادق ومنتجعات" },
    { value: "shopping", label: "تسوق ومولات" },
    { value: "entertainment", label: "أنشطة ترفيهية" },
    { value: "museums", label: "متاحف ومعارض" },
  ];

  // Fetch all places
  useEffect(() => {
    const fetchAllPlaces = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:4000/api/admin/places/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlaces(response.data);
        setFilteredPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.");
        if (error.response && error.response.status === 403) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlaces();
  }, [router]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    filterPlaces(newValue, searchQuery, categoryFilter);
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterPlaces(tabValue, query, categoryFilter);
  };

  // Handle category filter
  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    filterPlaces(tabValue, searchQuery, category);
  };

  // Filter places based on status, search query, and category
  const filterPlaces = (status, query, category) => {
    let filtered = [...places];

    // Filter by status
    if (status !== "all") {
      if (status === "approved") {
        filtered = filtered.filter((place) => place.isApproved === true);
      } else if (status === "pending") {
        filtered = filtered.filter(
          (place) => place.isApproved === false && !place.rejectionReason
        );
      } else if (status === "rejected") {
        filtered = filtered.filter(
          (place) => place.isApproved === false && place.rejectionReason
        );
      }
    }

    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        (place) =>
          place.name.toLowerCase().includes(lowercaseQuery) ||
          place.address.toLowerCase().includes(lowercaseQuery) ||
          place.city.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((place) => place.category === category);
    }

    setFilteredPlaces(filtered);
  };

  // Get status chip for each place
  const getStatusChip = (place) => {
    if (place.isApproved) {
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="تمت الموافقة"
          color="success"
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      );
    } else if (place.rejectionReason) {
      return (
        <Chip
          icon={<CancelIcon />}
          label="مرفوض"
          color="error"
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      );
    } else {
      return (
        <Chip
          icon={<PendingIcon />}
          label="قيد المراجعة"
          color="warning"
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      );
    }
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const foundCategory = categories.find((cat) => cat.value === category);
    return foundCategory ? foundCategory.label : category;
  };

  // View place details
  const viewPlaceDetails = (placeId) => {
    router.push(`/admin/places/${placeId}`);
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
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
        }}
      >
        <div>
          <Typography variant="h4" component="h1" fontWeight="bold">
            جميع الأماكن
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            عرض وإدارة جميع الأماكن المُسجلة من قِبل البائعين
          </Typography>
        </div>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            placeholder="بحث..."
            value={searchQuery}
            onChange={handleSearch}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: "100%", sm: 200 } }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="category-filter-label">تصفية حسب الفئة</InputLabel>
            <Select
              labelId="category-filter-label"
              value={categoryFilter}
              label="تصفية حسب الفئة"
              onChange={handleCategoryFilter}
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon />
                </InputAdornment>
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Paper sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              py: 2,
              fontSize: "1rem",
              fontWeight: "bold",
            },
          }}
        >
          <Tab value="all" label={`الكل (${places.length})`} />
          <Tab
            value="approved"
            label={`تمت الموافقة (${
              places.filter((p) => p.isApproved).length
            })`}
            icon={<CheckCircleIcon />}
            iconPosition="start"
          />
          <Tab
            value="pending"
            label={`قيد المراجعة (${
              places.filter((p) => !p.isApproved && !p.rejectionReason).length
            })`}
            icon={<PendingIcon />}
            iconPosition="start"
          />
          <Tab
            value="rejected"
            label={`مرفوضة (${
              places.filter((p) => !p.isApproved && p.rejectionReason).length
            })`}
            icon={<CancelIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {filteredPlaces.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "#f7f9fc",
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
            لا توجد أماكن مطابقة لمعايير البحث!
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            جرب تغيير معايير التصفية أو البحث للعثور على النتائج
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredPlaces.map((place) => (
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
                    backgroundColor: darkMode ? theme.colors.surface : "#fff",
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

                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Chip
                      label={getCategoryLabel(place.category)}
                      size="small"
                      sx={{
                        backgroundColor: darkMode ? "#3b5898CC" : "#3b5898CC",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                    }}
                  >
                    {getStatusChip(place)}
                  </Box>

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

                    <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
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

                    <Button
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      onClick={() => viewPlaceDetails(place._id)}
                      fullWidth
                      sx={{
                        backgroundColor: theme.colors.primary,
                        "&:hover": {
                          backgroundColor: darkMode
                            ? theme.colors.primaryDark
                            : theme.colors.primaryLight,
                        },
                      }}
                    >
                      عرض التفاصيل
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </AdminLayout>
  );
};

export default AllPlaces;
