"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";
import AdminLayout from "../Components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard = ({ title, value, icon, color, subtitle }) => {
  const { darkMode, theme } = useTheme();

  return (
    <Card
      component={motion.div}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: darkMode
          ? "0 4px 15px rgba(0, 0, 0, 0.2)"
          : "0 4px 15px rgba(0, 0, 0, 0.05)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              gap: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: `${color}20`, // Use color with 20% opacity
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {React.cloneElement(icon, { sx: { color } })}
            </Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h4" component="h2" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => {
  const { darkMode, theme } = useTheme();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:4000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        setError("فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.");
        if (error.response && error.response.status === 403) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, [router]);

  // Chart configurations
  const categoryChartData = {
    labels:
      stats?.placesByCategory?.map((item) => {
        const categories = {
          restaurants: "مطاعم وكافيهات",
          tourism: "أماكن سياحية",
          hotels: "فنادق ومنتجعات",
          shopping: "تسوق ومولات",
          entertainment: "أنشطة ترفيهية",
          museums: "متاحف ومعارض",
        };
        return categories[item._id] || item._id;
      }) || [],
    datasets: [
      {
        label: "عدد الأماكن",
        data: stats?.placesByCategory?.map((item) => item.count) || [],
        backgroundColor: [
          "#4A72AC",
          "#F6B17A",
          "#4CAF50",
          "#FEC20F",
          "#FF5722",
          "#9C27B0",
        ],
        borderWidth: 0,
      },
    ],
  };

  const cityChartData = {
    labels: stats?.placesByCity?.map((item) => item._id) || [],
    datasets: [
      {
        label: "عدد الأماكن",
        data: stats?.placesByCity?.map((item) => item.count) || [],
        backgroundColor: darkMode
          ? "rgba(246, 177, 122, 0.8)"
          : "rgba(74, 114, 172, 0.8)",
        borderColor: darkMode
          ? "rgba(246, 177, 122, 1)"
          : "rgba(74, 114, 172, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: darkMode ? theme.colors.text : undefined,
          font: {
            family: "'Amiri', serif",
            size: 12,
          },
        },
      },
      tooltip: {
        bodyFont: {
          family: "'Amiri', serif",
        },
        titleFont: {
          family: "'Amiri', serif",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? theme.colors.text : undefined,
          font: {
            family: "'Amiri', serif",
          },
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        ticks: {
          color: darkMode ? theme.colors.text : undefined,
          font: {
            family: "'Amiri', serif",
          },
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
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
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography color="error">{error}</Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => window.location.reload()}
          >
            إعادة المحاولة
          </Button>
        </Paper>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          لوحة التحكم
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          نظرة عامة على إحصائيات المنصة
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards - First Row */}
        <Grid item xs={12} md={3}>
          <StatCard
            title="الأماكن المعلقة"
            value={stats?.places?.pending || 0}
            icon={<PendingIcon />}
            color="#FEC20F"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="الأماكن المقبولة"
            value={stats?.places?.approved || 0}
            icon={<CheckCircleIcon />}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="الأماكن المرفوضة"
            value={stats?.places?.rejected || 0}
            icon={<CancelIcon />}
            color="#F44336"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="إجمالي الأماكن"
            value={stats?.places?.total || 0}
            icon={<StorefrontIcon />}
            color="#4A72AC"
          />
        </Grid>

        {/* Stats Cards - Second Row */}
        <Grid item xs={12} md={4}>
          <StatCard
            title="البائعين"
            value={stats?.users?.sellers || 0}
            icon={<StorefrontIcon />}
            color="#9C27B0"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="المستخدمين العاديين"
            value={stats?.users?.regular || 0}
            icon={<PeopleIcon />}
            color="#3F51B5"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="إجمالي المستخدمين"
            value={stats?.users?.total || 0}
            icon={<PeopleIcon />}
            color="#2196F3"
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 2,
              height: "100%",
              overflow: "hidden",
              boxShadow: darkMode
                ? "0 4px 15px rgba(0, 0, 0, 0.2)"
                : "0 4px 15px rgba(0, 0, 0, 0.05)",
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  gap: 1,
                }}
              >
                <CategoryIcon sx={{ color: theme.colors.primary }} />
                <Typography variant="h6">الأماكن حسب الفئة</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ height: 300 }}>
                <Doughnut data={categoryChartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 2,
              height: "100%",
              overflow: "hidden",
              boxShadow: darkMode
                ? "0 4px 15px rgba(0, 0, 0, 0.2)"
                : "0 4px 15px rgba(0, 0, 0, 0.05)",
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  gap: 1,
                }}
              >
                <LocationOnIcon sx={{ color: theme.colors.primary }} />
                <Typography variant="h6">الأماكن حسب المدينة</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ height: 300 }}>
                <Bar data={cityChartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: darkMode
                ? "0 4px 15px rgba(0, 0, 0, 0.2)"
                : "0 4px 15px rgba(0, 0, 0, 0.05)",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                روابط سريعة
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      justifyContent: "flex-start",
                    }}
                    startIcon={<PendingIcon />}
                    onClick={() => router.push("/admin/pending-places")}
                  >
                    مراجعة الطلبات المعلقة ({stats?.places?.pending || 0})
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      justifyContent: "flex-start",
                    }}
                    startIcon={<CheckCircleIcon />}
                    onClick={() => router.push("/admin/approved-places")}
                  >
                    الأماكن المقبولة
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      justifyContent: "flex-start",
                    }}
                    startIcon={<CancelIcon />}
                    onClick={() => router.push("/admin/rejected-places")}
                  >
                    الأماكن المرفوضة
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      justifyContent: "flex-start",
                    }}
                    startIcon={<PeopleIcon />}
                    onClick={() => router.push("/admin/users")}
                  >
                    إدارة المستخدمين
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminDashboard;
