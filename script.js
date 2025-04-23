/*
* Refúgio Natural - Chalés & Camping
* Script principal (script.js)
* Autor: [Seu Nome]
* Data: Abril 2025
*/

// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
  // Referências aos elementos do DOM
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const form = document.getElementById('form-reserva');
  const depoimentosSlider = document.querySelector('.depoimentos-slider');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  // ========== HEADER FIXO COM EFEITO DE SCROLL ==========
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ========== MENU MOBILE ==========
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      menu.classList.toggle('active');
    });
  }

  // Fechar menu ao clicar em um link (mobile)
  const menuLinks = document.querySelectorAll('.menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });

  // ========== SLIDER DE DEPOIMENTOS ==========
  if (depoimentosSlider) {
    let currentSlide = 0;
    const depoimentos = document.querySelectorAll('.depoimento');

    // Esconder todos os depoimentos exceto o primeiro
    for (let i = 1; i < depoimentos.length; i++) {
      depoimentos[i].style.display = 'none';
    }

    // Função para mostrar um slide específico
    function showSlide(index) {
      // Esconder todos os depoimentos
      for (let i = 0; i < depoimentos.length; i++) {
        depoimentos[i].style.display = 'none';
        dots[i].classList.remove('active');
      }

      // Mostrar o depoimento atual
      depoimentos[index].style.display = 'block';
      dots[index].classList.add('active');
      currentSlide = index;
    }

    // Evento de clique para os controles do slider
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        currentSlide = (currentSlide - 1 + depoimentos.length) % depoimentos.length;
        showSlide(currentSlide);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        currentSlide = (currentSlide + 1) % depoimentos.length;
        showSlide(currentSlide);
      });
    }

    // Evento de clique para os dots do slider
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function () {
        showSlide(index);
      });
    });

    // Alternar slides automaticamente a cada 5 segundos
    setInterval(function () {
      currentSlide = (currentSlide + 1) % depoimentos.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // ========== INICIALIZAÇÃO DO MAPA ==========
  function initMap() {
    // Coordenadas aproximadas da Serra Catarinense
    const mapLocation = { lat: -28.2, lng: -49.7 };

    // Criar o mapa
    const mapa = document.getElementById('mapa');

    if (mapa) {
      // Aqui seria inserido o código do Google Maps
      // Como estamos criando um exemplo, vamos simular com uma imagem/iframe
      mapa.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d451432.3963283227!2d-50.06714167812496!3d-28.256893199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952366c3a51f01e5%3A0x5833d17dabb84677!2sSerra%20Catarinense%2C%20SC!5e0!3m2!1spt-BR!2sbr!4v1650299116252!5m2!1spt-BR!2sbr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
    }
  }

  // Inicializar o mapa quando a página estiver carregada
  window.addEventListener('load', initMap);

  // ========== VALIDAÇÃO DO FORMULÁRIO ==========
  if (form) {
    // Referências aos campos do formulário
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const acomodacao = document.getElementById('acomodacao');
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    const pessoas = document.getElementById('pessoas');
    const termos = document.getElementById('termos');

    // Função para mostrar mensagem de erro
    function showError(input, message) {
      const formGroup = input.parentElement;
      formGroup.classList.add('erro');
      const error = formGroup.querySelector('.erro-msg');
      error.textContent = message;
    }

    // Função para remover mensagem de erro
    function removeError(input) {
      const formGroup = input.parentElement;
      formGroup.classList.remove('erro');
      const error = formGroup.querySelector('.erro-msg');
      error.textContent = '';
    }

    // Função para validar e-mail
    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    // Função para validar telefone brasileiro
    function isValidPhone(phone) {
      const re = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
      return re.test(String(phone));
    }

    // Formatar campo de telefone durante digitação
    if (telefone) {
      telefone.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
          // Formatar como (XX) XXXXX-XXXX
          value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
          value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        e.target.value = value;
      });
    }

    // Validação em tempo real
    [nome, email, telefone, acomodacao, checkin, checkout, pessoas].forEach(input => {
      if (input) {
        input.addEventListener('blur', function () {
          validateField(input);
        });

        input.addEventListener('input', function () {
          if (input.parentElement.classList.contains('erro')) {
            validateField(input);
          }
        });
      }
    });

    // Função para validar cada campo
    function validateField(input) {
      // Remover erro anterior
      removeError(input);

      // Validar campo vazio
      if (input.value.trim() === '') {
        showError(input, 'Este campo é obrigatório');
        return false;
      }

      // Validações específicas
      if (input === email && !isValidEmail(input.value)) {
        showError(input, 'E-mail inválido');
        return false;
      }

      if (input === telefone && !isValidPhone(input.value)) {
        showError(input, 'Telefone inválido. Use o formato (XX) XXXXX-XXXX');
        return false;
      }

      if (input === checkin || input === checkout) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(input.value);

        if (selectedDate < today) {
          showError(input, 'A data não pode ser no passado');
          return false;
        }

        // Validar check-out depois do check-in
        if (input === checkout && checkin.value) {
          const checkinDate = new Date(checkin.value);
          if (selectedDate <= checkinDate) {
            showError(input, 'O check-out deve ser após o check-in');
            return false;
          }
        }
      }

      return true;
    }

    // Validar o formulário no envio
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;

      // Validar todos os campos
      [nome, email, telefone, acomodacao, checkin, checkout, pessoas].forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      // Validar checkbox dos termos
      if (!termos.checked) {
        showError(termos, 'Você deve concordar com os termos para continuar');
        isValid = false;
      } else {
        removeError(termos);
      }

      // Se o formulário for válido, enviar para o WhatsApp
      if (isValid) {
        sendToWhatsApp();
      }
    });

    // Função para enviar dados para o WhatsApp
    function sendToWhatsApp() {
      // Preparar mensagem para o WhatsApp
      let message = `Olá! Gostaria de fazer uma reserva no Refúgio Natural.\n\n`;
      message += `Nome: ${nome.value}\n`;
      message += `Email: ${email.value}\n`;
      message += `Telefone: ${telefone.value}\n`;
      message += `Acomodação: ${acomodacao.options[acomodacao.selectedIndex].text}\n`;
      message += `Check-in: ${formatDate(checkin.value)}\n`;
      message += `Check-out: ${formatDate(checkout.value)}\n`;
      message += `Número de pessoas: ${pessoas.options[pessoas.selectedIndex].text}\n`;

      if (document.getElementById('mensagem').value.trim() !== '') {
        message += `\nMensagem adicional: ${document.getElementById('mensagem').value}`;
      }

      // Codificar a mensagem para URL
      const encodedMessage = encodeURIComponent(message);

      // Número de WhatsApp (substituir pelo número informado)
      const phoneNumber = "5548991056014";

      // Criar URL do WhatsApp
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // Abrir WhatsApp em nova aba
      window.open(whatsappURL, '_blank');

      // Limpar formulário após envio
      form.reset();

      // Mostrar mensagem de sucesso
      showSuccessMessage();
    }

    // Função para formatar a data
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    }

    // Função para mostrar mensagem de sucesso
    function showSuccessMessage() {
      // Criar elemento de mensagem
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>Solicitação enviada com sucesso!</h3>
                    <p>Sua mensagem foi enviada para nosso WhatsApp. Em breve entraremos em contato.</p>
                    <button class="btn-principal close-success">OK</button>
                </div>
            `;

      // Adicionar ao corpo do documento
      document.body.appendChild(successMessage);

      // Estilizar mensagem
      successMessage.style.position = 'fixed';
      successMessage.style.top = '0';
      successMessage.style.left = '0';
      successMessage.style.width = '100%';
      successMessage.style.height = '100%';
      successMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      successMessage.style.display = 'flex';
      successMessage.style.justifyContent = 'center';
      successMessage.style.alignItems = 'center';
      successMessage.style.zIndex = '9999';

      const successContent = successMessage.querySelector('.success-content');
      successContent.style.backgroundColor = 'white';
      successContent.style.padding = '2rem';
      successContent.style.borderRadius = '8px';
      successContent.style.textAlign = 'center';
      successContent.style.maxWidth = '500px';
      successContent.style.width = '90%';

      const icon = successContent.querySelector('i');
      icon.style.fontSize = '4rem';
      icon.style.color = '#4caf50';
      icon.style.marginBottom = '1rem';

      // Fechar mensagem ao clicar no botão
      const closeButton = successMessage.querySelector('.close-success');
      closeButton.addEventListener('click', function () {
        successMessage.remove();
      });
    }
  }

  // ========== GALERIA DE IMAGENS ==========
  const galeriaItems = document.querySelectorAll('.galeria-item');

  if (galeriaItems.length > 0) {
    galeriaItems.forEach(item => {
      item.addEventListener('click', function () {
        const imgSrc = this.querySelector('img').src;
        openLightbox(imgSrc);
      });
    });

    // Função para abrir lightbox
    function openLightbox(imgSrc) {
      // Criar elemento lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="Imagem ampliada">
                </div>
            `;

      // Adicionar ao corpo do documento
      document.body.appendChild(lightbox);

      // Estilizar lightbox
      lightbox.style.position = 'fixed';
      lightbox.style.top = '0';
      lightbox.style.left = '0';
      lightbox.style.width = '100%';
      lightbox.style.height = '100%';
      lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      lightbox.style.display = 'flex';
      lightbox.style.justifyContent = 'center';
      lightbox.style.alignItems = 'center';
      lightbox.style.zIndex = '9999';

      const lightboxContent = lightbox.querySelector('.lightbox-content');
      lightboxContent.style.position = 'relative';
      lightboxContent.style.maxWidth = '90%';
      lightboxContent.style.maxHeight = '90%';

      const img = lightboxContent.querySelector('img');
      img.style.maxWidth = '100%';
      img.style.maxHeight = '90vh';
      img.style.display = 'block';

      const closeButton = lightbox.querySelector('.close-lightbox');
      closeButton.style.position = 'absolute';
      closeButton.style.top = '-40px';
      closeButton.style.right = '0';
      closeButton.style.fontSize = '30px';
      closeButton.style.color = 'white';
      closeButton.style.cursor = 'pointer';

      // Fechar lightbox ao clicar no botão ou fora da imagem
      closeButton.addEventListener('click', function () {
        lightbox.remove();
      });

      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
          lightbox.remove();
        }
      });
    }
  }

  // ========== ANIMAÇÕES AO ROLAR A PÁGINA ==========
  // Função para verificar se um elemento está visível na viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  // Elementos para animar
  const animateElements = document.querySelectorAll('.sobre-content, .diferencial-item, .acomodacao-item, .galeria-item');

  // Adicionar classe de animação quando o elemento estiver visível
  function checkAnimations() {
    animateElements.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Estilizar elementos antes da animação
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });

  // Verificar animações no carregamento e ao rolar
  window.addEventListener('load', checkAnimations);
  window.addEventListener('scroll', checkAnimations);

  // ========== BOTÃO DE VOLTAR AO TOPO ==========
  // Criar botão de voltar ao topo
  const backToTopBtn = document.createElement('a');
  backToTopBtn.href = '#';
  backToTopBtn.id = 'back-to-top';
  backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  document.body.appendChild(backToTopBtn);

  // Estilizar botão
  backToTopBtn.style.position = 'fixed';
  backToTopBtn.style.bottom = '20px';
  backToTopBtn.style.right = '20px';
  backToTopBtn.style.width = '40px';
  backToTopBtn.style.height = '40px';
  backToTopBtn.style.backgroundColor = 'var(--cor-primaria)';
  backToTopBtn.style.color = 'white';
  backToTopBtn.style.borderRadius = '50%';
  backToTopBtn.style.display = 'flex';
  backToTopBtn.style.justifyContent = 'center';
  backToTopBtn.style.alignItems = 'center';
  backToTopBtn.style.textDecoration = 'none';
  backToTopBtn.style.boxShadow = 'var(--sombra-md)';
  backToTopBtn.style.opacity = '0';
  backToTopBtn.style.visibility = 'hidden';
  backToTopBtn.style.transition = 'var(--transicao-media)';
  backToTopBtn.style.zIndex = '99';

  // Mostrar/ocultar botão ao rolar
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });

  // Ação de rolagem suave ao topo
  backToTopBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});