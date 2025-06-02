import "./style.css";

// ASCII character set ordered by visual density (light to dark)
const ASCII_CHARS = " qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM[];',./{}:\"<>?`1234567890-=~!@#$%^&*()_+";

interface CharacterIntensity {
  char: string;
  intensity: number;
}

interface TextSizeConfig {
  small: number;
  medium: number;
  large: number;
}

class AsciiArtGenerator {
  private charIntensities: CharacterIntensity[] = [];
  private previewCanvas: HTMLCanvasElement;
  private previewCtx: CanvasRenderingContext2D;
  private textSizes: TextSizeConfig = {
    small: 32,
    medium: 48,
    large: 64
  };

  constructor() {
    this.previewCanvas = document.getElementById('preview-canvas') as HTMLCanvasElement;
    this.previewCtx = this.previewCanvas.getContext('2d')!;
    this.initializeCharacterIntensities();
    this.setupEventListeners();
  }

  private async initializeCharacterIntensities(): Promise<void> {
    // Create a temporary canvas to measure character intensities
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    
    // Set canvas size for character measurement
    const charSize = 20;
    tempCanvas.width = charSize;
    tempCanvas.height = charSize;
    
    tempCtx.font = `${charSize}px monospace`;
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    
    const intensities: CharacterIntensity[] = [];
    
    for (const char of ASCII_CHARS) {
      // Clear canvas
      tempCtx.fillStyle = 'white';
      tempCtx.fillRect(0, 0, charSize, charSize);
      
      // Draw character
      tempCtx.fillStyle = 'black';
      tempCtx.fillText(char, charSize / 2, charSize / 2);
      
      // Get image data and calculate average intensity
      const imageData = tempCtx.getImageData(0, 0, charSize, charSize);
      let totalIntensity = 0;
      
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Calculate grayscale value
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        totalIntensity += gray;
      }
      
      const avgIntensity = totalIntensity / (charSize * charSize);
      intensities.push({ char, intensity: avgIntensity });
    }
    
