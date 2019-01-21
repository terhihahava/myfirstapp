<template>
  <div class="chatbox">

   <div class="login-section" v-if="isLoggedIn">

       <div class="text-area">
          <v-btn class="button1" v-on:click="logout()">Log out</v-btn>
          </div>

      <div class="text-area">
        <form> 
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Write your message:</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="msg"></textarea>
            </div>
        </form>
        <v-btn class="button1" v-on:click="writeNewPost()">Send</v-btn>
        </div>
          
        <div id="view-messages" v-for="(msg, index) in messages" :key="index">
            <p>{{msg.name}} {{msg.date.split('T')[0].slice(0,10)}}:</p>
            <p>{{msg.body}}</p>
          </div>

    </div>

    <div class="login-section" v-else>

       <div class="text-area">
          <form> 
            <div class="form-group">
              <p>Please sign in to use chat.</p>
              </div>
          </form>
          <v-btn class="button1" v-on:click="login()">Sign in</v-btn>
          </div>
        
      </div>

    </div>

    
</template>

<script>

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  name: 'chat',
  data() {
    return {
      msg: "",
      userEmail: null,
      messages: [],
      isLoggedIn: ""
    }
},
methods: {

login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          console.log(user.displayName);
          console.log(user.email);
          // Save user email in Vue Component data function
          this.userEmail = user.email;
          this.isLoggedIn=true;
          // As login user, get the post from data base
          this.getPosts();
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });
 },

logout() {
  var that = this;
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("You are logged out");
          that.isLoggedIn=false;
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });
  },

  // getCurrentUser () {
  //    firebase.auth().onAuthStateChanged((user) => {
  //      if (user) {
  //        this.name = user.displayName
  //        this.isLoggedIn = true
  //      } else {
  //        this.isLoggedIn = false
  //      }
  //    })
  //  },

writeNewPost() {
      // A post entry
      var postData = {
        name: this.userEmail,
        body: this.msg,
        date: new Date()
      };
      // Get a key for a new Post
      var newPostKey = firebase
        .database()
        .ref()
        .child("posts")
        .push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list
      var updates = {};
      updates[newPostKey] = postData;
      firebase
        .database()
        .ref("posts")
        .update(updates);
      // Refresh list of post on the page
      this.getPosts();
  },

getPosts() {
      // Access "posts" collection
      firebase
        .database()
        .ref("posts")
        .once("value", data => {
          console.log(data.val());
          this.messages = data.val();
        });
    },

}
}

</script>

<style>

body {
  padding: 0px;
  background-color: #212121;
}

template {
  background-color: black;
  color: white
}

.chatbox {
  background-color: black;
  color: white;

}

.button {
  font-size: 20px;
  font-family: 'Arimo', sans-serif;
  color:white;
  background-color:#212121;
  align-items: center
}

p {
  color: white;
}

#login-layout {
  background-color: #212121;
}

#login-container {
  background-color: #212121;
}

.text-area {
  padding: 20px;
  background-color: #212121;
}

.login-section {
  
  background-color: #212121;
}

.button1 {
  position: relative !important;
  right: 8px;
}

body {
  padding: 0px;
  background-color: #212121;
}

#view-messages {
  padding: 20px;
}



</style>