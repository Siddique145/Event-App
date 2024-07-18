import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase-js/firebaseapp.js";

//1.Create account createUserWithEmailAndPassword
//2.upload image  ref,
// uploadBytes,
// getDownloadURL,
//3.set complete data to firebase  doc,
//setDoc,

const login_form = document.getElementById("login_form");

login_form.addEventListener("submit", function (e) {
  e.preventDefault();
  //console.log(e);

  const email = e.target[0].value;
  const password = e.target[1].value;
  console.log("email =>", email);
  console.log("paasword =>", password);

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "../dashboard/index.html";
    })
    .catch((err) => {
      alert(err);
    });
});
// ../dashboard/index.html
