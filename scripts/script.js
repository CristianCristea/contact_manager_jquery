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
});

