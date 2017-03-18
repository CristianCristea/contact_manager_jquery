// create form template
// add form on click
// get form data // serializeArray
// create contact template
  // loop through the array - handlebars - to fill the vars
// on form submit append the new created contact
// todo use localStorage

$(function() {
  $('#add_contact_btn').on('click', function(e) {
    e.preventDefault();
    $('main').slideUp(300);
    $('.add-contact-form').slideDown(400);
  });

   $('button[type="reset"]').on('click', function(e) {
    e.preventDefault();
    $('main').slideDown(400);
    $('.add-contact-form').slideUp(300);
  });

   $('.add-contact-form form').submit(function(e) {
      e.preventDefault();
      var contactTemplate = $('#contact').html();
      var contact = $(this).serializeArray();
      var templateFunction = Handlebars.compile(contactTemplate);
      var html_code = templateFunction({contact: contact}); 
      console.log(html_code);
      $('#contacts').append(html_code);

      $('main').slideDown(400);
      $('.add-contact-form').slideUp(300);

      $(this).find('input').val('');
   });

   // todo
   // implement delete - get ul elem - identify index remove from DOM
   // implement edit - get data from li, recall form prepopulated with data, rerewrite li
   // implement search get all names - array, get input search, check with the array elem, return match
});