$(document).ready(function () {
  // Fonction pour mettre à jour le CV en temps réel
  function updateCV() {
    // Informations Personnelles
    $("#nomCV").text($("#nom").val() || "");
    $("#statutCV").text($("#selectedValue").text() || "");
    $("#sexeCV").text($('input[name="sexe"]:checked').val() || "");
    $("#ageCV").text($("#age").val() ? $("#age").val() + " ans" : "");
    $("#descriptionCV").text($("#description").val() || "");

    // Contact
    $("#numeroCV").text($("#telephone").val() || "");
    $("#emailCV").text($("#email").val() || "");
    $("#addresseCV").text($("#addresse").val() || "");

    // Formation
    $("#diplomeCV").text($("#customSelectedValue").text() || "");
    $("#etablissementCV").text($("#etablissement").val() || "");
    $("#anneeDiplomeCV").text($("#dateDiplome").val() || "");

    // Expérience Professionnelle
    $("#postExperienceCV").text($("#postOccupe").val() || "");
    $("#nomEntrepriseExperienceCV").text($("#nomEntreprise").val() || "");
    $("#debutCV").text($("#debut").val() || "");
    $("#finCV").text($("#fin").val() || "");
    $("#descriptionExperienceCV").text($("#descriptionMission").val() || "");

    // Compétences
    $("#competenceCV").text($("#listeCompetances").val() || "");

    // Langues
    $("#langueCV").text($("#selectedValue3").text() || "");
    $("#niveauLangueCV").text($("#niveauMetrise").val() || "");

    // Centres d'intérêt
    $("#loisirCV").text($("#loisir").val() || "");
    $("#passionCV").text($("#passion").val() || "");

    // Références
    $("#nomReferenceCV").text($("#nomReference").val() || "");
    $("#postReferenceCV").text($("#posteReference").val() || "");
    $("#numeroReferenceCV").html(
      `<i class="fa-solid fa-phone text-white"></i>&nbsp;&nbsp;${$("#contactReference").val() || ""}`
    );
    $("#emailReferenceCV").html(
      `<i class="fa-solid fa-envelope text-white"></i>&nbsp;&nbsp;${$("#emailReference").val() || ""}`
    );

    // Mise à jour des champs supplémentaires
    updateAdditionalFields();
  }

  // Fonction pour mettre à jour les champs supplémentaires dans le CV
  function updateAdditionalFields() {
    // Numéros supplémentaires
    let numeros = "";
    $("#numerosSupplementaires input").each(function () {
      numeros += $(this).val() ? $(this).val() + "<br>" : "";
    });
    $("#numeroCV").append(numeros);

    // Expériences supplémentaires
    let experiences = "";
    $("#experienceSupplementaires input").each(function () {
      experiences += $(this).val() ? $(this).val() + "<br>" : "";
    });
    $("#descriptionExperienceCV").append(experiences);

    // Formations supplémentaires
    let formations = "";
    $("#formationSupplementaires input").each(function () {
      formations += $(this).val() ? $(this).val() + "<br>" : "";
    });
    $("#diplomeCV").append(formations);

    // Compétences supplémentaires
    let competences = "";
    $("#competenceSupplementaires input").each(function () {
      competences += $(this).val() ? $(this).val() + "<br>" : "";
    });
    $("#competenceCV").append(competences);

    // Loisirs supplémentaires
    let loisirs = "";
    $("#loisirSupplementaires input").each(function () {
      loisirs += $(this).val() ? $(this).val() + "<br>" : "";
    });
    $("#loisirCV").append(loisirs);

    // Passions supplémentaires
    let passions = "";
    $("#passionSupplementaires input").each(function () {
      passions += $(this).val() ? $(this).val() + "<br>" : "";
    });
    $("#passionCV").append(passions);

    // Références supplémentaires
    let references = "";
    $("#referencesSupplementaires input").each(function () {
      references += $(this).val() ? $(this).val() + "<br>" : "";
    });
    $("#nomReferenceCV").append(references);
  }

  // Fonction pour valider le formulaire
  function validateForm() {
    let isValid = true;

    // Vérification des champs obligatoires
    const requiredFields = [
      "#nom", "#age", "#email", "#telephone", "#addresse", "#nomEntreprise", "#postOccupe", "#debut", "#fin", "#etablissement", "#dateDiplome"
    ];

    requiredFields.forEach((field) => {
      if (!$(field).val()) {
        isValid = false;
        $(field).addClass("border-red-500");
        $(field).next(".error-message").remove();
        $(field).after('<span class="error-message text-red-500 text-sm">Ce champ est obligatoire.</span>');
      } else {
        $(field).removeClass("border-red-500");
        $(field).next(".error-message").remove();
      }
    });

    // Validation de l'email
    const email = $("#email").val();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      isValid = false;
      $("#email").addClass("border-red-500");
      $("#email").next(".error-message").remove();
      $("#email").after('<span class="error-message text-red-500 text-sm">Veuillez entrer un email valide.</span>');
    }

    // Validation du numéro de téléphone
    const telephone = $("#telephone").val();
    const phoneRegex = /^\d{10}$/; // Exemple pour un numéro à 10 chiffres
    if (telephone && !phoneRegex.test(telephone)) {
      isValid = false;
      $("#telephone").addClass("border-red-500");
      $("#telephone").next(".error-message").remove();
      $("#telephone").after('<span class="error-message text-red-500 text-sm">Veuillez entrer un numéro de téléphone valide (10 chiffres).</span>');
    }

    // Validation de l'âge (18-65 ans)
    const age = parseInt($("#age").val());
    if (age && (age < 18 || age > 65)) {
      isValid = false;
      $("#age").addClass("border-red-500");
      $("#age").next(".error-message").remove();
      $("#age").after('<span class="error-message text-red-500 text-sm">L\'âge doit être compris entre 18 et 65 ans.</span>');
    }

    // Validation des dates d'expérience
    const debut = new Date($("#debut").val());
    const fin = new Date($("#fin").val());
    if (debut && fin && debut > fin) {
      isValid = false;
      $("#debut, #fin").addClass("border-red-500");
      $("#debut").next(".error-message").remove();
      $("#debut").after('<span class="error-message text-red-500 text-sm">La date de début doit être antérieure à la date de fin.</span>');
    }

    return isValid;
  }

  // Fonction pour sauvegarder les données dans le localStorage
  function saveFormData() {
    const formData = {
      nom: $("#nom").val(),
      age: $("#age").val(),
      sexe: $('input[name="sexe"]:checked').val(),
      statut: $("#selectedValue").text(),
      description: $("#description").val(),
      email: $("#email").val(),
      telephone: $("#telephone").val(),
      addresse: $("#addresse").val(),
      nomEntreprise: $("#nomEntreprise").val(),
      postOccupe: $("#postOccupe").val(),
      debut: $("#debut").val(),
      fin: $("#fin").val(),
      descriptionMission: $("#descriptionMission").val(),
      diplome: $("#customSelectedValue").text(),
      etablissement: $("#etablissement").val(),
      dateDiplome: $("#dateDiplome").val(),
      listeCompetances: $("#listeCompetances").val(),
      langueMetrise: $("#selectedValue3").text(),
      niveauMetrise: $("#niveauMetrise").val(),
      loisir: $("#loisir").val(),
      passion: $("#passion").val(),
      nomReference: $("#nomReference").val(),
      posteReference: $("#posteReference").val(),
      contactReference: $("#contactReference").val(),
      emailReference: $("#emailReference").val(),
    };

    localStorage.setItem("formData", JSON.stringify(formData));
  }

  // Fonction pour charger les données depuis le localStorage
  function loadFormData() {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      $("#nom").val(formData.nom);
      $("#age").val(formData.age);
      $(`input[name="sexe"][value="${formData.sexe}"]`).prop("checked", true);
      $("#selectedValue").text(formData.statut);
      $("#description").val(formData.description);
      $("#email").val(formData.email);
      $("#telephone").val(formData.telephone);
      $("#addresse").val(formData.addresse);
      $("#nomEntreprise").val(formData.nomEntreprise);
      $("#postOccupe").val(formData.postOccupe);
      $("#debut").val(formData.debut);
      $("#fin").val(formData.fin);
      $("#descriptionMission").val(formData.descriptionMission);
      $("#customSelectedValue").text(formData.diplome);
      $("#etablissement").val(formData.etablissement);
      $("#dateDiplome").val(formData.dateDiplome);
      $("#listeCompetances").val(formData.listeCompetances);
      $("#selectedValue3").text(formData.langueMetrise);
      $("#niveauMetrise").val(formData.niveauMetrise);
      $("#loisir").val(formData.loisir);
      $("#passion").val(formData.passion);
      $("#nomReference").val(formData.nomReference);
      $("#posteReference").val(formData.posteReference);
      $("#contactReference").val(formData.contactReference);
      $("#emailReference").val(formData.emailReference);

      updateCV(); // Mettre à jour le CV avec les données chargées
    }
  }

  // Charger les données au démarrage
  loadFormData();

  // Écouteurs d'événements pour les champs de formulaire
  $("input, textarea, select").on("input change", function () {
    updateCV();
  });

  // Gestion des dropdowns
  $("#dropdownButton").click(function () {
    $("#dropdownMenu").toggle();
  });

  $("#dropdownButton3").click(function () {
    $("#dropdownMenu3").toggle();
  });

  $("#formationButton").click(function () {
    $("#customDropdownMenu").toggle();
  });

  // Sélection d'une option dans les dropdowns
  $("#dropdownMenu div").click(function () {
    $("#selectedValue").text($(this).text());
    $("#dropdownMenu").hide();
    updateCV();
  });

  $("#dropdownMenu3 div").click(function () {
    $("#selectedValue3").text($(this).text());
    $("#dropdownMenu3").hide();
    updateCV();
  });

  $("#customDropdownMenu div").click(function () {
    $("#customSelectedValue").text($(this).text());
    $("#customDropdownMenu").hide();
    updateCV();
  });

  // Gestion de l'ajout de numéros supplémentaires
  $("#numero").click(function () {
    const newInput = $(
      '<div class="flex items-center gap-2 mb-2"><input type="tel" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700" placeholder="Numéro supplémentaire"><button type="button" class="btn-remove bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Supprimer</button></div>'
    );
    $("#numerosSupplementaires").append(newInput);
    newInput.find("input").on("input", updateCV);
    newInput.find(".btn-remove").click(function () {
      newInput.remove();
      updateCV();
    });
  });

  // Gestion de l'ajout d'expériences supplémentaires
  $("#experience").click(function () {
    const newInput = $(
      '<div class="flex items-center gap-2 mb-2"><input type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700" placeholder="Nom de l\'entreprise"><button type="button" class="btn-remove bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Supprimer</button></div>'
    );
    $("#experienceSupplementaires").append(newInput);
    newInput.find("input").on("input", updateCV);
    newInput.find(".btn-remove").click(function () {
      newInput.remove();
      updateCV();
    });
  });

  // Gestion de l'ajout de formations supplémentaires
  $("#formation").click(function () {
    const newInput = $(
      '<div class="flex items-center gap-2 mb-2"><input type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700" placeholder="Nom de la formation"><button type="button" class="btn-remove bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Supprimer</button></div>'
    );
    $("#formationSupplementaires").append(newInput);
    newInput.find("input").on("input", updateCV);
    newInput.find(".btn-remove").click(function () {
      newInput.remove();
      updateCV();
    });
  });

  // Gestion de l'ajout de compétences supplémentaires
  $("#competence").click(function () {
    const newInput = $(
      '<div class="flex items-center gap-2 mb-2"><input type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700" placeholder="Compétence supplémentaire"><button type="button" class="btn-remove bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Supprimer</button></div>'
    );
    $("#competenceSupplementaires").append(newInput);
    newInput.find("input").on("input", updateCV);
    newInput.find(".btn-remove").click(function () {
      newInput.remove();
      updateCV();
    });
  });

  // Gestion de l'ajout de loisirs supplémentaires
  $("#loisir").click(function () {
    const newInput = $(
      '<div class="flex items-center gap-2 mb-2"><input type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700" placeholder="Loisir supplémentaire"><button type="button" class="btn-remove bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Supprimer</button></div>'
    );
    $("#loisirSupplementaires").append(newInput);
    newInput.find("input").on("input", updateCV);
    newInput.find(".btn-remove").click(function () {
      newInput.remove();
      updateCV();
    });
  });

  // Gestion de l'ajout de passions supplémentaires
  $("#passion").click(function () {
    const newInput = $(
      '<div class="flex items-center gap-2 mb-2"><input type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700" placeholder="Passion supplémentaire"><button type="button" class="btn-remove bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Supprimer</button></div>'
    );
    $("#passionSupplementaires").append(newInput);
    newInput.find("input").on("input", updateCV);
    newInput.find(".btn-remove").click(function () {
      newInput.remove();
      updateCV();
    });
  });

  // Gestion de l'ajout de références supplémentaires
  $("#reference").click(function () {
    const newInput = $(
      '<div class="flex items-center gap-2 mb-2"><input type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700" placeholder="Nom de la référence"><button type="button" class="btn-remove bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Supprimer</button></div>'
    );
    $("#referencesSupplementaires").append(newInput);
    newInput.find("input").on("input", updateCV);
    newInput.find(".btn-remove").click(function () {
      newInput.remove();
      updateCV();
    });
  });

  // Gestion de l'upload de l'image de profil
  $("#photo").change(function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $("#imageCV").html(
          `<img src="${e.target.result}" alt="PROFILE" class="rounded-full">`
        );
      };
      reader.readAsDataURL(file);
    }
  });

  // Validation et sauvegarde à la soumission
  $("#monFormulaire").submit(function (e) {
    e.preventDefault();
    if (validateForm()) {
      saveFormData();
      alert("Données sauvegardées avec succès !");
    }
  });

  // Fonction pour générer le CV en PDF
  function previewPDF() {
    const element = document.getElementById("cv-preview");
    html2pdf(element, {
      margin: 10,
      filename: "cv.pdf",
      image: {
        type: "jpeg",
        quality: 0.98
      },
      html2canvas: {
        scale: 2
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },
    });
  }

  // Écouteur d'événement pour le bouton "Générer le CV"
  $("#genererCV").click(function () {
    previewPDF();
  });
});