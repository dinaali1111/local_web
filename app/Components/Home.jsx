"use client";
import React, { useMemo, useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Pagination } from "swiper/modules";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RoomIcon from "@mui/icons-material/Room";
import AttractionsIcon from "@mui/icons-material/Attractions";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SearchIcon from "@mui/icons-material/Search";
import FlightIcon from "@mui/icons-material/Flight";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import RateReviewIcon from "@mui/icons-material/RateReview";
import AppleIcon from "@mui/icons-material/Apple";

import YouTubeIcon from "@mui/icons-material/YouTube";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExploreIcon from "@mui/icons-material/Explore";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MapIcon from "@mui/icons-material/Map";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import img1 from "../../public/1.jpg";
import img2 from "../../public/2.jpg";
import img3 from "../../public/3.jpg";
import img4 from "../../public/4.jpeg";
import googlePlayIcon from "../../public/logo.svg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Feedback from "../../public/feedback.png";
import {
  CardsGrid,
  CardTitle,
  CategoriesContainer,
  CategoriesTitle,
  MainBox,
  StyledCard,
  StyledCard2,
} from "../styledComponent/home/styledHome";

const images = [img1, img2, img3];

const MemoizedIconButton = React.memo(({ children, ...props }) => (
  <IconButton {...props}>{children}</IconButton>
));

const MemoizedTypography = React.memo(({ children, ...props }) => (
  <Typography {...props}>{children}</Typography>
));

const MemoizedBox = React.memo(({ children, ...props }) => (
  <Box {...props}>{children}</Box>
));

