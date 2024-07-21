import {
    auth,
    signOut,
    storage,
    db,
    doc,
    getDoc,
    getDocs,
    onAuthStateChanged,
    getDownloadURL,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
  } from "../firebase-js/firebaseapp.js";
  
  const logout_btn = document.getElementById("logout_btn");
  const user_img = document.getElementById("user_img");
  const user_name = document.getElementById("user_name");
  const user_email = document.getElementById("user");
  const events_cards_container = document.getElementById("events_cards_container");
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      getUserInfo(uid);
      user_img.style.display = "inline-block";
    } else {
      //window.location.href = "../login/index.html";
      getAllEvents()
    }
  });
  
  logout_btn.addEventListener("click", () => {
    signOut(auth);
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
  
  async function getAllEvents() {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      events_cards_container.innerHTML = "";
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
                  <source src="./soundeffect.mp3" type="audio/mpeg">
                  Your browser does not support the audio element.
                </audio>
                <svg class="heart-icon" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                ${auth?.currentUser && event?.playLikeSound?.includes(auth?.currentUser.uid)? "Liked..." : "Like"}
                ${
                  event?.playLikeSound?.length? event?.playLikeSound?.length :''
                }
              </button>
            </div>
          </div>
        `;
        events_cards_container.innerHTML += card;
        window.playLikeSound = playLikeSound
      });
    } catch (err) {
      alert(err);
    }
  }
  
  //getAllEvents();
  /*
  async function playLikeSound(e){
    console.log((e.innerText))
    console.log("play btn=>",e)
    var audio = document.getElementById("like-sound");
    audio.currentTime = 0; // Reset audio to start
    audio.play();
    if(auth.currentUser){
      e.disabled = true;
      const docRef = doc(db,  "events", e.id)
  if(e.innerText == 'Liked...'){
        updateDoc(docRef,{
          playLikeSound : arrayRemove(auth.currentUser.uid),
        }).then(()=>{
          e.disabled = false;
          e.innerText = 'Like'
        }).catch((err)=> console.log(err))
      }else{
        updateDoc(docRef,{
          playLikeSound : arrayUnion(auth.currentUser.uid),
        }).then(()=>{
          e.disabled = false;
          e.innerText = 'Liked...'
        }).catch((err)=> console.log(err))
      }
    }else{
      //window.location.href = 
    }
    audio.play();
  }*/
  async function playLikeSound(e) {
    console.log((e.innerText))
    console.log("play btn=>", e)
    var audio = document.getElementById("like-sound");
    audio.currentTime = 0; // Reset audio to start
  
    // Wait for the audio to be loaded
    audio.addEventListener('canplaythrough', function() {
      audio.play();
    });
  
    if (auth.currentUser) {
      e.disabled = true;
      const docRef = doc(db, "events", e.id)
      if (e.innerText == 'Liked...') {
        updateDoc(docRef, {
          playLikeSound: arrayRemove(auth.currentUser.uid),
        }).then(() => {
          e.disabled = false;
          e.innerText = 'Like'
        }).catch((err) => console.log(err))
      } else {
        updateDoc(docRef, {
          playLikeSound: arrayUnion(auth.currentUser.uid),
        }).then(() => {
          e.disabled = false;
          e.innerText = 'Liked...'
        }).catch((err) => console.log(err))
      }
    } else {
      //window.location.href = 
    }
  }