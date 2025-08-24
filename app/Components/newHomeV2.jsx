"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Rating,
} from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Icons
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import StorefrontIcon from "@mui/icons-material/Storefront";
import InsightsIcon from "@mui/icons-material/Insights";
import RateReviewIcon from "@mui/icons-material/RateReview";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Import styled components
import {
  HeroBox,
  MainSection,
  TextBox,
  SliderBox,
  SecondBox,
  CategoriesContainer,
  CategoriesTitle,
  CardsGrid,
  StyledCard,
  CardTitle,
  DownloadContainer,
  TextContent,
  Title,
  StyledButtons,
  DownloadBtn,
  ImageContent,
  StyledCard2,
} from "../styledComponent/homeV2/styledHomeV2";

// Sample seller benefits
const sellerBenefits = [
  {
    title: "إدارة الأماكن",
    description: "سجل وأدر أماكنك بسهولة من خلال لوحة تحكم متكاملة",
    icon: <StorefrontIcon sx={{ fontSize: 40 }} />,
    color: "#4A72AC",
  },
  {
    title: "التحليلات والإحصائيات",
    description: "تابع أداء أماكنك والزيارات بتقارير مفصلة",
    icon: <InsightsIcon sx={{ fontSize: 40 }} />,
    color: "#F6B17A",
  },
  {
    title: "تقييمات العملاء",
    description: "استقبل تقييمات من الزوار وحسن من خدماتك",
    icon: <RateReviewIcon sx={{ fontSize: 40 }} />,
    color: "#4CAF50",
  },
  {
    title: "فرص أرباح أكثر",
    description: "زد من فرص عرض مكانك واستقبال المزيد من الزوار",
    icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />,
    color: "#FEC20F",
  },
];

// Sample place categories
const placeCategories = [
  {
    id: 1,
    title: "مطاعم وكافيهات",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "أماكن سياحية",
    image:
      "https://images.unsplash.com/photo-1601056639638-c53c50e13ead?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "فنادق ومنتجعات",
    image:
      "https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "تسوق ومولات",
    image:
      "https://images.unsplash.com/photo-1610693572793-67c41f78f8e7?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "أنشطة ترفيهية",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "متاحف ومعارض",
    image:
      "https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=800&auto=format&fit=crop",
  },
];

// Sample testimonials from users
const testimonials = [
  {
    id: 1,
    name: "أحمد الخالدي",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "صاحب مطعم",
    comment:
      "ساعدتني فسحة في زيادة الحجوزات بنسبة 40% خلال 3 أشهر فقط! منصة رائعة لأصحاب الأعمال.",
    rating: 5,
  },
  {
    id: 2,
    name: "سارة العتيبي",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "مديرة فندق",
    comment:
      "سهولة الاستخدام والدعم الفني الممتاز جعل تجربتنا مع فسحة مميزة جداً. أنصح بها بشدة!",
    rating: 4.5,
  },
  {
    id: 3,
    name: "محمد الشهري",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    role: "صاحب مقهى",
    comment:
      "الإحصائيات والتقارير ساعدتني في فهم احتياجات العملاء بشكل أفضل وتطوير خدماتي.",
    rating: 5,
  },
];

// Steps for registering a place
const registrationSteps = [
  {
    id: 1,
    title: "إنشاء حساب",
    description: "سجل كبائع في منصة فسحة بمعلوماتك الأساسية",
  },
  {
    id: 2,
    title: "أضف مكانك",
    description: "أدخل تفاصيل مكانك مع الصور والخدمات المتوفرة",
  },
  {
    id: 3,
    title: "المراجعة والتأكيد",
    description: "سيتم مراجعة معلومات مكانك والموافقة عليه",
  },
  {
    id: 4,
    title: "البدء في استقبال الزوار",
    description: "سيظهر مكانك للمستخدمين ويمكنهم إضافته لرحلاتهم",
  },
];

