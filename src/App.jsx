import { useState, useRef, useEffect } from 'react';

const FONT_OPTIONS = [
  'Impact',
  'Arial',
  'Comic Sans MS',
  'Courier New',
  'Georgia',
  'Verdana',
  'Helvetica',
  'Times New Roman',
  'Trebuchet MS',
  'Lucida Console',
  'Garamond',
  'Palatino Linotype',
  'Tahoma',
  'Brush Script MT',
  'Franklin Gothic Medium',
  'Candara',
  'Segoe UI',
  'Monaco',
  'Optima',
  'Futura'
];


function App() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [font, setFont] = useState('Impact');
  const [fontSize, setFontSize] = useState(50);
  const [topTextPosition, setTopTextPosition] = useState({ x: 0, y: 0 });
  const [bottomTextPosition, setBottomTextPosition] = useState({ x: 0, y: 0 });
  const [toastMessage, setToastMessage] = useState(null);
  const [lightMode, setLightMode] = useState(true); // State for light/dark mode
  const canvasRef = useRef(null);
  const imageRef = useRef(null);


  const toggleTheme = () => {
    setLightMode(!lightMode); // Toggle between light and dark mode
  };

  const generateMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    ctx.font = `${fontSize}px ${font}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = textColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = fontSize / 20;

    // Top Text
    ctx.fillText(
      topText.toUpperCase(),
      topTextPosition.x || canvas.width / 2,
      topTextPosition.y || fontSize
    );
    ctx.strokeText(
      topText.toUpperCase(),
      topTextPosition.x || canvas.width / 2,
      topTextPosition.y || fontSize
    );

    // Bottom Text
    ctx.fillText(
      bottomText.toUpperCase(),
      bottomTextPosition.x || canvas.width / 2,
      bottomTextPosition.y || canvas.height - fontSize / 2
    );
    ctx.strokeText(
      bottomText.toUpperCase(),
      bottomTextPosition.x || canvas.width / 2,
      bottomTextPosition.y || canvas.height - fontSize / 2
    );
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'Cobra.png';
    link.href = canvas.toDataURL();
    link.click();

    setToastMessage("Meme Saved ✅");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    if (selectedImage) {
      generateMeme();
    }
  }, [
    selectedImage,
    topText,
    bottomText,
    textColor,
    strokeColor,
    font,
    fontSize,
    topTextPosition,
    bottomTextPosition,
  ]);

  return (
    <div style={{
      maxWidth: '1500px',
      margin: 'auto',
      textAlign: 'center',
      fontFamily: 'Comic Sans MS',
      padding: '30px',
      backgroundColor: lightMode ? '#fff' : '#333', // Light/Dark mode background
      color: lightMode ? '#000' : '#fff', // Light/Dark mode text color
      transition: 'background-color 0.3s, color 0.3s', // Smooth transition for theme change
    }}>
      <h1>Meme Generator 🖼️</h1>

      {/* Toggle Theme Button */}
      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          backgroundColor: lightMode ? '#000' : '#fff',
          color: lightMode ? '#fff' : '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Switch to {lightMode ? 'Dark' : 'Light'} Mode
      </button>

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#333',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '16px',
          zIndex: '1000',
        }}>
          {toastMessage}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Image Selection */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(URL.createObjectURL(e.target.files[0]))}
            style={{ width: '100%', marginTop: '10px' }}
          />
        </div>

        {/* Text Inputs */}
        <div>
          <input
            type="text"
            placeholder="Top Text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <input
            type="text"
            placeholder="Bottom Text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        {/* Text Styling Controls */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            style={{ flex: 1 }}
          >
            {FONT_OPTIONS.map((fontName) => (
              <option key={fontName} value={fontName}>
                {fontName}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            min="10"
            max="500"
            style={{ width: '100px' }}
          />

          <label>
            Text Color
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </label>

          <label>
            Outline Color
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
            />
          </label>
        </div>

        {/* Action Buttons */}
        <div>
          <button onClick={downloadMeme} style={{ width: '100%', marginTop: '15px' }}>
            Download Meme 💾
          </button>
        </div>
      </div>

      {/* Hidden Image Loader */}
      <img
        ref={imageRef}
        src={selectedImage}
        onLoad={generateMeme}
        alt="Meme template"
        style={{ display: 'none' }}
      />

      {/* Canvas Display */}
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: '100%',
          marginTop: '30px',
          display: 'block',
          margin: 'auto',
          border: '2px solid #ddd',
        }}
      />
    </div>
  );
}

export default App;
