var btnsMostrar = document.querySelectorAll('#mostrar, #mostrar1, #mostrar2'); 
var conteiners = document.querySelectorAll('.dashboard-section .conteiner, .dashboard-section .conteiner1, .dashboard-section .conteiner2'); 

btnsMostrar.forEach(function(btnmostrar, index) {
    btnmostrar.addEventListener('click', function() {
        var conteiner = conteiners[index]; 

        if (conteiner.style.display === 'block') {
            conteiner.style.display = 'none';
            btnmostrar.textContent = btnmostrar.id === 'mostrar' ? 'Mostrar storytelling' : (btnmostrar.id === 'mostrar1' ? 'Mostrar storytelling' : 'Mostrar storytelling');
        } else {
            conteiner.style.display = 'block';
            btnmostrar.textContent = btnmostrar.id === 'mostrar' ? 'Esconder storytelling' : (btnmostrar.id === 'mostrar1' ? 'Esconder storytelling' : 'Esconder storytelling');
        }
    });
});

let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay')

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})


class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.formButton = document.querySelector(settings.button);
      if (this.form) {
        this.url = this.form.getAttribute("action");
      }
      this.sendForm = this.sendForm.bind(this);
    }
  
    displaySuccess() {
      this.form.innerHTML = this.settings.success;
    }
  
    displayError() {
      this.form.innerHTML = this.settings.error;
    }
  
    getFormObject() {
      const formObject = {};
      const fields = this.form.querySelectorAll("[name]"); 
      fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
      });
      return formObject;
    }
  
    onSubmission(event) {
      event.preventDefault();
      event.target.disabled = true;
      event.target.innerText = "Enviando...";
    }
  
    async sendForm(event) {
      try {
        this.onSubmission(event);
        await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  
            Accept: "application/json",
          },
          body: JSON.stringify(this.getFormObject()),
        });
        this.displaySuccess();
      } catch (error) {
        this.displayError();
        throw new Error(error);
      }
    }
  
    init() {
      if (this.form) {
        this.form.addEventListener("submit", this.sendForm); 
      }
      return this;
    }
  }
  
  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
  });
  formSubmit.init();
  
