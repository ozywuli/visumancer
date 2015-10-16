(function() {

  // Main content container
  var $container = $('.js-content');

  // Masonry + ImagesLoaded
  $container.imagesLoaded(function() {
    $container.masonry({
      // selector for entry content
      itemSelector: '.js-post',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  });

  // Infinite Scroll
  $container.infinitescroll({

    // selector for the paged navigation (it will be hidden)
    navSelector  : ".pagination",
    // selector for the NEXT link (to page 2)
    nextSelector : ".pagination__next",
    // selector for all items you'll retrieve
    itemSelector : ".js-post",

    // finished message
    loading: {
      finishedMsg: 'No more pages to load.'
      }
    },

    // Trigger Masonry as a callback
    function( newElements ) {
      // hide new items while they are loading
      var $newElems = $( newElements ).css({ opacity: 0 });
      // ensure that images load before adding to masonry layout
      $newElems.imagesLoaded(function(){
        // show elems now they're ready
        $newElems.animate({ opacity: 1 });
        $container.masonry( 'appended', $newElems, true );
      });


      var $newElemsIDs = $newElems.map(function() {
          console.log(this);
          console.log(this.id);
          return this.id
      }).get();

      Tumblr.LikeButton.get_status_by_post_ids($newElemsIDs);
    }

  );
  
  /**
   * OPTIONAL!
   * Load new pages by clicking a link
   */

  // Pause Infinite Scroll
/*  $(window).unbind('.infscr');

  // Resume Infinite Scroll
  $('.pagintion__prev').click(function(){
    $container.infinitescroll('retrieve');
    return false;
  });*/




  // Toggle menu
  var $menuToggle = $('.menu-toggle');

  $menuToggle.on('click', function(e) {
    e.preventDefault();

    if ( !$('body').hasClass('nav--active') ) {
      $('body').addClass('nav--active');
    } else {
      $('body').removeClass('nav--active');
    }
  });


  // Search

  var $searchToggle = $('.search-toggle');

  $searchToggle.on('click', function(e) {
    e.preventDefault();
    $('.search input[type="search"]').focus();

    if ( !$('body').hasClass('search--active') ) {
      $('body').addClass('search--active');
    } else {
      $('body').removeClass('search--active');
    }

  });


  $('body').on('click', function(e) {
    console.log(1);
    if ( !$menuToggle.is(e.target) && !$menuToggle.find('*').is(e.target) && !$('.nav').is(e.target) && !$('.nav').find('*').is(e.target) ) {
      $('body').removeClass('nav--active');
    }
    if ( !$searchToggle.is(e.target) && !$searchToggle.find('*').is(e.target) && !$('.search').is(e.target) && !$('.search').find('*').is(e.target) ) {
      $('body').removeClass('search--active');
    }
  })



})();