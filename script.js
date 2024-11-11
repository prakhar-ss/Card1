// let highestZ = 1;

// class Paper {
//   holdingPaper = false;
//   mouseTouchX = 0;
//   mouseTouchY = 0;
//   mouseX = 0;
//   mouseY = 0;
//   prevMouseX = 0;
//   prevMouseY = 0;
//   velX = 0;
//   velY = 0;
//   rotation = Math.random() * 30 - 15;
//   currentPaperX = 0;
//   currentPaperY = 0;
//   rotating = false;

//   init(paper) {
//     document.addEventListener('mousemove', (e) => {
//       if(!this.rotating) {
//         this.mouseX = e.clientX;
//         this.mouseY = e.clientY;
        
//         this.velX = this.mouseX - this.prevMouseX;
//         this.velY = this.mouseY - this.prevMouseY;
//       }
        
//       const dirX = e.clientX - this.mouseTouchX;
//       const dirY = e.clientY - this.mouseTouchY;
//       const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
//       const dirNormalizedX = dirX / dirLength;
//       const dirNormalizedY = dirY / dirLength;

//       const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
//       let degrees = 180 * angle / Math.PI;
//       degrees = (360 + Math.round(degrees)) % 360;
//       if(this.rotating) {
//         this.rotation = degrees;
//       }

//       if(this.holdingPaper) {
//         if(!this.rotating) {
//           this.currentPaperX += this.velX;
//           this.currentPaperY += this.velY;
//         }
//         this.prevMouseX = this.mouseX;
//         this.prevMouseY = this.mouseY;

//         paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
//       }
//     })

//     paper.addEventListener('mousedown', (e) => {
//       if(this.holdingPaper) return; 
//       this.holdingPaper = true;
      
//       paper.style.zIndex = highestZ;
//       highestZ += 1;
      
//       if(e.button === 0) {
//         this.mouseTouchX = this.mouseX;
//         this.mouseTouchY = this.mouseY;
//         this.prevMouseX = this.mouseX;
//         this.prevMouseY = this.mouseY;
//       }
//       if(e.button === 2) {
//         this.rotating = true;
//       }
//     });
//     window.addEventListener('mouseup', () => {
//       this.holdingPaper = false;
//       this.rotating = false;
//     });
//   }
// }

// const papers = Array.from(document.querySelectorAll('.paper'));

// papers.forEach(paper => {
//   const p = new Paper();
//   p.init(paper);
// });
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






