# Icon Files

This directory should contain icon files in the following sizes:
- 16x16.png
- 48x48.png  
- 128x128.png

You can generate these from icon.svg using:
```bash
# Install convert if not available
brew install imagemagick

# Convert SVG to PNG
convert -background none icon.svg -resize 16x16 16.png
convert -background none icon.svg -resize 48x48 48.png
convert -background none icon.svg -resize 128x128 128.png
```

Or use an online tool like:
https://cloudconvert.com/svg-to-png

For now, placeholder PNG files are needed for the extension to build.
