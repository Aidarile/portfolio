import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio-personal';

  ngOnInit() {
    // Navegación suave
    this.configurarNavegacionSuave();
    // Animaciones de scroll
    this.configurarAnimacionesScroll();
    // Efectos navbar
    this.configurarEfectosNavbar();
    // Menú móvil
    this.configurarMenuMovil();
  }

  configurarNavegacionSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
      enlace.addEventListener('click', function (evento) {
        evento.preventDefault();
        const destino = document.querySelector(enlace.getAttribute('href')!);
        if (destino) {
          destino.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  configurarAnimacionesScroll() {
    const opcionesObservador = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
        }
      });
    }, opcionesObservador);

    document.querySelectorAll('.aparece-scroll').forEach(elemento => {
      observador.observe(elemento);
    });
  }

  configurarEfectosNavbar() {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
          navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        }
      }
    });
  }

  configurarMenuMovil() {
  const botonMenu = document.querySelector('.boton-menu-movil');
  const menuNavegacion = document.querySelector('.menu-navegacion');
  
  if (botonMenu && menuNavegacion) {
    // Abrir/cerrar menú al hacer clic en hamburguesa
    botonMenu.addEventListener('click', () => {
      if (menuNavegacion.classList.contains('menu-activo')) {
        menuNavegacion.classList.remove('menu-activo');
      } else {
        menuNavegacion.classList.add('menu-activo');
      }
    });

    // Cierra menú al hacer clic en cualquier opción
    const enlacesMenu = menuNavegacion.querySelectorAll('a');
    enlacesMenu.forEach(enlace => {
      enlace.addEventListener('click', () => {
        menuNavegacion.classList.remove('menu-activo');
      });
    });

    // Cierra menú al hacer clic fuera de él
    document.addEventListener('click', (evento) => {
      const dentroDelMenu = menuNavegacion.contains(evento.target as Node);
      const eselBoton = botonMenu.contains(evento.target as Node);
      
      if (!dentroDelMenu && !eselBoton && menuNavegacion.classList.contains('menu-activo')) {
        menuNavegacion.classList.remove('menu-activo');
      }
    });
  }
}
}