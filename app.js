class Contact {
  constructor(name, gender, email, number, subject, message) {
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.number = number;
    this.subject = subject;
    this.message = message;
  }
}

class UI {
  static displayContact() {
    const Contact = Store.getContact();
    Contact.forEach(contact => UI.addcontactToList(contact));
  }

  // 4. add contact
  static addcontactToList(contact) {
    const list = document.querySelector('#contact-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="text-center"><img src="icon/${contact.gender}.png" alt="${contact.gender} icon"></td>
      <td>${contact.name}</td>
      <td><a href="mailto:${contact.email}"></a></td>
      <td>${contact.number}</td>
      <td>${contact.subject}</td>
      <td>${contact.message}</td>
      <td class="text-center"><a href="#" class="btn btn-danger btn-sm delete"> remove </a></td>
    `;

    list.appendChild(row);

    // const list = document.querySelector('#contact-list');
    // const row = document.createElement('div');
    // row.className = 'card mb-4 shadow-sm';
    // row.innerHTML = `
    // <h4 class="card-header">${contact.name} <img src="icon/${contact.gender}.png" alt="${contact.gender} icon"></h4>
    //     <div class="card-body">          
    //       <div class="card-text">
    //         <h6>Email: ${contact.email}</h6>
    //         <h6>Phone: ${contact.number}</h6>
    //         <h6>Subject: ${contact.subject}</h6>
    //         <p>${contact.message}</p>            
    //       </div>
    //       <a href="#" class="btn btn-danger btn-sm delete"> Remove </a>
    //     </div>
    // `;
    // list.appendChild(row);
  }

  // 11. delete contact
  static deleteContact(el) {
    // if element contains .delete class
    if (el.classList.contains("delete")) {
      // remove <a> -> <td> -> <tr>
      el.parentElement.parentElement.remove();
    }
  }

  // 13. show alert
  // <div class="alert alert-success/alert-danger>Message</div>
  static showValid(name, email, number, subject, message) {
    if (name === "") {
      document.querySelector("#name").classList.add("is-invalid");
      document.querySelector("#name-feed").getElementsByClassName.visibility =
        "";
    } else {
      document.querySelector("#name").classList.remove("is-invalid");
      document.querySelector("#name-feed").getElementsByClassName.visibility =
        "hidden";
    }
    var expEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var regexEmail = new RegExp(expEmail);
    if (!email.match(regexEmail)) {
      document.querySelector("#email").classList.add("is-invalid");
      document.querySelector("#email-feed").getElementsByClassName.visibility =
        "";
    } else {
      document.querySelector("#email").classList.remove("is-invalid");
      document.querySelector("#email-feed").getElementsByClassName.visibility =
        "hidden";
    }
    var phoneno = /^\d{10}$/;
    var regexNum = new RegExp(phoneno);
    if (!number.match(regexNum)) {
      document.querySelector("#number").classList.add("is-invalid");
      document.querySelector("#num-feed").getElementsByClassName.visibility =
        "";
    } else {
      document.querySelector("#number").classList.remove("is-invalid");
      document.querySelector("#num-feed").getElementsByClassName.visibility =
        "hidden";
    }
    if (subject === "") {
      document.querySelector("#subject").classList.add("is-invalid");
      document.querySelector(
        "#subject-feed"
      ).getElementsByClassName.visibility = "";
    } else {
      document.querySelector("#subject").classList.remove("is-invalid");
      document.querySelector(
        "#subject-feed"
      ).getElementsByClassName.visibility = "hidden";
    }
    if (message === "") {
      document.querySelector("#message").classList.add("is-invalid");
      document.querySelector(
        "#message-feed"
      ).getElementsByClassName.visibility = "";
    } else {
      document.querySelector("#message").classList.remove("is-invalid");
      document.querySelector(
        "#message-feed"
      ).getElementsByClassName.visibility = "hidden";
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const err = document.querySelector('#error');
    err.appendChild(div);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  // 9. clear fields
  static clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#number").value = "";
    document.querySelector("#subject").value = "";
    document.querySelector("#message").value = "";
  }
}

class Store {
  static getContact() {
    let Contact;
    if (localStorage.getItem("Contact") === null) {
      Contact = [];
    } else {
      Contact = JSON.parse(localStorage.getItem("Contact"));
    }

    return Contact;
  }

  static addContact(contact) {
    const Contact = Store.getContact();
    Contact.push(contact);
    localStorage.setItem("Contact", JSON.stringify(Contact));
  }

  static removeContact(message) {
    const Contact = Store.getContact();

    Contact.forEach((contact, index) => {
      if (contact.message === message) {
        Contact.splice(index, 1);
      }
    });

    localStorage.setItem("Contact", JSON.stringify(Contact));
  }
}

// 4. Event: Display Contact
document.addEventListener("DOMContentLoaded", UI.displayContact);

// 5. Event: Add a contact
document.querySelector("#contact-form").addEventListener("submit", e => {
  // 7. Prevent actual submit action
  e.preventDefault();

  // Get form values
  const name = document.querySelector("#name").value;
  const gender = document.querySelector("#gender").options[
    document.querySelector("#gender").selectedIndex
  ].text;
  const email = document.querySelector("#email").value;
  const number = document.querySelector("#number").value;
  const subject = document.querySelector("#subject").value;
  const message = document.querySelector("#message").value;

  // 12. Validate
  if (
    name === "" ||
    gender === "" ||
    email === "" ||
    number === "" ||
    subject === "" ||
    message === ""
  ) {
    UI.showValid(name, email, number, subject, message);
  } else {
    // 6. Instatiate contact
    const contact = new Contact(name, gender, email, number, subject, message);
    // console.log(contact);

    // 8. Add contact to UI
    UI.addcontactToList(contact);

    // Add contact to store
    Store.addContact(contact);

    // 13. Show success message
    UI.showAlert("contact Added", "success");

    // 9. Clear fields
    UI.clearFields();
  }
});

// 10. Event: Remove a contact - event propagation by selecting the parent
document.querySelector("#contact-list").addEventListener("click", e => {
  // console.log(e.target);

  // 11. Remove contact from UI
  UI.deleteContact(e.target);

  // Remove contact from store
  Store.removeContact(
    e.target.parentElement.previousElementSibling.textContent
  );

  // 13. Show success message
  UI.showAlert("contact Removed", "success");
});