    // Sort by intensity (darkest to lightest)
    this.charIntensities = intensities.sort((a, b) => a.intensity - b.intensity);
    console.log('Character intensities initialized:', this.charIntensities);
  }

  private setupEventListeners(): void {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const tabName = target.dataset.tab;
        this.switchTab(tabName!);
      });
    });

    // File upload
    const fileInput = document.getElementById('image-input') as HTMLInputElement;
    const fileUpload = document.getElementById('file-upload') as HTMLElement;
    
    fileInput.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        this.handleImageUpload(file);
      }
    });

    // Drag and drop
    fileUpload.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileUpload.classList.add('dragover');
    });

    fileUpload.addEventListener('dragleave', () => {
      fileUpload.classList.remove('dragover');
    });

    fileUpload.addEventListener('drop', (e) => {
      e.preventDefault();
      fileUpload.classList.remove('dragover');
      const file = e.dataTransfer?.files[0];
      if (file && file.type.startsWith('image/')) {
        this.handleImageUpload(file);
      }
    });

    // Text input changes
    const textInput = document.getElementById('text-input') as HTMLTextAreaElement;
    const fontSelect = document.getElementById('font-select') as HTMLSelectElement;
    const textSizeSelect = document.getElementById('text-size') as HTMLSelectElement;

    textInput.addEventListener('input', () => this.handleTextInput());
    fontSelect.addEventListener('change', () => this.handleTextInput());
    textSizeSelect.addEventListener('change', () => this.handleTextInput());

    // Generate button
    const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
    generateBtn.addEventListener('click', () => this.generateAsciiArt());

    // Copy and download buttons
    const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
    const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement;

    copyBtn.addEventListener('click', () => this.copyToClipboard());
    downloadBtn.addEventListener('click', () => this.downloadAsText());

    // Initial text preview
    this.handleTextInput();
  }

  private switchTab(tabName: string): void {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`)?.classList.add('active');

    // Clear preview if switching tabs
    this.clearPreview();
  }

  private async handleImageUpload(file: File): Promise<void> {
    const img = new Image();
    img.onload = () => {
      this.drawImagePreview(img);
    };
    img.src = URL.createObjectURL(file);
  }

  private drawImagePreview(img: HTMLImageElement): void {
    const maxWidth = 400;
    const maxHeight = 300;
    
    let { width, height } = img;
    
    // Scale image to fit preview
    if (width > maxWidth || height > maxHeight) {
      const scale = Math.min(maxWidth / width, maxHeight / height);
      width *= scale;
      height *= scale;
    }
    
    this.previewCanvas.width = width;
    this.previewCanvas.height = height;
    
    this.previewCtx.drawImage(img, 0, 0, width, height);
  }

  private handleTextInput(): void {
    const textInput = document.getElementById('text-input') as HTMLTextAreaElement;
    const fontSelect = document.getElementById('font-select') as HTMLSelectElement;
    const textSizeSelect = document.getElementById('text-size') as HTMLSelectElement;

    const text = textInput.value.trim();
    if (!text) {
      this.clearPreview();
      return;
    }

    const font = fontSelect.value;
    const sizeKey = textSizeSelect.value as keyof TextSizeConfig;
    const fontSize = this.textSizes[sizeKey];

    this.drawTextPreview(text, font, fontSize);
  }

  private drawTextPreview(text: string, fontFamily: string, fontSize: number): void {
    // Calculate approximate canvas size needed
    this.previewCtx.font = `${fontSize}px "${fontFamily}"`;
    const metrics = this.previewCtx.measureText(text);
    
    const padding = 20;
    const width = metrics.width + padding * 2;
    const height = fontSize * 1.5 + padding * 2;
    
    this.previewCanvas.width = width;
    this.previewCanvas.height = height;
    
    // Clear and draw text
    this.previewCtx.fillStyle = 'white';
    this.previewCtx.fillRect(0, 0, width, height);
    
    this.previewCtx.fillStyle = 'black';
    this.previewCtx.font = `${fontSize}px "${fontFamily}"`;
    this.previewCtx.textAlign = 'center';
    this.previewCtx.textBaseline = 'middle';
    this.previewCtx.fillText(text, width / 2, height / 2);
  }

  private clearPreview(): void {
    this.previewCanvas.width = 400;
    this.previewCanvas.height = 300;
    this.previewCtx.fillStyle = '#f8f9fa';
    this.previewCtx.fillRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
    
    // Draw placeholder text
    this.previewCtx.fillStyle = '#6c757d';
    this.previewCtx.font = '16px Roboto';
    this.previewCtx.textAlign = 'center';
    this.previewCtx.textBaseline = 'middle';
    this.previewCtx.fillText('Preview will appear here', this.previewCanvas.width / 2, this.previewCanvas.height / 2);
  }

  private async generateAsciiArt(): Promise<void> {
    const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
    const outputTextarea = document.getElementById('output') as HTMLTextAreaElement;
    
    // Check if character intensities are ready
    if (this.charIntensities.length === 0) {
      outputTextarea.value = 'Error: Character intensities not yet calculated. Please wait a moment and try again.';
      return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    
    try {
      const columnsInput = document.getElementById('columns') as HTMLInputElement;
      const rowsInput = document.getElementById('rows') as HTMLInputElement;
      
      const columns = parseInt(columnsInput.value);
      const rows = parseInt(rowsInput.value);
      
      if (columns < 50 || columns > 1000 || rows < 50 || rows > 1000) {
        throw new Error('Columns and rows must be between 50 and 1000');
      }

      // Get canvas data
      if (this.previewCanvas.width === 0 || this.previewCanvas.height === 0) {
        throw new Error('No preview image. Please upload an image or enter text first.');
      }

      const asciiArt = await this.convertCanvasToAscii(columns, rows);
      outputTextarea.value = asciiArt;
      
    } catch (error) {
      outputTextarea.value = `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = 'Generate ASCII Art';
    }
  }

  private async convertCanvasToAscii(targetCols: number, targetRows: number): Promise<string> {
    // Get image data from preview canvas
    const imageData = this.previewCtx.getImageData(0, 0, this.previewCanvas.width, this.previewCanvas.height);
    const { width, height } = imageData;
    
    // Calculate block dimensions
    const blockWidth = width / targetCols;
    const blockHeight = height / targetRows;
    
    let asciiArt = '';
    
    for (let row = 0; row < targetRows; row++) {
      for (let col = 0; col < targetCols; col++) {
        // Calculate the region for this ASCII character
        const startX = Math.floor(col * blockWidth);
        const endX = Math.floor((col + 1) * blockWidth);
        const startY = Math.floor(row * blockHeight);
        const endY = Math.floor((row + 1) * blockHeight);
        
        // Calculate average brightness for this block
        let totalBrightness = 0;
        let pixelCount = 0;
        
        for (let y = startY; y < endY && y < height; y++) {
          for (let x = startX; x < endX && x < width; x++) {
            const pixelIndex = (y * width + x) * 4;
            const r = imageData.data[pixelIndex];
            const g = imageData.data[pixelIndex + 1];
            const b = imageData.data[pixelIndex + 2];
            
            // Calculate grayscale using luminance formula
            const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
            totalBrightness += brightness;
            pixelCount++;
          }
        }
        
        const avgBrightness = pixelCount > 0 ? totalBrightness / pixelCount : 0;
        
        // Find the closest ASCII character
        const asciiChar = this.getClosestAsciiChar(avgBrightness);
        asciiArt += asciiChar;
      }
      
      if (row < targetRows - 1) {
        asciiArt += '\n';
      }
    }
    
    return asciiArt;
  }

  private getClosestAsciiChar(brightness: number): string {
    // Invert brightness since we want dark characters for bright pixels
    const invertedBrightness = 255 - brightness;
    
    // Find the character with the closest intensity
    let closestChar = this.charIntensities[0];
    let minDiff = Math.abs(closestChar.intensity - invertedBrightness);
    
    for (const charIntensity of this.charIntensities) {
      const diff = Math.abs(charIntensity.intensity - invertedBrightness);
      if (diff < minDiff) {
        minDiff = diff;
        closestChar = charIntensity;
      }
    }
    
    return closestChar.char;
  }

  private async copyToClipboard(): Promise<void> {
    const outputTextarea = document.getElementById('output') as HTMLTextAreaElement;
    const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
    
    if (!outputTextarea.value.trim()) {
      alert('No ASCII art to copy. Please generate some first.');
      return;
    }

    try {
      await navigator.clipboard.writeText(outputTextarea.value);
      
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.style.background = '#27ae60';
      
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
      }, 2000);
      
    } catch (error) {
      // Fallback for older browsers
      outputTextarea.select();
      document.execCommand('copy');
      alert('ASCII art copied to clipboard!');
    }
  }

  private downloadAsText(): void {
    const outputTextarea = document.getElementById('output') as HTMLTextAreaElement;
    
    if (!outputTextarea.value.trim()) {
      alert('No ASCII art to download. Please generate some first.');
      return;
    }

    const blob = new Blob([outputTextarea.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `ascii-art-${new Date().toISOString().split('T')[0]}.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AsciiArtGenerator();
});
