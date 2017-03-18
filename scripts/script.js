// create form template
// add form on click
// get form data // serializeArray
// create contact template
  // loop through the array - handlebars - to fill the vars
// on form submit append the new created contact
// todo use localStorage

var app = {
  showForm: function() {
    $('main').slideUp(300);
    $('.add-contact-form').slideDown(400);
  },
  hideForm: function() {
    $('main').slideDown(400);
    $('.add-contact-form').slideUp(300);
  },
  getContactData: function(e) {
    // implement edit - get data from li, recall form prepopulated with data, rerewrite li
    var $li = $(e.currentTarget).closest('li');
    var nameData = $li.find('.name').text();
    var emailData = $li.find('.email').text();
    var addressData = $li.find('.address').text();
    $('.add-contact-form form').addClass("editing");
    $('#name').val(nameData);
    $('#email').val(emailData);
    $('#address').val(addressData);
    $('#current_id').attr('data-id', $li.attr("data-id"));
    this.showForm();
  },
  editContact: function(e, id) {
    e.preventDefault();
    var $li = $('li').filter(function() {
    return ($(this).attr('data-id') == id);
    });
    var $form = $('.add-contact-form form');
    var nameData = $form.find('#name').val();
    var emailData = $form.find('#email').val();
    var addressData = $form.find('#address').val();

    $li.find('.name').text(nameData); 
    $li.find('.email').text(emailData); 
    $li.find('.address').text(addressData); 
  },
  deleteContact: function(e, id) {
    var $li = $('li').filter(function() {
      return ($(this).attr('data-id') == id);
    });
    $li.remove();
  },
  clearForm: function(e) {
    $(e.target).find('input').not(':hidden').val('');
    $(e.target).removeClass("editing");
  },
  newContact: function() {
    var contactTemplate = $('#contact').html();
    var contact = $('.add-contact-form form').serializeArray();
    var templateFunction = Handlebars.compile(contactTemplate);
    var html_code = templateFunction({contact: contact}); 
    $('#contacts').append(html_code);
    // console.log(contact);
  },
  incrementId: function(id) {
    return Number(++id);
  },
  init: function() {
    var self = this;
    var $form =  $('.add-contact-form form');

    $('#add_contact_btn').on('click', this.showForm);
    $('button[type="reset"]').on('click', this.hideForm);

    $form.submit(function(e) {
      e.preventDefault();
      var form_id = $('input[type="hidden"]').val();
      var li_id = $form.find('#current_id').attr('data-id');

      if ( $form.hasClass("editing")) {
        self.editContact(e, li_id);
      } else {
        $('input[type="hidden"]').val(self.incrementId(form_id));
        self.newContact(e);
      } 
      self.hideForm();
      self.clearForm(e);
    });

    $('#contacts').on('click', '.edit', function(e) {
      self.getContactData(e);
    });

    $('#contacts').on('click', '.delete', function(e) {
      var id = $(e.currentTarget).closest('li').attr('data-id');
      self.deleteContact(e, id);
    });
  }
};

$(function() {
  app.init();
});
