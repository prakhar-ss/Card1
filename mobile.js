let highestZ = 1;

class Paper {
  isDragging = false;
  startX = 0;
  startY = 0;
  offsetX = 0;
  offsetY = 0;

  init(paper) {
    // Add event listeners for both touch and mouse events
    paper.addEventListener('touchstart', this.startDrag.bind(this));
    paper.addEventListener('touchmove', this.onDrag.bind(this));
    paper.addEventListener('touchend', this.endDrag.bind(this));

    paper.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mousemove', this.onDrag.bind(this));
    document.addEventListener('mouseup', this.endDrag.bind(this));
  }

  startDrag(e) {
    // Check if it's a touch or mouse event
    const isTouch = e.type.includes('touch');
    this.isDragging = true;

    // Set zIndex for paper
    e.target.style.zIndex = highestZ;
    highestZ += 1;

    // Capture the starting position of the drag
    this.startX = isTouch ? e.touches[0].clientX - this.offsetX : e.clientX - this.offsetX;
    this.startY = isTouch ? e.touches[0].clientY - this.offsetY : e.clientY - this.offsetY;

    // Add dragging class for CSS
    e.target.classList.add('dragging');
  }

  onDrag(e) {
    if (!this.isDragging) return;

    // Prevent default for touch to avoid scrolling
    if (e.type.includes('touch')) e.preventDefault();

    // Calculate new position based on event type
    this.offsetX = e.type.includes('touch') ? e.touches[0].clientX - this.startX : e.clientX - this.startX;
    this.offsetY = e.type.includes('touch') ? e.touches[0].clientY - this.startY : e.clientY - this.startY;

    // Update the paper's position
    e.target.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
  }

  endDrag(e) {
    this.isDragging = false;

    // Remove the dragging class to restore transitions if any
    if (e.target) e.target.classList.remove('dragging');
  }
}

// Apply to all paper elements
const papers = document.querySelectorAll('.paper');
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
