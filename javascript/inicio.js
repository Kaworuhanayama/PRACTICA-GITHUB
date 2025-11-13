(function($){
 
  var sections = $('.hero-center-section');
  var buttons = $('.slide-buttons li');
  function show(idx){
    sections.removeClass('show');
    buttons.removeClass('active');
    sections.eq(idx).addClass('show');
    buttons.eq(idx).addClass('active');
  }
  $(document).ready(function(){
    buttons.each(function(i){
      $(this).on('mouseenter', function(){ show(i); });
    });
    show(0);

    var t = document.getElementById('cursor'),
        e = document.getElementById('cursor2'),
        i = document.getElementById('cursor3');
    document.body.addEventListener('mousemove', function(n){
      t.style.left = n.clientX + 'px';
      t.style.top = n.clientY + 'px';
      e.style.left = n.clientX + 'px';
      e.style.top = n.clientY + 'px';
      i.style.left = n.clientX + 'px';
      i.style.top = n.clientY + 'px';
    });
    var hoverTargets = document.querySelectorAll('.hover-target');
    function addHover(){ e.classList.add('hover'); i.classList.add('hover'); }
    function remHover(){ e.classList.remove('hover'); i.classList.remove('hover'); }
    hoverTargets.forEach(function(el){ el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', remHover); });

    // Evento para el enlace de búsqueda
    var busqueda = document.getElementById('busqueda-link');
    if(busqueda){
      busqueda.addEventListener('click', function(e){
        e.preventDefault();
        baseExplotada();
      });
    }
  });
})(jQuery);

