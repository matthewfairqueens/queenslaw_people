(function ($) {
  $(document).ready(function(){
    $('body.landing-page-directory .view-people').wrap('<div class="people-dynamic"/>');
    initializePeopleDynamic();
  });
  $(document).ajaxComplete(function(){
    initializePeopleDynamic();
  });
  function initializePeopleDynamic() {
    updatePeople(true);
    $('.people-dynamic input.form-checkbox').change(function(){
      updatePeople(false);
    });
    $('.people-dynamic .clear-all-filters').click(function(event){
      clearFilters();
      event.preventDefault();
    });
  }
  function updatePeople(add_elements) {
    if (add_elements) {
      $('.people-dynamic .form-item-filter').after('<a class="clear-all-filters" href="#">Clear all filters</a>');
      $('.people-dynamic .view-body').append('<div class="empty people-dynamic-empty">No people were found matching the criteria provided. Please try again.</div>');
    }
    $('.people-dynamic').removeClass('empty');
    $('.people-dynamic .views-row').removeClass('views-row-even');
    var checked = [];
    $('.people-dynamic .form-checkboxes .form-item').each(function(){
      if ($(this).children('input').is(':checked')) {
        $(this).addClass('active');
        checked.push($(this).children('input').val());
      }
      else $(this).removeClass('active');
    });
    if (checked.length > 0) {
      $('.people-dynamic .views-row').hide();
      for (var i = 0, checked_count = checked.length; i < checked_count; i++) {
        $('.people-dynamic .views-row.person-type-' + checked[i]).show();
      }
    }
    // if all checkboxes are unchecked, behave as though they were all checked
    else $('.people-dynamic .views-row').show();
    var visible_rows = $('.people-dynamic .views-row:visible').length;
    if (visible_rows < 1) $('.people-dynamic').addClass('empty');
    else $('.people-dynamic .views-row:visible:even').addClass('views-row-even');
  }
  function clearFilters() {
    $('.people-dynamic input.form-checkbox').prop('checked', false);
    $('.people-dynamic input.form-text').attr('value', '');
    $('.people-dynamic .form-submit').click();
  }
}(jQuery));
