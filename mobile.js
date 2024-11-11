let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  offsetX = 0;
  offsetY = 0;

  init(paper) {
    // Set initial position for each paper
    const rect = paper.getBoundingClientRect();
    this.currentPaperX = rect.left;
    this.currentPaperY = rect.top;
    
    // Update styles to ensure papers start in the correct position
    paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(0deg)`;
    
    paper.addEventListener('touchstart', (e) => {
      // Prevent multitouch issues
      if (e.touches.length > 1) return;

      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;

      // Calculate initial offset
      this.offsetX = this.currentPaperX;
      this.offsetY = this.currentPaperY;
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.holdingPaper) return;

      const moveX = e.touches[0].clientX - this.touchStartX;
      const moveY = e.touches[0].clientY - this.touchStartY;

      // Update position with the offset values
      this.currentPaperX = this.offsetX + moveX;
      this.currentPaperY = this.offsetY + moveY;

      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(0deg)`;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
