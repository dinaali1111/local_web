"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../Components/admin/AdminLayout";

const ApprovedPlaces = () => {
  const { theme, darkMode } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demo
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          الأماكن المقبولة
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          عرض وإدارة جميع الأماكن المقبولة
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          هذه الصفحة قيد الإنشاء
        </Alert>
        <Typography variant="h6" gutterBottom>
          صفحة الأماكن المقبولة
        </Typography>
        <Typography paragraph color="textSecondary">
          سيتم هنا عرض قائمة بجميع الأماكن التي تمت الموافقة عليها مع إمكانية
          البحث والفلترة وإدارة محتوياتها.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => router.push("/admin/dashboard")}
        >
          العودة للوحة التحكم
        </Button>
      </Paper>
    </AdminLayout>
  );
};

export default ApprovedPlaces;