const HomeV2 = () => {
  const { theme, darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Slider CSS Overrides
  const sliderCustomStyles = `
    .slick-slider {
      position: relative;
      overflow: hidden;
    }
      .slick-list {
    border-radius: 20px;
    overflow: visible !important;
  }
    .slick-track {
     display: flex !important;
    height: 100%;
    min-width: 100%;
  }
    .slick-slide {
      opacity: 0.5;
      transform: scale(0.95);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
       & > div {
      height: 100%;
    }
    }
    .slick-active {
      opacity: 1;
      transform: scale(1);
    }
    .slick-arrow {
      width: 50px;
      height: 50px;
      background: ${
        darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
      } !important;
      backdrop-filter: blur(10px);
      border-radius: 50%;
        z-index: 3; // Ensure arrows stay above everything
      transition: all 0.3s ease;
      &:hover {
        background: ${theme.colors.primary} !important;
        transform: scale(1.1);
      }
      &::before {
        color: ${theme.colors.text};
        font-size: 28px;
        opacity: 0.8;
      }
    }
    .slick-dots {
      bottom: 30px;
      li {
        margin: 0 4px;
        button::before {
          color: transparent;
        }
      }
    }
  `;

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    beforeChange: (current, next) => setActiveSlide(next),
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "40px" }}>
        <ul
          style={{
            margin: 0,
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: i === activeSlide ? "30px" : "10px",
          height: "4px",
          background:
            i === activeSlide ? theme.colors.primary : "rgba(255,255,255,0.5)",
          borderRadius: "2px",
          transition: "all 0.3s ease",
        }}
      />
    ),
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: theme?.colors?.background || "#f8f9fa",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "3px solid rgba(0,0,0,0.1)",
              borderTopColor: theme?.colors?.primary || "#3b5998",
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(0deg)",
                },
                "100%": {
                  transform: "rotate(360deg)",
                },
              },
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: theme?.colors?.textSecondary || "#666",
            }}
          >
            جاري التحميل...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        minHeight: "100vh",
        paddingTop: "80px",
        transition: "all 0.3s ease",
      }}
    >
      <style>{sliderCustomStyles}</style>
      {/* Hero Section */}
      <HeroBox
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: darkMode ? theme.colors.surface : "#f8f9fa",
          py: { xs: 6, md: 10 },
        }}
      >
        <MainSection>
          <TextBox>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.2rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 3,
                  color: theme.colors.primary,
                  textAlign: "right",
                  lineHeight: 1.2,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                انضم كبائع في منصة فسحة
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: "1.2rem",
                    color: theme.colors.textSecondary,
                    mt: 2,
                    fontWeight: 400,
                    lineHeight: 1.6,
                  }}
                >
                  حوّل زوارك إلى تجربة لا تُنسى مع أدوات إدارة متكاملة
                </Box>
              </Typography>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: theme.colors.primary,
                      color: "#fff",
                      fontSize: "1rem",
                      px: 4,
                      py: 1.5,
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 24px ${theme.colors.primary}40`,
                      },
                    }}
                    endIcon={<AddBusinessIcon sx={{ ml: 1 }} />}
                    component={Link}
                    href="/register?type=seller"
                  >
                    سجل كبائع
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderWidth: "2px",
                      borderColor: theme.colors.primary,
                      color: theme.colors.primary,
                      fontSize: "1rem",
                      px: 4,
                      py: 1.5,
                      borderRadius: "12px",
                      "&:hover": {
                        backgroundColor: `${theme.colors.primary}10`,
                        borderWidth: "2px",
                      },
                    }}
                    component={Link}
                    href="/addplace"
                  >
                    أضف مكانك
                  </Button>
                </Box>
              </motion.div>
            </motion.div>
          </TextBox>

          <SliderBox>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              style={{ width: "100%" }}
            >
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  height: { xs: "300px", md: "500px" },
                  width: "100%",
                  position: "relative",
                }}
              >
                <Slider {...sliderSettings}>
                  {[
                    "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
                    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
                    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
                  ].map((img, index) => (
                    <div key={index}>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: { xs: "300px", md: "500px" },
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={`${img}?w=1200&auto=format&fit=crop`}
                          alt="Hero"
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 80vw"
                          quality={100}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center center",
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/800x600?text=فسحة+للبائعين";
                          }}
                        />

                        {/* Gradient Overlay */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: darkMode
                              ? "linear-gradient(45deg, rgba(45,50,80,0.7), rgba(45,50,80,0.4))"
                              : "linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))",
                            zIndex: 1,
                          }}
                        />

                        {/* Text Content */}
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: { xs: "20px", md: "40px" },
                            right: { xs: "20px", md: "40px" },
                            left: { xs: "20px", md: "40px" },
                            zIndex: 2,
                            color: darkMode ? "#fff" : theme.colors.text,
                            textAlign: "right",
                          }}
                        >
                          {/* Text content remains same */}
                        </Box>
                      </Box>
                    </div>
                  ))}
                </Slider>
              </Box>
            </motion.div>
          </SliderBox>
        </MainSection>
      </HeroBox>

      {/* Benefits Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
          backgroundColor: darkMode ? theme.colors.background : "#fff",
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: 800,
                mb: 3,
                color: theme.colors.primary,
                textAlign: "center",
              }}
            >
              مميزات التسجيل كبائع
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 4,
            }}
          >
            {sellerBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    p: 3,
                    height: "100%",
                    backgroundColor: darkMode ? theme.colors.surface : "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: `${benefit.color}20`,
                      color: benefit.color,
                      borderRadius: "50%",
                      width: 80,
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 3,
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 2,
                      color: theme.colors.text,
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.colors.textSecondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>

      {/* How to Register Section */}
      <Box
        sx={{
          padding: { xs: "40px 20px", md: "80px 40px" },
          backgroundColor: darkMode ? theme.colors.surface : "#f8f9fa",
        }}
      >
        <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: "bold",
                marginBottom: "3rem",
                color: theme.colors.primary,
                textAlign: "center",
              }}
            >
              كيف تسجل مكانك في فسحة؟
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 6,
              alignItems: "center",
            }}
          >
            <Box>
              {registrationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: 4,
                      gap: 3,
                      direction: "rtl",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: theme.colors.primary,
                        color: "#fff",
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        minWidth: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {step.id}
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: "bold",
                          marginBottom: 1,
                          color: theme.colors.text,
                          textAlign: "right",
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.colors.textSecondary,
                          lineHeight: 1.6,
                          textAlign: "right",
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: theme.colors.primary,
                      color: "#fff",
                      fontSize: "1rem",
                      padding: "12px 30px",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: darkMode ? "#5b8dd1" : "#3b5998",
                      },
                    }}
                    endIcon={<AddBusinessIcon />}
                    component={Link}
                    href="/register?type=seller"
                  >
                    ابدأ التسجيل الآن
                  </Button>
                </Box>
              </motion.div>
            </Box>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  height: { xs: "300px", md: "400px" },
                  width: "100%",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&auto=format&fit=crop"
                  alt="تسجيل الأماكن"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>

      {/* Categories Section */}
      <Box
        sx={{
          padding: { xs: "40px 20px", md: "80px 40px" },
          backgroundColor: darkMode ? theme.colors.background : "#fff",
        }}
      >
        <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: "bold",
                marginBottom: "1rem",
                color: theme.colors.primary,
                textAlign: "center",
              }}
            >
              فئات الأماكن المتاحة
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.colors.textSecondary,
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto",
                marginBottom: "3rem",
              }}
            >
              يمكنك تسجيل مكانك ضمن أي من الفئات التالية ليتمكن المستخدمون من
              اكتشافه وإضافته لرحلاتهم
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            {placeCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: darkMode ? theme.colors.surface : "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                    },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      height: "200px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "24px",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        color: theme.colors.text,
                      }}
                    >
                      {category.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box
        sx={{
          padding: { xs: "40px 20px", md: "80px 40px" },
          backgroundColor: darkMode ? theme.colors.surface : "#f8f9fa",
        }}
      >
        <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: "bold",
                marginBottom: "3rem",
                color: theme.colors.primary,
                textAlign: "center",
              }}
            >
              آراء البائعين
            </Typography>
          </motion.div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor: darkMode ? theme.colors.surface : "#fff",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                      },
                      display: "flex",
                      flexDirection: "column",
                      margin: "10px",
                      padding: "30px",
                      minHeight: "300px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        marginBottom: 3,
                      }}
                    >
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ width: 80, height: 80 }}
                      />
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: "bold",
                            color: theme.colors.text,
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.colors.textSecondary,
                            marginBottom: 1,
                          }}
                        >
                          {testimonial.role}
                        </Typography>
                        <Rating
                          value={testimonial.rating}
                          precision={0.5}
                          readOnly
                          sx={{
                            color: "#FEC20F",
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.colors.text,
                        lineHeight: 1.8,
                        textAlign: "center",
                        flex: 1,
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          padding: { xs: "40px 20px", md: "80px 40px" },
          backgroundColor: darkMode ? "rgba(59, 89, 152, 0.1)" : "#e8f1ff",
          textAlign: "center",
        }}
      >
        <Box sx={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: theme.colors.primary,
              }}
            >
              انضم إلى آلاف البائعين المسجلين في فسحة
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: theme.colors.textSecondary,
                marginBottom: "2rem",
                lineHeight: 1.8,
              }}
            >
              سجل مكانك الآن واستفد من منصة فسحة لزيادة عدد زوارك وإدارة حجوزاتك
              بكل سهولة. الأمر بسيط وسريع ولن يستغرق أكثر من دقائق!
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: theme.colors.primary,
                  color: "#fff",
                  fontSize: "1rem",
                  padding: "12px 30px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: darkMode ? "#5b8dd1" : "#3b5998",
                  },
                }}
                endIcon={<AddBusinessIcon />}
                component={Link}
                href="/register?type=seller"
              >
                تسجيل كبائع
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: theme.colors.primary,
                  borderColor: theme.colors.primary,
                  fontSize: "1rem",
                  padding: "12px 30px",
                  borderRadius: "8px",
                }}
                component={Link}
                href="/learn-more"
              >
                معرفة المزيد
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Box>

      {/* FAQs Section */}
      <Box
        sx={{
          padding: { xs: "40px 20px", md: "80px 40px" },
          backgroundColor: darkMode ? theme.colors.background : "#fff",
        }}
      >
        <Box sx={{ maxWidth: "1000px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: "bold",
                marginBottom: "3rem",
                color: theme.colors.primary,
                textAlign: "center",
              }}
            >
              الأسئلة الشائعة
            </Typography>
          </motion.div>

          <Box sx={{ direction: "rtl" }}>
            {[
              {
                question: "كيف يمكنني تسجيل مكاني على منصة فسحة؟",
                answer:
                  "يمكنك التسجيل كبائع أولاً ثم إضافة مكانك عبر لوحة التحكم. ستمر بياناتك بعملية مراجعة قصيرة قبل أن يظهر مكانك للمستخدمين.",
              },
              {
                question: "ما هي تكلفة التسجيل في المنصة؟",
                answer:
                  "التسجيل مجاني تماماً في الوقت الحالي، ونعمل على توفير باقات مدفوعة مستقبلاً لتعزيز ظهور مكانك وزيادة الحجوزات.",
              },
              {
                question: "كم من الوقت تستغرق مراجعة معلومات مكاني؟",
                answer:
                  "تستغرق عملية المراجعة من 24 إلى 48 ساعة عمل. نحرص على التأكد من جودة المعلومات والصور قبل الموافقة على نشرها.",
              },
              {
                question: "هل يمكنني تعديل معلومات مكاني بعد نشرها؟",
                answer:
                  "نعم، يمكنك تعديل معلومات وصور مكانك في أي وقت من خلال لوحة التحكم الخاصة بك. التعديلات الجوهرية قد تتطلب مراجعة إضافية.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    marginBottom: 3,
                    backgroundColor: darkMode ? theme.colors.surface : "#fff",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    border: "1px solid",
                    borderColor: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  }}
                >
                  <CardContent sx={{ padding: "20px 24px" }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        color: theme.colors.text,
                        marginBottom: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <QuestionIcon
                        sx={{ marginLeft: 1, color: theme.colors.primary }}
                      />
                      {faq.question}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.colors.textSecondary,
                        lineHeight: 1.8,
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Trust Indicators Section */}
      <Box
        sx={{
          padding: { xs: "40px 20px", md: "60px 40px" },
          backgroundColor: darkMode ? theme.colors.surface : "#f8f9fa",
          borderTop: "1px solid",
          borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
        }}
      >
        <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: { xs: "center", md: "right" },
              gap: 4,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.8rem" },
                  fontWeight: "bold",
                  color: theme.colors.text,
                  marginBottom: 1,
                }}
              >
                فسحة - منصة رائدة للأماكن السياحية
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.colors.textSecondary,
                }}
              >
                نربط أصحاب الأماكن بآلاف المستخدمين يومياً
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: { xs: 3, md: 5 },
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: theme.colors.primary,
                  }}
                >
                  +1000
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.colors.textSecondary,
                  }}
                >
                  بائع مسجل
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: theme.colors.primary,
                  }}
                >
                  +5000
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.colors.textSecondary,
                  }}
                >
                  مستخدم شهرياً
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: theme.colors.primary,
                  }}
                >
                  +3000
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.colors.textSecondary,
                  }}
                >
                  رحلة تم تخطيطها
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          padding: { xs: "30px 20px", md: "40px" },
          backgroundColor: darkMode ? "#1a1a1a" : "#2c3e50",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Box
            sx={{
              maxWidth: { md: "400px" },
              textAlign: { xs: "center", md: "right" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              فسحة
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                marginBottom: 3,
                lineHeight: 1.8,
              }}
            >
              منصة فسحة تساعدك على تنظيم رحلاتك بسهولة واستكشاف أفضل الأماكن في
              المملكة العربية السعودية
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 4, md: 6 },
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 2,
                  textAlign: { xs: "center", md: "right" },
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
                  textAlign: { xs: "center", md: "right" },
                }}
              >
                {[
                  { label: "الرئيسية", href: "/" },
                  { label: "تسجيل كبائع", href: "/register?type=seller" },
                  { label: "أضف مكانك", href: "/addplace" },
                  { label: "تواصل معنا", href: "/contact" },
                ].map((link, index) => (
                  <Box component="li" key={index} sx={{ marginBottom: 1 }}>
                    <Link
                      href={link.href}
                      style={{
                        color: "#fff",
                        opacity: 0.8,
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 2,
                  textAlign: { xs: "center", md: "right" },
                }}
              >
                تواصل معنا
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  textAlign: { xs: "center", md: "right" },
                }}
              >
                <Box component="li" sx={{ marginBottom: 1 }}>
                  <Link
                    href="mailto:info@fasaha.com"
                    style={{
                      color: "#fff",
                      opacity: 0.8,
                      textDecoration: "none",
                      transition: "opacity 0.2s",
                    }}
                  >
                    info@fasaha.com
                  </Link>
                </Box>
                <Box component="li" sx={{ marginBottom: 1 }}>
                  <Link
                    href="tel:+966512345678"
                    style={{
                      color: "#fff",
                      opacity: 0.8,
                      textDecoration: "none",
                      transition: "opacity 0.2s",
                    }}
                  >
                    +966 51 234 5678
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            marginTop: 4,
            paddingTop: 3,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.7,
            }}
          >
            © {new Date().getFullYear()} فسحة. جميع الحقوق محفوظة
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            {["Facebook", "Twitter", "Instagram"].map((social, index) => (
              <IconButton
                key={index}
                size="small"
                sx={{
                  color: "#fff",
                  opacity: 0.8,
                  "&:hover": {
                    opacity: 1,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {social === "Facebook" && <FacebookIcon fontSize="small" />}
                {social === "Twitter" && <TwitterIcon fontSize="small" />}
                {social === "Instagram" && <InstagramIcon fontSize="small" />}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Missing QuestionIcon component
const QuestionIcon = (props) => {
  return <CheckCircleIcon {...props} />;
};

export default HomeV2;
