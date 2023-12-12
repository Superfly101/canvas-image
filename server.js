const { registerFont, createCanvas } = require("canvas");
const fs = require("fs");

function generateAndSaveImage(text, backgroundColor, padding) {
  // Fixed card width and minimum height
  const fixedWidth = 600;
  const minHeight = 400;

  // Calculate canvas dimensions including padding
  const paddedWidth = fixedWidth + 2 * padding;
  const paddedHeight = minHeight + 2 * padding;

  // Register font
  registerFont("EduNSWACTFoundation-Medium.ttf", {
    family: "Edu NSW ACT Foundation Medium",
  });

  // Create a canvas
  const canvas = createCanvas(paddedWidth, paddedHeight);
  const ctx = canvas.getContext("2d");

  ctx.font = '12px "Edu NSW ACT Foundation Medium"';

  // Set background color
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.fillStyle = "white";
  ctx.font = '12px "Edu NSW ACT Foundation"';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // Split text into words
  const words = text.split("");

  // Initialize variables for text wrapping
  let currentLine = "";
  let lines = [];

  // Calculate lines based on text width
  for (const word of words) {
    const testLine = currentLine + (currentLine ? " " : "") + word;
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > fixedWidth && currentLine !== "") {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  lines.push(currentLine);

  // Draw text on the canvas with padding
  const lineHeight = 40;
  let y = padding + (paddedHeight - lines.length * lineHeight) / 2;

  for (const line of lines) {
    ctx.fillText(line, padding, y);
    y += lineHeight;
  }

  // Convert canvas to a buffer
  const buffer = canvas.toBuffer("image/png");

  // Save the buffer to a local file
  const outputPath = "output.png";
  fs.writeFileSync(outputPath, buffer);

  console.log(`Image saved locally: ${outputPath}`);
}

// Example usage with padding of 20 pixels
const dynamicText =
  "Hello, Dynamic Text! This is a long text that should automatically wrap to the next line when it reaches the width of the canvas.";
const backgroundColor = "#3498db";
const padding = 20;

generateAndSaveImage(dynamicText, backgroundColor, padding);
