/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        customs: {
          dark: "rgb(0,52,109)",
          medium: "rgb(1,98,166)",
          light: "rgb(15,194,248)",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        yellow: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },
      },
      fontFamily: {
        sans: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
        poppins: ["Poppins", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 2px 4px rgba(0, 0, 0, 0.1)",
        md: "0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)",
        lg: "0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)",
        xl: "0 20px 40px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.25)",
        none: "none",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "zoom-in": "zoomIn 0.3s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        shimmer: "shimmer 2s infinite linear",
        gradient: "gradient 6s ease infinite",
        "text-shimmer": "textShimmer 2.5s ease-in-out infinite alternate",
        "scroll-parallax": "scrollParallax linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "calc(200px + 100%) 0" },
        },
        gradient: {
          "0%, 100%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "left center",
          },
          "50%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "right center",
          },
        },
        textShimmer: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "100%": {
            backgroundPosition: "100% 50%",
          },
        },
        scrollParallax: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear":
          "linear-gradient(to right, var(--tw-gradient-stops))",
        "shimmer-gradient":
          "linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px)",
        "text-shimmer":
          "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444, #3b82f6)",
        "grid-white": `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e")`,
        "grid-black": `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e")`,
        "dots-pattern": `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='a' patternUnits='userSpaceOnUse' width='20' height='20'%3e%3ccircle cx='2' cy='2' r='1' fill='%23cbd5e1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23a)'/%3e%3c/svg%3e")`,
      },
      backgroundSize: {
        shimmer: "200px",
        "text-shimmer": "200% 100%",
      },
      boxShadow: {
        "inner-light": "inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        glow: "0 0 20px rgba(59, 130, 246, 0.15)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.25)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.5)",
        "glow-green": "0 0 20px rgba(34, 197, 94, 0.5)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.5)",
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        elegant:
          "0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 15px 30px -8px rgba(0, 0, 0, 0.12)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
        900: "900ms",
        1200: "1200ms",
        1500: "1500ms",
        2000: "2000ms",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "bounce-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      scale: {
        98: "0.98",
        102: "1.02",
        103: "1.03",
        105: "1.05",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      screens: {
        xs: "475px",
        "3xl": "1600px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#374151",
            lineHeight: "1.75",
            p: {
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              textAlign: "left",
              "@media (min-width: 768px)": {
                textAlign: "justify",
                textJustify: "inter-word",
              },
            },
            h1: {
              color: "#111827",
              fontWeight: "800",
              marginTop: "0",
              marginBottom: "2rem",
            },
            h2: {
              color: "#111827",
              fontWeight: "700",
              marginTop: "2.5rem",
              marginBottom: "1.5rem",
            },
            h3: {
              color: "#111827",
              fontWeight: "600",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h4: {
              color: "#111827",
              fontWeight: "600",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            },
            blockquote: {
              borderLeftColor: "#3b82f6",
              backgroundColor: "#f8fafc",
              padding: "1rem 1.5rem",
              borderRadius: "0.5rem",
            },
            code: {
              backgroundColor: "#f1f5f9",
              padding: "0.125rem 0.375rem",
              borderRadius: "0.25rem",
              fontWeight: "600",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "#1e293b",
              color: "#e2e8f0",
              borderRadius: "0.75rem",
              padding: "1.5rem",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
            },
            ul: {
              listStyleType: "disc",
              paddingLeft: "1.5rem",
              marginLeft: "0",
            },
            "ul > li": {
              paddingLeft: "0",
              marginLeft: "0",
            },
            a: {
              color: "#3b82f6",
              textDecoration: "underline",
              fontWeight: "500",
              "&:hover": {
                color: "#1d4ed8",
              },
            },
            strong: {
              color: "#111827",
              fontWeight: "600",
            },
            table: {
              width: "100%",
              marginTop: "2rem",
              marginBottom: "2rem",
              borderCollapse: "collapse",
            },
            "table th": {
              backgroundColor: "#f8fafc",
              padding: "0.75rem 1rem",
              textAlign: "left",
              fontWeight: "600",
              borderBottom: "1px solid #e2e8f0",
            },
            "table td": {
              padding: "0.75rem 1rem",
              borderBottom: "1px solid #f1f5f9",
            },
          },
        },
        lg: {
          css: {
            fontSize: "1.125rem",
            lineHeight: "1.7777778",
            p: {
              marginTop: "1.3333333em",
              marginBottom: "1.3333333em",
              textAlign: "left",
              "@media (min-width: 768px)": {
                textAlign: "justify",
                textJustify: "inter-word",
              },
            },
            h1: {
              fontSize: "2.6666667em",
              marginBottom: "0.8333333em",
              lineHeight: "1",
            },
            h2: {
              fontSize: "1.6666667em",
              marginTop: "1.8666667em",
              marginBottom: "1.0666667em",
              lineHeight: "1.3333333",
            },
            h3: {
              fontSize: "1.3333333em",
              marginTop: "1.6666667em",
              marginBottom: "0.6666667em",
              lineHeight: "1.5",
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Custom utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        ".text-shadow-sm": {
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        },
        ".text-shadow-md": {
          textShadow:
            "0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)",
        },
        ".text-shadow-lg": {
          textShadow:
            "0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)",
        },
        ".text-shadow-xl": {
          textShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        },
        ".text-shadow-2xl": {
          textShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
        ".glass-effect": {
          backdropFilter: "blur(16px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          backdropFilter: "blur(16px)",
          background: "rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".gradient-text": {
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        },
        ".gradient-text-animated": {
          background:
            "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444, #3b82f6)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "textShimmer 2.5s ease-in-out infinite alternate",
        },
        ".btn-primary": {
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.5rem",
          fontWeight: "600",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.39)",
          "&:hover": {
            background: "linear-gradient(135deg, #1d4ed8, #1e40af)",
            boxShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.5)",
            transform: "translateY(-2px)",
          },
        },
        ".btn-secondary": {
          background: "transparent",
          color: "#3b82f6",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.5rem",
          fontWeight: "600",
          border: "2px solid #3b82f6",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "#3b82f6",
            color: "white",
            transform: "translateY(-2px)",
          },
        },
        ".floating": {
          animation: "float 6s ease-in-out infinite",
        },
        ".shimmer": {
          background:
            "linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px)",
          backgroundSize: "200px",
          animation: "shimmer 2s infinite linear",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f5f9",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#94a3b8",
          },
        },
        // Text justification utilities - responsive
        ".text-justify-full": {
          textAlign: "left",
          "@media (min-width: 768px)": {
            textAlign: "justify",
            textJustify: "inter-word",
          },
        },
        ".text-justify-paragraph p": {
          textAlign: "left",
          "@media (min-width: 768px)": {
            textAlign: "justify",
            textJustify: "inter-word",
          },
        },
        // Fixed background utilities
        ".bg-fixed-mobile": {
          backgroundAttachment: "scroll",
          "@media (min-width: 768px)": {
            backgroundAttachment: "fixed",
          },
        },
        // Consistent spacing utilities
        ".section-spacing": {
          paddingTop: "4rem",
          paddingBottom: "4rem",
          "@media (min-width: 768px)": {
            paddingTop: "5rem",
            paddingBottom: "5rem",
          },
          "@media (min-width: 1024px)": {
            paddingTop: "6rem",
            paddingBottom: "6rem",
          },
        },
        ".content-spacing": {
          marginBottom: "1.5rem",
          "@media (min-width: 768px)": {
            marginBottom: "2rem",
          },
          "@media (min-width: 1024px)": {
            marginBottom: "2.5rem",
          },
        },
      };

      addUtilities(newUtilities);
    },
  ]
};
