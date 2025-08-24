"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";
import { useTheme } from "../context/ThemeContext";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import dayjs from "dayjs";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// MUI Components
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Skeleton,
  Tooltip as MuiTooltip,
  Badge,
  Divider,
  Alert,
  ButtonGroup,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// MUI Icons
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PhotoIcon from "@mui/icons-material/Photo";
import CommentIcon from "@mui/icons-material/Comment";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import BarChartIcon from "@mui/icons-material/BarChart";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

// Sample data for places
const samplePlaces = [
  {
    id: 1,
    name: "كافيه السعادة",
    category: "مطاعم وكافيهات",
    description:
      "كافيه مميز في وسط المدينة يقدم أشهى المشروبات والحلويات في أجواء هادئة ومريحة.",
    address: "القاهرة, شارع المعز, رقم 15",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
    ],
    stats: {
      views: 1245,
      visits: 328,
      ratings: 4.7,
      reviewsCount: 56,
    },
    createdAt: "2023-11-10T14:23:00Z",
    updatedAt: "2023-11-15T09:45:00Z",
    featured: true,
  },
  {
    id: 2,
    name: "فندق النيل",
    category: "فنادق ومنتجعات",
    description:
      "فندق 5 نجوم يطل على نهر النيل مباشرة، يقدم خدمات فاخرة وإطلالات ساحرة من جميع الغرف.",
    address: "القاهرة, كورنيش النيل, برج الماسة",
    status: "pending",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
    ],
    stats: {
      views: 830,
      visits: 125,
      ratings: 0,
      reviewsCount: 0,
    },
    createdAt: "2023-12-05T11:30:00Z",
    updatedAt: "2023-12-05T11:30:00Z",
    featured: false,
  },
  {
    id: 3,
    name: "متحف الحضارة المصرية",
    category: "متاحف ومعارض",
    description:
      "متحف يعرض آثار الحضارة المصرية القديمة والحديثة مع معروضات نادرة من مختلف العصور.",
    address: "القاهرة, مصر الجديدة, شارع التحرير",
    status: "rejected",
    images: [
      "https://images.unsplash.com/photo-1603750003385-3342231a1ff1?w=800&auto=format&fit=crop&q=80",
    ],
    stats: {
      views: 450,
      visits: 0,
      ratings: 0,
      reviewsCount: 0,
    },
    createdAt: "2023-10-20T09:15:00Z",
    updatedAt: "2023-10-25T14:20:00Z",
    featured: false,
    rejectionReason:
      "المعلومات غير كافية، يرجى إضافة المزيد من التفاصيل والصور",
  },
  {
    id: 4,
    name: "مركز التسوق الكبير",
    category: "تسوق ومولات",
    description:
      "مركز تسوق عصري يضم أكثر من 200 متجر لأشهر الماركات العالمية والمحلية مع مطاعم ومقاهي.",
    address: "الإسكندرية, طريق الكورنيش, بجوار فندق الشاطئ",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1677321303414-f41bfd5c46d5?w=800&auto=format&fit=crop&q=80",
    ],
    stats: {
      views: 2150,
      visits: 985,
      ratings: 4.2,
      reviewsCount: 128,
    },
    createdAt: "2023-09-12T10:00:00Z",
    updatedAt: "2023-09-15T16:30:00Z",
    featured: true,
  },
  {
    id: 5,
    name: "حديقة المغامرات",
    category: "أنشطة ترفيهية",
    description:
      "حديقة ملاهي ومغامرات للعائلات والأطفال تضم العاب حديثة وأنشطة متنوعة للجميع.",
    address: "الجيزة, طريق الأهرام, بجوار مول مصر",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80",
    ],
    stats: {
      views: 1756,
      visits: 672,
      ratings: 4.5,
      reviewsCount: 94,
    },
    createdAt: "2023-08-05T13:45:00Z",
    updatedAt: "2023-08-10T11:20:00Z",
    featured: false,
  },
];

// Status component to display place status with appropriate styling
const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: {
      label: "معتمد",
      color: "success",
      icon: <CheckCircleIcon fontSize="small" />,
    },
    pending: {
      label: "قيد المراجعة",
      color: "warning",
      icon: <PendingIcon fontSize="small" />,
    },
    rejected: {
      label: "مرفوض",
      color: "error",
      icon: <CancelIcon fontSize="small" />,
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      color={config.color}
      size="small"
      sx={{
        fontWeight: "bold",
        direction: "rtl",
        padding: "5px",
      }}
    />
  );
};

// Format date function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Enhance the main component with tabs for different views

