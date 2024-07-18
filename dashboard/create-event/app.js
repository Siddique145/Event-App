import {
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
  db,
  collection,
  addDoc,
  auth,
} from "../../firebase-js/firebaseapp.js";

const create_event_form = document.getElementById("create_event_form");
const create_event_btn = document.getElementById("create_event_btn");
create_event_form.addEventListener("submit", (e) => {
  e.preventDefault();
  create_event_btn.disabled = true;
  create_event_btn.innerHTML = "Loading";
  const eventInfo = {
    title: e.target[1].value,
    date: e.target[2].value,
    time: e.target[3].value,
    location: e.target[4].value,
    description: e.target[5].value,
    category: e.target[6].value,
    createdBy: auth.currentUser.uid,
    createdByEmail: auth.currentUser.email,
    likes: [],
  };

  const banner = e.target[0].files[0];
  const imgRef = ref(storage, `banners/${banner.name}`);
  uploadBytes(imgRef, banner).then(() => {
    console.log("File uploaded done");
    getDownloadURL(imgRef).then((url) => {
      console.log("img url agya", url);
      eventInfo.banner = url;

      //add document to event collection
      const eventcollection = collection(db, "events");
      addDoc(eventcollection, eventInfo).then((snapshot) => {
        console.log("document added");
        window.location.href = "../../dashboard/index.html";
        create_event_btn.disabled = flase;
        create_event_btn.innerHTML = "Create-Event";
      });
    });
  });
});

document.getElementById("cancel-btn").addEventListener("click", () => {
  // Cancel event creation and go back to main page
  window.location.href = "./../index.html";
});
