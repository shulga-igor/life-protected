$( window ).load(function() {

    var step = $('.step-wrap-slide .step');
    var steps = step.length;
    var currentStep = 1;
    var prevStep = 0;
    var quizWrap = $('.quiz-wrap');
    var offset;
    var gap = 25;

    function smooth_scroll_to(elem){
      var offset = 0;
      offset = $(elem).offset().top;
      $('html, body').animate({
          scrollTop: offset
      }, 550);
    }

    // slide blc
    var width = $('.step-wrap').width();
    var slideBlc = $('.step-wrap-slide');

    function slide(numSlide){
      slideBlc.css({
        'transform' : 'translateX(-'+ width * numSlide +'px)'
      });
    }
   

    for (let i = 0; i < steps; i++) {
      var st = step[i];
      $(st).attr('step', i + 1);
    }

    $(document).on('change', 'input[type="radio"]', function(e){
      var numStep  = $(this).parents('.step').attr('step');
      numStep = parseInt(numStep);
      if(currentStep <= numStep ){
        prevStep = numStep;
        currentStep = numStep + 1;
        slide(prevStep);
        smooth_scroll_to(quizWrap);
        //scrollPage();
      }else{
        return false;
      }
    })

    $(document).on('click', '.js-continue', function(e){
      e.preventDefault();
      prevStep = prevStep + 1;
      currentStep = currentStep + 1;
      slide(prevStep);
      smooth_scroll_to(quizWrap);
      //scrollPage();
    })

    $(document).on('click', '.js-back', function(e){
      e.preventDefault();
      prevStep = prevStep - 1;
      currentStep = currentStep - 1;
      slide(prevStep);
      smooth_scroll_to(quizWrap);
      //scrollPage();
    })


    modal();
    function modal(){
      let link = $('.modal-link');
      let close = $('.modal__header .close');
      let linkId = '';
      
      link.on('click', function(e){
        e.preventDefault();
        linkId = $(this).attr('href');
        
        $(linkId).attr('data-visible', 'true');
      })

      close.on('click', function(e){
        e.preventDefault();
        if(linkId != ''){
          $(linkId).attr('data-visible', 'false');
        }
        
      })

    }

    const input = document.querySelector("#phone");
    intlTelInput(input, {
      initialCountry: "auto",
      geoIpLookup: function(success, failure) {
        $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "us";
          success(countryCode);
        });
      },
      customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
        return selectedCountryPlaceholder;
      },
      nationalMode: true,
      utilsScript: "js/utils.js",
    });

    
})

