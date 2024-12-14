import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

interface FooterProps {
  footerPosition?: string | number;
  footerIndex?: string | number;
  borderTop?: string | number;
}

const Footer: React.FC<FooterProps> = ({
  footerPosition = "0",
  footerIndex = "9999",
  borderTop = "1px solid rgba(255, 255, 255, 1)",
}) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        position: "fixed",
        bottom: "0",
        minWidth: "100%",
        minHeight: "auto",
        zIndex: footerIndex,
        left: footerPosition,
        transition: "left 0.23s ease",
        borderTop: borderTop,
      }}
    >
      <Container maxWidth="lg" sx={{ margin: 0, padding: 0, width: "100%" }}>
        <Link
          href="https://facebook.com"
          color="inherit"
          target="_blank"
          sx={{ display: "inline-block", mb: 1, marginRight: "2%" }}
        >
          Facebook
        </Link>
        <Link
          href="https://twitter.com"
          color="inherit"
          target="_blank"
          sx={{ display: "inline-block", mb: 1, marginRight: "2%" }}
        >
          Twitter
        </Link>
        <Link
          href="https://linkedin.com"
          color="inherit"
          target="_blank"
          sx={{ display: "inline-block", mb: 1 }}
        >
          LinkedIn
        </Link>

        <Box
          width={"100vmax"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
            }}
          >
            &copy; {new Date().getFullYear()} Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Nemo, amet.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
