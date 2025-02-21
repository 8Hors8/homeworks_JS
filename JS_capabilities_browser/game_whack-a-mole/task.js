(() => {
    let playing = true,
      activeHole = 1,
      score = 0,
      missed = 0;
  
    const deadCounter = document.getElementById("dead");
    const lostCounter = document.getElementById("lost");
  
    const getHole = index => document.getElementById(`hole${index}`);
  
    const deactivateHole = index => getHole(index).className = 'hole';
    
    const activateHole = index => {
      const hole = getHole(index);
      hole.className = 'hole hole_has-mole';
  
      hole.onclick = () => {
        if (!playing) return;
  
        score++;
        deadCounter.textContent = score;
        hole.className = 'hole';
        hole.onclick = null;
  
        if (score >= 10) {
          alert("Вы победили! 🎉");
          playing = false;
          return;
        }
      };
    };
  
    const next = () => setTimeout(() => {
      if (!playing) return;
  
      const prevHole = getHole(activeHole);
      
      
      if (prevHole.classList.contains('hole_has-mole')) {
        missed++; 
        lostCounter.textContent = missed;
  
        if (missed >= 5) {
          alert("Вы проиграли! 😢");
          playing = false;
          return;
        }
      }
  
      prevHole.onclick = null; 
      deactivateHole(activeHole); 
      activeHole = Math.floor(1 + Math.random() * 9);
      activateHole(activeHole); 
  
      next(); 
    }, 800);
  
    next();
  })();
  