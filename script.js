document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const animatedText = document.getElementById('animated-text');
    const words = ['mémorables.', 'attirantes.', 'innovantes.', 'créatives.'];
    let currentWordIndex = 0;
    let isAnimating = false;
    let isMenuOpen = false;

    // Fonction pour le menu mobile
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileMenu.style.transform = isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }

    // Fonction pour l'animation du texte
    async function changeWord() {
        if (isAnimating) return;
        isAnimating = true;

        animatedText.classList.add('hidden');
        await new Promise(resolve => setTimeout(resolve, 500));

        currentWordIndex = (currentWordIndex + 1) % words.length;
        animatedText.textContent = words[currentWordIndex];

        requestAnimationFrame(() => {
            animatedText.classList.remove('hidden');
            animatedText.classList.add('visible');
        });

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Fonction pour gérer le scroll
    function handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Event Listeners
    mobileMenu.addEventListener('click', toggleMobileMenu);

    // Gestion des clics sur les liens du menu
    const navItems = document.querySelectorAll('.nav-item a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.style.transform = 'rotate(0deg)';
            isMenuOpen = false;
        });
    });

    // Initialisation de l'animation du texte
    animatedText.classList.add('visible');
    const interval = setInterval(changeWord, 4000);

    // Gestion du scroll
    window.addEventListener('scroll', handleScroll);

    // Nettoyage
    window.addEventListener('beforeunload', () => {
        clearInterval(interval);
    });
});



// Animation des barres de progression
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress');
    
    const animateProgress = () => {
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            bar.style.width = value + '%';
        });
    };

    // Observer pour l'animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgress();
                observer.unobserve(entry.target);
            }
        });
    });

    // Observer la section des compétences
    const skillsSection = document.querySelector('.skills-container');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});






// Effet de curseur personnalisé
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor-blur');
    let isMoving = false;
    let timeoutId;

    // Fonction pour vérifier si l'élément ou ses parents ont la classe no-cursor-effect
    const shouldShowEffect = (element) => {
        let currentElement = element;
        while (currentElement && currentElement !== document.body) {
            if (currentElement.classList.contains('no-cursor-effect') || 
                currentElement.tagName.toLowerCase() === 'button' || 
                currentElement.tagName.toLowerCase() === 'a' ||
                currentElement.classList.contains('navbar')) {
                return false;
            }
            currentElement = currentElement.parentElement;
        }
        return true;
    };

    // Gestionnaire de mouvement de souris
    document.addEventListener('mousemove', (e) => {
        if (!shouldShowEffect(e.target)) {
            cursor.style.opacity = '0';
            return;
        }

        cursor.style.opacity = '1';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Ajouter un effet de trainée
        if (!isMoving) {
            isMoving = true;
            cursor.style.transition = 'opacity 0.3s ease, left 0.2s ease-out, top 0.2s ease-out';
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            isMoving = false;
            cursor.style.transition = 'opacity 0.3s ease, left 0.5s ease, top 0.5s ease';
        }, 100);
    });

    // Masquer l'effet quand la souris quitte la fenêtre
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Réafficher l'effet quand la souris revient
    document.addEventListener('mouseenter', () => {
        if (shouldShowEffect(document.elementFromPoint(event.clientX, event.clientY))) {
            cursor.style.opacity = '1';
        }
    });
});


// Ajout du JavaScript pour l'animation des pourcentages
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const progress = item.querySelector('.progress');
        const percentage = item.querySelector('.percentage');
        const startValue = parseInt(progress.dataset.start);
        const endValue = parseInt(progress.dataset.end);

        // Définir les valeurs initiales
        progress.style.width = startValue + '%';
        percentage.textContent = startValue + '%';

        // Animation au survol
        item.addEventListener('mouseenter', () => {
            let currentValue = startValue;
            const increment = (endValue - startValue) / 0; // Pour une animation fluide
            
            const animation = setInterval(() => {
                currentValue += increment;
                if (currentValue >= endValue) {
                    currentValue = endValue;
                    clearInterval(animation);
                }
                percentage.textContent = Math.round(currentValue) + '%';
                progress.style.width = currentValue + '%';
            }, 20);

            item.animation = animation; // Stocker l'animation
        });

        // Retour à la valeur initiale
        item.addEventListener('mouseleave', () => {
            clearInterval(item.animation);
            let currentValue = endValue;
            const decrement = (endValue - startValue) / 30;

            const returnAnimation = setInterval(() => {
                currentValue -= decrement;
                if (currentValue <= startValue) {
                    currentValue = startValue;
                    clearInterval(returnAnimation);
                }
                percentage.textContent = Math.round(currentValue) + '%';
                progress.style.width = currentValue + '%';
            }, 20);
        });
    });
});










document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const track = document.querySelector('.slide-track');
    const slides = document.querySelectorAll('.slide');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;
    let isClick = true;

    function dragStart(e) {
        isClick = true;
        isDragging = true;
        startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        
        track.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = currentPosition - startPos;

        if (Math.abs(diff) > 5) {
            isClick = false;
        }

        currentTranslate = prevTranslate + diff;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function dragEnd() {
        isDragging = false;
        prevTranslate = currentTranslate;
        track.style.transition = 'transform 0.3s ease';
    }

    // Gestionnaires d'événements pour le glissement
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('touchstart', dragStart);

    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);

    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);
    slider.addEventListener('touchend', dragEnd);

    // Gestion de la galerie
    slides.forEach((slide, index) => {
        const image = slide.querySelector('img');
        
        image.addEventListener('click', () => {
            if (isClick) {
                currentIndex = index;
                openModal(image.src);
            }
        });
    });

    function openModal(src) {
        modal.style.display = 'flex';
        modalImg.src = src;
        setTimeout(() => modal.classList.add('active'), 10);
    }

    function closeModalFunction() {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }

    closeModal.addEventListener('click', closeModalFunction);
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        modalImg.src = slides[currentIndex].querySelector('img').src;
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        modalImg.src = slides[currentIndex].querySelector('img').src;
    });
});












