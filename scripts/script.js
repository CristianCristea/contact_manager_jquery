var app = {
  // create contact object constructor
  CreateContact: function(name, email, address, id) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.id = id;
  },

  createNewContact: function(name, email, address, id) {
    var createdContact = new this.CreateContact(name, email, address, id);
    localStorage.setItem('contactCount', createdContact.id); 
    var contactsSize = localStorage.contactCount;
    this.commitToStorage(contactsSize, createdContact);
  },

  commitToStorage: function(objectCount, newObject) {
    // the unique key
    var item = 'contact' + objectCount;
    localStorage.setItem('contactCount', objectCount);

    // store the object
    localStorage.setItem(item, JSON.stringify(newObject));
  },

  getContactFromStorage: function(id) {
    return JSON.parse(localStorage.getItem('contact' + id));
  },

  displayElem: function(names_array) {
    $('li').each(function(index, li, lis) {
      var $this = $(this);
      if (names_array.indexOf($this.find('.name').text().toLowerCase()) === -1) {
        $this.hide();
      } else {
        $this.show();
      }
    });
  },

  identifyKey: function(e) {
    return (e.which >= 97 && e.which <= 122 || e.which >= 65 && e.which <= 90);
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
    var name_data = $li.find('.name').text();
    var email_data = $li.find('.email').text();
    var address_data = $li.find('.address').text();
    $('.add-contact-form form').addClass("editing");
    $('#name').val(name_data);
    $('#email').val(email_data);
    $('#address').val(address_data);
    $('#current_id').attr('data-id', $li.attr("data-id"));
    this.showForm();
  },

  // update obj prop, return obj with name, email, address, id
  updateContactInStorage: function(contact) {
    contact.name = $('#name').val();
    contact.email = $('#email').val();
    contact.address = $('#address').val();
    return contact;
  },

  updateContactView: function(id) {
    var $li = $('li[data-id="' + id + '"]');
    var name_data = $('#name').val();
    var email_data = $('#email').val();
    var address_data = $('#address').val();

    $li.find('.name').text(name_data);
    $li.find('.email').text(email_data);
    $li.find('.address').text(address_data);
    console.log("updated");
  },

  editContact: function(id) {
    var contact = this.getContactFromStorage(id);
    var new_contact = this.updateContactInStorage(contact);
    this.commitToStorage(id, new_contact);
  },

  deleteContact: function(e, id) {
    var $li = $('li').filter(function() {
      return ($(this).attr('data-id') == id);
    });
    $li.remove();
    localStorage.removeItem("contact" + id);
  },

  clearForm: function(e) {
    $(e.target).find('input').not(':hidden').val('');
    $(e.target).removeClass("editing");
  },

  newContact: function(name, email, address, id) {
   this.createNewContact(name, email, address, id);
  },

  renderContact: function(id) {
    var contactTemplate = $('#contact').html();
    var single_contact = this.getContactFromStorage(id); 
    var templateFunction = Handlebars.compile(contactTemplate);
    var html_code = templateFunction({contact: single_contact}); 
    $('#contacts').append(html_code);
  },

// check if contact valid

  renderContacts: function(storage) {
    for (var i = 1; i <= +(storage.getItem('contactCount')); i++) {
      if (this.getContactFromStorage(i)) {
        this.renderContact(i);
      }
    }
  },

  incrementId: function(id) {
    return Number(++id);
  },

  init: function() {
    var self = this;
    var $form =  $('.add-contact-form form');
    var $submit_btn = $('[type="submit"]');

    if (localStorage.length !== 0) {
      $('input[type="hidden"]').val(localStorage.getItem('contactCount'));
    }

    $('#add_contact_btn').on('click', function(e) {
      self.showForm();
    });

    $('button[type="reset"]').on('click', function(e) {
      self.hideForm();
      $form.removeClass('editing');
    });

    $form.submit(function(e) {
      e.preventDefault();
      var form_id = $('input[type="hidden"]').val();
      var name = $('#name').val();
      var email = $('#email').val();
      var address = $('#address').val();

      if ( $form.hasClass("editing")) {
        var li_id = $('#current_id').attr('data-id');
        self.editContact(li_id);
        self.updateContactView(li_id);
      } else {
        $('input[type="hidden"]').val(self.incrementId(form_id));
        var id =  $('input[type="hidden"]').val();
        self.newContact(name, email, address, id);
        self.renderContact(id);
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
      var selected_names;
      if (self.identifyKey) {
        var names = [];
        $('li').map(function() {
          names.push($(this).find('.name').text().toLowerCase());
        });

        selected_names = self.searchName(names, $(this).val().toLowerCase());
      } else {
        return false;
      }
      
      self.displayElem(selected_names);
    });
    
    self.renderContacts(localStorage);
  }
};

$(function() { app.init(); });