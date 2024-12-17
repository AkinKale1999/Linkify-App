import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

interface FooterProps {
  footerPosition?: string | number;
  footerIndex?: string | number;
  borderTop?: string | number;
}

let isDebugON = process.env.Debug === "ON" ? true : false;

// isDebugON = true;

let Timeout = process.env.Timeout;

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

      {isDebugON === true && (
        <Box sx={{ textAlign: "center", zIndex: 9999 }}>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            {Timeout}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// 1. Counter
// counter muss gesetzt werden, der bei {Timeout} anfängt und runter bis auf 0 zählt,
// Jedesmal wenn sich die Maus des Users bewegt soll der timer zurückgesetzt werden auf den {Timeout} variable in der .env datei.
// in den letzten {LogoutViewTimer=20} soll ein modula fenster kommen, welches den fokus des users darauf fokussiert.
// wenn der Countdown auf 0 kommt Muss der user ausgelogged werden,

// 2. Logout
// eine anfrage wird an die Api:  axios.delete /logout gemacht, und das cookie/token wird gelöscht.
// und dann auf die login page weitergeleitet werden.

// Linkify Logo einbauen

export default Footer;