document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('gallery');
    const items = carousel.getElementsByClassName('carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let isAnimating = false;

    // Trouver l'index initial
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains('active')) {
            currentIndex = i;
            break;
        }
    }

    function slideNext() {
        if (isAnimating) return;
        isAnimating = true;

        // Cache l'item actuel
        const currentItem = items[currentIndex];
        
        // Calcule le nouvel index
        const nextIndex = (currentIndex + 1) % items.length;
        const nextItem = items[nextIndex];

        // Prépare la prochaine slide à droite
        nextItem.style.transform = 'translateX(100%)';
        nextItem.style.display = 'block';

        // Force un reflow
        void nextItem.offsetWidth;

        // Anime les deux slides
        currentItem.style.transform = 'translateX(-100%)';
        nextItem.style.transform = 'translateX(0)';

        // Nettoie après l'animation
        setTimeout(() => {
            currentItem.style.display = 'none';
            currentItem.classList.remove('active');
            nextItem.classList.add('active');
            currentIndex = nextIndex;
            isAnimating = false;
        }, 700);
    }

    function slidePrev() {
        if (isAnimating) return;
        isAnimating = true;

        // Cache l'item actuel
        const currentItem = items[currentIndex];
        
        // Calcule le nouvel index
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        const prevItem = items[prevIndex];

        // Prépare la slide précédente à gauche
        prevItem.style.transform = 'translateX(-100%)';
        prevItem.style.display = 'block';

        // Force un reflow
        void prevItem.offsetWidth;

        // Anime les deux slides
        currentItem.style.transform = 'translateX(100%)';
        prevItem.style.transform = 'translateX(0)';

        // Nettoie après l'animation
        setTimeout(() => {
            currentItem.style.display = 'none';
            currentItem.classList.remove('active');
            prevItem.classList.add('active');
            currentIndex = prevIndex;
            isAnimating = false;
        }, 700);
    }

    // Gestionnaires d'événements pour les boutons
    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);

    // Auto-play (optionnel)
    const autoPlayInterval = 3000; // 5 secondes entre chaque slide
    let autoPlayTimer;

    function startAutoPlay() {
        autoPlayTimer = setInterval(slideNext, autoPlayInterval);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // Démarrer l'auto-play
    startAutoPlay();

    // Arrêter l'auto-play au survol
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Gestion des touches du clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            slidePrev();
            stopAutoPlay();
        } else if (e.key === 'ArrowRight') {
            slideNext();
            stopAutoPlay();
        }
    });
});


const images = document.querySelectorAll('.grid-item img');
const modal = document.querySelector('.modal');
const modalImg = modal.querySelector('img');
const closeModalBtn = modal.querySelector('.close');
const nextBtn = modal.querySelector('.next');
const prevBtn = modal.querySelector('.prev');

let currentIndex = 0;

// Ouvrir la modale et afficher l'image cliquée
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
        currentIndex = index;
    });
});

// Fermer la modale
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Naviguer vers l'image suivante
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
});

// Naviguer vers l'image précédente
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
});

// Fermer la modale lors d'un clic en dehors de l'image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});





// Gestion des catégories et des images affichées
const categoryButtons = document.querySelectorAll('.category-btn');
const imageGrid = document.querySelector('.image-grid');
const gridItems = document.querySelectorAll('.grid-item');

// Fonction pour afficher les 3 premières images de chaque catégorie au chargement
function displayInitialImages() {
    const categories = ['shoes', 'bags', 'electronics', 'gaming']; // Liste des catégories
    gridItems.forEach(item => {
        item.style.display = 'none'; // Masquer toutes les images par défaut
    });

    // Afficher les 3 premières images de chaque catégorie
    categories.forEach(cat => {
        let count = 0;
        gridItems.forEach(item => {
            if (item.getAttribute('data-category') === cat && count < 3) {
                item.style.display = 'block';
                count++;
            }
        });
    });
}

// Fonction pour gérer l'affichage des images par catégorie
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Supprimer la classe active de tous les boutons
        categoryButtons.forEach(btn => btn.classList.remove('active'));

        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');

        // Identifier la catégorie sélectionnée
        const category = button.getAttribute('data-category');

        // Ajouter une animation de transition (fade out)
        imageGrid.classList.add('hidden');

        // Après la transition, mettre à jour les images affichées
        setTimeout(() => {
            gridItems.forEach(item => {
                item.style.display = 'none'; // Masquer toutes les images
            });

            if (category === 'all') {
                // Afficher toutes les images
                gridItems.forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                // Afficher toutes les images correspondant à la catégorie sélectionnée
                gridItems.forEach(item => {
                    if (item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    }
                });
            }

            // Réapparaître la grille (fade in)
            imageGrid.classList.remove('hidden');
        }, 500); // Durée de la transition définie dans le CSS
    });
});

// Appeler la fonction pour afficher les images initiales
displayInitialImages();















document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les éléments FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    // Ajouter les écouteurs d'événements pour chaque item
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Si l'item cliqué est déjà actif, on le ferme
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                // Fermer tous les autres items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Ouvrir l'item cliqué
                item.classList.add('active');
            }
        });
    });
});