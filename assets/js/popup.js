document.addEventListener('DOMContentLoaded', async () => {
        const POPUP_CONFIG = {
          enabled: true,      
          delayMS: 1500      
        };

        const popup = document.getElementById('welcome-popup');
        const popupContent = popup?.querySelector('.popup-content');
        const closeBtn = document.getElementById('close-popup');

        if (POPUP_CONFIG.enabled && popup && popupContent) {
          try {
          
            const response = await fetch('assets/js/pptData.json');
            const pptData = await response.json();
  
            if(pptData && pptData.length > 0) {
                const latestPPT = pptData[0];
                
                const imgEl = document.getElementById('popup-img');
                if (imgEl) {
                  imgEl.loading = 'lazy';
                  imgEl.decoding = 'async';
                  imgEl.width = 960;
                  imgEl.height = 540;
                  imgEl.src = latestPPT.thumbnail;
                  imgEl.onload = () => imgEl.classList.remove('opacity-0');
                }
                document.getElementById('popup-title').innerHTML = `${latestPPT.titleStart} <br> <span class="text-accent">${latestPPT.titleHighlight}</span>`;
                document.getElementById('popup-desc').innerText = latestPPT.description;
            }
          } catch {
            document.getElementById('popup-desc').innerText = 'Open the presentation library to view the latest resources.';
          }

          setTimeout(() => {
            popup.classList.remove('opacity-0', 'pointer-events-none');
            popupContent.classList.remove('scale-95');
            popupContent.classList.add('scale-100');
            document.body.style.overflow = 'hidden'; 
          }, POPUP_CONFIG.delayMS);

          const closePopup = () => {
            popup.classList.add('opacity-0', 'pointer-events-none');
            popupContent.classList.remove('scale-100');
            popupContent.classList.add('scale-95');
            document.body.style.overflow = 'auto'; 
          };

          if(closeBtn) closeBtn.addEventListener('click', closePopup);
          popup.addEventListener('click', (e) => {
            if (e.target === popup) closePopup();
          });
          document.addEventListener('keydown', (e) => {
             if (e.key === 'Escape' && !popup.classList.contains('pointer-events-none')) closePopup();
          });
        }
      });
