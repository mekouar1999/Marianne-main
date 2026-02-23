import { useEffect, useRef, useCallback } from "react";

const Squares = ({
  direction = "diagonal",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
  className = "",
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);

  const draw = useCallback(
    (ctx, canvas) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize - gridOffset.current.x;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize - gridOffset.current.y;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = Math.floor((x + gridOffset.current.x) / squareSize);
          const squareY = Math.floor((y + gridOffset.current.y) / squareSize);

          if (
            hoveredSquareRef.current &&
            hoveredSquareRef.current.x === squareX &&
            hoveredSquareRef.current.y === squareY
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }
    },
    [squareSize, borderColor, hoverFillColor]
  );

  const updateGridOffset = useCallback(() => {
    const effectiveSpeed = Math.max(speed, 0);
    switch (direction) {
      case "right":
        gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
        break;
      case "left":
        gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
        break;
      case "up":
        gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
        break;
      case "down":
        gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
        break;
      case "diagonal":
      default:
        gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
        gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
        break;
    }
  }, [direction, speed, squareSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const animate = () => {
      updateGridOffset();
      draw(ctx, canvas);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [draw, updateGridOffset, squareSize]);

  const handleMouseMove = useCallback(
    (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const hoveredX = Math.floor((mouseX + gridOffset.current.x) / squareSize);
      const hoveredY = Math.floor((mouseY + gridOffset.current.y) / squareSize);

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredX ||
        hoveredSquareRef.current.y !== hoveredY
      ) {
        hoveredSquareRef.current = { x: hoveredX, y: hoveredY };
      }
    },
    [squareSize]
  );

  const handleMouseLeave = useCallback(() => {
    hoveredSquareRef.current = null;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-0 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default Squares;
