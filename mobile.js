let highestZ = 1;

class DraggablePaper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  offsetX = 0;
  offsetY = 0;

  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.element.addEventListener('touchmove', this.onTouchMove.bind(this));
    this.element.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  onTouchStart(event) {
    if (event.touches.length > 1) return; // Ignore multi-touch
    this.holdingPaper = true;

    // Set highest z-index for the dragged element
    this.element.style.zIndex = highestZ;
    highestZ += 1;

    // Record the starting touch position
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;

    // Calculate initial offset
    const rect = this.element.getBoundingClientRect();
    this.offsetX = rect.left;
    this.offsetY = rect.top;
  }

  onTouchMove(event) {
    if (!this.holdingPaper) return;
    event.preventDefault(); // Prevents screen scrolling during drag

    // Calculate the movement
    const moveX = event.touches[0].clientX - this.startX;
    const moveY = event.touches[0].clientY - this.startY;

    // Update the current position based on the initial offset + movement
    this.currentX = this.offsetX + moveX;
    this.currentY = this.offsetY + moveY;

    // Apply the transform to the element
    this.element.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
  }

  onTouchEnd() {
    this.holdingPaper = false; // Release the drag state
  }
}

// Apply the draggable feature to each card
document.querySelectorAll('.paper').forEach(paper => new DraggablePaper(paper));
