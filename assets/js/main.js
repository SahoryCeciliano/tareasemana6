/**
* Template Name: EstateAgency - v4.8.0
* Template URL: https://bootstrapmade.com/real-estate-agency-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .navbar-reduce
   */
  let selectHNavbar = select('.navbar-default')
  if (selectHNavbar) {
    onscroll(document, () => {
      if (window.scrollY > 100) {
        selectHNavbar.classList.add('navbar-reduce')
        selectHNavbar.classList.remove('navbar-trans')
      } else {
        selectHNavbar.classList.remove('navbar-reduce')
        selectHNavbar.classList.add('navbar-trans')
      }
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Search window open/close
   */
  let body = select('body');
  on('click', '.navbar-toggle-box', function(e) {
    e.preventDefault()
    body.classList.add('box-collapse-open')
    body.classList.remove('box-collapse-closed')
  })

  on('click', '.close-box-collapse', function(e) {
    e.preventDefault()
    body.classList.remove('box-collapse-open')
    body.classList.add('box-collapse-closed')
  })

  /**
   * Intro Carousel
   */
  new Swiper('.intro-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property carousel
   */
  new Swiper('#property-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.propery-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * News carousel
   */
  new Swiper('#news-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.news-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonial carousel
   */
  new Swiper('#testimonial-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.testimonial-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property Single carousel
   */
  new Swiper('#property-single-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.property-single-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()


let resul ;
let total;
function calcularPago() {
    const ms = parseFloat(document.getElementById('requestedAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interes').value) / 100;
    const tm = annualInterestRate / 12; // Tasa de interés mensual
    const p = parseInt(document.getElementById('term').value) * 12; // Plazo en meses

    if (ms > 0 && p > 0) {
        const pm = (ms * tm) / (1 - Math.pow(1 + tm, -p));
       resul=pm;
        document.getElementById('resultado').value = pm.toFixed(2);
      
    } else {
        alert('Por favor, verifique los datos ingresados.');
    }
}
function minimoPago(){
    total=resul/0.40;
    document.getElementById('totalMinimo').value = total.toFixed(2);
}
function revisarMonto(){
    const salarioM = parseFloat(document.getElementById('Salario').value);
     if(salarioM >= total){
        document.getElementById('texto').innerHTML="Monto de salario suficiente para el crédito";
     } else{
        document.getElementById('texto').innerHTML="“Monto de salario insuficiente";
     }
}



function revisarEdad() {
    const birthdateInput = document.getElementById('cumpleaños').value;
    if (!birthdateInput) {
        document.getElementById('message').innerText = 'Por favor, ingrese una fecha de nacimiento.';
        return;
    }

    const fecha = new Date(birthdateInput);
    const today = new Date();
    const age = today.getFullYear() - fecha.getFullYear();
    const monthDiff = today.getMonth() - fecha.getMonth();

    // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < fecha.getDate())) {
        age--;
    }

    // Verificar la elegibilidad
    if (age >= 22 && age < 55) {
        document.getElementById('message').innerText = "Cliente con edad suficiente para crédito.";
    } else {
        document.getElementById('message').innerText = "Cliente no califica para crédito por edad.";
    }
}



function porcentajeFinanciar(){
    const vivienda = document.getElementById('homeValue').value;
    const ms = parseFloat(document.getElementById('requestedAmount').value);
    const porcentaje=(vivienda/ms)*100;
    document.getElementById('porcentajes').innerText = porcentaje+"%";

}



function guardarDatos(){
let email= document.getElementById('email').value;
let Nombre=document.getElementById('Nombre').value;
let num=document.getElementById('homeValue').value;
let fecha= document.getElementById('cumpleaños').value;
let Salario=document.getElementById('Salario').value;
let term=document.getElementById('term').value;
let requestedAmount=document.getElementById('requestedAmount').value;

localStorage.setItem("email",email);
localStorage.setItem("Nombre",Nombre);
localStorage.setItem("Salario",Salario);
localStorage.setItem("valorh",num);
localStorage.setItem("fecha",fecha);
localStorage.setItem("term",term);
localStorage.setItem("requestedAmount",requestedAmount);
   
}

function Interes(tasa, mes, pagoMensual,montoSolicitado) {
    var vInteres=0;
    var amortizacion=montoSolicitado;
    for (var i=1;i<=mes; i++){
        vInteres=(amortizacion*(tasa/100));
        amortizacion=amortiza-(pagoMensual-vInteres);
    }

    return  vInteres;
}


function mostrarDatosFinal() {
    let email = document.getElementById('email').value;
    let nombre = document.getElementById('Nombre').value;
    let homeValue = document.getElementById('homeValue').value;
    let fecha = document.getElementById('cumpleaños').value;
    let salario = document.getElementById('Salario').value;
    let term = document.getElementById('term').value;
    let requestedAmount = document.getElementById('requestedAmount').value;
    let resultado = document.getElementById('resultado').value;
    let ingreso=document.getElementById('totalMinimo').value;
    let suficiente=document.getElementById('texto').value;
    let edadR=document.getElementById('message').value;

    document.getElementById('correoF').innerText = email;
    document.getElementById('nombreF').innerText = nombre;
    document.getElementById('fechaF').innerText = fecha;
    document.getElementById('salarioF').innerText = salario;
    document.getElementById('viviendaF').innerText = homeValue; // Aquí usé homeValue
    document.getElementById('montoF').innerText = requestedAmount;
    document.getElementById('anosF').innerText = term;
    document.getElementById('cuotaF').innerText = resultado;
    document.getElementById('ingresoF').innerText =ingreso;
    document.getElementById('suficienteF').innerText=suficiente;
    document.getElementById('edadR').innerText=edadR

}






function interes(tasaMensual, mes, pagoMensual, montoSolicitado) {
    var vInteres = 0;
    var amortiza = montoSolicitado;
    for (var i = 1; i <= mes; i++) {
        vInteres = (amortiza * (tasaMensual / 100));
        amortiza = amortiza - (pagoMensual - vInteres);
    }
    return vInteres;
}
function mostrarProyeccion(){
  
    const ms = parseFloat(document.getElementById('requestedAmount').value);// Monto solicitado
    const annualInterestRate = parseFloat(document.getElementById('interes').value) / 100;
    const tm = annualInterestRate / 12; // Tasa de interés mensual
    const p = parseInt(document.getElementById('term').value) * 12; // Plazo en meses
    const pagoMensual= parseFloat(document.getElementById('resultado').value); //pago mensual
    let homeValue = document.getElementById('homeValue').value;
    
    var tabla = document.getElementById('proyeccionTabla').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpiar cualquier fila existente

    var saldo = homeValue;
    
    for (var mes = 1; mes <= p; mes++) {
        var vInteres = interes(tm, mes, pagoMensual, ms);
        var amortiza = pagoMensual - vInteres;
        saldo -= amortiza;

        var fila = tabla.insertRow();
        fila.insertCell(0).innerText = mes;
        fila.insertCell(1).innerText = pagoMensual.toFixed(2);
        fila.insertCell(2).innerText = vInteres.toFixed(2);
        fila.insertCell(3).innerText = amortiza.toFixed(2);
        fila.insertCell(4).innerText = saldo.toFixed(2);
}


}
