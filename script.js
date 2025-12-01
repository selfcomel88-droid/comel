document.addEventListener('DOMContentLoaded', function() {

    // Efeito de 'fade-in' para elementos ao rolar a página
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.splide, .pilar-card, .produto-card, .padrao-imagem, .padrao-texto, .video-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(el);
    });
    
    // --- LÓGICA DO MODAL DE PRODUTOS ---
    const productDetails = {
        alicates:{title:'Alicates e Ferramentas de Aperto',items:[{name:'',img:'images/alicate-exmp-3.jpg'},{name:'',img:'images/alicate-exmp-4.jpg'},{name:'',img:'images/alicate-exmp-5.jpg'}]},
        epis:{title:'Equipamentos de proteção',items:[{name:'',img:'images/escudo-exmp-2.jpg'},{name:'',img:'images/escudo-exmp-2.jpg'},{name:'',img:'images/escudo-exmp-2.jpg'}]},
        carrinhos:{title:'Carrinhos de Mão',items:[{name:'',img:'images/carrinho-exmp-1.jpg'},{name:'',img:'images/carrinho-exmp-2.jpg'},{name:'',img:'images/carrinho-exmp-5.jpg'}]},
        ferramentas:{title:'Ferramentas Manuais Diversas',items:[{name:'',img:'images/chave-exmp-4.jpg'},{name:"",img:'images/chave-exmp-5.jpg'},{name:'',img:'images/chave-exmp-7.jpg'}]},
        escadas:{title:'Escadas',items:[{name:'',img:'images/escadas-exmp-1.jpg'},{name:'',img:'images/escadas-exmp-2.jpg'},{name:'',img:'images/escadas-exmp-3.jpg'}]},
        tomadas:{title:'Tomadas e Interruptores',items:[{name:'',img:'images/tomadas-exmp-1.jpg'},{name:'',img:'images/tomadas-exmp-2.jpg'},{name:'',img:'images/tomadas-exmp-3.jpg'}]},
        parafusadeiras:{title:'Parafusadeiras e Ferramentas Elétricas',items:[{name:'',img:'images/furadeiras-exmp-1.jpg'},{name:'',img:'images/furadeiras-exmp-4.jpg'},{name:'',img:'images/furadeiras-exmp-3.jpg'}]}
    };
    const modal=document.getElementById('productsModal'),modalTitle=document.getElementById('modalTitle'),modalGrid=document.getElementById('modalGrid'),closeModalBtn=modal.querySelector('.modal-close');
    document.querySelectorAll('.produto-card').forEach(card=>{card.addEventListener('click',()=>{const category=card.dataset.category,data=productDetails[category];if(data){modalTitle.textContent=data.title,modalGrid.innerHTML='',data.items.forEach(item=>{const productHtml=`
                        <div class="product-detail-item">
                            <img src="${item.img}" alt="${item.name}">
                            <h3>${item.name}</h3>
                        </div>
                    `;modalGrid.innerHTML+=productHtml}),modal.classList.add('active'),document.body.style.overflow='hidden'}})});
    const closeModal=()=>{modal.classList.remove('active'),document.body.style.overflow='auto'};
    closeModalBtn.addEventListener('click',closeModal),modal.addEventListener('click',event=>{if(event.target===modal)closeModal()}),document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal.classList.contains('active'))closeModal()});

    // --- LÓGICA DO PLAYER DE VÍDEO ---
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function() {
            const videoSrc = this.dataset.videoSrc;
            if (!videoSrc) return;
            
            const videoElement = document.createElement('video');
            videoElement.src = videoSrc;
            videoElement.controls = true;
            videoElement.autoplay = true;
            videoElement.muted = false;
            
            this.innerHTML = '';
            this.appendChild(videoElement);
            this.style.cursor = 'default';
        });
    });

    // --- INICIALIZAÇÃO DOS SLIDESHOWS ---
    if(document.getElementById('garantia-slider'))new Splide('#garantia-slider',{type:'loop',perPage:1,autoplay:true,interval:5000,pauseOnHover:true}).mount();
    if(document.getElementById('produtos-slider'))new Splide('#produtos-slider',{type:'loop',perPage:4,gap:'1.5rem',pagination:false,breakpoints:{992:{perPage:3},768:{perPage:2},576:{perPage:1}}}).mount();
    if(document.getElementById('marcas-slider'))new Splide('#marcas-slider',{type:'loop',perPage:6,gap:'1.5rem',autoplay:false,arrows:true,pagination:false,perMove:1,breakpoints:{992:{perPage:5},768:{perPage:4},576:{perPage:3}}}).mount();
});