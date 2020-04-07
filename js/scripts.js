// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}


//Method for adding contacts to contacts[]
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

Contact.prototype.addAddress = function(address) {
  address = []
  address.push(this.address);
  return address.join();
}


AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

//find contact by id method
AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {     
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }                          
  };
  return false;
}

//delete contact method
AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {     
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }                          
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.physicalAddress = physicalAddress;
 
}

function Address(personalEmailAddress, workEmailAddress){
  this.personalEmailAddress = personalEmailAddress,
  this.workEmailAddress = workEmailAddress
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

var addressBook = new AddressBook();

//display on html page
function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  //$(".email-address").html(newAddress.personalEmailAddress);
  $(".physical-address").html(contact.physicalAddress);
  //$(".mailing-address").html(contact.mailingAddress);
  $(".mailing-address").html(contact.addAddress());

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });

  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedPhysicalAddress = $("input#new-physical-address").val();
    var inputtedPersonalEmailAddress = $("input#personal-email-address").val();
    var inputtedWorkEmailAddress = $("input#work-email-address").val();
    // var inputtedMailingAddress = $("input#new-mailing-address").val();
    // console.log(inputtedPersonalEmailAddress);
    // console.log(inputtedWorkEmailAddress);
    

     // empty field after submission
     $("input#new-first-name").val("");
     $("input#new-last-name").val("");
     $("input#new-phone-number").val("");
     $("input#new-email-address").val("");
     $("input#new-physical-address").val("");
     $("input#new-mailing-address").val("");
     $("input#work-email-address").val("");
     $("input#personal-email-address").val();


    var newAddress = new Address (inputtedPersonalEmailAddress, inputtedWorkEmailAddress);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newAddress, inputtedPhysicalAddress);
    addressBook.addContact(newContact);
    newContact.addAddress(newAddress);
    console.log(newAddress.personalEmailAddress);
    
    displayContactDetails(addressBook);
  })
})


// phoneNumber, emailAddress, physicalAddress