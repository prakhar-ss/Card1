let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.addEventListener('touchstart', (e) => {
      this.holdingPaper = true;
      
      // Bring the paper to the front
      paper.style.zIndex = highestZ;
      highestZ += 1;

      // Get the initial touch position
      this.touchStartX = e.touches[0].clientX - this.currentPaperX;
      this.touchStartY = e.touches[0].clientY - this.currentPaperY;
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;

      e.preventDefault();

      // Calculate the new position based on touch movement
      this.currentPaperX = e.touches[0].clientX - this.touchStartX;
      this.currentPaperY = e.touches[0].clientY - this.touchStartY;

      // Move the paper element smoothly
      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

// Initialize all paper elements for touch dragging
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
