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
