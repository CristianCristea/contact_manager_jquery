# Contact Manger
Implement the Contact Manager app here:

http://devsaran.github.io/contact-manager-backbone/

You should implement all the features there, including the search. In addition, also implement a "tagging" feature, which allows you to create tags, such as "marketing", "sales", "engineering", and when you add/edit a contact, you can select a tag to attach to the contact. Finally, you can click on a tag and show all the contacts with that tag. The UI isn't too important here, but focus on the functionality.


Development stages

1. Initial
* display header
* display a form
  - button to add contact
  - input to search through the existing contacts
* display a message - there is no contact
* display the add contact button 
* display footer - credentials

2. on add contact
* remove form, message
* display form to add contact
  - name, email, tel
  - option to submit or cancel

3. on submit(add contact)
* display initial top form(add contact and search)
* display the contact
  - name, phone, email
  - option to edit or delete

4. On cancel
* discard the inputs
*  display added contacts or message

5. On edit
* display the same form for add contacts, but with inputs filled from the contact block

6. On delete 
* display confirmation 
* remove the contact


7. Search function
* search after name
* remove in real time the not matching persons - on keyup
