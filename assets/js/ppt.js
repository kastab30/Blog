document.addEventListener('DOMContentLoaded', async () => {
            const container = document.getElementById('ppt-grid-container');
            const loadingState = document.getElementById('loading-state');
            const viewerModal = document.getElementById('fullscreen-viewer');
            const iframe = document.getElementById('ppt-iframe');
            const closeBtn = document.getElementById('close-viewer-btn');

            try {
                const response = await fetch('assets/js/pptData.json');
                const pptList = await response.json();

                if(loadingState) loadingState.remove();

                pptList.forEach(ppt => {
                    const cardHTML = `
                        <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-5 sm:p-8 flex flex-col h-full border border-white">
                            
                            <div class="relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-slate-100 aspect-video bg-slate-100 preview-btn mb-5 sm:mb-6 flex-shrink-0" data-viewer="${ppt.viewerLink}">
                                <img src="${ppt.thumbnail}" alt="${ppt.titleHighlight}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" width="960" height="540">
                                <div class="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm">
                                    <div class="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center text-dark shadow-xl transform group-hover:scale-110 transition-transform duration-300 mb-2">
                                        <i class="fa-solid fa-expand text-lg sm:text-xl"></i>
                                    </div>
                                    <span class="font-oswald tracking-widest uppercase text-white text-xs sm:text-sm font-bold">Preview</span>
                                </div>
                            </div>

                            <div class="flex flex-col flex-grow">
                                <span class="inline-block bg-accent/10 text-yellow-600 font-bold px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-widest border border-accent/20 w-fit max-w-full whitespace-normal break-words leading-tight mb-3">
                                    ${ppt.category}
                                </span>
                                
                                <h3 class="font-oswald text-2xl sm:text-3xl uppercase text-dark mb-3 leading-tight line-clamp-2">
                                    ${ppt.titleStart} <span class="text-accent">${ppt.titleHighlight}</span> ${ppt.titleEnd}
                                </h3>
                                
                                <p class="text-slate-600 text-sm sm:text-base mb-6 flex-grow line-clamp-3">
                                    ${ppt.description}
                                </p>
                                
                                <div class="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 border-t border-slate-100 pt-4">
                                    <span class="text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg flex items-center"><i class="fa-solid fa-file-powerpoint text-red-500 mr-1.5"></i> ${ppt.format}</span>
                                    <span class="text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg flex items-center"><i class="fa-solid fa-weight-scale text-blue-500 mr-1.5"></i> ${ppt.size}</span>
                                </div>

                                <a href="${ppt.downloadLink}" download="${ppt.downloadFileName}" class="group relative flex items-center justify-center gap-2 bg-dark text-white w-full px-6 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-1 overflow-hidden mt-auto">
                                    <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    <i class="fa-solid fa-cloud-arrow-down text-lg sm:text-xl group-hover:animate-bounce"></i>
                                    <span>Download Now</span>
                                </a>
                            </div>
                        </div>
                    `;
                    container.insertAdjacentHTML('beforeend', cardHTML);
                });

                const previewBtns = document.querySelectorAll('.preview-btn');
                previewBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        iframe.src = e.currentTarget.getAttribute('data-viewer');
                        viewerModal.classList.remove('hidden');
                        requestAnimationFrame(() => {
                            viewerModal.classList.remove('opacity-0');
                            viewerModal.classList.add('opacity-100');
                        });
                        document.body.classList.add('modal-open'); 
                    });
                });

            } catch {
                if(loadingState) {
                    loadingState.innerHTML = `<p class="text-red-500 font-bold text-center">Failed to load presentations.<br>Please ensure ppt.json is configured correctly.</p>`;
                }
            }

            const closeModal = () => {
                viewerModal.classList.remove('opacity-100');
                viewerModal.classList.add('opacity-0');
                setTimeout(() => { 
                    viewerModal.classList.add('hidden'); 
                    iframe.src = ""; 
                }, 300);
                document.body.classList.remove('modal-open'); 
            };

            closeBtn?.addEventListener('click', closeModal);
            viewerModal?.addEventListener('click', (e) => {
                if (e.target === viewerModal || e.target.classList.contains('flex-grow')) closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !viewerModal.classList.contains('hidden')) closeModal();
            });
        });