const Home = () => {
  const { theme, darkMode } = useTheme();
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  // Add this useEffect to ensure navbar has proper z-index when Home mounts
  useEffect(() => {
    // Save the original value to restore it when component unmounts
    const originalZIndex = document.querySelector("header")?.style.zIndex;

    // Set a very high z-index for the navbar when Home component is mounted
    if (document.querySelector("header")) {
      document.querySelector("header").style.zIndex = "9999";
    }

    // Cleanup function to restore original z-index when component unmounts
    return () => {
      if (document.querySelector("header")) {
        document.querySelector("header").style.zIndex = originalZIndex || "";
      }
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/home");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/avatar");
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchCategories();
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderImages = useMemo(
    () =>
      images.map((src, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Image
            src={src}
            alt={`Slide ${index}`}
            priority={index === 0} // Add priority to the first image (LCP)
            style={{
              width: "100%",
              height: "600px",
              objectFit: "cover",
            }}
          />
        </Box>
      )),
    []
  );

  const renderCategories = useMemo(
    () =>
      categories.map((category, index) => (
        <StyledCard
          className="card"
          key={index}
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <CardTitle>{category.title}</CardTitle>
        </StyledCard>
      )),
    [categories]
  );

  const renderTestimonials = useMemo(
    () =>
      testimonials?.map((testimonial, index) => (
        <SwiperSlide key={testimonial._id}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <StyledCard2 $index={index} $darkMode={darkMode}>
              <CardContent>
                <Avatar
                  src={testimonial.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    mx: "auto",
                    border: `4px solid ${
                      darkMode ? theme.colors.primary : "#004080"
                    }`,
                  }}
                />
                <MemoizedTypography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: theme.colors.text }}
                >
                  {testimonial.name}
                </MemoizedTypography>
                <Rating value={testimonial.rating} readOnly sx={{ mb: 1 }} />
                <MemoizedTypography sx={{ mt: 2, color: theme.colors.text }}>
                  {testimonial.review}
                </MemoizedTypography>
              </CardContent>
            </StyledCard2>
          </motion.div>
        </SwiperSlide>
      )),
    [testimonials, theme.colors.text, theme.colors.primary, darkMode]
  );


  // If you still need swiperSettings for Slider component, define it here:
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  // Style overrides based on theme
  const mainBoxStyle = {
    backgroundColor: theme.colors.background,
  };


  // Return a skeleton or simplified version during server-side rendering
  if (!mounted) {
    return (
      <MainBox>
        <Box style={{ minHeight: "100vh" }}></Box>
      </MainBox>
    );
  }

  // Your full component rendering for client-side only
  return (
    <>
      <MainBox
        sx={{
          ...mainBoxStyle,
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: "auto", sm: "90vh" },
          marginTop: { xs: "60px", md: 0 },
          paddingBottom: { xs: 8, md: 0 },
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          {/* Main gradient background */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: darkMode
                ? `linear-gradient(135deg, rgba(45, 50, 80, 0.95) 0%, rgba(66, 71, 105, 0.85) 100%)`
                : `linear-gradient(135deg, rgba(245, 247, 250, 0.95) 0%, rgba(74, 114, 172, 0.2) 100%)`,
            }}
          />

          {/* Interactive pattern overlay */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='${
                darkMode
                  ? encodeURIComponent("#f6b17a")
                  : encodeURIComponent("#4a72ac")
              }' fill-opacity='0.03'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Floating travel elements - animated icons */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
            }}
          >
            {/* Plane Icon */}
            <Box
              component={motion.div}
              initial={{ x: -100, y: 50, opacity: 0 }}
              animate={{
                x: window.innerWidth + 100,
                y: 200,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: 2,
              }}
              sx={{
                position: "absolute",
                color: darkMode
                  ? "rgba(246, 177, 122, 0.2)"
                  : "rgba(74, 114, 172, 0.2)",
                fontSize: { xs: 40, md: 60 },
              }}
            >
              <FlightIcon sx={{ fontSize: "inherit" }} />
            </Box>

            {/* Beach Icon */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              sx={{
                position: "absolute",
                bottom: "15%",
                right: "20%",
                color: darkMode
                  ? "rgba(246, 177, 122, 0.2)"
                  : "rgba(74, 114, 172, 0.2)",
                fontSize: { xs: 30, md: 50 },
              }}
            >
              <BeachAccessIcon sx={{ fontSize: "inherit" }} />
            </Box>

            {/* Map Icon */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1,
              }}
              sx={{
                position: "absolute",
                top: "20%",
                right: "10%",
                color: darkMode
                  ? "rgba(246, 177, 122, 0.2)"
                  : "rgba(74, 114, 172, 0.2)",
                fontSize: { xs: 30, md: 50 },
              }}
            >
              <MapIcon sx={{ fontSize: "inherit" }} />
            </Box>
          </Box>
        </Box>

        {/* Hero content */}
        <Box
          sx={{
            width: "100%",
            zIndex: 10,
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: { xs: 4, md: 2 },
            py: { xs: 5, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Text content */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 45%" },
              textAlign: "right",
              mb: { xs: 2, md: 0 },
              order: { xs: 2, md: 1 }, // Move text below image on mobile
            }}
          >
            <Typography
              component={motion.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                fontSize: {
                  xs: "1.75rem",
                  sm: "2.25rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
                fontWeight: 800,
                color: theme.colors.primary,
                textShadow: darkMode ? "0 2px 10px rgba(0,0,0,0.3)" : "none",
                lineHeight: 1.2,
                mb: { xs: 2, md: 3 },
              }}
            >
              رحلة أحلامك
              <br />
              <Box
                component="span"
                sx={{
                  background: darkMode
                    ? "linear-gradient(90deg, #F6B17A, #FFD4AA)"
                    : "linear-gradient(90deg, #3B5898, #4a72ac)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: theme.colors.primary,
                }}
              >
                تبدأ من هنا
              </Box>
            </Typography>

            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              sx={{
                fontSize: {
                  xs: "0.95rem",
                  sm: "1.1rem",
                  md: "1.3rem",
                  lg: "1.5rem",
                },
                fontWeight: 400,
                color: theme.colors.text,
                mb: { xs: 3, md: 4 },
                maxWidth: "600px",
              }}
            >
              خطط رحلتك بسهولة واكتشف أفضل الأماكن الرائعة للاستمتاع بفسحة لا
              تُنسى
            </Typography>

            {/* Search box */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
                width: "100%",
                maxWidth: { xs: "100%", sm: "500px" },
                mb: { xs: 2, md: 3 },
                mt: { xs: 2, md: 4 },
                background: darkMode
                  ? "rgba(66, 71, 105, 0.3)"
                  : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                borderRadius: { xs: "24px", sm: "50px" },
                p: { xs: 0.8, sm: 1 },
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: `1px solid ${
                  darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                }`,
              }}
            >
              <Select
                value={"القاهرة"}
                sx={{
                  borderRadius: { xs: "20px", sm: "50px" },
                  minWidth: { xs: "100%", sm: "180px" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  textAlign: "right",
                  pr: 2,
                  color: theme.colors.text,
                  height: { xs: "46px", sm: "auto" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "15px",
                      mt: 1,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    },
                  },
                }}
              >
                <MenuItem value={"القاهرة"}>القاهرة</MenuItem>
                <MenuItem value={"الإسكندرية"}>الإسكندرية</MenuItem>
                <MenuItem value={"شرم الشيخ"}>شرم الشيخ</MenuItem>
                <MenuItem value={"الغردقة"}>الغردقة</MenuItem>
              </Select>

              <Button
                variant="contained"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  flex: { xs: "1 1 auto", sm: "0 0 auto" },
                  bgcolor: theme.colors.primary,
                  color: darkMode ? "#000" : "#fff",
                  borderRadius: { xs: "20px", sm: "50px" },
                  py: { xs: 1.2, sm: 1.5 },
                  px: { xs: 2, sm: 4 },
                  mt: { xs: 1, sm: 0 },
                  width: { xs: "100%", sm: "auto" },
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  "&:hover": {
                    bgcolor: darkMode ? "#F6B17A" : "#3B5898",
                  },
                }}
              >
                <SearchIcon sx={{ ml: 1 }} /> ابحث عن وجهتك
              </Button>
            </Box>

            {/* Stats */}
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "space-around", md: "space-between" },
                maxWidth: { xs: "100%", md: "450px" },
                mt: { xs: 3, md: 4 },
                px: { xs: 1, md: 0 },
                flexWrap: "wrap",
                gap: { xs: 2, sm: 0 },
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
                    color: theme.colors.primary,
                  }}
                >
                  +500
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    color: theme.colors.textSecondary,
                  }}
                >
                  مكان سياحي
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
                    color: theme.colors.primary,
                  }}
                >
                  +10k
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    color: theme.colors.textSecondary,
                  }}
                >
                  مستخدم سعيد
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
                    color: theme.colors.primary,
                  }}
                >
                  +25
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    color: theme.colors.textSecondary,
                  }}
                >
                  مدينة
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Hero image carousel with 3D effect */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 55%" },
              position: "relative",
              height: { xs: "250px", sm: "350px", md: "450px", lg: "500px" },
              width: "100%",
              perspective: "1000px",
              order: { xs: 1, md: 2 }, // Move image above text on mobile
              mx: "auto",
              maxWidth: { xs: "450px", md: "none" },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transform: { xs: "rotateY(-5deg)", md: "rotateY(-15deg)" },
                zIndex: 10,
              }}
            >
              <Slider
                {...{
                  ...sliderSettings,
                  autoplay: true,
                  autoplaySpeed: 4000,
                  fade: true,
                  cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: { xs: "20px", md: "30px" },
                  overflow: "hidden",
                  borderRadius: "25px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  border: `5px solid ${
                    darkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"
                  }`,
                }}
              >
                {renderImages}
              </Slider>

              {/* Decorative elements */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                sx={{
                  position: "absolute",
                  bottom: "-15px",
                  right: "-15px",
                  width: { xs: "50px", sm: "70px" },
                  height: { xs: "50px", sm: "70px" },
                  borderRadius: { xs: "15px", sm: "20px" },
                  background: theme.colors.primary,
                  zIndex: -1,
                  display: { xs: "none", sm: "block" },
                }}
              />
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                sx={{
                  position: "absolute",
                  top: "-20px",
                  left: "-20px",
                  width: { xs: "70px", sm: "100px" },
                  height: { xs: "70px", sm: "100px" },
                  borderRadius: { xs: "20px", sm: "30px" },
                  background: darkMode
                    ? "rgba(246, 177, 122, 0.2)"
                    : "rgba(74, 114, 172, 0.2)",
                  zIndex: -1,
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Bottom wave separator */}
        <Box
          sx={{
            position: "absolute",
            bottom: -2,
            left: 0,
            width: "100%",
            height: "120px",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{
              position: "absolute",
              bottom: 0,
              fill: darkMode ? theme.colors.background : "#fff",
            }}
          >
            <path d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,234.7C672,235,768,213,864,208C960,203,1056,213,1152,229.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </Box>
      </MainBox>
      {/* New Second Section Design - replace the current SecondBox section */}
      <Box
        sx={{
          width: "100%",
          py: { xs: 10, md: 12 },
          background: darkMode
            ? `linear-gradient(135deg, ${theme.colors.background}, ${theme.colors.card})`
            : "linear-gradient(135deg, #f5f7fa 0%, rgba(255,255,255,0.9) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Decorative elements */}
        <Box
          component={motion.div}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: { xs: "150px", md: "300px" },
            height: { xs: "150px", md: "300px" },
            borderRadius: "50%",
            border: `2px dashed ${theme.colors.primary}40`,
            zIndex: 0,
          }}
        />

        <Box
          component={motion.div}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            bottom: "5%",
            left: "10%",
            width: { xs: "100px", md: "200px" },
            height: { xs: "100px", md: "200px" },
            borderRadius: "50%",
            border: `2px dashed ${theme.colors.primary}30`,
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                sx={{ textAlign: "right" }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.2rem", md: "3rem" },
                    color: theme.colors.primary,
                    mb: 2,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  تجربة سفر لا مثيل لها
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -5,
                      left: "10%",
                      right: "10%",
                      height: 4,
                      borderRadius: 2,
                      background: `linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent)`,
                    }}
                  />
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    color: theme.colors.text,
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  مع فسحة، الرحلة أصبحت أسهل وأكثر متعة. نقدم لك تجربة سفر
                  متكاملة مصممة خصيصاً لتناسب اهتماماتك وتفضيلاتك.
                </Typography>

                <Grid container spacing={3} sx={{ mb: 5 }}>
                  {[
                    {
                      icon: <ExploreIcon sx={{ fontSize: 34 }} />,
                      title: "اكتشف أماكن جديدة",
                      description:
                        "أكثر من 500 وجهة سياحية رائعة في مصر والعالم العربي",
                      color: "#FF725E",
                    },
                    {
                      icon: <AutoAwesomeIcon sx={{ fontSize: 34 }} />,
                      title: "تجارب فريدة",
                      description:
                        "أنشطة وفعاليات متنوعة تناسب جميع الأذواق والاهتمامات",
                      color: "#4A72AC",
                    },
                    {
                      icon: <LocalOfferIcon sx={{ fontSize: 34 }} />,
                      title: "أسعار تنافسية",
                      description:
                        "عروض وخصومات حصرية على الرحلات والأنشطة المختلفة",
                      color: "#FFC15E",
                    },
                    {
                      icon: <StarIcon sx={{ fontSize: 34 }} />,
                      title: "تقييمات حقيقية",
                      description:
                        "آراء وتجارب المسافرين السابقين لتساعدك في اختيار الأفضل",
                      color: "#42B883",
                    },
                  ].map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        component={motion.div}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          textAlign: "right",
                          gap: 2.5,
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "16px",
                            backgroundColor: `${feature.color}15`,
                            color: feature.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            boxShadow: `0 8px 20px ${feature.color}20`,
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              mb: 1,
                              color: darkMode ? "#fff" : "#000",
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.colors.textSecondary,
                              lineHeight: 1.6,
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      backgroundColor: theme.colors.primary,
                      color: darkMode ? "#000" : "#fff",
                      fontSize: "1.1rem",
                      py: 1.5,
                      px: 4,
                      borderRadius: "50px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      "&:hover": {
                        backgroundColor: darkMode ? "#F6B17A" : "#3B5898",
                      },
                    }}
                    endIcon={<ArrowBackIosIcon sx={{ fontSize: "1rem" }} />}
                  >
                    استكشف الوجهات
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                sx={{ position: "relative" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "400px", md: "500px" },
                    width: "100%",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
                    transform: {
                      xs: "none",
                      md: "perspective(1000px) rotateY(-5deg)",
                    },
                  }}
                >
                  <Slider
                    {...{
                      dots: true,
                      infinite: true,
                      speed: 1000,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      autoplay: true,
                      autoplaySpeed: 5000,
                      fade: true,
                    }}
                  >
                    {images.map((img, i) => (
                      <Box
                        key={i}
                        sx={{
                          height: { xs: "400px", md: "500px" },
                          position: "relative",
                        }}
                      >
                        <Image
                          src={img}
                          alt={`Travel destination ${i + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(to top, ${
                              darkMode
                                ? "rgba(45,50,80,0.8)"
                                : "rgba(0,0,0,0.5)"
                            }, transparent 70%)`,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            padding: "30px",
                            textAlign: "right",
                            color: "#fff",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {
                              [
                                "استمتع بروعة الأقصر",
                                "شواطئ الغردقة الساحرة",
                                "سحر الإسكندرية",
                              ][i]
                            }
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              gap: 1,
                            }}
                          >
                            <Typography variant="body2">
                              {
                                [
                                  "رحلة تاريخية",
                                  "استرخاء والاستجمام",
                                  "ثقافة وترفيه",
                                ][i]
                              }
                            </Typography>
                            <Chip
                              label={["تاريخية", "شاطئية", "حضرية"][i]}
                              size="small"
                              sx={{
                                bgcolor: "rgba(255,255,255,0.2)",
                                color: "#fff",
                                backdropFilter: "blur(5px)",
                                fontWeight: "bold",
                                fontSize: "0.7rem",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Slider>
                </Box>

                {/* Interactive elements overlayed on the image */}
                <Box
                  component={motion.div}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  sx={{
                    position: "absolute",
                    top: "5%",
                    right: "10%",
                    padding: "12px",
                    borderRadius: "15px",
                    background: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    width: "150px",
                    zIndex: 5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        color: theme.colors.text,
                      }}
                    >
                      أماكن مقترحة
                    </Typography>
                    <AutoAwesomeIcon
                      sx={{ color: theme.colors.primary, fontSize: "1.1rem" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: theme.colors.textSecondary,
                      textAlign: "right",
                    }}
                  >
                    بناءً على تفضيلاتك السابقة
                  </Typography>
                </Box>

                <Box
                  component={motion.div}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  viewport={{ once: true }}
                  sx={{
                    position: "absolute",
                    bottom: "15%",
                    left: "5%",
                    padding: "12px",
                    borderRadius: "15px",
                    background: darkMode
                      ? "rgba(246, 177, 122, 0.2)"
                      : "rgba(74, 114, 172, 0.1)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    zIndex: 5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          color: theme.colors.text,
                          textAlign: "right",
                        }}
                      >
                        الطقس رائع للسفر!
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: theme.colors.textSecondary,
                          textAlign: "right",
                        }}
                      >
                        28° - مشمس ومناسب للرحلات
                      </Typography>
                    </Box>
                    <WbSunnyIcon sx={{ color: "#FFC107", fontSize: "2rem" }} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Third Section */}
      <Box
        sx={{
          width: "100%",
          background: darkMode
            ? `linear-gradient(135deg, ${theme.colors.background}, ${theme.colors.card})`
            : "linear-gradient(135deg, #f5f7fa 0%, rgba(255,255,255,0.8) 100%)",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: "-5%",
            right: "-10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.colors.primary}11, transparent 70%)`,
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.colors.primary}11, transparent 70%)`,
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box
                component={motion.div}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                sx={{ textAlign: "right" }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    mb: 3,
                    color: theme.colors.primary,
                    lineHeight: 1.2,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  رحلتك الفريدة
                  <span
                    style={{
                      display: "block",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    حسب اختيارك
                  </span>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -8,
                      right: 0,
                      width: "40%",
                      height: 4,
                      borderRadius: 2,
                      background: theme.colors.primary,
                      opacity: 0.8,
                    }}
                  />
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    color: theme.colors.text,
                    mb: 5,
                  }}
                >
                  صمم رحلتك الخاصة بنقرات بسيطة. مع فسحة، اختر المدن، حدد أوقات
                  الزيارة، واكتشف الأماكن المفضلة لديك، كل ذلك في مكان واحد!
                </Typography>

                <Grid container spacing={2} sx={{ mb: 5, direction: "rtl" }}>
                  {[
                    {
                      num: "01",
                      title: "حدد المكان",
                      desc: "اختر المدينة أو الوجهة التي ترغب بزيارتها",
                      color: "#FF725E",
                      icon: <ExploreIcon sx={{ fontSize: 28 }} />,
                    },
                    {
                      num: "02",
                      title: "اختر الأماكن",
                      desc: "تصفح واختر الأماكن التي تريد زيارتها من مختلف الفئات",
                      color: "#4A72AC",
                      icon: <AttractionsIcon sx={{ fontSize: 28 }} />,
                    },
                    {
                      num: "03",
                      title: "جدول الرحلة",
                      desc: "احصل على خطة متكاملة لرحلتك مع الاحداثيات والتوقيتات",
                      color: "#FFC15E",
                      icon: <EventAvailableIcon sx={{ fontSize: 28 }} />,
                    },
                  ].map((step, i) => (
                    <Grid item xs={12} sm={4} key={i}>
                      <Box
                        component={motion.div}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        viewport={{ once: true }}
                        sx={{
                          p: 3,
                          borderRadius: "16px",
                          height: "100%",
                          boxShadow: darkMode
                            ? "none"
                            : "0 4px 20px rgba(0,0,0,0.05)",
                          background: darkMode
                            ? "rgba(66, 71, 105, 0.4)"
                            : "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          position: "relative",
                          overflow: "hidden",
                          border: `1px solid ${
                            darkMode
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.05)"
                          }`,
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            p: 1.5,
                            color: "#fff",
                            background: step.color,
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            px: 2,
                            borderBottomLeftRadius: "8px",
                          }}
                        >
                          {step.num}
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 60,
                            height: 60,
                            borderRadius: "12px",
                            mb: 2,
                            ml: "auto",
                            mr: 0,
                            background: `${step.color}15`,
                            color: step.color,
                          }}
                        >
                          {step.icon}
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{
                            mb: 1.5,
                            fontWeight: "bold",
                            textAlign: "right",
                            color: theme.colors.text,
                          }}
                        >
                          {step.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: "right",
                            color: theme.colors.textSecondary,
                          }}
                        >
                          {step.desc}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ textAlign: "right" }}>
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="contained"
                    sx={{
                      backgroundColor: theme.colors.primary,
                      color: darkMode ? "#000" : "#fff",
                      px: 4,
                      py: 1.5,
                      borderRadius: "50px",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                      "&:hover": {
                        backgroundColor: darkMode ? "#F6B17A" : "#3B5898",
                      },
                    }}
                    endIcon={<ArrowBackIosIcon sx={{ fontSize: 16 }} />}
                  >
                    ابدأ رحلتك الآن
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box
                component={motion.div}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                sx={{
                  position: "relative",
                  height: { xs: "400px", md: "500px" },
                  width: "100%",
                  perspective: "1000px",
                }}
              >
                {/* Isometric design for trip planning concept */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transform: {
                      xs: "none",
                      md: "rotateX(10deg) rotateY(-10deg)",
                    },
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Main map/background */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                      border: `8px solid ${
                        darkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.8)"
                      }`,
                    }}
                  >
                    <Image
                      src={img4} // Use your map or destination image here
                      alt="Create your trip"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {/* Overlay with semi-transparent gradient */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${
                          darkMode
                            ? "rgba(45, 50, 80, 0.5)"
                            : "rgba(74, 114, 172, 0.3)"
                        } 0%, transparent 70%)`,
                      }}
                    />
                  </Box>

                  {/* Floating cards representing places */}
                  <Box
                    component={motion.div}
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    sx={{
                      position: "absolute",
                      top: "15%",
                      right: "10%",
                      width: "160px",
                      height: "220px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                      transform: "rotate(-5deg)",
                      zIndex: 3,
                    }}
                  >
                    <Image
                      src={img1} // Use one of your destination images
                      alt="Destination"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "40px 15px 15px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                        textAlign: "right",
                        color: "#fff",
                      }}
                    >
                      <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                        الأقصر
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: "0.8rem" }}>4.9</Typography>
                        <StarIcon
                          sx={{ fontSize: "0.9rem", color: "#FFC107" }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    component={motion.div}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    sx={{
                      position: "absolute",
                      bottom: "8%",
                      right: "32%",
                      width: "130px",
                      height: "180px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                      transform: "rotate(8deg)",
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src={img2} // Use one of your destination images
                      alt="Beach destination"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "40px 15px 15px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                        textAlign: "right",
                        color: "#fff",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
                      >
                        الغردقة
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: "0.7rem" }}>4.8</Typography>
                        <StarIcon
                          sx={{ fontSize: "0.8rem", color: "#FFC107" }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    component={motion.div}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    sx={{
                      position: "absolute",
                      top: "10%",
                      left: "35%",
                      width: "150px",
                      height: "200px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                      transform: "rotate(-10deg)",
                      zIndex: 2,
                    }}
                  >
                    <Image
                      src={img3} // Use one of your destination images
                      alt="Cultural destination"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "40px 15px 15px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                        textAlign: "right",
                        color: "#fff",
                      }}
                    >
                      <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                        الإسكندرية
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: "0.8rem" }}>4.7</Typography>
                        <StarIcon
                          sx={{ fontSize: "0.9rem", color: "#FFC107" }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* Path line connecting the destinations */}
                  {/* <Box
                    component={motion.div}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    viewport={{ once: true }}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 4,
                      pointerEvents: "none",
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 600 600"
                      style={{ position: "absolute", top: 0, left: 0 }}
                    >
                      <path
                        d="M650 150 Q 450 300 600 400 Q 400 450 300 250"
                        fill="none"
                        stroke={darkMode ? "#F6B17A" : "#4a72ac"}
                        strokeWidth="4"
                        strokeDasharray="12,8"
                        style={{
                          strokeDashoffset: "0",
                          strokeDasharray: "1000",
                          animation: "dash 5s ease-in-out infinite",
                        }}
                      />
                      <circle
                        cx="650"
                        cy="150"
                        r="8"
                        fill={darkMode ? "#F6B17A" : "#4a72ac"}
                      />
                      <circle
                        cx="600"
                        cy="400"
                        r="8"
                        fill={darkMode ? "#F6B17A" : "#4a72ac"}
                      />
                      <circle
                        cx="300"
                        cy="250"
                        r="8"
                        fill={darkMode ? "#F6B17A" : "#4a72ac"}
                      />
                    </svg>
                  </Box> */}

                  {/* User interface elements floating on top */}
                  <Box
                    component={motion.div}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                    sx={{
                      position: "absolute",
                      bottom: "15%",
                      left: "10%",
                      width: "180px",
                      padding: "15px",
                      borderRadius: "12px",
                      background: darkMode
                        ? "rgba(66, 71, 105, 0.8)"
                        : "rgba(255, 255, 255, 0.9)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                      backdropFilter: "blur(10px)",
                      zIndex: 5,
                      textAlign: "right",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        mb: 1,
                        color: theme.colors.text,
                      }}
                    >
                      أماكن مقترحة
                    </Typography>

                    {[1, 2, 3].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                          pb: 1,
                          borderBottom:
                            index < 2
                              ? `1px solid ${
                                  darkMode
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(0,0,0,0.05)"
                                }`
                              : "none",
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "8px",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={[img1, img2, img3][index % 3]}
                            alt="Place"
                            width={40}
                            height={40}
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                        <Box sx={{ flex: 1, ml: "auto" }}>
                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                              color: theme.colors.text,
                            }}
                          >
                            {["متحف المصري", "برج القاهرة", "الأهرامات"][index]}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <StarIcon
                              sx={{
                                fontSize: "0.6rem",
                                color: "#FFC107",
                                mr: 0.5,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "0.6rem",
                                color: theme.colors.textSecondary,
                              }}
                            >
                              {["4.8", "4.7", "4.9"][index]}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <CategoriesContainer
        style={{
          backgroundColor: darkMode ? theme.colors.background : undefined,
          padding: "80px 20px",
        }}
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <CategoriesTitle
          style={{
            color: theme.colors.primary,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            marginBottom: "60px",
          }}
          as={motion.h2}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span
            style={{
              WebkitBackgroundClip: "text",
              display: "inline-block",
            }}
          >
            أماكن هتفرحك وعمرك ما تنساها
          </span>
        </CategoriesTitle>

        {/* Add category filter options */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
          }}
        >
          {["الكل", "مطاعم", "سياحة", "ترفيه", "تسوق", "شواطئ"].map(
            (category) => (
              <Chip
                key={category}
                label={category}
                sx={{
                  background:
                    category === "الكل" ? theme.colors.primary : "transparent",
                  color: category === "الكل" ? "#fff" : theme.colors.text,
                  border: `1px solid ${theme.colors.primary}`,
                  fontSize: "0.95rem",
                  py: 2.5,
                  px: 1,
                  "&:hover": {
                    background: theme.colors.primary,
                    color: "#fff",
                  },
                }}
                clickable
              />
            )
          )}
        </Box>

        <CardsGrid
          as={motion.div}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {renderCategories}
        </CardsGrid>

        {/* View all places button */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            variant="outlined"
            sx={{
              color: theme.colors.primary,
              borderColor: theme.colors.primary,
              fontSize: "1.1rem",
              py: 1.2,
              px: 4,
              borderRadius: "50px",
              "&:hover": {
                borderColor: theme.colors.primary,
                backgroundColor: "rgba(74, 114, 172, 0.1)",
              },
            }}
          >
            عرض جميع الأماكن
          </Button>
        </Box>
      </CategoriesContainer>

      {/* Fourth Section */}
      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          margin: "60px auto",
          padding: { xs: "30px 20px", md: "50px 30px" },
          borderRadius: "20px",
          background: darkMode
            ? "rgba(66, 71, 105, 0.3)"
            : "rgba(245, 247, 250, 0.8)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
          position: "relative",
        }}
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: `linear-gradient(45deg, ${theme.colors.primary}33, ${theme.colors.primary}11)`,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `linear-gradient(45deg, ${theme.colors.primary}22, ${theme.colors.primary}05)`,
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: theme.colors.primary,
              fontWeight: "bold",
              mb: 5,
              fontSize: { xs: "1.8rem", md: "2.3rem" },
            }}
          >
            ابتكر رحلة أحلامك في دقائق
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <ExploreIcon sx={{ fontSize: 40 }} />,
                title: "اختر وجهتك",
                desc: "حدد المكان الذي ترغب في زيارته من بين مجموعة متنوعة من الوجهات",
              },
              {
                icon: <DateRangeIcon sx={{ fontSize: 40 }} />,
                title: "حدد التاريخ",
                desc: "اختر تاريخ سفرك وعدد الأيام التي تخطط لقضائها",
              },
              {
                icon: <MapIcon sx={{ fontSize: 40 }} />,
                title: "خطط مسارك",
                desc: "قم بإضافة الأماكن التي ترغب في زيارتها إلى جدول رحلتك",
              },
              {
                icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
                title: "احجز تجاربك",
                desc: "احجز الأماكن والتجارب مباشرة خلال رحلتك بضغطة زر واحدة",
              },
            ].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    padding: 3,
                    borderRadius: "16px",
                    height: "100%",
                    background: darkMode
                      ? "rgba(66, 71, 105, 0.3)"
                      : "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(5px)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      color: theme.colors.primary,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1.5,
                      fontWeight: "bold",
                      color: theme.colors.text,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: darkMode ? theme.colors.textSecondary : "#555",
                    }}
                  >
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.colors.primary,
                color: "#fff",
                fontSize: "1.1rem",
                py: 1.5,
                px: 5,
                borderRadius: "50px",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: theme.colors.primary,
                  boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
                  transform: "translateY(-3px)",
                },
              }}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              ابدأ خطتك الآن
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          py: { xs: 8, md: 12 },
          position: "relative",
          background: darkMode
            ? "linear-gradient(180deg, rgba(45, 50, 80, 0), rgba(66, 71, 105, 0.3))"
            : "linear-gradient(180deg, rgba(245, 247, 250, 0), rgba(245, 247, 250, 0.8))",
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background decorations */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.colors.primary}22, transparent 70%)`,
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            right: "8%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.colors.primary}15, transparent 70%)`,
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          {/* Section title */}
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
            <Typography
              component={motion.h2}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 800,
                color: theme.colors.primary,
                mb: 2,
                position: "relative",
                display: "inline-block",
              }}
            >
              ماذا يقول المسافرون عنا؟
              <Box
                sx={{
                  position: "absolute",
                  bottom: -10,
                  left: "10%",
                  right: "10%",
                  height: 4,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, transparent, ${theme.colors.primary}88, transparent)`,
                }}
              />
            </Typography>

            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
                color: theme.colors.textSecondary,
                maxWidth: "700px",
                mx: "auto",
              }}
            >
              استمع إلى تجارب المسافرين الحقيقية وقصصهم الملهمة مع فسحة
            </Typography>
          </Box>

          {/* Testimonial rating summary */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 6,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 3, sm: 6 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "3rem", sm: "4rem" },
                  fontWeight: 700,
                  color: theme.colors.primary,
                  lineHeight: 1,
                }}
              >
                4.9
              </Typography>
              <Rating
                value={4.9}
                precision={0.1}
                readOnly
                sx={{
                  color: theme.colors.primary,
                  fontSize: { xs: "1.5rem", sm: "1.75rem" },
                  my: 1,
                }}
              />
              <Typography
                sx={{
                  color: theme.colors.textSecondary,
                  fontSize: "0.9rem",
                }}
              >
                من 2,800+ تقييم
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", sm: "block" },
                mx: 2,
                borderColor: darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: { xs: "100%", sm: "auto" },
                maxWidth: "320px",
              }}
            >
              {/* Rating breakdown */}
              {[5, 4, 3, 2, 1].map((rating) => (
                <Box
                  key={rating}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Typography sx={{ minWidth: 25, color: theme.colors.text }}>
                    {rating}
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      height: 8,
                      bgcolor: darkMode
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        width: `${
                          rating === 5
                            ? 75
                            : rating === 4
                            ? 20
                            : rating === 3
                            ? 4
                            : 1
                        }%`,
                        bgcolor: theme.colors.primary,
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      minWidth: 40,
                      textAlign: "right",
                      color: theme.colors.textSecondary,
                      fontSize: "0.9rem",
                    }}
                  >
                    {rating === 5
                      ? "75%"
                      : rating === 4
                      ? "20%"
                      : rating === 3
                      ? "4%"
                      : "1%"}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Featured video testimonial */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            sx={{
              mb: 8,
              mx: "auto",
              maxWidth: "900px",
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                aspectRatio: "16/9",
                cursor: "pointer",
                "&:hover": {
                  "& .play-button": {
                    transform: "translate(-50%, -50%) scale(1.1)",
                    backgroundColor: theme.colors.primary,
                  },
                },
              }}
            >
              <Image
                src={Feedback}
                alt="Video Testimonial"
                layout="fill"
                objectFit="cover"
              />
              <Box
                className="play-button"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                }}
              >
                <PlayArrowIcon
                  sx={{
                    fontSize: "3rem",
                    color: theme.colors.primary,
                    transform: "translateX(2px)",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "100px 30px 30px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  color: "#fff",
                  textAlign: "right",
                }}
              >
                <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 1 }}>
                  فسحة لا تنسي إلى أسوان
                </Typography>
                <Typography sx={{ fontSize: "1rem", opacity: 0.9 }}>
                  محمد و عائلته — لحظات رائعة لمدة 5 أيام
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Testimonials carousel */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            sx={{ position: "relative" }}
          >
            <Swiper
              {...{
                slidesPerView: 1,
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                autoplay: {
                  delay: 5000,
                  disableOnInteraction: false,
                },
                pagination: {
                  clickable: true,
                  dynamicBullets: true,
                },
                breakpoints: {
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 3,
                    centeredSlides: false,
                  },
                },
                style: { padding: "30px 10px 60px" },
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={testimonial._id || index}>
                  <Box
                    component={motion.div}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    sx={{
                      bgcolor: darkMode ? "rgba(66, 71, 105, 0.4)" : "#fff",
                      borderRadius: "24px",
                      p: 3,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                      border: `1px solid ${
                        darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                      }`,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 2,
                        direction: "rtl",
                      }}
                    >
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{
                          width: 60,
                          height: 60,
                          border: `2px solid ${theme.colors.primary}`,
                        }}
                      />
                      <Box sx={{ textAlign: "right" }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            color: theme.colors.text,
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            color: theme.colors.textSecondary,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <LocationOnIcon sx={{ fontSize: "0.9rem" }} />
                          {testimonial.role || "القاهرة"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        borderLeft: `4px solid ${theme.colors.primary}`,
                        pl: 2,
                        py: 0.5,
                        mb: 2,
                        direction: "rtl",
                      }}
                    >
                      <Typography
                        sx={{
                          flex: 1,
                          fontSize: "1rem",
                          lineHeight: 1.6,
                          color: theme.colors.text,
                          opacity: 0.9,
                          mb: 3,
                        }}
                      >
                        {testimonial.review || testimonial.comment}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: theme.colors.textSecondary,
                        }}
                      >
                        {new Date(
                          Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString("ar-EG")}
                      </Typography>
                      <Rating
                        value={testimonial.rating || 5}
                        readOnly
                        size="small"
                      />
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Add testimonial button */}
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                position: "relative",
                width: "fit-content",
                mx: "auto",
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: theme.colors.primary,
                  borderColor: theme.colors.primary,
                  borderRadius: "50px",
                  px: 4,
                  py: 1,
                  fontSize: "1rem",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: theme.colors.primary,
                    backgroundColor: `${theme.colors.primary}11`,
                  },
                }}
                startIcon={<RateReviewIcon />}
              >
                أضف تجربتك مع فسحة
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Download Section */}
      <Box
        sx={{
          py: { xs: 10, md: 12 },
          px: { xs: 2, md: 4 },
          background: darkMode
            ? `linear-gradient(135deg, ${theme.colors.card} 0%, ${theme.colors.background} 100%)`
            : `linear-gradient(135deg, #F0F4FF 0%, #FFFFFF 100%)`,
          position: "relative",
          overflow: "hidden",
          borderRadius: "30px",
          mb: 8,
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background decorative elements */}
        <Box
          component={motion.div}
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          sx={{
            position: "absolute",
            top: "15%",
            right: "5%",
            width: { xs: "150px", md: "250px" },
            height: { xs: "150px", md: "250px" },
            borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
            background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.primary}05)`,
            zIndex: 0,
          }}
        />

        <Box
          component={motion.div}
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: { xs: "120px", md: "200px" },
            height: { xs: "120px", md: "200px" },
            borderRadius: "63% 37% 30% 70% / 50% 45% 55% 50%",
            background: `linear-gradient(135deg, ${theme.colors.primary}10, ${theme.colors.primary}02)`,
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "500px", md: "600px" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "30px",
                  }}
                >
                  {/* Phone mockup */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: { xs: "250px", md: "300px" },
                      height: { xs: "500px", md: "610px" },
                      borderRadius: "40px",
                      background: "#111",
                      boxShadow: "0 50px 100px rgba(0,0,0,0.25)",
                      overflow: "hidden",
                      border: "10px solid #111",
                      zIndex: 1,
                    }}
                  >
                    {/* Phone notch */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "120px",
                        height: "25px",
                        background: "#111",
                        borderBottomLeftRadius: "14px",
                        borderBottomRightRadius: "14px",
                        zIndex: 10,
                      }}
                    />

                    {/* App screenshot */}
                    <Box
                      component={motion.div}
                      initial={{ y: 590 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "30px",
                        background: darkMode
                          ? theme.colors.background
                          : "#f5f7fa",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {/* App UI mockup */}
                      <Box
                        sx={{
                          padding: "35px 5px 60px",
                          height: "100%",
                          overflowY: "scroll",
                          msOverflowStyle: "none", // IE and Edge
                          scrollbarWidth: "none", // Firefox
                          "&::-webkit-scrollbar": {
                            // Chrome, Safari, Opera
                            display: "none",
                          },
                        }}
                      >
                        {/* App header */}
                        <Box sx={{ textAlign: "right", mb: 2 }}>
                          <Typography
                            sx={{
                              fontSize: "1.4rem",
                              fontWeight: "bold",
                              color: theme.colors.text,
                            }}
                          >
                            أهلاً بك 👋
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                              color: theme.colors.textSecondary,
                            }}
                          >
                            اكتشف وجهتك التالية
                          </Typography>
                        </Box>

                        {/* Search box */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: "12px 15px",
                            borderRadius: "15px",
                            background: darkMode
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.05)",
                            mb: 2.5,
                          }}
                        >
                          <SearchIcon
                            sx={{ color: darkMode ? "#bbb" : "#777" }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                              color: darkMode ? "#bbb" : "#777",
                              flex: 1,
                              textAlign: "right",
                              mr: 1,
                            }}
                          >
                            ابحث عن وجهتك...
                          </Typography>
                        </Box>

                        {/* Destination section */}
                        <Box sx={{ mb: 2.5 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 1.5,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                color: theme.colors.primary,
                                fontWeight: 500,
                              }}
                            >
                              عرض الكل
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: theme.colors.text,
                              }}
                            >
                              وجهات مميزة
                            </Typography>
                          </Box>

                          {/* Scrollable destinations */}
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1.5,
                              overflowX: "auto",
                              pb: 1,
                              msOverflowStyle: "none",
                              scrollbarWidth: "none",
                              "&::-webkit-scrollbar": { display: "none" },
                            }}
                          >
                            {[img1, img2, img3].map((src, i) => (
                              <Box
                                key={i}
                                component={motion.div}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                sx={{
                                  width: "130px",
                                  flexShrink: 0,
                                  borderRadius: "18px",
                                  overflow: "hidden",
                                  position: "relative",
                                  height: "180px",
                                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                                }}
                              >
                                <Image
                                  src={src}
                                  alt="Destination"
                                  fill
                                  sizes="130px"
                                  style={{ objectFit: "cover" }}
                                />
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: "40px 15px 15px",
                                    background:
                                      "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                                    textAlign: "right",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: "#fff",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {["الأقصر", "الغردقة", "الإسكندرية"][i]}
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-end",
                                      gap: 0.5,
                                    }}
                                  >
                                    <Typography
                                      sx={{ fontSize: "0.7rem", color: "#fff" }}
                                    >
                                      {["4.9", "4.8", "4.7"][i]}
                                    </Typography>
                                    <StarIcon
                                      sx={{
                                        fontSize: "0.8rem",
                                        color: "#FFC107",
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </Box>

                        {/* Trip section */}
                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: "0.7rem",
                                color: theme.colors.primary,
                                fontWeight: "500",
                              }}
                            >
                              عرض الكل
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: darkMode ? "#fff" : "#000",
                              }}
                            >
                              رحلاتك القادمة
                            </Typography>
                          </Box>

                          <Box
                            component={motion.div}
                            whileInView={{ y: [20, 0], opacity: [0, 1] }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            sx={{
                              padding: "12px",
                              borderRadius: "16px",
                              background: darkMode
                                ? "rgba(246, 177, 122, 0.15)"
                                : "rgba(74, 114, 172, 0.1)",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "0.75rem",
                                  color: darkMode
                                    ? "rgba(255,255,255,0.7)"
                                    : "rgba(0,0,0,0.7)",
                                }}
                              >
                                2 أيام متبقية
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  fontWeight: "bold",
                                  color: darkMode ? "#fff" : "#000",
                                }}
                              >
                                رحلة إلى الغردقة
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <Box sx={{ textAlign: "right" }}>
                                <Typography
                                  sx={{
                                    fontSize: "0.7rem",
                                    color: darkMode
                                      ? "rgba(255,255,255,0.8)"
                                      : "rgba(0,0,0,0.8)",
                                  }}
                                >
                                  5 أماكن · 3 أيام
                                </Typography>
                              </Box>
                              <CalendarTodayIcon
                                sx={{
                                  fontSize: "1rem",
                                  color: darkMode
                                    ? "rgba(255,255,255,0.7)"
                                    : "rgba(0,0,0,0.6)",
                                }}
                              />
                            </Box>
                          </Box>

                          <Box
                            component={motion.div}
                            whileInView={{ y: [20, 0], opacity: [0, 1] }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            sx={{
                              padding: "12px",
                              borderRadius: "16px",
                              background: darkMode
                                ? "rgba(66, 71, 105, 0.5)"
                                : "rgba(0,0,0,0.05)",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "0.75rem",
                                  color: darkMode
                                    ? "rgba(255,255,255,0.7)"
                                    : "rgba(0,0,0,0.7)",
                                }}
                              >
                                بعد أسبوعين
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  fontWeight: "bold",
                                  color: darkMode ? "#fff" : "#000",
                                }}
                              >
                                رحلة إلى الأقصر
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <Box sx={{ textAlign: "right" }}>
                                <Typography
                                  sx={{
                                    fontSize: "0.7rem",
                                    color: darkMode
                                      ? "rgba(255,255,255,0.8)"
                                      : "rgba(0,0,0,0.8)",
                                  }}
                                >
                                  8 أماكن · 5 أيام
                                </Typography>
                              </Box>
                              <CalendarTodayIcon
                                sx={{
                                  fontSize: "1rem",
                                  color: darkMode
                                    ? "rgba(255,255,255,0.7)"
                                    : "rgba(0,0,0,0.6)",
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: "0.7rem",
                                color: theme.colors.primary,
                                fontWeight: "500",
                              }}
                            >
                              عرض الكل
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: darkMode ? "#fff" : "#000",
                              }}
                            >
                              اكتشف المطاعم
                            </Typography>
                          </Box>

                          <Box
                            component={motion.div}
                            whileInView={{ x: [-50, 0] }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            sx={{
                              display: "flex",
                              gap: 1.5,
                              overflowX: "auto",
                              pb: 1,
                              msOverflowStyle: "none",
                              scrollbarWidth: "none",
                              "&::-webkit-scrollbar": {
                                display: "none",
                              },
                            }}
                          >
                            {[1, 2, 3].map((i) => (
                              <Box
                                key={i}
                                sx={{
                                  width: "130px",
                                  flexShrink: 0,
                                  borderRadius: "16px",
                                  overflow: "hidden",
                                  background: darkMode
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(0,0,0,0.03)",
                                  padding: "8px",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "100%",
                                    height: "90px",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    mb: 1,
                                    position: "relative",
                                  }}
                                >
                                  <Image
                                    src={[img1, img2, img3][i - 1]}
                                    alt="Restaurant"
                                    fill
                                    sizes="140px"
                                    style={{ objectFit: "cover" }}
                                  />
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    textAlign: "right",
                                    mb: 0.5,
                                    color: darkMode ? "#fff" : "#000",
                                  }}
                                >
                                  {
                                    [
                                      "مطعم النيل",
                                      "كافيه البحر",
                                      "وادي الريحان",
                                    ][i - 1]
                                  }
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "0.7rem",
                                      color: darkMode
                                        ? "rgba(255,255,255,0.7)"
                                        : "rgba(0,0,0,0.7)",
                                    }}
                                  >
                                    $$
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: "0.65rem",
                                        color: darkMode
                                          ? "rgba(255,255,255,0.8)"
                                          : "rgba(0,0,0,0.8)",
                                      }}
                                    >
                                      {["4.8", "4.7", "4.9"][i - 1]}
                                    </Typography>
                                    <StarIcon
                                      sx={{
                                        fontSize: "0.7rem",
                                        color: "#FFC107",
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </Box>

                        {/* Bottom navigation */}
                        <Box
                          sx={{
                            position: "absolute",
                            borderRadius: "25px",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "65px",
                            background: darkMode
                              ? "rgba(45, 50, 80, 0.95)"
                              : "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            borderTop: `1px solid ${
                              darkMode
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(0,0,0,0.05)"
                            }`,
                          }}
                        >
                          {[
                            { icon: <PersonIcon />, label: "حسابي" },
                            { icon: <FavoriteIcon />, label: "المفضلة" },
                            { icon: <AddIcon />, label: "", primary: true },
                            {
                              icon: <ExploreIcon />,
                              label: "استكشف",
                              active: true,
                            },
                            { icon: <HomeIcon />, label: "الرئيسية" },
                          ].map((item, i) => (
                            <Box
                              key={i}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: item.active
                                  ? theme.colors.primary
                                  : darkMode
                                  ? "rgba(255,255,255,0.5)"
                                  : "rgba(0,0,0,0.4)",
                                ...(item.primary && {
                                  width: "45px",
                                  height: "45px",
                                  borderRadius: "50%",
                                  background: theme.colors.primary,
                                  color: darkMode ? "#000" : "#fff",
                                  transform: "translateY(-10px)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                }),
                              }}
                            >
                              <Box
                                sx={{
                                  fontSize: item.primary ? "1.3rem" : "1.1rem",
                                }}
                              >
                                {item.icon}
                              </Box>
                              {!item.primary && (
                                <Typography
                                  sx={{ fontSize: "0.65rem", mt: 0.3 }}
                                >
                                  {item.label}
                                </Typography>
                              )}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>

                    {/* Background elements for phone */}
                    <Box
                      component={motion.div}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      sx={{
                        position: "absolute",
                        bottom: "-5%",
                        right: "5%",
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        border: `2px solid ${theme.colors.primary}20`,
                        zIndex: -1,
                      }}
                    />
                  </Box>
                  {/* Decorative dots */}
                  <Box
                    component={motion.div}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    sx={{
                      position: "absolute",
                      top: "-10%",
                      left: 0,
                      width: "100px",
                      height: "100px",
                      opacity: 0.5,
                      zIndex: -1,
                    }}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <pattern
                        id="dots"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle
                          cx="5"
                          cy="5"
                          r="2"
                          fill={theme.colors.primary}
                        />
                      </pattern>
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#dots)"
                      />
                    </svg>
                  </Box>

                  {/* Decorative circle */}
                  <Box
                    component={motion.div}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    sx={{
                      position: "absolute",
                      bottom: "-5%",
                      right: "5%",
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: `2px solid ${theme.colors.primary}20`,
                      zIndex: -1,
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                sx={{ textAlign: "right", px: { xs: 2, md: 4 } }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    mb: 3,
                    color: theme.colors.primary,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  قم بتحميل تطبيق فسحة
                  <span
                    style={{
                      display: "block",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    لتجربة رحلة لا تُنسى
                  </span>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -10,
                      right: 0,
                      width: "60%",
                      height: 4,
                      borderRadius: 2,
                      background: theme.colors.primary,
                    }}
                  />
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 400,
                    color: theme.colors.textSecondary,
                    mb: 4,
                    maxWidth: "600px",
                    lineHeight: 1.7,
                  }}
                >
                  تطبيق فسحة سهل الاستخدام يتيح لك التخطيط لرحلاتك والحجز بسهولة
                  من أي مكان. اكتشف أماكن جديدة ونظم جدول رحلاتك وتمتع بتجربة
                  سفر لا تنسى!
                </Typography>

                <Grid container spacing={3} sx={{ mb: 5 }}>
                  {[
                    {
                      icon: <TravelExploreIcon sx={{ fontSize: 30 }} />,
                      title: "اكتشاف وتخطيط",
                      desc: "استكشف الوجهات السياحية المميزة ونظم جدول رحلتك بسهولة",
                      color: "#FF725E",
                    },
                    {
                      icon: <LocationOnIcon sx={{ fontSize: 30 }} />,
                      title: "خرائط وإرشادات",
                      desc: "خرائط تفاعلية مع إرشادات تفصيلية للوصول إلى أي مكان",
                      color: "#4A72AC",
                    },
                    {
                      icon: <NotificationsIcon sx={{ fontSize: 30 }} />,
                      title: "إشعارات وتذكيرات",
                      desc: "تنبيهات مخصصة عن الرحلات والعروض والتجارب الجديدة",
                      color: "#FFC15E",
                    },
                    {
                      icon: <BookmarkIcon sx={{ fontSize: 30 }} />,
                      title: "حفظ التجارب",
                      desc: "احفظ الأماكن المفضلة والتجارب التي تنوي زيارتها مستقبلاً",
                      color: "#42B883",
                    },
                  ].map((feature, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box
                        component={motion.div}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * i }}
                        viewport={{ once: true }}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                          textAlign: "right",
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: "15px",
                            background: `${feature.color}15`,
                            color: feature.color,
                            mt: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "1.1rem",
                              fontWeight: "bold",
                              mb: 1,
                              color: theme.colors.text,
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.9rem",
                              color: theme.colors.textSecondary,
                              lineHeight: 1.5,
                            }}
                          >
                            {feature.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box
                  component={motion.div}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.15rem",
                        mb: 2.5,
                        color: theme.colors.text,
                      }}
                    >
                      حمل التطبيق الآن واستمتع بتجربة سفر فريدة!
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        component={motion.a}
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                          backgroundColor: "#000",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          padding: "12px 20px",
                          borderRadius: "15px",
                          textTransform: "none",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                          "&:hover": {
                            backgroundColor: "#000",
                          },
                        }}
                      >
                        <AppleIcon sx={{ fontSize: 40 }} />
                        <Box sx={{ textAlign: "right" }}>
                          <Typography sx={{ fontSize: "0.7rem", opacity: 0.8 }}>
                            حمل التطبيق من
                          </Typography>
                          <Typography
                            sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                          >
                            أبل ستور
                          </Typography>
                        </Box>
                      </Button>

                      <Button
                        component={motion.a}
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                          backgroundColor: "#4285F4",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          padding: "12px 20px",
                          borderRadius: "15px",
                          textTransform: "none",
                          boxShadow: "0 8px 25px rgba(66,133,244,0.25)",
                          "&:hover": {
                            backgroundColor: "#4285F4",
                          },
                        }}
                      >
                        <Image
                          src={googlePlayIcon}
                          alt="Google Play"
                          width={28}
                          height={28}
                          style={{ width: "auto", height: "auto" }}
                        />
                        <Box sx={{ textAlign: "left" }}>
                          <Typography sx={{ fontSize: "0.7rem", opacity: 0.8 }}>
                            حمل التطبيق من
                          </Typography>
                          <Typography
                            sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                          >
                            جوجل بلاي
                          </Typography>
                        </Box>
                      </Button>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 3,
                      mt: 4,
                      p: 3,
                      borderRadius: "20px",
                      background: darkMode
                        ? "rgba(66, 71, 105, 0.3)"
                        : "rgba(245, 247, 250, 0.7)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            color: theme.colors.text,
                          }}
                        >
                          تقييم المستخدمين
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.9rem",
                              fontWeight: "bold",
                              color: theme.colors.text,
                            }}
                          >
                            4.8/5
                          </Typography>
                          <Rating
                            value={4.8}
                            precision={0.1}
                            readOnly
                            size="small"
                          />
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              color: theme.colors.textSecondary,
                            }}
                          >
                            (2.8k+)
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: darkMode
                            ? "rgba(246, 177, 122, 0.2)"
                            : "rgba(74, 114, 172, 0.1)",
                          color: theme.colors.primary,
                        }}
                      >
                        <StarIcon sx={{ fontSize: 30 }} />
                      </Box>
                    </Box>

                    <Box sx={{ width: "100%" }}>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          mb: 1,
                          textAlign: "right",
                          color: theme.colors.text,
                        }}
                      >
                        ماذا يقول المستخدمون عن التطبيق؟
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "flex-end",
                        }}
                      >
                        {[
                          "سهل الاستخدام",
                          "تصميم رائع",
                          "عروض مميزة",
                          "توصيات دقيقة",
                          "دعم فني ممتاز",
                        ].map((tag, i) => (
                          <Chip
                            key={i}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: darkMode
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(74, 114, 172, 0.1)",
                              color: theme.colors.text,
                              fontWeight: "medium",
                              backdropFilter: "blur(5px)",
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          background: darkMode
            ? `linear-gradient(180deg, ${theme.colors.background}, ${theme.colors.textSecondary})`
            : `linear-gradient(180deg, #f5f7fa, ${theme.colors.accent})`,
          color: darkMode ? "#fff" : "#000",
          position: "relative",
          overflow: "hidden",
          pt: { xs: 10, md: 12 },
          pb: { xs: 4, md: 4 },
        }}
      >
        {/* Wave Top Separator */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "150px",
            zIndex: 1,
            transform: "translateY(-60%)",
          }}
        >
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              top: 0,
              fill: darkMode ? theme.colors.background : "#fff",
            }}
          >
            <path d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,133.3C960,107,1056,85,1152,101.3C1248,117,1344,171,1392,197.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </Box>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "5%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: darkMode
              ? "rgba(246, 177, 122, 0.05)"
              : "rgba(74, 114, 172, 0.05)",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "30%",
            right: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: darkMode
              ? "rgba(246, 177, 122, 0.03)"
              : "rgba(74, 114, 172, 0.03)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={4}>
            {/* Main section with logo and description */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: { xs: "center", md: "right" }, mb: 3 }}>
                {/* Logo Section */}
                <Box sx={{ display: "inline-block", mb: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", fontFamily: "cursive", p: 2 }}
                  >
                    {/* website svg - keep the existing SVG */}
                    <svg
                      width="250"
                      height="60"
                      viewBox="0 0 298 108"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_59_429)">
                        <path
                          d="M40.017 34.4603C39.5258 35.0761 37.7495 35.9912 34.6938 37.2013C34.5339 35.4866 33.7856 33.9087 32.4377 32.4677C31.4724 31.4585 31.2783 30.5948 31.8494 29.8849C32.3063 29.3162 35.1678 28.6791 40.4339 27.9735C40.1198 28.4139 39.9827 28.9399 40.017 29.5514C40.0513 30.1629 40.1084 30.7701 40.1941 31.3687C40.274 31.9717 40.3426 32.5447 40.3825 33.0963C40.4225 33.6522 40.3026 34.1054 40.017 34.4603Z"
                          fill={darkMode ? "#FFFFFF" : "#2C3250"}
                        />
                        <path
                          d="M50.2807 39.0571C49.7895 39.6729 48.0132 40.588 44.9575 41.7981C44.7975 40.0834 44.0493 38.5055 42.7014 37.0645C41.7361 36.0553 41.5419 35.1916 42.1131 34.4817C42.57 33.913 45.4315 33.2759 50.6976 32.5746C50.3835 33.015 50.2464 33.541 50.2807 34.1525C50.3149 34.7639 50.3721 35.3712 50.4577 35.9698C50.5377 36.5727 50.6062 37.1457 50.6462 37.6973C50.6862 38.249 50.5663 38.7022 50.2807 39.0571Z"
                          fill={darkMode ? "#FFFFFF" : "#2C3250"}
                        />
                        <path
                          d="M158.761 102.429C157.619 102.959 156.174 103.224 154.432 103.224C141.752 103.224 130.963 99.5169 122.07 92.1022H79.25V81.2708H112.966L105.215 71.7394C103.29 69.379 101.308 67.6472 99.2634 66.5397C97.2187 65.4322 95.2368 64.8806 93.312 64.8806C90.7246 64.8806 88.143 65.4108 85.5613 66.4713L101.965 53.3266C105.809 50.2478 108.636 48.7041 110.441 48.7041C111.823 48.7041 113.685 50.5813 116.027 54.3357L132.882 81.2751H153.164V92.1064H140.633C143.637 95.429 147.755 98.1999 152.981 100.411C154.557 100.795 156.477 101.467 158.761 102.429Z"
                          fill={darkMode ? "#FFFFFF" : "#2C3250"}
                        />
                        <path
                          d="M237.004 92.1021H146.864V81.2708H159.486L158.767 80.0436C157.687 78.2134 155.762 76.7681 152.998 75.7119L164.804 66.3216L174.091 81.2708H184.189L179.5 73.8304C178.295 72.0002 176.376 70.5549 173.731 69.4987L185.537 60.1084L198.605 81.2708H208.703L200.05 67.4761C198.845 65.646 196.926 64.2006 194.281 63.1444L206.093 53.7542L223.039 81.2708H237.01V92.1021H237.004Z"
                          fill={darkMode ? "#FFFFFF" : "#2C3250"}
                        />
                        <path
                          d="M286.769 64.5897L278.293 51.1542C275.706 47.062 274.415 44.1243 274.415 42.3412C274.415 40.8488 274.838 38.9716 275.677 36.7096L244.212 61.9899C240.842 64.6838 239.163 67.0185 239.163 68.9898C239.163 71.7351 240.877 74.4333 244.304 77.0802L256.201 86.2524C259.862 89.0447 261.695 90.9946 261.695 92.0978C261.695 93.4491 260.525 94.1204 258.177 94.1204C257.395 94.1204 254.425 91.9824 249.25 87.6977C244.812 84.016 240.722 81.9122 236.993 81.399C236.382 81.3135 235.782 81.2708 235.188 81.2708H230.681V92.1021H235.456C237.084 92.1021 238.975 92.6323 241.134 93.6928C243.298 94.7533 245.383 96.0532 247.394 97.5926C249.41 99.132 251.163 100.757 252.671 102.467C254.173 104.174 255.104 105.709 255.464 107.051L283.862 85.0936C288.369 81.6299 290.619 77.8969 290.619 73.903C290.636 71.7864 289.345 68.6777 286.769 64.5897ZM272.61 85.3159C272.61 85.2176 272.627 85.0979 272.656 84.9567C272.69 84.8114 272.702 84.666 272.702 84.5206C272.644 83.7979 272.462 83.0154 272.165 82.173C271.868 81.3306 271.234 80.2146 270.274 78.812L263.597 68.9898C262.152 66.9202 261.433 65.1884 261.433 63.7901C261.433 61.8658 263.535 59.5097 267.744 56.7132C267.681 56.9526 267.641 57.3289 267.607 57.8335C267.578 58.3381 267.561 58.9752 267.561 59.7449C267.561 60.613 267.984 61.652 268.823 62.8494L276.397 74.3307C277.596 76.1608 278.202 77.7045 278.202 78.9531C278.202 80.4968 276.34 82.6177 272.61 85.3159Z"
                          fill={darkMode ? "#FFFFFF" : "#2C3250"}
                        />
                        <path
                          d="M291.23 10.3047C288.346 3.86921 279.327 -0.0990055 270.423 1.1881C264.608 2.03049 260.222 4.42082 257.452 8.33345C254.996 11.7971 254.527 15.3976 256.658 19.0964C257.84 21.1489 259.257 23.0988 260.856 24.9803C264.083 28.7774 267.761 32.3181 271.656 35.7389C272.342 36.3419 273.05 36.9362 273.77 37.5563C273.861 37.4707 273.918 37.4194 273.975 37.3681C277.397 34.4732 280.652 31.4757 283.651 28.3285C286.232 25.6174 288.654 22.838 290.465 19.7848C291.276 18.4207 291.961 17.0225 292.15 15.5258C292.372 13.7384 291.99 12.0023 291.23 10.3047ZM273.764 20.5203C268.686 20.5246 264.494 17.3859 264.506 13.593C264.523 9.77877 268.686 6.67432 273.775 6.6786C278.859 6.68715 282.983 9.77876 282.988 13.5845C283 17.4116 278.865 20.516 273.764 20.5203Z"
                          fill={
                            darkMode ? "#FFFFFF" : "url(#paint0_linear_59_429)"
                          }
                        />
                        <path
                          d="M296.062 40.0749C294.754 41.3706 292.978 42.2087 291.076 42.9142C288.009 44.0517 284.753 44.7187 281.389 45.1292C278.43 45.4927 275.449 45.6509 272.45 45.574C267.213 45.4371 262.107 44.8043 257.286 43.1922C255.224 42.5037 253.288 41.6656 251.792 40.3614C251.003 39.6729 250.461 38.899 250.387 37.9753C250.284 36.6711 251.083 35.6919 252.42 34.9265C253.836 34.114 255.493 33.6907 257.195 33.37C259.811 32.874 262.478 32.6217 265.162 32.4806C265.311 32.472 265.465 32.472 265.608 32.4421C266.111 32.3437 266.39 32.5148 266.568 32.844C265.208 33.0193 263.849 33.1647 262.512 33.3657C259.942 33.7548 257.412 34.2637 255.15 35.2985C254.436 35.6235 253.779 36.0639 253.237 36.5386C252.528 37.1586 252.591 37.8471 253.225 38.5184C253.813 39.1384 254.642 39.5404 255.516 39.891C257.635 40.742 259.925 41.1995 262.255 41.5544C267.241 42.3113 272.279 42.4866 277.345 42.2856C281.309 42.1317 285.233 41.7383 289.031 40.8232C290.402 40.494 291.733 40.0963 292.921 39.4763C293.332 39.2582 293.726 39.0102 294.069 38.7322C294.994 37.9796 295 37.1287 294.115 36.3462C293.435 35.7432 292.567 35.3284 291.636 34.9821C289.391 34.1354 286.986 33.6479 284.525 33.2973C283.342 33.1305 282.143 33.0022 280.932 32.8526C281.155 32.4848 281.475 32.3908 281.983 32.4421C284.233 32.6773 286.49 32.8483 288.734 33.1049C290.271 33.2802 291.773 33.5966 293.184 34.0969C293.818 34.3193 294.44 34.5716 295.011 34.8752C297.444 36.1623 297.861 38.2875 296.062 40.0749Z"
                          fill={
                            darkMode ? "#FFFFFF" : "url(#paint1_linear_59_429)"
                          }
                        />
                        <path
                          d="M84.3674 81.2707H72.0874C71.8361 81.2707 71.6077 81.1681 71.4992 80.9971L59.4134 62.2036C55.2097 55.6527 53.1078 51.3937 53.1078 49.4224C53.1078 47.387 53.4962 45.2831 54.2787 43.1066C54.3072 43.0211 55.9522 40.5923 55.9522 40.5923C55.9522 40.5923 61.3382 33.9258 61.5553 33.6564C61.7323 33.4384 62.0522 33.2117 62.3777 33.1433C65.0508 32.5361 65.8047 30.5349 63.9256 28.957C62.8061 28.012 60.7328 27.764 59.3163 28.4011C57.957 29.0126 57.5629 30.1714 58.1797 31.5227C58.2882 31.7664 58.2254 32.147 58.0483 32.3693C53.7989 37.6974 49.5266 43.0125 45.2487 48.3277C45.1516 48.4475 18.2157 80.7704 18.3756 80.8474L18.3699 80.856C18.7183 81.0441 22.2252 83.0026 22.2309 86.479C22.2366 89.9469 18.7697 91.9054 18.4156 92.0978H84.3731C84.7329 92.0978 85.0242 91.884 85.0242 91.6103V81.7539C84.8015 81.6 84.5844 81.4332 84.3674 81.2707ZM52.4167 81.3263C52.1254 81.3392 51.8284 81.3434 51.5314 81.3434H47.0192C46.3224 81.3434 45.5628 81.3263 44.746 81.2878C44.5119 81.2793 44.2948 81.1767 44.1977 81.0185L40.1253 74.7711C39.0459 73.1333 38.4975 71.688 38.4975 70.4351C38.4975 70.0546 38.7831 69.5329 39.36 68.8829C39.9312 68.2329 40.5594 67.583 41.2505 66.9373C41.9359 66.2873 42.587 65.7186 43.1868 65.2397C43.3181 65.1371 43.4838 65.0857 43.6551 65.0857C43.9521 65.0857 44.2491 65.2439 44.3062 65.5048C44.6261 67.0143 45.5742 68.9984 47.1563 71.4528L52.9764 80.6336C53.1649 80.9415 52.8736 81.3092 52.4167 81.3263Z"
                          fill={darkMode ? "#FFFFFF" : "#2C3250"}
                        />
                        <path
                          d="M46.6881 43.4743C36.3786 55.8579 26.1263 68.173 15.8169 80.5566C13.3209 79.2652 2.87441 75.0276 1.55503 72.7784C0.498385 70.9696 0.549788 69.225 1.94913 67.5402C6.12431 62.5158 10.3109 57.4999 14.4861 52.4755C17.913 48.3619 21.3686 44.2569 24.7555 40.1262C26.4062 38.1121 28.7594 37.2312 31.8151 37.4237C32.7061 37.4792 33.6428 37.6546 34.431 37.9624C36.0188 38.5868 45.0945 42.7474 46.6881 43.4743Z"
                          fill={
                            darkMode ? "#FFFFFF" : "url(#paint2_linear_59_429)"
                          }
                        />
                        <path
                          d="M20.0206 86.6372C20.0092 88.7924 17.6446 90.5413 14.7374 90.5328C11.7502 90.5242 9.35132 88.7411 9.32276 86.5004C9.2942 84.3068 11.7331 82.4552 14.6288 82.4638C17.6731 82.4809 20.032 84.3068 20.0206 86.6372Z"
                          fill={darkMode ? "#FFFFFF" : "#2C3250"}
                        />
                        <path
                          d="M279.818 13.7555C279.807 16.1929 277.134 18.1642 273.85 18.1556C270.474 18.1471 267.767 16.1288 267.733 13.6016C267.698 11.1257 270.451 9.03044 273.73 9.04327C277.163 9.06038 279.83 11.1214 279.818 13.7555Z"
                          fill={darkMode ? "#FFFFFF" : "#2C3250"}
                        />
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_59_429"
                          x1="255.301"
                          y1="19.2536"
                          x2="292.213"
                          y2="19.2536"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F6B179" />
                          <stop offset="1" stopColor="#2C3250" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_59_429"
                          x1="250.376"
                          y1="39.0057"
                          x2="297.174"
                          y2="39.0057"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F6B179" />
                          <stop offset="1" stopColor="#2C3250" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_59_429"
                          x1="0.823603"
                          y1="58.9782"
                          x2="46.688"
                          y2="58.9782"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F6B179" />
                          <stop offset="1" stopColor="#2C3250" />
                        </linearGradient>
                        <clipPath id="clip0_59_429">
                          <rect
                            width="296.348"
                            height="106.105"
                            fill="white"
                            transform="translate(0.823486 0.946289)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    mb: 3,
                    color: darkMode
                      ? theme.colors.textSecondary
                      : theme.colors.textSecondary,
                    fontSize: "1rem",
                    maxWidth: { xs: "100%", md: "90%" },
                  }}
                >
                  منصة فسحة هي وجهتك الأولى لتخطيط رحلاتك بسهولة. اكتشف أفضل
                  الأماكن، ونظم جدولك، واستمتع بتجربة سفر لا تُنسى في مصر
                  والعالم العربي.
                </Typography>

                {/* Social media icons */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: { xs: "center", md: "flex-end" },
                    mb: 4,
                  }}
                >
                  {[
                    { icon: <FacebookIcon />, color: "#1877F2" },
                    { icon: <TwitterIcon />, color: "#1DA1F2" },
                    { icon: <InstagramIcon />, color: "#E4405F" },
                    { icon: <YouTubeIcon />, color: "#FF0000" },
                    { icon: <TelegramIcon />, color: "#0088cc" },
                  ].map((item, index) => (
                    <IconButton
                      key={index}
                      component={motion.button}
                      whileHover={{ y: -5, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      sx={{
                        backgroundColor: darkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.8)",
                        color: item.color,
                        "&:hover": {
                          backgroundColor: item.color,
                          color: "#fff",
                        },
                      }}
                      size="small"
                    >
                      {item.icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Footer links */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                {/* Contact Info */}
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 3,
                        color: darkMode ? "#fff" : "#000",
                        position: "relative",
                        display: "inline-block",
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          bottom: -8,
                          right: 0,
                          width: "40px",
                          height: "3px",
                          backgroundColor: theme.colors.primary,
                          borderRadius: "3px",
                        },
                      }}
                    >
                      تواصل معنا
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: { xs: "center", md: "flex-end" },
                          gap: 1,
                          mb: 1.5,
                          color: darkMode ? "rgba(255,255,255,0.8)" : "#333",
                        }}
                      >
                        <PhoneIcon
                          fontSize="small"
                          sx={{ color: theme.colors.primary }}
                        />
                        +02 255 345
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: { xs: "center", md: "flex-end" },
                          gap: 1,
                          mb: 1.5,
                          color: darkMode ? "rgba(255,255,255,0.8)" : "#333",
                        }}
                      >
                        <MailIcon
                          fontSize="small"
                          sx={{ color: theme.colors.primary }}
                        />
                        Fusha@gmail.com
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: { xs: "center", md: "flex-end" },
                          gap: 1,
                          color: darkMode ? "rgba(255,255,255,0.8)" : "#333",
                        }}
                      >
                        <LocationOnIcon
                          fontSize="small"
                          sx={{ color: theme.colors.primary }}
                        />
                        Menofia @ ITI
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Quick Links */}
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 3,
                        color: darkMode ? "#fff" : "#000",
                        position: "relative",
                        display: "inline-block",
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          bottom: -8,
                          right: 0,
                          width: "40px",
                          height: "3px",
                          backgroundColor: theme.colors.primary,
                          borderRadius: "3px",
                        },
                      }}
                    >
                      روابط سريعة
                    </Typography>

                    <Box
                      component="ul"
                      sx={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {[
                        { text: "الرئيسية", link: "/" },
                        { text: "إنشاء رحلة", link: "/create" },
                        { text: "استكشاف", link: "/explore" },
                        { text: "من نحن", link: "/about" },
                        { text: "الأسئلة الشائعة", link: "/faq" },
                      ].map((item, index) => (
                        <Box component="li" key={index} sx={{ mb: 1.5 }}>
                          <Link href={item.link} passHref>
                            {/* Remove component="a" since Link already creates an anchor tag */}
                            <Box
                              sx={{
                                color: darkMode
                                  ? "rgba(255,255,255,0.7)"
                                  : "#555",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: {
                                  xs: "center",
                                  md: "flex-end",
                                },
                                gap: 0.5,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  color: theme.colors.primary,
                                  transform: "translateX(-5px)",
                                },
                                cursor: "pointer", // Add this to maintain the clickable appearance
                              }}
                            >
                              {item.text}
                              <ArrowBackIosNewIcon
                                sx={{ fontSize: "0.7rem" }}
                              />
                            </Box>
                          </Link>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Grid>

                {/* App Links */}
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 3,
                        color: darkMode ? "#fff" : "#000",
                        position: "relative",
                        display: "inline-block",
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          bottom: -8,
                          right: 0,
                          width: "40px",
                          height: "3px",
                          backgroundColor: theme.colors.primary,
                          borderRadius: "3px",
                        },
                      }}
                    >
                      تطبيق فسحة
                    </Typography>

                    <Typography
                      sx={{
                        mb: 2,
                        fontSize: "0.9rem",
                        color: darkMode ? "rgba(255,255,255,0.7)" : "#555",
                      }}
                    >
                      حمل تطبيق فسحة الآن واستمتع بتجربة أفضل
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignItems: { xs: "center", md: "flex-end" },
                      }}
                    >
                      <Box
                        component={motion.a}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          bgcolor: "#000",
                          color: "#fff",
                          borderRadius: "12px",
                          px: 2,
                          py: 1,
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                          width: "fit-content",
                        }}
                      >
                        <AppleIcon sx={{ fontSize: "2rem" }} />
                        <Box sx={{ textAlign: "right" }}>
                          <Typography sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                            حمل التطبيق من
                          </Typography>
                          <Typography
                            sx={{ fontSize: "1rem", fontWeight: 600 }}
                          >
                            أبل ستور
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        component={motion.a}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          bgcolor: "#4285F4",
                          color: "#fff",
                          borderRadius: "12px",
                          px: 2,
                          py: 1,
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                          width: "fit-content",
                        }}
                      >
                        <Image
                          src={googlePlayIcon}
                          alt="Google Play"
                          width={24}
                          height={24}
                          style={{ width: "auto", height: "auto" }}
                        />
                        <Box sx={{ textAlign: "right" }}>
                          <Typography sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                            حمل التطبيق من
                          </Typography>
                          <Typography
                            sx={{ fontSize: "1rem", fontWeight: 600 }}
                          >
                            جوجل بلاي
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Copyright and Policy Links */}
          <Box
            sx={{
              mt: 6,
              pt: 3,
              borderTop: `1px solid ${
                darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
              }`,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: darkMode ? "#FFFFFF" : theme.colors.card,
                textAlign: { xs: "center", sm: "right" },
              }}
            >
              {new Date().getFullYear()} &copy; فسحة - جميع الحقوق محفوظة
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
              }}
            >
              {["الشروط والأحكام", "سياسة الخصوصية", "سياسة الاسترجاع"].map(
                (text, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: "0.85rem",
                      color: darkMode ? "#FFFFFF" : theme.colors.card,
                      cursor: "pointer",
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: theme.colors.button,
                      },
                    }}
                  >
                    {text}
                  </Typography>
                )
              )}
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0 }}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 99,
        }}
      >
        <IconButton
          aria-label="back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{
            bgcolor: theme.colors.primary,
            color: darkMode ? "#000" : "#fff",
            boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
            "&:hover": {
              bgcolor: darkMode ? "#F6B17A" : "#3B5898",
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default React.memo(Home);
