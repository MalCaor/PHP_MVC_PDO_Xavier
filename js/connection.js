$( document ).ready(function() {
  $("#myModal").modal();
  $("#login").validate({
    errorPlacement: function (error, element) {
        if (error[0].innerHTML != null && error[0].innerHTML !== "") {
            $(element).tooltipster('content', $(error).text());
            $(element).tooltipster('open'); //open only if the error message is not blank. By default jquery-validate will return a label with no actual text in it so we have to check the innerHTML.
        }
    },
    success: function (label, element) {
        var obj = $(element);
        if (obj.hasClass('tooltipstered') && obj.hasClass('error')) {
            $(element).tooltipster('close'); //hide no longer works in v4, must use close
        }
    },
	  rules: {
	    id: {required: true, minlength: 2},
	    mp: {required: true, minlength: 2},
	    rblogin: {required: true}
	  },
	  messages: {
	    id: {
		      required: "Vous devez saisir un identifiant valide !",
          minlength: "Pas asser long long long..."
		    },
	    mp: {
	      required: "Vous devez saisir un mot de passe valide !",
        minlength: "Pas asser long long long..."
	    },
	    rblogin: {
		      required: "Vous devez choisir une option !"
		    }
	  }
  });
  $("#login :input").tooltipster({
    trigger: "custom",
    animation: 'grow',
    theme: 'tooltipster-xxxxxxx',
    onlyOne: false,
    position: 'bottom',
    multiple:true,
    autoClose:false
    });
  $("#login").submit(function( e ){
    e.preventDefault();
    if($("#login").valid()){
      hd();
		  var $url="ajax/valide_connect.php";
		  $categ="3";
		  if($("input[type=radio][name=rblogin]:checked").attr("value")=="rbr"){$categ="2";}
		  if($("input[type=radio][name=rblogin]:checked").attr("value")=="rba"){$categ="1";}
		  var formData = {
			     "id" 					: $("#id").val().toUpperCase(),
			     "mp"					: $("#mp").val(),
			     "categ"					: $categ
		  };
		  var filterDataRequest = $.ajax(
		  {
			     type: "POST",
			     url: $url,
			     dataType: "json",
			     encode          : true,
			     data: formData,
		  });
		  filterDataRequest.done(function(data)
		  {
  			     if ( ! data.success)
  			     {
  				         var $msg="erreur-></br><ul style=\"list-style-type :decimal;padding:0 5%;\">";
  				         if (data.errors.message) {
  					              $x=data.errors.message;
  					              $msg+="<li>";
  					              $msg+=$x;
  					              $msg+="</li>";
  				   }
  				   if (data.errors.requete) {
  					        $x=data.errors.requete;
  					        $msg+="<li>";
  					        $msg+=$x;
  					        $msg+="</li>";
  				   }
  				   $msg+="</ul>";
  			}
  			else
  			{
  				$msg="";
  				if(data.message){$msg+="</br>";$x=data.message;$msg+=$x;}
  				hd();
  			}
  			$("#ModalRetour").find("p").html($msg);
  			$("#ModalRetour").modal();
  		});
		  filterDataRequest.fail(function(jqXHR, textStatus)
		  {
			    if (jqXHR.status === 0){alert("Not connect.n Verify Network.");}
 		      else if (jqXHR.status == 404){alert("Requested page not found. [404]");}
    			else if (jqXHR.status == 500){alert("Internal Server Error [500].");}
    			else if (textStatus === "parsererror"){alert("Requested JSON parse failed.");}
      		else if (textStatus === "timeout"){alert("Time out error.");}
      		else if (textStatus === "abort"){alert("Ajax request aborted.");}
      		else{alert("Uncaught Error.n" + jqXHR.responseText);}
		  });
	  }

    else {

    }
  });
});
function hd(){
  console.log("coucou");
$("#myModal").modal("hide");
	 var instances = $.tooltipster.instances();
	 $.each(instances, function(i, instance){
	     instance.close();
	 });
}
function hdModalRetour(){
  $("#ModalRetour").modal("hide") ;
  document.location.href="Accueil";
}
