I am working on `/media/avinash/Data-linux/workspace/development/github/ascii-io` which is a single webpage project used to draw ascii diagrams.
You are an expert frontend developer who has knowledge of graphics as well as neural networks.

Usage:

- There are two types of inputs: Image or text.
  - If user uploads an image, the image is converted to ascii art.
  - If the user types a text, he can choose a few fonts from a dropdown menu and draw the text in ascii art. The fonts are picked from google fonts and can be `Roboto`, `Badeen Display`, etc. The user can also choose the size of the ascii art from a dropdown menu, which includes options like `Small`, `Medium`, and `Large`.
- Image or the text, it is shown as preview in a canvas. The text is drawn in large size using the selected font.
- The user can choose two numbers ranging from 50 to 1000. These are the number of columns and rows for the ascii art.
- There will be a button "Draw" find an ascii art representation of the image/text in the given number of columns and rows.
- The output is shown in a large enough textarea on right side of the canvas.

Question:

- What could be the right approach to find the ascii art representation of the image/text?
  - I am thinking of converting the preview to pixel data and then for each block of pixels, the size of which is calculated from row/column size and image dimensions, I can find the ascii characters that best represent the average color of that block. For this, I can precompute the map of ascii characters to their average intensity, computed by drawing them in large enough font size and calculating the sum of pixel values. The box for each character must be same.
  - Or use some neural network model that can take the pixel data and output the ascii art.

Please try to think over this question and provide your thoughts on the approach.
Once we are clear, we can start with the implementation.

---

It is already impressive.

Few changes though:

The ascii image being drawn is inverted. Darker colours in input are lighter in output. Please fix this.

Provide an option to choose character set also. The options should be:

Alphanumeric ( current character set )

Block ( unicode 0x2580 to 0x259f and 0x1fb00 to 1fb9f )

Please change the approach of finding the correct character.

Instead of using an intensity map, I also want to consider which character represents the pixel block closely. i.e. I should not be comparing only the total intensity of the pixel block, instead finding which character, if overlapped on the same block, represents the intensity distribution the best. Important: Plan out this implementation. Find the challenges, their solutions and plan the correct approach. Only then start implementation.
