(function() {

  // Main content container
  var $container = $('.content');

  // Masonry + ImagesLoaded
  $container.imagesLoaded(function() {
    $container.masonry({
      // selector for entry content
      itemSelector: '.post',
      columnWidth: 200
    });
  });

  // Infinite Scroll
  $container.infinitescroll({

    // selector for the paged navigation (it will be hidden)
    navSelector  : ".pagination",
    // selector for the NEXT link (to page 2)
    nextSelector : ".pagination__next",
    // selector for all items you'll retrieve
    itemSelector : ".post",

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

})();