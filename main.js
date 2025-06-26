// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Reservation Modal Logic
// AHORA DEFINIMOS reservationModal y closeModal
const reservationModal = document.getElementById('reservationModal');
const closeModalBtn = document.getElementById('closeModal'); // Cambié la variable para evitar conflicto

// Obtener TODOS los botones que deberían abrir el modal
const allReserveButtons = document.querySelectorAll(
    '#reserveBtnHeader, ' +       // Botón del header (escritorio)
    '#reservarBtnMobile, ' +      // Botón del menú móvil
    '#reserveBtnHero, ' +         // Botón de la sección Hero
    '#mesas button[type="button"]' // Botones de "Reservar" dentro de la sección de mesas
);

// Muestra el modal cuando cualquier botón "Reservar" es clickeado
allReserveButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (reservationModal) { // Asegúrate de que el modal exista
            reservationModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Evita el scroll en el body
            // Opcional: Cierra el menú móvil si está abierto al abrir el modal
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) { // Asegúrate de que mobileMenu esté definido
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Cierra el modal cuando se hace clic en el botón de cerrar
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        if (reservationModal) {
            reservationModal.classList.add('hidden');
            document.body.style.overflow = ''; // Restaura el scroll
        }
    });
}

// Cierra el modal al hacer clic fuera de él (en el fondo oscuro)
if (reservationModal) {
    reservationModal.addEventListener('click', function(e) {
        if (e.target === reservationModal) { // Solo si el clic es directamente en el fondo del modal
            reservationModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}


// Opcional: Para el botón "Ir a Contacto para Reservar" dentro del modal
const goToContactBtn = document.getElementById('goToContactBtn');
if (goToContactBtn) {
    goToContactBtn.addEventListener('click', function(e) {
        if (reservationModal) {
            reservationModal.classList.add('hidden'); 
            document.body.style.overflow = ''; 
        }
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            window.scrollTo({
                top: contactSection.offsetTop - 80, 
                behavior: 'smooth'
            });
        }
    });
}


const animateOnScroll = () => {
    const elements = document.querySelectorAll('.pool-table-card, .table-feature');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

document.querySelectorAll('.pool-table-card, .table-feature').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

const formReserva = document.getElementById('formReserva');

console.log("Elemento formReserva encontrado:", formReserva);

if (formReserva) {
    formReserva.addEventListener('submit', function(e) {
        e.preventDefault();

        console.log("Evento submit del formulario detectado y preventDefault() ejecutado.");

        // Obtener valores del formulario DENTRO de este listener para validar
        const nombre = document.getElementById('name').value.trim();
        const cantidad = document.getElementById('number').value;
        const fecha = document.getElementById('fecha').value;
        const horario = document.getElementById('horario').value;
        const mesa = document.getElementById('subject').options[document.getElementById('subject').selectedIndex].text;
        const mensaje = document.getElementById('message').value;

        // **Validación AHORA AQUÍ**
        if (!nombre) {
            alert('Por favor, ingresa tu nombre.');
            document.getElementById('name').focus();
            return;
        }
        if (!cantidad) {
            alert('Por favor, ingresa la cantidad de personas.');
            document.getElementById('number').focus();
            return;
        }
        if (!fecha) {
            alert('Por favor, ingresa la fecha de reserva.');
            document.getElementById('fecha').focus();
            return;
        }
        if (!horario) {
            alert('Por favor, ingresa el horario de reserva.');
            document.getElementById('horario').focus();
            return;
        }
        if (!mesa) {
            alert('Por favor, selecciona una mesa.');
            document.getElementById('subject').focus();
            return;
        }
        if (!mensaje) {
            alert('Por favor, ingresa un mensaje.');
            document.getElementById('message').focus();
            return;
        }

        const texto = `Hola, quiero reservar una mesa.\n\nNombre: ${nombre}\nCantidad de personas: ${cantidad}\nFecha: ${fecha}\nHorario: ${horario}\nMesa: ${mesa}\nMensaje: ${mensaje}`;
        const telefono = '59169110022'; // Tu número de teléfono
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
        console.log("URL de WhatsApp generada:", url);

        window.open(url, '_blank');

        document.getElementById('formReserva').reset();
    });
}