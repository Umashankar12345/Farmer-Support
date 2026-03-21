// Image Processing Utility
class ImageProcessor {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  // Load image from various sources
  async loadImage(source) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        resolve(img);
      };
      
      img.onerror = reject;
      
      if (typeof source === 'string') {
        img.src = source;
      } else if (source instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
        };
        reader.readAsDataURL(source);
      } else if (source instanceof Blob) {
        img.src = URL.createObjectURL(source);
      } else {
        reject(new Error('Invalid image source'));
      }
    });
  }

  // Resize image
  resize(width, height, maintainAspectRatio = true) {
    const img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    
    if (maintainAspectRatio) {
      const aspect = this.canvas.width / this.canvas.height;
      if (width / height > aspect) {
        width = height * aspect;
      } else {
        height = width / aspect;
      }
    }
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCtx.drawImage(this.canvas, 0, 0, width, height);
    
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.drawImage(tempCanvas, 0, 0);
    
    return this.getImageData();
  }

  // Crop image
  crop(x, y, width, height) {
    const imageData = this.ctx.getImageData(x, y, width, height);
    
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.putImageData(imageData, 0, 0);
    
    return this.getImageData();
  }

  // Rotate image
  rotate(degrees) {
    const tempCanvas = document.createElement('canvas');
    const angle = degrees * Math.PI / 180;
    
    // Calculate new canvas dimensions
    const sin = Math.abs(Math.sin(angle));
    const cos = Math.abs(Math.cos(angle));
    const newWidth = this.canvas.width * cos + this.canvas.height * sin;
    const newHeight = this.canvas.width * sin + this.canvas.height * cos;
    
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Translate to center and rotate
    tempCtx.translate(newWidth / 2, newHeight / 2);
    tempCtx.rotate(angle);
    tempCtx.drawImage(this.canvas, -this.canvas.width / 2, -this.canvas.height / 2);
    
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    this.ctx.drawImage(tempCanvas, 0, 0);
    
    return this.getImageData();
  }

  // Apply filters
  applyFilter(filterType, intensity = 1) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    switch(filterType) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        break;
        
      case 'invert':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        break;
        
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
          data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
          data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        }
        break;
        
      case 'brightness':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * intensity);
          data[i + 1] = Math.min(255, data[i + 1] * intensity);
          data[i + 2] = Math.min(255, data[i + 2] * intensity);
        }
        break;
        
      case 'contrast':
        const factor = (259 * (intensity + 255)) / (255 * (259 - intensity));
        for (let i = 0; i < data.length; i += 4) {
          data[i] = factor * (data[i] - 128) + 128;
          data[i + 1] = factor * (data[i + 1] - 128) + 128;
          data[i + 2] = factor * (data[i + 2] - 128) + 128;
        }
        break;
    }
    
    this.ctx.putImageData(imageData, 0, 0);
    return this.getImageData();
  }

  // Detect edges (Sobel operator)
  detectEdges() {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Convert to grayscale first
    const grayData = new Uint8ClampedArray(width * height);
    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      grayData[j] = (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    
    // Sobel operators
    const sobelX = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
    ];
    
    const sobelY = [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1]
    ];
    
    const edgeData = new Uint8ClampedArray(data.length);
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let pixelX = 0;
        let pixelY = 0;
        
        // Apply Sobel operators
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pixel = grayData[(y + ky) * width + (x + kx)];
            pixelX += pixel * sobelX[ky + 1][kx + 1];
            pixelY += pixel * sobelY[ky + 1][kx + 1];
          }
        }
        
        const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
        const edgeValue = Math.min(255, magnitude);
        
        const index = (y * width + x) * 4;
        edgeData[index] = edgeValue;
        edgeData[index + 1] = edgeValue;
        edgeData[index + 2] = edgeValue;
        edgeData[index + 3] = 255;
      }
    }
    
    const edgeImageData = new ImageData(edgeData, width, height);
    this.ctx.putImageData(edgeImageData, 0, 0);
    
    return this.getImageData();
  }

  // Extract color histogram
  getColorHistogram() {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    const histogram = {
      red: new Array(256).fill(0),
      green: new Array(256).fill(0),
      blue: new Array(256).fill(0)
    };
    
    for (let i = 0; i < data.length; i += 4) {
      histogram.red[data[i]]++;
      histogram.green[data[i + 1]]++;
      histogram.blue[data[i + 2]]++;
    }
    
    return histogram;
  }

  // Extract dominant colors
  getDominantColors(count = 5) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    const colorMap = {};
    
    // Sample pixels to reduce computation
    const sampleStep = Math.max(1, Math.floor(data.length / 4 / 10000));
    
    for (let i = 0; i < data.length; i += 4 * sampleStep) {
      const r = Math.round(data[i] / 32) * 32;
      const g = Math.round(data[i + 1] / 32) * 32;
      const b = Math.round(data[i + 2] / 32) * 32;
      
      const colorKey = `${r},${g},${b}`;
      colorMap[colorKey] = (colorMap[colorKey] || 0) + 1;
    }
    
    // Sort by frequency and get top colors
    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([colorKey, count]) => {
        const [r, g, b] = colorKey.split(',').map(Number);
        return { r, g, b, count };
      });
    
    return sortedColors;
  }

  // Detect plant disease patterns
  async detectDiseasePatterns() {
    // This is a simplified version - in production, this would use ML models
    const patterns = [];
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    // Check for yellowing (high green but low red/blue variance)
    let yellowPixels = 0;
    let totalPixels = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      totalPixels++;
      
      // Yellow detection: high green, red > blue
      if (g > 150 && r > 100 && b < 100 && Math.abs(r - g) < 50) {
        yellowPixels++;
      }
    }
    
    const yellowPercentage = (yellowPixels / totalPixels) * 100;
    
    if (yellowPercentage > 20) {
      patterns.push({
        type: 'yellowing',
        confidence: Math.min(100, yellowPercentage),
        description: 'Significant yellowing detected - possible nutrient deficiency or disease'
      });
    }
    
    // Check for spots (dark areas surrounded by lighter areas)
    // Simplified edge detection for spots
    const edges = this.detectEdges();
    const edgeData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    
    let edgeCount = 0;
    for (let i = 0; i < edgeData.length; i += 4) {
      if (edgeData[i] > 100) { // Edge threshold
        edgeCount++;
      }
    }
    
    const edgeDensity = (edgeCount / totalPixels) * 100;
    
    if (edgeDensity > 15) {
      patterns.push({
        type: 'spots',
        confidence: Math.min(100, edgeDensity),
        description: 'High edge density detected - possible spots or lesions'
      });
    }
    
    return patterns;
  }

  // Get image as data URL
  getDataURL(format = 'image/jpeg', quality = 0.9) {
    return this.canvas.toDataURL(format, quality);
  }

  // Get image as blob
  getBlob(format = 'image/jpeg', quality = 0.9) {
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => {
        resolve(blob);
      }, format, quality);
    });
  }

  // Get image dimensions
  getDimensions() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
      aspectRatio: this.canvas.width / this.canvas.height
    };
  }

  // Get image data for further processing
  getImageData() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  // Clear canvas
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Export image for analysis
  exportForAnalysis() {
    const dimensions = this.getDimensions();
    const histogram = this.getColorHistogram();
    const dominantColors = this.getDominantColors();
    
    return {
      dimensions,
      histogram,
      dominantColors,
      dataURL: this.getDataURL(),
      timestamp: new Date().toISOString()
    };
  }
}

