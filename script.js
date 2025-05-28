// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Alternância de tema (claro/escuro)
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Verificar se há preferência de tema salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    // Função para alternar entre temas
    themeToggleBtn.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        // Alternar ícone do menu
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !mobileMenuBtn.contains(event.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Funcionalidade "Leia mais" para expandir posts
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const postContent = this.parentElement;
            const excerpt = postContent.querySelector('.post-excerpt');
            const fullContent = postContent.querySelector('.post-full-content');
            
            if (fullContent.classList.contains('hidden')) {
                // Expandir conteúdo
                excerpt.style.display = 'none';
                fullContent.classList.remove('hidden');
                this.innerHTML = 'Mostrar menos <i class="fas fa-arrow-up"></i>';
            } else {
                // Recolher conteúdo
                excerpt.style.display = 'block';
                fullContent.classList.add('hidden');
                this.innerHTML = 'Leia mais <i class="fas fa-arrow-right"></i>';
            }
        });
    });
    
    // Animações ao rolar a página
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.post, .sidebar-widget');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar elementos como invisíveis
    const elementsToAnimate = document.querySelectorAll('.post, .sidebar-widget');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Executar animação no carregamento e ao rolar
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Versículo do dia - Array de versículos
    const verses = [
        {
            text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
            reference: "Provérbios 3:5-6"
        },
        {
            text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
            reference: "João 3:16"
        },
        {
            text: "Não to mandei eu? Sê forte e corajoso; não temas, nem te espantes, porque o Senhor, teu Deus, é contigo por onde quer que andares.",
            reference: "Josué 1:9"
        },
        {
            text: "O Senhor é o meu pastor; nada me faltará. Ele me faz repousar em pastos verdejantes. Leva-me para junto das águas de descanso.",
            reference: "Salmos 23:1-2"
        },
        {
            text: "Eu sou a videira, vós, os ramos. Quem permanece em mim, e eu, nele, esse dá muito fruto; porque sem mim nada podeis fazer.",
            reference: "João 15:5"
        },
        {
            text: "Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças.",
            reference: "Filipenses 4:6"
        },
        {
            text: "Porque eu bem sei os planos que estou projetando para vós, diz o Senhor; planos de paz e não de mal, para vos dar um futuro e uma esperança.",
            reference: "Jeremias 29:11"
        }
    ];
    
    // Função para exibir um versículo aleatório
    const newVerseBtn = document.getElementById('new-verse-btn');
    const dailyVerseText = document.getElementById('daily-verse-text');
    const dailyVerseReference = document.getElementById('daily-verse-reference');
    
    function displayRandomVerse() {
        const randomIndex = Math.floor(Math.random() * verses.length);
        const verse = verses[randomIndex];
        
        // Animação de fade
        dailyVerseText.style.opacity = 0;
        dailyVerseReference.style.opacity = 0;
        
        setTimeout(() => {
            dailyVerseText.textContent = `"${verse.text}"`;
            dailyVerseReference.textContent = `— ${verse.reference}`;
            
            dailyVerseText.style.opacity = 1;
            dailyVerseReference.style.opacity = 1;
        }, 300);
    }
    
    // Estilizar a transição dos versículos
    dailyVerseText.style.transition = 'opacity 0.3s ease';
    dailyVerseReference.style.transition = 'opacity 0.3s ease';
    
    // Evento de clique para novo versículo
    newVerseBtn.addEventListener('click', displayRandomVerse);
    
    // Funcionalidade de busca (simulada)
    const searchForm = document.querySelector('.search-form');
    
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = this.querySelector('input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm !== '') {
            alert(`Busca por: "${searchTerm}"\n\nEsta é uma funcionalidade simulada para demonstração.`);
            searchInput.value = '';
        }
    });
    
    // Efeito de hover nos links do menu
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Inicializar a página com um versículo aleatório
    displayRandomVerse();
});
