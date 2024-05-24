function includeHTML() {
  var elements = document.querySelectorAll('[w3-include-html]');

  elements.forEach(function(elmnt) {
    var file = elmnt.getAttribute('w3-include-html');
    if (file) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Crée un conteneur temporaire pour le contenu chargé
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = this.responseText;

          // Remplace l'élément actuel par le contenu chargé
          while (tempDiv.firstChild) {
            elmnt.parentNode.insertBefore(tempDiv.firstChild, elmnt);
          }
          elmnt.parentNode.removeChild(elmnt);

          // Recommence pour les nouveaux éléments chargés
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
    }
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
