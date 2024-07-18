import {
  auth,
  signOut,
  db,
  doc,
  getDoc,
  getDocs,
  onAuthStateChanged,
  collection,
  query,
  where,
  deleteDoc,
} from "../firebase-js/firebaseapp.js";

const logout_btn = document.getElementById("logout_btn");
const user_img = document.getElementById("user_img");
const user_name = document.getElementById("user_name");
const user_email = document.getElementById("user");
const events_cards_container = document.getElementById(
  "events_cards_container"
);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    getUserInfo(uid);
    getMyEvents(user.uid);
    user_img.style.display = "inline-block";
  } else {
    window.location.href = "../login/index.html";
  }
});

function getUserInfo(uid) {
  const userRef = doc(db, "users", uid);
  getDoc(userRef).then((data) => {
    const userProfile = data.data().img;
    const user_firstname = data.data().firstName;
    const user_lastname = data.data().lastName;
    const user_email = data.data().email;

    if (typeof userProfile === "string") {
      user_img.src = userProfile;
      user_name.innerHTML = `${user_firstname} ${user_lastname}`;
    } else {
      user_img.src = URL.createObjectURL(userProfile);
      user_name.innerHTML = `${user_firstname} ${user_lastname}`;
    }
  });
}

async function getMyEvents(uid) {
  try {
    const q = query(collection(db,'events'), where("createdBy", "==", uid))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const event = doc.data();
      const {
        banner,
        title,
        date,
        createdByEmail,
        time,
        location,
        description,
        category,
      } = event;
      const card = `
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg" src="${banner}" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Title : ${title}
                </h5>
                <h5>By : ${createdByEmail} </h5>
                <h5>Time : ${time}</h5>
                <h5>Date : ${date}</h5>
                <h5>Location : ${location}</h5>
                <h5>Category : ${category}</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Description : <br> ${description}
              </p>
              <button id="${doc.id}" class="favorite-button" onclick="playLikeSound(this)">
                <audio id="like-sound">
                  <source src="../dashboard/soundeffect.mp3" type="audio/mpeg">
                  Your browser does not support the audio element.
                </audio>
                <svg class="heart-icon" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <button id="${doc.id}" style ="padding : 7px;" onclick = "deleteEvent(this)" class="favorite-button" >
                Delete
              </button>
            </div>
          </div>
        `;
        window.deleteEvent = deleteEvent
      events_cards_container.innerHTML += card;
    });
  } catch (err) {
    alert(err);
  }
}

getMyEvents();

async function deleteEvent(e){
    console.log(e)
    const docRef = doc(db , 'events', e.id)
    await deleteDoc(docRef)
    getMyEvents(auth.currentUser.uid)
}