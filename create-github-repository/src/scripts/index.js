// The following line makes sure your styles are included in the project. Don't remove this.
import "../styles/main.scss";
// Import any additional modules you want to include below \/

// \/ All of your javascript should go here \/

const apiKey = process.env.API_KEY;
console.log(apiKey);

class repository {
  constructor() {
    this.form = document.querySelector("form");

    this.link = `https://api.github.com/user/repos`;
    this.form.addEventListener("submit", e => {
      this.fetchFunction(e);
    });
  }
  fetchFunction(e) {
    e.preventDefault();
    this.nameValue = document.getElementById("name").value;
    this.descriptionValue = document.getElementById("description").value;
    this.homePage = document.getElementById("Homepage").value;
    this.private = this.form.elements.privacy.value === "private";

    console.log(this.private);
    fetch(this.link, {
      headers: {
        Authorization: `token ${apiKey}`,
        "content-type": "application/json",
        accept: "application/json",
        "Access-Control-Request-Method": "POST"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        name: this.nameValue,
        description: this.descriptionValue,
        homepage: this.homePage,
        private: this.private
      })
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
new repository();
