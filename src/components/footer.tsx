import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

interface FooterProps {
  footerPosition?: string | number;
  footerIndex?: string | number;
}

const Footer: React.FC<FooterProps> = ({
  footerPosition = "0",
  footerIndex = "9999",
}) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        paddingTop: "20px",
        position: "fixed",
        bottom: "0",
        width: "100%",
        minHeight: "56px",
        zIndex: footerIndex,
        left: footerPosition,
        transition: "left 0.23s ease",
      }}
    >
      <Container maxWidth="lg" sx={{ margin: 0, padding: 0 }}>
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

        <Box textAlign="center">
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