// Image Analysis Utility
class ImageAnalyzer {
  constructor() {
    this.processor = new ImageProcessor();
    this.diseaseDatabase = {
      'yellowing': {
        name: 'Chlorosis',
        causes: ['Nutrient deficiency', 'Overwatering', 'Poor drainage'],
        treatments: ['Check soil pH', 'Apply iron chelates', 'Improve drainage']
      },
      'spots': {
        name: 'Leaf Spot Disease',
        causes: ['Fungal infection', 'Bacterial infection', 'Environmental stress'],
        treatments: ['Remove affected leaves', 'Apply fungicide', 'Improve air circulation']
      }
    };
  }

  async analyzeImage(imageSource) {
    try {
      await this.processor.loadImage(imageSource);
      
      const analysis = {
        patterns: await this.processor.detectDiseasePatterns(),
        colors: this.processor.getDominantColors(),
        dimensions: this.processor.getDimensions(),
        timestamp: new Date().toISOString()
      };
      
      // Match patterns with known diseases
      analysis.detectedDiseases = this.matchDiseases(analysis.patterns);
      
      // Generate recommendations
      analysis.recommendations = this.generateRecommendations(analysis.detectedDiseases);
      
      return analysis;
    } catch (error) {
      console.error('Image analysis failed:', error);
      throw error;
    }
  }

  matchDiseases(patterns) {
    const diseases = [];
    
    patterns.forEach(pattern => {
      if (this.diseaseDatabase[pattern.type]) {
        const diseaseInfo = this.diseaseDatabase[pattern.type];
        diseases.push({
          name: diseaseInfo.name,
          pattern: pattern.type,
          confidence: pattern.confidence,
          description: pattern.description,
          causes: diseaseInfo.causes,
          treatments: diseaseInfo.treatments
        });
      }
    });
    
    return diseases;
  }

  generateRecommendations(diseases) {
    const recommendations = {
      immediate: [],
      shortTerm: [],
      longTerm: []
    };
    
    diseases.forEach(disease => {
      if (disease.confidence > 80) {
        recommendations.immediate.push(...disease.treatments.slice(0, 2));
      } else if (disease.confidence > 50) {
        recommendations.shortTerm.push(...disease.treatments);
      }
      
      recommendations.longTerm.push(
        'Monitor plant health regularly',
        'Maintain proper watering schedule',
        'Ensure adequate sunlight and air circulation'
      );
    });
    
    // Remove duplicates
    Object.keys(recommendations).forEach(key => {
      recommendations[key] = [...new Set(recommendations[key])];
    });
    
    return recommendations;
  }

  // Compare two images for similarity
  async compareImages(image1, image2) {
    await this.processor.loadImage(image1);
    const data1 = this.processor.getImageData();
    
    await this.processor.loadImage(image2);
    const data2 = this.processor.getImageData();
    
    // Ensure same dimensions
    if (data1.width !== data2.width || data1.height !== data2.height) {
      throw new Error('Images must have same dimensions for comparison');
    }
    
    let diff = 0;
    const pixels = data1.width * data1.height;
    
    for (let i = 0; i < data1.data.length; i += 4) {
      const r1 = data1.data[i];
      const g1 = data1.data[i + 1];
      const b1 = data1.data[i + 2];
      
      const r2 = data2.data[i];
      const g2 = data2.data[i + 1];
      const b2 = data2.data[i + 2];
      
      diff += Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
    }
    
    const similarity = 100 - ((diff / (pixels * 3 * 255)) * 100);
    return Math.max(0, similarity);
  }
}

export {
  ImageProcessor,
  ImageAnalyzer
};