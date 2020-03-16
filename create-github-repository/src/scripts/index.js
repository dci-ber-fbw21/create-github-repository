// The following line makes sure your styles are included in the project. Don't remove this.
import "../styles/main.scss";
// Import any additional modules you want to include below \/

// \/ All of your javascript should go here \/

const apiKey = process.env.API_KEY;


class repository {
  constructor(containerSelector) {
    //fetch
    this.h2;
    this.container = document.getElementById(containerSelector);
    this.getRepository = document.getElementById("getButton");
    this.getRepository.addEventListener("click", e =>{
      this.fetchFunc(e);
    });
    // document.querySelectorAll("div").addEventListener("mouseover", function(){this.getRepository.style.backgroundColor = "black"});
    
    //create
    this.form = document.querySelector("form");
    this.createButton = document.getElementById("createButton");
    this.getRepository = document.getElementById("getbutton");
    this.link = `https://api.github.com/user/repos`;
    
    this.createButton.addEventListener("click", e => {
      this.createFunction(e);
    });
    //load my repository
    
    window.addEventListener('load', (e) =>{
      this.loadFunc(e);
    })
  
  }
  //load repository
   loadFunc(e) {
     e.preventDefault();
     fetch (this.link, {
      headers: {
        Authorization: `token ${apiKey}`,
        "content-type": "application/json",
        accept: "application/json",
        "Access-Control-Request-Method": "POST"}}).then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data)
      data.forEach((curr, currIndex, listObj) => {
        this.p = document.createElement("p");
        this.span = document.createElement("span");
        this.div = document.createElement("div");
        this.anchor = document.createElement("a");
        console.log(this);
        this.container.appendChild(this.anchor);
        this.anchor.setAttribute("href", `${curr.html_url}`);
        this.div.setAttribute("class", "hover");
        this.anchor.setAttribute("target", "_blank");
        console.log(this.div)
        this.anchor.appendChild(this.div);
        this.div.appendChild(this.p).innerText = curr.name;
        this.div.appendChild(this.span).innerText = curr.description;
        });
      })
    .catch(error => {
      console.log(error);
      return error
    });
   }

  //create repository function
  createFunction(e) {
    e.preventDefault();
    this.nameValue = document.getElementById("name").value;
    this.descriptionValue = document.getElementById("description").value;
    this.homePage = document.getElementById("Homepage").value;
    this.private = this.form.elements.privacy.value === "private";
    this.visibility = this.form.elements.visibility.value;
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
        private: this.private,
        visibility: this.visibility
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
        return error;
      });
  }
  //get repository function
  fetchFunc(e) {
    e.preventDefault();
    this.nameValue = document.getElementById("name").value;
    this.container.style.transform = "translate(0px, -48%)";
    this.container.style.transition = "all 2s";
   
    fetch(
      `https://api.github.com/users/${this.nameValue}/repos`
    )
      .then(response => {
        return (this.result = response.json());
      })
      .then(data => {
        data.forEach((curr, currIndex, listObj) => {
          if (currIndex === 0){this.h2 = document.createElement("h2");
          this.container.appendChild(this.h2).innerText = `${data[0].owner.login} repository`;
        }
          this.p = document.createElement("p");
          this.span = document.createElement("span");
          this.div = document.createElement("div");
          console.log(this);
          this.container.appendChild(this.div);
          this.div.appendChild(this.p).innerText = curr.name;
          this.div.appendChild(this.span).innerText = curr.description;
          this.div.setAttribute("class", "hover");
          this.div.addEventListener("click", e => {
            window.open(
              `https://github.com/${this.nameValue}/${e.currentTarget.children[0].innerText}`
            );
          });
        });
      
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        return error
      });
  }
}
// new repository("widget");
new repository("widget2");



  // headers: {
  //   Autorization: `token ${apiKey}`,
  //   "content-type": "application/json",
  //  accept: "application/json",
  //  "Access-Control-Request-Method": "POST"
  // },
  // mode: "cors",
  // method: "GET",
  // body: JSON.stringify({
  //  visibility: "all",
  //  affiliation: "owner,collaborator,organization_member",
  //  type: "all",
  //  sort: "created",
  //  direction: "asc"
  // }