const MyPlaces = () => {
  const { theme, darkMode } = useTheme();
  const router = useRouter();

  // State management
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const [activeTab, setActiveTab] = useState("grid");
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [batchActionMenu, setBatchActionMenu] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  // Handle selection of places for batch operations
  const handleSelectPlace = (placeId) => {
    setSelectedPlaces((prevSelected) => {
      if (prevSelected.includes(placeId)) {
        return prevSelected.filter((id) => id !== placeId);
      } else {
        return [...prevSelected, placeId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedPlaces.length === filteredPlaces.length) {
      setSelectedPlaces([]);
    } else {
      setSelectedPlaces(filteredPlaces.map((place) => place.id));
    }
  };

  const handleBatchAction = (action) => {
    // Logic for handling batch actions (delete, feature, etc)
    if (action === "delete") {
      // Show confirmation dialog for batch delete
      // ...
    } else if (action === "feature") {
      // Logic for featuring multiple places
      // ...
    }

    setBatchActionMenu(null);
  };

  // Load places data
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // This would be replaced with an actual API call
        setTimeout(() => {
          setPlaces(samplePlaces);
          setFilteredPlaces(samplePlaces);
          setLoading(false);
        }, 1200); // Simulate loading delay
      } catch (error) {
        console.error("Error fetching places:", error);
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...places];

    // Apply status filter
    if (activeFilter !== "all") {
      result = result.filter((place) => place.status === activeFilter);
    }

    // Apply search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (place) =>
          place.name.toLowerCase().includes(term) ||
          place.category.toLowerCase().includes(term) ||
          place.description.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let compareResult = 0;

      switch (sortBy) {
        case "name":
          compareResult = a.name.localeCompare(b.name);
          break;
        case "date":
          compareResult = new Date(b.updatedAt) - new Date(a.updatedAt);
          break;
        case "views":
          compareResult = b.stats.views - a.stats.views;
          break;
        case "visits":
          compareResult = b.stats.visits - a.stats.visits;
          break;
        default:
          compareResult = new Date(b.updatedAt) - new Date(a.updatedAt);
      }

      return sortDirection === "asc" ? -compareResult : compareResult;
    });

    setFilteredPlaces(result);
  }, [places, activeFilter, searchTerm, sortBy, sortDirection]);

  // Handler functions
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setFilterMenuAnchor(null);
  };

  const handleSortChange = (sort) => {
    if (sortBy === sort) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sort);
      setSortDirection("desc");
    }
    setSortMenuAnchor(null);
  };

  const handleOpenActionMenu = (event, placeId) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedPlaceId(placeId);
  };

  const handleCloseActionMenu = () => {
    setActionMenuAnchor(null);
    setSelectedPlaceId(null);
  };

  const handleDeleteClick = (placeId) => {
    setPlaceToDelete(placeId);
    setDeleteDialogOpen(true);
    handleCloseActionMenu();
  };

  const handleConfirmDelete = () => {
    // This would be replaced with an actual API call
    setPlaces(places.filter((place) => place.id !== placeToDelete));
    setDeleteDialogOpen(false);
    setPlaceToDelete(null);
    setSuccessMessage("تم حذف المكان بنجاح");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPlaceToDelete(null);
  };

  const handleEditPlace = (placeId) => {
    router.push(`/edit-place/${placeId}`);
    handleCloseActionMenu();
  };

  const handleAddPlace = () => {
    router.push("/add-place");
  };

  const handleFeaturePlace = (placeId) => {
    // This would be replaced with an actual API call
    const updatedPlaces = places.map((place) => {
      if (place.id === placeId) {
        return {
          ...place,
          featured: !place.featured,
        };
      }
      return place;
    });

    setPlaces(updatedPlaces);
    handleCloseActionMenu();

    const featuredStatus = updatedPlaces.find(
      (p) => p.id === placeId
    )?.featured;
    setSuccessMessage(
      featuredStatus ? "تم تمييز المكان بنجاح" : "تم إلغاء تمييز المكان بنجاح"
    );
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  // Calculate statistics
  const stats = {
    total: places.length,
    approved: places.filter((place) => place.status === "approved").length,
    pending: places.filter((place) => place.status === "pending").length,
    rejected: places.filter((place) => place.status === "rejected").length,
    featured: places.filter((place) => place.featured).length,
    totalViews: places.reduce((total, place) => total + place.stats.views, 0),
    totalVisits: places.reduce((total, place) => total + place.stats.visits, 0),
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <PageContainer>
      {/* Statistics Section */}
      <StatsContainer>
        <StatsCard $darkMode={darkMode} $theme={theme}>
          <StatsIconWrapper $darkMode={darkMode} $color={theme.colors.primary}>
            <StorefrontIcon />
          </StatsIconWrapper>
          <StatsContent>
            <StatsValue $darkMode={darkMode} $theme={theme}>
              {stats.total}
            </StatsValue>
            <StatsLabel $darkMode={darkMode} $theme={theme}>
              إجمالي الأماكن
            </StatsLabel>
          </StatsContent>
        </StatsCard>

        <StatsCard $darkMode={darkMode} $theme={theme}>
          <StatsIconWrapper $darkMode={darkMode} $color="#4CAF50">
            <CheckCircleIcon />
          </StatsIconWrapper>
          <StatsContent>
            <StatsValue $darkMode={darkMode} $theme={theme}>
              {stats.approved}
            </StatsValue>
            <StatsLabel $darkMode={darkMode} $theme={theme}>
              تم الموافقة عليها
            </StatsLabel>
          </StatsContent>
        </StatsCard>

        <StatsCard $darkMode={darkMode} $theme={theme}>
          <StatsIconWrapper $darkMode={darkMode} $color="#FF9800">
            <PendingIcon />
          </StatsIconWrapper>
          <StatsContent>
            <StatsValue $darkMode={darkMode} $theme={theme}>
              {stats.pending}
            </StatsValue>
            <StatsLabel $darkMode={darkMode} $theme={theme}>
              قيد المراجعة
            </StatsLabel>
          </StatsContent>
        </StatsCard>

        <StatsCard $darkMode={darkMode} $theme={theme}>
          <StatsIconWrapper $darkMode={darkMode} $color={theme.colors.primary}>
            <VisibilityIcon />
          </StatsIconWrapper>
          <StatsContent>
            <StatsValue $darkMode={darkMode} $theme={theme}>
              {stats.totalViews.toLocaleString()}
            </StatsValue>
            <StatsLabel $darkMode={darkMode} $theme={theme}>
              المشاهدات
            </StatsLabel>
          </StatsContent>
        </StatsCard>

        <StatsCard $darkMode={darkMode} $theme={theme}>
          <StatsIconWrapper $darkMode={darkMode} $color="#4A72AC">
            <PersonIcon />
          </StatsIconWrapper>
          <StatsContent>
            <StatsValue $darkMode={darkMode} $theme={theme}>
              {stats.totalVisits.toLocaleString()}
            </StatsValue>
            <StatsLabel $darkMode={darkMode} $theme={theme}>
              الزيارات
            </StatsLabel>
          </StatsContent>
        </StatsCard>
      </StatsContainer>

      {/* <AnalyticsSection /> */}

      <InsightsSection places={places} darkMode={darkMode} theme={theme} />

      {/* Controls Section */}
      <ActionsContainer>
        <SearchBox>
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="البحث عن مكان..."
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: darkMode
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(0,0,0,0.5)",
                    }}
                  />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "12px",
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: theme.colors.primary + "40",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.colors.primary,
                },
              },
            }}
          />
        </SearchBox>

        <ActionsButtonGroup>
          {/* View mode tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              minHeight: "42px",
              bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              borderRadius: "12px",
              padding: "4px",
              "& .MuiTab-root": {
                minHeight: "42px",
                pt: 0,
                pb: 0,
                color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                transition: "all 0.2s ease",
                "&.Mui-selected": {
                  color: theme.colors.primary,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: theme.colors.primary,
                height: "3px",
                borderRadius: "1.5px",
              },
            }}
          >
            <Tab
              icon={<ViewModuleIcon />}
              value="grid"
              aria-label="grid view"
              sx={{
                minWidth: "auto",
                borderRadius: "8px",
                "&.Mui-selected": {
                  bgcolor: darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                },
              }}
            />
            <Tab
              icon={<ViewListIcon />}
              value="list"
              aria-label="list view"
              sx={{
                minWidth: "auto",
                borderRadius: "8px",
                "&.Mui-selected": {
                  bgcolor: darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                },
              }}
            />
          </Tabs>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          {/* Filter and sort buttons */}
          <FilterButton
            variant="outlined"
            onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
            endIcon={<FilterListIcon />}
            $darkMode={darkMode}
            $theme={theme}
          >
            تصفية
          </FilterButton>

          <FilterButton
            variant="outlined"
            onClick={(e) => setSortMenuAnchor(e.currentTarget)}
            endIcon={<SortIcon />}
            $darkMode={darkMode}
            $theme={theme}
          >
            {sortDirection === "asc" ? "تصاعدي" : "تنازلي"}
          </FilterButton>

          {/* Batch actions for selected places */}
          {selectedPlaces.length > 0 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mr: 2 }}>
              <Typography variant="body2">
                تم تحديد {selectedPlaces.length}{" "}
                {selectedPlaces.length === 1 ? "مكان" : "أماكن"}
              </Typography>
              <Button
                variant="outlined"
                onClick={(e) => setBatchActionMenu(e.currentTarget)}
                startIcon={<MoreVertIcon />}
                size="small"
                sx={{ direction: "ltr" }}
              >
                إجراء
              </Button>
              <IconButton onClick={() => setSelectedPlaces([])} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}

          <AddButton
            variant="contained"
            onClick={handleAddPlace}
            startIcon={<AddBusinessIcon sx={{ ml: "8px" }} />}
            $darkMode={darkMode}
            $theme={theme}
          >
            إضافة مكان جديد
          </AddButton>
        </ActionsButtonGroup>
      </ActionsContainer>

      {/* Places List Section with Selection Support */}
      {loading ? (
        <LoadingPlaceCards darkMode={darkMode} theme={theme} />
      ) : filteredPlaces.length > 0 ? (
        <Box sx={{ position: "relative" }}>
          {activeTab === "grid" && (
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      selectedPlaces.length === filteredPlaces.length &&
                      filteredPlaces.length > 0
                    }
                    indeterminate={
                      selectedPlaces.length > 0 &&
                      selectedPlaces.length < filteredPlaces.length
                    }
                    onChange={handleSelectAll}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    تحديد الكل ({filteredPlaces.length})
                  </Typography>
                }
              />

              <Typography variant="body2" color="textSecondary">
                إجمالي النتائج: {filteredPlaces.length}
              </Typography>
            </Box>
          )}

          {activeTab === "grid" && (
            <CardsContainer>
              <AnimatePresence>
                {filteredPlaces.map((place) => (
                  <motion.div
                    key={place.id}
                    variants={itemVariants}
                    layout
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Checkbox
                        checked={selectedPlaces.includes(place.id)}
                        onChange={() => handleSelectPlace(place.id)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          zIndex: 2,
                          bgcolor: "rgba(255, 255, 255, 0.7)",
                          borderRadius: "50%",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.9)",
                          },
                        }}
                      />
                      <EnhancedPlaceCard
                        place={place}
                        onEdit={handleEditPlace}
                        onDelete={() => handleDeleteClick(place.id)}
                        onToggleFeature={handleFeaturePlace}
                        onView={() => handleViewDetails(place.id)}
                        darkMode={darkMode}
                        theme={theme}
                        className="place-card"
                      />
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardsContainer>
          )}

          {activeTab === "list" && (
            <TableContainer
              component={Paper}
              sx={{
                overflow: "auto",
                borderRadius: 3,
                boxShadow: darkMode
                  ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                  : "0 4px 20px rgba(0, 0, 0, 0.08)",
                backgroundColor: darkMode ? theme.colors.surface : "#ffffff",
                "& .MuiTable-root": {
                  backgroundColor: darkMode ? theme.colors.surface : "#ffffff",
                },
              }}
            >
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: darkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.02)",
                      "& th": {
                        color: darkMode
                          ? theme.colors.text
                          : "rgba(0, 0, 0, 0.87)",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        borderBottom: darkMode
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedPlaces.length === filteredPlaces.length &&
                          filteredPlaces.length > 0
                        }
                        indeterminate={
                          selectedPlaces.length > 0 &&
                          selectedPlaces.length < filteredPlaces.length
                        }
                        onChange={handleSelectAll}
                        sx={{
                          color: darkMode
                            ? "rgba(255, 255, 255, 0.3)"
                            : undefined,
                          "&.Mui-checked": {
                            color: theme.colors.primary,
                          },
                          "&.MuiCheckbox-indeterminate": {
                            color: theme.colors.primary,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">المكان</TableCell>
                    <TableCell align="center">الفئة</TableCell>
                    <TableCell align="center">الحالة</TableCell>
                    <TableCell align="center">المشاهدات</TableCell>
                    <TableCell align="center">الزيارات</TableCell>
                    <TableCell align="center">التقييم</TableCell>
                    <TableCell style={{ width: 125 }}>تاريخ التحديث</TableCell>
                    <TableCell align="center">الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    "& .MuiTableRow-root": {
                      "&:hover": {
                        backgroundColor: darkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.02)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: darkMode
                          ? `${theme.colors.primary}20`
                          : `${theme.colors.primary}10`,
                        "&:hover": {
                          backgroundColor: darkMode
                            ? `${theme.colors.primary}30`
                            : `${theme.colors.primary}20`,
                        },
                      },
                    },
                    "& .MuiTableCell-root": {
                      color: darkMode ? theme.colors.text : undefined,
                      borderBottom: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.08)"
                        : undefined,
                    },
                  }}
                >
                  {filteredPlaces.map((place) => (
                    <TableRow
                      key={place.id}
                      hover
                      selected={selectedPlaces.includes(place.id)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedPlaces.includes(place.id)}
                          onChange={() => handleSelectPlace(place.id)}
                          sx={{
                            color: darkMode
                              ? "rgba(255, 255, 255, 0.3)"
                              : undefined,
                            "&.Mui-checked": {
                              color: theme.colors.primary,
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          src={place.images[0]}
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                        />
                        <Box style={{ textAlign: "right", width: "150px" }}>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            sx={{
                              color: darkMode ? theme.colors.text : undefined,
                            }}
                          >
                            {place.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: darkMode
                                ? theme.colors.textSecondary
                                : "text.secondary",
                            }}
                          >
                            {place.address}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{place.category}</TableCell>
                      <TableCell>
                        <StatusBadge status={place.status} />
                      </TableCell>
                      <TableCell align="right">
                        {place.stats.views.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {place.stats.visits.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {place.stats.ratings > 0 ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Typography variant="body2" mr={0.5}>
                              {place.stats.ratings.toFixed(1)}
                            </Typography>
                            <StarIcon sx={{ color: "#FFC107", fontSize: 16 }} />
                          </Box>
                        ) : (
                          <Typography
                            sx={{
                              color: darkMode
                                ? "rgba(255, 255, 255, 0.5)"
                                : "rgba(0, 0, 0, 0.38)",
                            }}
                          >
                            -
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(place.updatedAt)}</TableCell>
                      <TableCell style={{ width: 150 }}>
                        <IconButton
                          onClick={() => handleEditPlace(place.id)}
                          size="small"
                          sx={{
                            color: darkMode ? theme.colors.text : undefined,
                            "&:hover": {
                              backgroundColor: darkMode
                                ? "rgba(255, 255, 255, 0.1)"
                                : undefined,
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(place.id)}
                          size="small"
                          sx={{
                            "&:hover": {
                              backgroundColor: darkMode
                                ? "rgba(255, 0, 0, 0.1)"
                                : undefined,
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleViewDetails(place.id)}
                          size="small"
                          sx={{
                            color: darkMode ? theme.colors.primary : undefined,
                            "&:hover": {
                              backgroundColor: darkMode
                                ? `${theme.colors.primary}20`
                                : undefined,
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ) : (
        <EmptyState darkMode={darkMode} theme={theme} />
      )}

      {/* Batch action menu */}
      <Menu
        anchorEl={batchActionMenu}
        open={Boolean(batchActionMenu)}
        onClose={() => setBatchActionMenu(null)}
      >
        <MenuItem onClick={() => handleBatchAction("feature")} dense>
          <ListItemIcon>
            <StarIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>تمييز المحدد</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleBatchAction("download")} dense>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>تصدير بيانات المحدد</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => handleBatchAction("delete")}
          dense
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>حذف المحدد</ListItemText>
        </MenuItem>
      </Menu>

      {/* Action menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleCloseActionMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {selectedPlaceId &&
          places.find((p) => p.id === selectedPlaceId)?.status ===
            "approved" && (
            <MenuItem onClick={() => handleFeaturePlace(selectedPlaceId)} dense>
              {places.find((p) => p.id === selectedPlaceId)?.featured ? (
                <>
                  <StarBorderIcon fontSize="small" sx={{ ml: 1 }} />
                  إلغاء التمييز
                </>
              ) : (
                <>
                  <StarIcon fontSize="small" sx={{ ml: 1 }} />
                  تمييز المكان
                </>
              )}
            </MenuItem>
          )}
        <MenuItem onClick={() => handleEditPlace(selectedPlaceId)} dense>
          <EditIcon fontSize="small" sx={{ ml: 1 }} />
          تعديل المكان
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteClick(selectedPlaceId)}
          dense
          sx={{ color: "error.main" }}
        >
          <DeleteIcon fontSize="small" sx={{ ml: 1 }} />
          حذف المكان
        </MenuItem>
      </Menu>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
        dir="rtl"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>تأكيد حذف المكان</DialogTitle>
        <DialogContent>
          <DialogContentText>
            هل أنت متأكد من أنك تريد حذف هذا المكان؟ لا يمكن التراجع عن هذه
            العملية.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleCancelDelete} variant="outlined">
            إلغاء
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{ mr: 1 }}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              maxWidth: "90%",
              width: "auto",
            }}
          >
            <Alert
              severity="success"
              variant="filled"
              sx={{
                borderRadius: 2,
                boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
              }}
            >
              {successMessage}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

// Analytics Section
// const AnalyticsSection = () => {
//   const [timeRange, setTimeRange] = useState("week");
//   const [analyticsType, setAnalyticsType] = useState("views");

//   // Generate sample data - would be replaced with actual API data
//   const data = useMemo(() => {
//     const ranges = {
//       week: 7,
//       month: 30,
//       year: 12,
//     };

//     if (timeRange === "year") {
//       return Array.from({ length: ranges[timeRange] }, (_, i) => ({
//         name: format(new Date(2025, i, 1), "MMM", { locale: ar }),
//         views: Math.floor(Math.random() * 1000) + 500,
//         visits: Math.floor(Math.random() * 500) + 100,
//       }));
//     }

//     return Array.from({ length: ranges[timeRange] }, (_, i) => {
//       const date =
//         timeRange === "week"
//           ? format(new Date(2025, 3, i + 1), "E", { locale: ar })
//           : format(new Date(2025, 3, i + 1), "d MMM", { locale: ar });

//       return {
//         name: date,
//         views: Math.floor(Math.random() * 100) + 20,
//         visits: Math.floor(Math.random() * 50) + 5,
//       };
//     });
//   }, [timeRange]);

//   return (
//     <AnalyticsContainer>
//       <AnalyticsHeader>
//         <Typography variant="h5" fontWeight="bold">
//           تحليلات الأداء
//         </Typography>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <ButtonGroup>
//             <Button
//               onClick={() => setTimeRange("week")}
//               variant={timeRange === "week" ? "contained" : "outlined"}
//               size="small"
//             >
//               أسبوع
//             </Button>
//             <Button
//               onClick={() => setTimeRange("month")}
//               variant={timeRange === "month" ? "contained" : "outlined"}
//               size="small"
//             >
//               شهر
//             </Button>
//             <Button
//               onClick={() => setTimeRange("year")}
//               variant={timeRange === "year" ? "contained" : "outlined"}
//               size="small"
//             >
//               سنة
//             </Button>
//           </ButtonGroup>

//           <ButtonGroup>
//             <Button
//               onClick={() => setAnalyticsType("views")}
//               variant={analyticsType === "views" ? "contained" : "outlined"}
//               size="small"
//             >
//               المشاهدات
//             </Button>
//             <Button
//               onClick={() => setAnalyticsType("visits")}
//               variant={analyticsType === "visits" ? "contained" : "outlined"}
//               size="small"
//             >
//               الزيارات
//             </Button>
//           </ButtonGroup>
//         </Box>
//       </AnalyticsHeader>

//       <Box sx={{ height: 300, width: "100%" }}>
//         <ResponsiveContainer>
//           <LineChart data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip
//               formatter={(value) => [
//                 `${value}`,
//                 analyticsType === "views" ? "المشاهدات" : "الزيارات",
//               ]}
//               labelFormatter={(label) => `اليوم: ${label}`}
//             />
//             <Line
//               type="monotone"
//               dataKey={analyticsType}
//               stroke={analyticsType === "views" ? "#4A72AC" : "#F6B17A"}
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </Box>
//     </AnalyticsContainer>
//   );
// };

// Insights Section
const InsightsSection = ({ places, darkMode, theme }) => {
  // Calculate category distribution
  const categoryData = useMemo(() => {
    const categories = {};
    places.forEach((place) => {
      if (!categories[place.category]) {
        categories[place.category] = 0;
      }
      categories[place.category]++;
    });

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [places]);

  // Calculate performance metrics
  const performanceData = useMemo(() => {
    return [
      {
        name: "الأكثر مشاهدة",
        place: places.length
          ? places.reduce((max, place) =>
              max.stats.views > place.stats.views ? max : place
            ).name
          : "-",
        value: places.length
          ? places.reduce((max, place) =>
              max.stats.views > place.stats.views ? max : place
            ).stats.views
          : 0,
      },
      {
        name: "الأكثر زيارة",
        place: places.length
          ? places.reduce((max, place) =>
              max.stats.visits > place.stats.visits ? max : place
            ).name
          : "-",
        value: places.length
          ? places.reduce((max, place) =>
              max.stats.visits > place.stats.visits ? max : place
            ).stats.visits
          : 0,
      },
      {
        name: "الأعلى تقييماً",
        place: places.length
          ? places.reduce((max, place) =>
              max.stats.ratings > place.stats.ratings ? max : place
            ).name
          : "-",
        value: places.length
          ? places
              .reduce((max, place) =>
                max.stats.ratings > place.stats.ratings ? max : place
              )
              .stats.ratings.toFixed(1)
          : 0,
      },
    ];
  }, [places]);

  // Color array for pie chart
  // const COLORS = [
  //   "#4A72AC",
  //   "#F6B17A",
  //   "#4CAF50",
  //   "#FEC20F",
  //   "#FF5252",
  //   "#9C27B0",
  //   "#00BCD4",
  // ];

  // return (
  //   <Grid container spacing={3} sx={{ mb: 4 }}>
  //     <Grid item xs={12} md={6}>
  //       <InsightCard $darkMode={darkMode} $theme={theme}>
  //         <InsightCardHeader>
  //           <Typography variant="h6" fontWeight="bold">
  //             توزيع الأماكن حسب الفئة
  //           </Typography>
  //         </InsightCardHeader>
  //         <Box
  //           sx={{
  //             height: 250,
  //             width: "100%",
  //             display: "flex",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <ResponsiveContainer width="100%" height="100%">
  //             <PieChart>
  //               <Pie
  //                 data={categoryData}
  //                 cx="50%"
  //                 cy="50%"
  //                 labelLine={false}
  //                 outerRadius={80}
  //                 fill="#8884d8"
  //                 dataKey="value"
  //                 label={({ name, percent }) =>
  //                   `${name} (${(percent * 100).toFixed(0)}%)`
  //                 }
  //               >
  //                 {categoryData.map((entry, index) => (
  //                   <Cell
  //                     key={`cell-${index}`}
  //                     fill={COLORS[index % COLORS.length]}
  //                   />
  //                 ))}
  //               </Pie>
  //               <Tooltip formatter={(value) => [value, "عدد الأماكن"]} />
  //               <Legend
  //                 layout="vertical"
  //                 align="right"
  //                 verticalAlign="middle"
  //               />
  //             </PieChart>
  //           </ResponsiveContainer>
  //         </Box>
  //       </InsightCard>
  //     </Grid>
  //     <Grid item xs={12} md={6}>
  //       <InsightCard $darkMode={darkMode} $theme={theme}>
  //         <InsightCardHeader>
  //           <Typography variant="h6" fontWeight="bold">
  //             الأماكن الأكثر أداءً
  //           </Typography>
  //         </InsightCardHeader>
  //         <Box sx={{ p: 2 }}>
  //           <List>
  //             {performanceData.map((item, index) => (
  //               <ListItem
  //                 key={index}
  //                 divider={index < performanceData.length - 1}
  //                 sx={{
  //                   p: 2,
  //                   borderRadius: 2,
  //                   bgcolor: darkMode
  //                     ? "rgba(255,255,255,0.03)"
  //                     : "rgba(0,0,0,0.01)",
  //                   mb: 1,
  //                 }}
  //               >
  //                 <ListItemIcon>
  //                   <Avatar
  //                     sx={{
  //                       bgcolor: COLORS[index % COLORS.length],
  //                       width: 35,
  //                       height: 35,
  //                     }}
  //                   >
  //                     {index === 0 ? (
  //                       <VisibilityIcon />
  //                     ) : index === 1 ? (
  //                       <PersonIcon />
  //                     ) : (
  //                       <StarIcon />
  //                     )}
  //                   </Avatar>
  //                 </ListItemIcon>
  //                 <ListItemText
  //                   primary={
  //                     <Typography variant="body1" fontWeight="medium">
  //                       {item.place}
  //                     </Typography>
  //                   }
  //                   secondary={
  //                     <Typography variant="body2" color="textSecondary">
  //                       {`${item.name}: ${item.value.toLocaleString()}`}
  //                     </Typography>
  //                   }
  //                 />
  //               </ListItem>
  //             ))}
  //           </List>
  //         </Box>
  //       </InsightCard>
  //     </Grid>
  //   </Grid>
  // );
};

// Enhance the PlaceCard component render

const EnhancedPlaceCard = ({
  place,
  onEdit,
  onDelete,
  onToggleFeature,
  onView,
  darkMode,
  theme,
}) => {
  const [showQuickStats, setShowQuickStats] = useState(false);

  return (
    <PlaceCard
      $darkMode={darkMode}
      $theme={theme}
      $status={place.status}
      $featured={place.featured}
      layout
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <CardHeader $darkMode={darkMode}>
        {place.featured && (
          <FeaturedBadge $darkMode={darkMode} $theme={theme}>
            <StarIcon sx={{ fontSize: 16 }} /> مميز
          </FeaturedBadge>
        )}
        <CardImageContainer className="card-image-container">
          <CardImage style={{ backgroundImage: `url(${place.images[0]})` }} />
          <CardImageOverlay>
            <Tooltip title="عرض المكان">
              <IconButton
                onClick={() => onView(place.id)}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            {place.images.length > 1 && (
              <PhotoCountBadge>
                <PhotoIcon fontSize="small" />
                <span>{place.images.length}</span>
              </PhotoCountBadge>
            )}
          </CardImageOverlay>
        </CardImageContainer>

        <CardStatusBanner $status={place.status}>
          <StatusBadge status={place.status} />
          {place.status === "approved" && (
            <Tooltip
              title={place.featured ? "إلغاء تمييز المكان" : "تمييز المكان"}
            >
              <IconButton
                size="small"
                onClick={() => onToggleFeature(place.id)}
                sx={{ ml: 1 }}
              >
                {place.featured ? (
                  <StarIcon fontSize="small" />
                ) : (
                  <StarBorderIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          )}
        </CardStatusBanner>
      </CardHeader>

      <CardBody>
        <PlaceName onClick={() => onView(place.id)} sx={{ cursor: "pointer" }}>
          {place.name}
        </PlaceName>

        <CategoryRow>
          <CategoryIcon fontSize="small" sx={{ opacity: 0.7 }} />
          <Typography
            variant="body2"
            sx={{
              color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
            }}
          >
            {place.category}
          </Typography>
        </CategoryRow>

        <AddressRow $theme={theme}>
          <LocationOnIcon fontSize="small" sx={{ opacity: 0.7 }} />
          <Typography
            variant="body2"
            sx={{
              color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
            }}
          >
            {place.address}
          </Typography>
        </AddressRow>

        <PlaceDescription $theme={theme}>
          {place.description.length > 120
            ? place.description.substring(0, 120) + "..."
            : place.description}
        </PlaceDescription>

        {place.status === "rejected" && (
          <RejectionMessage>
            <CancelIcon fontSize="small" /> {place.rejectionReason}
          </RejectionMessage>
        )}

        <Button
          fullWidth
          variant="text"
          onClick={() => setShowQuickStats(!showQuickStats)}
          startIcon={
            showQuickStats ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
          sx={{ mb: 1, mt: 1, color: theme.colors.textSecondary }}
        >
          {showQuickStats ? "إخفاء الإحصائيات" : "عرض الإحصائيات"}
        </Button>

        <Collapse in={showQuickStats}>
          <QuickStatsContainer $theme={theme} $darkMode={darkMode}>
            <QuickStatItem>
              <VisibilityIcon fontSize="small" />
              <QuickStatValue>
                {place.stats.views.toLocaleString()}
              </QuickStatValue>
              <QuickStatLabel $theme={theme}>مشاهدات</QuickStatLabel>
            </QuickStatItem>
            <QuickStatItem>
              <PersonIcon fontSize="small" />
              <QuickStatValue>
                {place.stats.visits.toLocaleString()}
              </QuickStatValue>
              <QuickStatLabel $theme={theme}>زيارات</QuickStatLabel>
            </QuickStatItem>
            {place.stats.ratings > 0 && (
              <QuickStatItem>
                <StarIcon fontSize="small" />
                <QuickStatValue>
                  {place.stats.ratings.toFixed(1)}
                </QuickStatValue>
                <QuickStatLabel $theme={theme}>تقييم</QuickStatLabel>
              </QuickStatItem>
            )}
            {place.stats.reviewsCount > 0 && (
              <QuickStatItem>
                <CommentIcon fontSize="small" />
                <QuickStatValue>{place.stats.reviewsCount}</QuickStatValue>
                <QuickStatLabel $theme={theme}>تعليق</QuickStatLabel>
              </QuickStatItem>
            )}
          </QuickStatsContainer>
        </Collapse>

        <DateRow $theme={theme}>
          <EventIcon fontSize="small" sx={{ opacity: 0.5 }} />
          <span>تم التحديث: {formatDate(place.updatedAt)}</span>
        </DateRow>
      </CardBody>

      <CardActions>
        <ActionButton
          $darkMode={darkMode}
          $theme={theme}
          $primary
          variant="contained"
          onClick={() => onEdit(place.id)}
        >
          تعديل
        </ActionButton>
        <ActionButton
          $darkMode={darkMode}
          $theme={theme}
          variant="outlined"
          onClick={() => onView(place.id)}
        >
          {place.status === "approved" ? "عرض" : "التفاصيل"}
        </ActionButton>
        <IconButton onClick={(e) => onDelete(place.id)} size="small">
          <DeleteIcon color="error" />
        </IconButton>
      </CardActions>
    </PlaceCard>
  );
};

// Styled components
const PageContainer = styled.div`
  padding: 24px;
  direction: rtl;
  max-width: 1500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// ...existing code...

const StatsCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#ffffff"};
  border-radius: 16px;
  box-shadow: ${({ $darkMode }) => 
    $darkMode ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.05)"};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid ${({ $darkMode }) => 
    $darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ $darkMode }) => 
    $darkMode ? "0 8px 25px rgba(0, 0, 0, 0.25)" : "0 8px 20px rgba(0, 0, 0, 0.1)"};
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StatsIconWrapper = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $darkMode, $color }) =>
    $darkMode ? `${$color}20` : `${$color}15`};
  color: ${({ $color }) => $color};

  svg {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;

    svg {
      font-size: 24px;
    }
  }
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 4px;
  color: ${({ $darkMode, $theme }) => 
    $darkMode ? $theme.colors.text : "inherit"};

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const StatsLabel = styled.div`
  font-size: 14px;
  color: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.textSecondary : $theme.colors.textSecondary};

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBox = styled.div`
  flex: 1;
  min-width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ActionsButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})`
  border-radius: 12px;
  direction: ltr;
  padding: 10px 16px;
  border: 1px solid
    ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"};
  background-color: ${({ $darkMode }) =>
    $darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"};
  color: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.text : "rgba(0,0,0,0.87)"};
  text-transform: none;
  font-weight: 500;
  min-width: 120px;

  &:hover {
    background-color: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
    border-color: ${({ $theme }) => $theme.colors.primary}60;
  }
`;

const AddButton = styled(Button, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})`
  border-radius: 12px;
  padding: 10px 16px;
  background: ${({ $darkMode, $theme }) =>
    `linear-gradient(135deg, ${$theme.colors.primary}, ${
      $darkMode ? "#F6B17A" : "#4A72AC"
    })`};
  color: ${({ $darkMode }) => ($darkMode ? "#000" : "#fff")};
  text-transform: none;
  font-weight: 600;
  min-width: 160px;
  box-shadow: 0 4px 10px ${({ $theme }) => $theme.colors.primary}40;

  &:hover {
    box-shadow: 0 6px 14px ${({ $theme }) => $theme.colors.primary}60;
    transform: translateY(-2px);
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PlaceCard = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#ffffff"};
  box-shadow: 0 4px 20px
    rgba(0, 0, 0, ${({ $darkMode }) => ($darkMode ? 0.2 : 0.08)});
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid
    ${({ $darkMode, $featured, $theme }) =>
      $featured
        ? `${$theme.colors.primary}40`
        : $darkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.06)"};

  ${({ $status, $featured }) =>
    $status === "rejected" &&
    !$featured &&
    `
    opacity: 0.9;
  `}

  ${({ $featured, $theme }) =>
    $featured &&
    `
    box-shadow: 0 8px 25px ${$theme.colors.primary}30;
  `}
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px
      rgba(0, 0, 0, ${({ $darkMode }) => ($darkMode ? 0.3 : 0.12)});
  }
`;

const CardHeader = styled.div`
  position: relative;
  height: 180px;
`;

const CardImageContainer = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;

  .place-card:hover & {
    transform: scale(1.05);
  }
`;

const CardImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  .card-image-container:hover & {
    opacity: 1;
  }
`;

const PhotoCountBadge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardStatusBanner = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 8px 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardBody = styled.div`
  padding: 18px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 18px 18px;
  justify-content: space-between;
`;

const PlaceName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px;
`;

const PlaceDescription = styled.p`
  font-size: 14px;
  color: ${({ $theme }) =>
    $theme.colors.textSecondary}; // Changed from theme to $theme
  margin: 12px 0;
  line-height: 1.5;
  height: 64px;
  overflow: hidden;
`;

const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
`;

const AddressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  svg {
    color: ${({ $theme }) =>
      $theme.colors.primary}; // Changed from theme to $theme
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: ${({ $theme }) =>
    $theme.colors.textSecondary}; // Changed from theme to $theme

  svg {
    font-size: 16px;
    opacity: 0.8;
  }
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: ${({ $theme }) =>
    $theme.colors.textSecondary}; // Changed from theme to $theme
  margin-top: 8px;
`;

const RejectionMessage = styled.div`
  display: flex;
  gap: 8px;
  background: ${({ $darkMode, $theme }) =>
    $darkMode
      ? "rgba(211, 47, 47, 0.2)"
      : "#ffebee"}; // Changed from theme to $darkMode/$theme
  color: ${({ $darkMode }) =>
    $darkMode ? "#ff8a80" : "#c62828"}; // Changed from theme to $darkMode
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  margin: 12px 0;
  align-items: center;

  svg {
    font-size: 16px;
  }
`;

const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})`
  border-radius: 8px;
  text-transform: none;
  flex: ${(props) => (props.$primary ? 1.5 : 1)};
  background: ${({ $primary, $darkMode, $theme }) =>
    $primary
      ? $darkMode
        ? `${$theme.colors.primary}90`
        : $theme.colors.primary
      : "transparent"};
  color: ${({ $primary, $darkMode, $theme }) =>
    $primary
      ? $darkMode
        ? "#000"
        : "#fff"
      : $darkMode
      ? $theme.colors.text
      : "rgba(0,0,0,0.87)"};
  border-color: ${({ $primary, $theme }) =>
    $primary ? "transparent" : `${$theme.colors.primary}40`};

  &:hover {
    background: ${({ $primary, $darkMode, $theme }) =>
      $primary
        ? $darkMode
          ? $theme.colors.primary
          : `${$theme.colors.primary}e0`
        : $darkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.04)"};
    border-color: ${({ $primary, $theme }) =>
      $primary ? "transparent" : `${$theme.colors.primary}60`};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)"};
  border: 2px dashed
    ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
  border-radius: 16px;
  margin: 40px 0;

  svg {
    font-size: 80px;
    color: ${({ $darkMode, $theme }) =>
      $darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"};
    margin-bottom: 24px;
  }

  h3 {
    margin: 0 0 16px;
    font-size: 24px;
    font-weight: 600;
  }

  p {
    margin: 0 0 30px;
    max-width: 500px;
    color: ${({ $theme }) => $theme.colors.textSecondary};
    font-size: 16px;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;

    svg {
      font-size: 60px;
      margin-bottom: 16px;
    }

    h3 {
      font-size: 20px;
      margin-bottom: 12px;
    }

    p {
      font-size: 14px;
      margin-bottom: 24px;
    }
  }
`;

const PlaceSkeleton = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#ffffff"};
  box-shadow: 0 4px 20px
    rgba(0, 0, 0, ${({ $darkMode }) => ($darkMode ? 0.2 : 0.08)});
  border: 1px solid
    ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"};

  .skeleton-header {
    height: 180px;
    width: 100%;
  }

  .skeleton-content {
    padding: 18px;
  }

  .skeleton-actions {
    display: flex;
    gap: 8px;
    padding: 0 18px 18px;
    justify-content: space-between;
  }
`;

const AnalyticsContainer = styled.div`
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#ffffff"};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px
    rgba(0, 0, 0, ${({ $darkMode }) => ($darkMode ? 0.2 : 0.08)});

  @media (max-width: 768px) {
    padding: 18px;
  }
`;
const FeaturedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? `${$theme.colors.primary}` : `${$theme.colors.primary}`};
  color: ${({ $darkMode }) => ($darkMode ? "#000" : "#fff")};
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const AnalyticsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const QuickStatsContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#f9fafc"};
  border-radius: 12px;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

const QuickStatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const QuickStatValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 4px 0;
`;

const QuickStatLabel = styled.div`
  font-size: 12px;
  color: ${({ $theme }) => $theme.colors.textSecondary};
`;

const InsightCard = styled.div`
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#ffffff"};
  border-radius: 16px;
  height: 100%;
  box-shadow: 0 4px 20px
    rgba(0, 0, 0, ${({ $darkMode }) => ($darkMode ? 0.2 : 0.08)});
  overflow: hidden;
`;

const InsightCardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid
    ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"};
`;

const LoadingPlaceCards = ({ darkMode, theme }) => (
  <CardsContainer>
    {[1, 2, 3, 4].map((item) => (
      <PlaceSkeleton key={item} $darkMode={darkMode} $theme={theme}>
        <div className="skeleton-header">
          <Skeleton variant="rectangular" height="100%" animation="wave" />
        </div>
        <div className="skeleton-content">
          <Skeleton
            variant="text"
            height={32}
            width="70%"
            animation="wave"
            sx={{ mb: 1 }}
          />
          <Skeleton
            variant="text"
            height={24}
            width="50%"
            animation="wave"
            sx={{ mb: 1 }}
          />
          <Skeleton
            variant="text"
            height={24}
            width="90%"
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={64}
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="text"
            height={24}
            width="60%"
            animation="wave"
            sx={{ mb: 1 }}
          />
          <Skeleton variant="text" height={20} width="40%" animation="wave" />
        </div>
        <div className="skeleton-actions">
          <Skeleton
            variant="rectangular"
            height={36}
            width="65%"
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            height={36}
            width="30%"
            animation="wave"
          />
        </div>
      </PlaceSkeleton>
    ))}
  </CardsContainer>
);

export default MyPlaces;
