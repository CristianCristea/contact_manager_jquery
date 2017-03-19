// todo
// localStorage
var app = {
  // basic validation for no input
  validation: function(elem) {
    return !!elem.length;
  },

  displayElem: function(names_array) {
    $('li').each(function(index, li, lis) {
      if (names_array.indexOf($(this).find('.name').text().toLowerCase()) === -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  },

  identifyKey: function(e) {
    return (e.which >= 97 && e.which <= 122);
  },

  searchName: function (array, string_to_search) {
    var searchString = function(string) {
      var temp_string = string.slice(0, string_to_search.length);
      return temp_string === string_to_search;
    }; 
    return array.filter(searchString);
  },

  showForm: function() {
    $('main').slideUp(300);
    $('.add-contact-form').slideDown(400);
  },

  hideForm: function() {
    $('main').slideDown(400);
    $('.add-contact-form').slideUp(300);
  },

  getContactData: function(e) {
    // implement edit - get data from li, recall form, prepopulate form with data
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
  },

  incrementId: function(id) {
    return Number(++id);
  },

  init: function() {
    var self = this;
    var $form =  $('.add-contact-form form');

    $('#add_contact_btn').on('click', this.showForm);
    $('button[type="reset"]').on('click', this.hideForm);

    // basic validation
    $form.find('input').on('blur', function() {
      if (!self.validation($(this).val())) { 
        $('[type="submit"]').prop("disabled", true);
      } else {
        $('[type="submit"]').prop("disabled", false);
      }
    });

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

    $('input[type="search"]').on('keyup', function(e) {
      var selectedNames;
      if (self.identifyKey) {
        var names = [];
        $('li').map(function() {
          names.push($(this).find('.name').text().toLowerCase());
        });

        selectedNames = self.searchName(names, $(this).val().toLowerCase());
      } else {
        return false;
      }
      
      self.displayElem(selectedNames);
    });
  }
};

$(function() { app.init(); });
