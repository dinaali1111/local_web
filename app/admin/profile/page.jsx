"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Divider,
  Alert,
  IconButton,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const AdminProfile = () => {
  const { darkMode, theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editing, setEditing] = useState(false);
  
  // Profile data states
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    profileImage: "",
  });
  
  const [editData, setEditData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // For demo purposes, simulate an API call with a timeout
        // In a real application, you would fetch this from your backend
        setTimeout(() => {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          if (!user || !user._id) {
            router.push("/login");
            return;
          }
          
          setProfileData({
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
            city: user.city || "",
            profileImage: user.profileImage || "",
          });
          
          setEditData({
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
            city: user.city || "",
            profileImage: user.profileImage || "",
          });
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("فشل في تحميل بيانات الملف الشخصي");
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [router]);
  
  const handleEdit = () => {
    setEditing(true);
  };
  
  const handleCancel = () => {
    setEditData({...profileData});
    setEditing(false);
    setError(null);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  } ;  

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSuccess(null);
        
        try {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        
        const response = await axios.put(`http://localhost:4000/api/admin/profile`, editData, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        
        setProfileData(response.data);
        setSuccess("تم حفظ التغييرات بنجاح!");
        setEditing(false);
        } catch (error) {
        console.error("Error saving profile data:", error);
        setError("فشل في حفظ بيانات الملف الشخصي. يرجى المحاولة مرة أخرى.");
        } finally {
        setSaving(false);
        }
    }; 


    return ( 
        <AdminLayout title="الملف الشخصي" darkMode={darkMode}>
            <Box sx={{ padding: 2 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: theme === "dark" ? "#333" : "#fff" }}>
                <Typography variant="h4" gutterBottom color={theme === "dark" ? "#fff" : "#000"}>
                    الملف الشخصي
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                    <Avatar
                        alt={`${profileData.firstname} ${profileData.lastname}`}
                        src={editData.profileImage || profileData.profileImage}
                        sx={{ width: 120, height: 120, marginBottom: 2 }}
                    >
                        {!editData.profileImage && `${profileData.firstname.charAt(0)}${profileData.lastname.charAt(0)}`}
                    </Avatar>
                    {editing && (
                        <IconButton color="primary" component="label">
                        <input type="file" hidden accept="image/*" onChange={handleProfileImageChange} />
                        <PhotoCameraIcon />
                        </IconButton>
                    )}
                    </Grid>
                    <Grid item xs={12} sm={8}>
                    <TextField
                        label="الاسم الأول"
                        name="firstname"
                        value={editData.firstname}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled={!editing}
                    />
                    <TextField
                        label="اسم العائلة"
                        name="lastname"
                        value={editData.lastname}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled={!editing}
                    />
                    <TextField
                        label="البريد الإلكتروني"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled={!editing}
                    />
                    <TextField
                        label="المدينة"
                        name="city"
                        value={editData.city} 
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled={!editing}
                    />
                    </Grid> 
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {editing ? (
                    <Box>
                        <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
                        {saving ? <CircularProgress size={24} /> : <SaveIcon />} حفظ
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>
                        <CancelIcon /> إلغاء
                        </Button>
                    </Box>
                    ) : (
                    <Button variant="contained" color="primary" onClick={handleEdit}>
                        <EditIcon /> تعديل
                    </Button>
                    )} 
                </Box>
                </Paper> 
            )}
            </Box>
        </AdminLayout>
    );
} 
 

export default AdminProfile;