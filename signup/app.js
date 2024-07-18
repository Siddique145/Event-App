import {
  auth,
  db,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  storage,
} from "../firebase-js/firebaseapp.js";

//1.Create account createUserWithEmailAndPassword
//2.upload image  ref,
// uploadBytes,
// getDownloadURL,
//3.set complete data to firebase  doc,
//setDoc,

const signup_btn = document.getElementById("submit_form");
const usersignup_btn = document.getElementById("usersignup_btn");

signup_btn.addEventListener("submit", function (e) {
  e.preventDefault();
  //console.log(e);
  const img = e.target[0].files[0];
  const email = e.target[1].value;
  const password = e.target[2].value;
  const firstName = e.target[4].value;
  const lastName = e.target[5].value;
  const phone = e.target[6].value;
  const company = e.target[7].value;

  const userinfo = {
    img,
    email,
    password,
    firstName,
    lastName,
    phone,
    company,
  };

  usersignup_btn.disabled = true;
  usersignup_btn.innerText = "Loading...";
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("user==>", user.user.uid);
      //upload user img
      const userRef = ref(storage, `user/${user.user.uid}`);
      uploadBytes(userRef, img)
        .then(() => {
          console.log("user img uploaded");
          getDownloadURL(userRef)
            .then((url) => {
              console.log("user img url agya =>", url);
              //update user info
              userinfo.img = url;
              // created user document  referance
              const userDbRef = doc(db, "users", user.user.uid);
              //set this document
              setDoc(userDbRef, userinfo).then(() => {
                console.log("user Object updated into db");
                window.location.href = "../login/index.html";

                usersignup_btn.disabled = false;
                usersignup_btn.innerText = "Submit";
              });
            })
            .catch((err) => {
              console.log("user img url NAHI AYA");
              usersignup_btn.disabled = false;
              usersignup_btn.innerText = "Submit";
            });
        })
        .catch((err) => {
          console.log("user img NOT uploaded");
          usersignup_btn.disabled = false;
          usersignup_btn.innerText = "Submit";
        });
    })
    .catch((err) => {
      alert(err), (usersignup_btn.disabled = false);
      usersignup_btn.innerText = "Submit";
    });
  console.log(userinfo);
});
