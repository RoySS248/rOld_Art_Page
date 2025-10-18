/*==============================================================*/
// Contact Form  JS
/*==============================================================*/
/*
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "¿Has rellenado correctamente el formulario?");
        } 
        else {
            //event.preventDefault();
            //submitForm();
        }
    });

    function submitForm(){
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var phone_number = $("#phone_number").val();
        var email = $("#email").val();
        var company = $("#company").val();
        var business_line = $("#business_line").val();
        
        var message = $("#message").val();

        $.ajax({
            type: "POST",
            url: "assets/php/form-process.php",
            data: "name=" + name + "&phone_number=" + phone_number + "&email=" + email + "&company=" + company + "&business_line=" + business_line + "&message=" + message,
            success : function(statustxt){
                if (statustxt == "success"){
                    formSuccess();
                } 
                else {
                    formError();
                    submitMSG(false,statustxt);
                }
            }
        });
    }

    function formSuccess(){
        $("#contactForm")[0].reset();
        submitMSG(true, "Gracias por contactarnos. En breve, uno de nuestros asesores comerciales se pondrá en contacto con usted.")
    }

    function formError(){
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h4 tada animated text-success";
        } 
        else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
}(jQuery)); // End of use strict

*/



/*==============================================================*/
// Contact Form JS (FormSubmit.co)
//==============================================================*/
(function ($) {
    "use strict"; 

    $("#contactForm").on("submit", function (event) {
        event.preventDefault(); // Evita recargar la página

        // Validaciones básicas HTML5
        if (!this.checkValidity()) {
            formError();
            submitMSG(false, "¿Has rellenado correctamente el formulario?");
            return;
        }

        submitForm(); // Enviar datos
    });

    function submitForm() {
        // Obtener valores del formulario
        var name = $("#name").val();
        var email = $("#email").val();
        var phone_number = $("#phone_number").val();
        var message = $("#message").val();

        // Crear FormData
        var formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone_number", phone_number);
        formData.append("message", message);

        // Campos especiales FormSubmit
        formData.append("_subject", "Nuevo contacto desde el sitio web");
        formData.append("_next", "https://royss248.github.io/rOld_Art_Page/"); // Redirección
        formData.append("_captcha", "false");
        formData.append("_autoresponse", "¡Gracias por tu mensaje! Te responderemos pronto.");

        // Enviar al endpoint de FormSubmit
        fetch("https://formsubmit.co/166be66a2d00107c424b662070098027", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                formSuccess();
            } else {
                formError();
                submitMSG(false, "Error al enviar el formulario, inténtalo nuevamente.");
            }
        })
        .catch(error => {
            formError();
            submitMSG(false, "Error de red: " + error);
        });
    }

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Gracias por contactarnos. En breve, nos pondremos en contacto contigo.");
    }

    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        var msgClasses = valid ? "h4 tada animated text-success" : "h4 text-danger";
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

}(jQuery));