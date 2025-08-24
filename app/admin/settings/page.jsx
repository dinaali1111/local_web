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
  Switch,
  Button,
  Divider,
  CircularProgress,
  FormControlLabel,
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../Components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import PaletteIcon from "@mui/icons-material/Palette";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RestoreIcon from "@mui/icons-material/Restore";

const AdminSettings = () => {
  const { darkMode, theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Settings state
  const [settings, setSettings] = useState({
    general: {
      siteName: "فسحة",
      siteDescription: "منصة تساعد المستخدمين على إنشاء رحلات مخصصة",
      contactEmail: "support@fasaha.com",
      maxPlacesPerTrip: 10,
      defaultCity: "القاهرة",
    },
    appearance: {
      primaryColor: "#3b5898",
      accentColor: "#F6B17A",
      useDarkMode: darkMode,
      rtlLayout: true,
      showHeroSection: true,
      logoVariant: "default",
    },
    notifications: {
      emailNotifications: true,
      adminAlertOnNewPlace: true,
      sellerAlertOnApproval: true,
      sellerAlertOnRejection: true,
      dailySummary: false,
      marketingEmails: false,
    },
    security: {
      requireEmailVerification: true,
      twoFactorAuthRequired: false,
      sessionTimeout: 60,
      passwordMinLength: 8,
      allowSocialLogin: true,
    },
    defaults: {
      defaultUserType: "user",
      defaultTripDuration: 3,
      autoApproveVerifiedSellers: false,
      requirePhoneForSellers: true,
      maximumImageUploadSize: 5,
    },
  });

  const [originalSettings, setOriginalSettings] = useState({});

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // In a real application, you would fetch settings from your backend
        // For now, we'll simulate a successful API call
        setTimeout(() => {
          // Use the initial settings as if they came from the API
          setOriginalSettings({ ...settings });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching settings:", error);
        setError("فشل في تحميل الإعدادات. يرجى المحاولة مرة أخرى.");
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle settings change
  const handleChange = (section, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: value,
      },
    }));
  };

  // Handle save settings
  const handleSaveSettings = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // In a real application, you would send settings to your backend
      // For now, we'll simulate a successful API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update theme if dark mode setting changed
      if (settings.appearance.useDarkMode !== darkMode) {
        toggleTheme();
      }

      setOriginalSettings({ ...settings });
      setSuccess("تم حفظ الإعدادات بنجاح!");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setError("فشل في حفظ الإعدادات. يرجى المحاولة مرة أخرى.");
    } finally {
      setSaving(false);
    }
  };

  // Reset settings to original values
  const handleResetSettings = () => {
    setSettings({ ...originalSettings });
    setError(null);
    setSuccess("تم استعادة الإعدادات الأصلية");

    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  };

  // Check if settings have been modified
  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(originalSettings);

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            إعدادات النظام
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            تخصيص وضبط إعدادات موقع فسحة
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSuccess(null)}
          >
            {success}
          </Alert>
        )}

        <Paper sx={{ borderRadius: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              px: 2,
              "& .MuiTab-root": { minHeight: 64, fontSize: "0.95rem" },
            }}
          >
            <Tab icon={<SettingsIcon />} label="عام" iconPosition="start" />
            <Tab icon={<PaletteIcon />} label="المظهر" iconPosition="start" />
            <Tab
              icon={<NotificationsIcon />}
              label="الإشعارات"
              iconPosition="start"
            />
            <Tab icon={<SecurityIcon />} label="الأمان" iconPosition="start" />
            <Tab
              icon={<LanguageIcon />}
              label="الإفتراضيات"
              iconPosition="start"
            />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* General Settings */}
            {activeTab === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <SettingsIcon sx={{ mr: 1 }} /> الإعدادات العامة
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  الإعدادات الأساسية للموقع والتي تؤثر على عمل النظام بشكل عام
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="اسم الموقع"
                      fullWidth
                      value={settings.general.siteName}
                      onChange={(e) =>
                        handleChange("general", "siteName", e.target.value)
                      }
                      helperText="الاسم الرئيسي للموقع الذي يظهر في الترويسة والعناوين"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="البريد الإلكتروني للتواصل"
                      fullWidth
                      value={settings.general.contactEmail}
                      onChange={(e) =>
                        handleChange("general", "contactEmail", e.target.value)
                      }
                      helperText="البريد الإلكتروني الذي يستقبل رسائل التواصل والاستفسارات"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">@</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="وصف الموقع"
                      fullWidth
                      multiline
                      rows={2}
                      value={settings.general.siteDescription}
                      onChange={(e) =>
                        handleChange(
                          "general",
                          "siteDescription",
                          e.target.value
                        )
                      }
                      helperText="وصف قصير للموقع يظهر في محركات البحث والميتا تاج"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>المدينة الافتراضية</InputLabel>
                      <Select
                        value={settings.general.defaultCity}
                        label="المدينة الافتراضية"
                        onChange={(e) =>
                          handleChange("general", "defaultCity", e.target.value)
                        }
                      >
                        <MenuItem value="القاهرة">القاهرة</MenuItem>
                        <MenuItem value="الإسكندرية">الإسكندرية</MenuItem>
                        <MenuItem value="أسوان">أسوان</MenuItem>
                        <MenuItem value="جنوب سيناء">جنوب سيناء</MenuItem>
                        <MenuItem value="مطروح">مطروح</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="الحد الأقصى للأماكن في الرحلة الواحدة"
                      fullWidth
                      type="number"
                      value={settings.general.maxPlacesPerTrip}
                      onChange={(e) =>
                        handleChange(
                          "general",
                          "maxPlacesPerTrip",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{
                        inputProps: { min: 1, max: 30 },
                      }}
                      helperText="عدد الأماكن التي يمكن إضافتها كحد أقصى في رحلة واحدة"
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Appearance Settings */}
            {activeTab === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <PaletteIcon sx={{ mr: 1 }} /> إعدادات المظهر
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  تخصيص مظهر الموقع والألوان والتصميم العام
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>نوع الشعار</InputLabel>
                      <Select
                        value={settings.appearance.logoVariant}
                        label="نوع الشعار"
                        onChange={(e) =>
                          handleChange(
                            "appearance",
                            "logoVariant",
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="default">الشعار الافتراضي</MenuItem>
                        <MenuItem value="minimal">الشعار المبسط</MenuItem>
                        <MenuItem value="dark">الشعار الداكن</MenuItem>
                        <MenuItem value="light">الشعار الفاتح</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="اللون الرئيسي"
                      fullWidth
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        handleChange(
                          "appearance",
                          "primaryColor",
                          e.target.value
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: "4px",
                                backgroundColor:
                                  settings.appearance.primaryColor,
                                border: "1px solid #ccc",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="اللون الثانوي"
                      fullWidth
                      value={settings.appearance.accentColor}
                      onChange={(e) =>
                        handleChange(
                          "appearance",
                          "accentColor",
                          e.target.value
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: "4px",
                                backgroundColor:
                                  settings.appearance.accentColor,
                                border: "1px solid #ccc",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.appearance.useDarkMode}
                            onChange={(e) =>
                              handleChange(
                                "appearance",
                                "useDarkMode",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label="استخدام الوضع الداكن كافتراضي"
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.appearance.rtlLayout}
                            onChange={(e) =>
                              handleChange(
                                "appearance",
                                "rtlLayout",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label="اتجاه RTL للتصفح (من اليمين لليسار)"
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.appearance.showHeroSection}
                            onChange={(e) =>
                              handleChange(
                                "appearance",
                                "showHeroSection",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label="إظهار قسم الصورة الرئيسية في الصفحة الرئيسية"
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Notification Settings */}
            {activeTab === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <NotificationsIcon sx={{ mr: 1 }} /> إعدادات الإشعارات
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  تكوين إشعارات النظام وتنبيهات البريد الإلكتروني للمستخدمين
                  والمسؤولين
                </Typography>

                <Card sx={{ mb: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      إشعارات المشرفين
                    </Typography>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.adminAlertOnNewPlace}
                          onChange={(e) =>
                            handleChange(
                              "notifications",
                              "adminAlertOnNewPlace",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="إشعار المشرفين عند إضافة مكان جديد"
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.dailySummary}
                          onChange={(e) =>
                            handleChange(
                              "notifications",
                              "dailySummary",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="ملخص يومي بالإحصائيات والحالات المعلقة"
                    />
                  </CardContent>
                </Card>

                <Card sx={{ mb: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      إشعارات البائعين
                    </Typography>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.sellerAlertOnApproval}
                          onChange={(e) =>
                            handleChange(
                              "notifications",
                              "sellerAlertOnApproval",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="إشعار البائعين عند الموافقة على أماكنهم"
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={
                            settings.notifications.sellerAlertOnRejection
                          }
                          onChange={(e) =>
                            handleChange(
                              "notifications",
                              "sellerAlertOnRejection",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="إشعار البائعين عند رفض أماكنهم"
                    />
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      إعدادات عامة للإشعارات
                    </Typography>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.emailNotifications}
                          onChange={(e) =>
                            handleChange(
                              "notifications",
                              "emailNotifications",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="تفعيل إشعارات البريد الإلكتروني"
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.marketingEmails}
                          onChange={(e) =>
                            handleChange(
                              "notifications",
                              "marketingEmails",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="إرسال رسائل تسويقية للمستخدمين"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Security Settings */}
            {activeTab === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <SecurityIcon sx={{ mr: 1 }} /> إعدادات الأمان
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  إعدادات الأمان وخيارات الحماية للمستخدمين والنظام
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.security.requireEmailVerification}
                            onChange={(e) =>
                              handleChange(
                                "security",
                                "requireEmailVerification",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label="تأكيد البريد الإلكتروني مطلوب للتسجيل"
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.security.twoFactorAuthRequired}
                            onChange={(e) =>
                              handleChange(
                                "security",
                                "twoFactorAuthRequired",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label="تفعيل التحقق بخطوتين للمشرفين"
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.security.allowSocialLogin}
                            onChange={(e) =>
                              handleChange(
                                "security",
                                "allowSocialLogin",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label="السماح بتسجيل الدخول عبر حسابات التواصل الاجتماعي"
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="مدة الجلسة (دقائق)"
                      fullWidth
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) =>
                        handleChange(
                          "security",
                          "sessionTimeout",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{
                        inputProps: { min: 15, max: 480 },
                        endAdornment: (
                          <InputAdornment position="end">دقيقة</InputAdornment>
                        ),
                      }}
                      helperText="مدة انتهاء الجلسة بالدقائق (15-480 دقيقة)"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="الحد الأدنى لطول كلمة المرور"
                      fullWidth
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) =>
                        handleChange(
                          "security",
                          "passwordMinLength",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{
                        inputProps: { min: 6, max: 16 },
                        endAdornment: (
                          <InputAdornment position="end">حرف</InputAdornment>
                        ),
                      }}
                      helperText="الحد الأدنى لطول كلمة المرور المطلوبة للتسجيل"
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Default Settings */}
            {activeTab === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <LanguageIcon sx={{ mr: 1 }} /> الإعدادات الافتراضية
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  إعدادات النظام الافتراضية للمستخدمين الجدد والمحتوى
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>نوع المستخدم الافتراضي</InputLabel>
                      <Select
                        value={settings.defaults.defaultUserType}
                        label="نوع المستخدم الافتراضي"
                        onChange={(e) =>
                          handleChange(
                            "defaults",
                            "defaultUserType",
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="user">مستخدم عادي</MenuItem>
                        <MenuItem value="seller">بائع</MenuItem>
                      </Select>
                      <Typography variant="caption" color="textSecondary">
                        نوع المستخدم المحدد افتراضيًا عند التسجيل
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="مدة الرحلة الافتراضية (أيام)"
                      fullWidth
                      type="number"
                      value={settings.defaults.defaultTripDuration}
                      onChange={(e) =>
                        handleChange(
                          "defaults",
                          "defaultTripDuration",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{
                        inputProps: { min: 1, max: 30 },
                        endAdornment: (
                          <InputAdornment position="end">يوم</InputAdornment>
                        ),
                      }}
                      helperText="عدد أيام الرحلة المحددة افتراضيًا عند إنشاء رحلة جديدة"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              settings.defaults.autoApproveVerifiedSellers
                            }
                            onChange={(e) =>
                              handleChange(
                                "defaults",
                                "autoApproveVerifiedSellers",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label="الموافقة التلقائية على أماكن البائعين المُوثّقين"
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.defaults.requirePhoneForSellers}
                            onChange={(e) =>
                              handleChange(
                                "defaults",
                                "requirePhoneForSellers",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label="رقم الهاتف مطلوب للبائعين"
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="الحد الأقصى لحجم الصورة (ميجابايت)"
                      fullWidth
                      type="number"
                      value={settings.defaults.maximumImageUploadSize}
                      onChange={(e) =>
                        handleChange(
                          "defaults",
                          "maximumImageUploadSize",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{
                        inputProps: { min: 1, max: 20 },
                        endAdornment: (
                          <InputAdornment position="end">MB</InputAdornment>
                        ),
                      }}
                      helperText="الحد الأقصى لحجم الصور المرفوعة بالميجابايت"
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </Box>
        </Paper>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<RestoreIcon />}
            onClick={handleResetSettings}
            disabled={!hasChanges || saving}
          >
            إعادة تعيين
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={handleSaveSettings}
            disabled={!hasChanges || saving}
          >
            {saving ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
          </Button>
        </Box>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminSettings;
