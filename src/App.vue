<template>
  <div id="app">


        <div v-if="isLoading">
            <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            <p style="color: white">Loading ...</p>
        </div>

        <div v-else>

          <v-container class="header">
            <v-layout align-content-center justify-space-around>
              
                <router-link  :to="{ name:'teams', params: {matches: this.allMatches}}">teams</router-link>
               
                 <router-link :to="{ name:'games', params: {matches: this.allMatches}}">games</router-link>
               
                <router-link to="/standings"> standings</router-link>
             
            </v-layout>
          </v-container>
          <router-view />

        </div>

            <v-footer id="footer" dark>

              <v-container align-content-center>
                <v-layout justify-space-around>
                    <router-link to="/MyGames"> 
                     
                        <img alt="heart icon" src='@/assets/heart_icon_full.png' width="30" height="30" justify-space-around>
                        
                      </router-link>
                    <router-link to="/chat">
                     
                          <img alt="chat icon" src="@/assets/chat_icon.png" width="30" height="30" justify-space-around>
                        
                      </router-link>
              
                  </v-layout>
                </v-container>

              </v-footer>



    </div>
</template>

<script>

// import chat_icon from '@/assets/chat_icon.png'
import Games from "@/views/Games.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import chatIcon from "@/assets/chat_icon.png";
import heartIcon from "@/assets/heart_icon_full.png"

export default {
  name: 'app',
  data() {
    return {
    allMatches: [],
    isLoading: true,
    }
  },
  created() {

    // var header = new Headers({
    // 'X-Auth-Token': 'dd2cdfd65d734c248805d027ecc390c9'
    // });

    // var url = "api.football-data.org/v2/competitions/BL1/matches";
              

 /*    fetch(url, {
        headers: header
    }) */
    fetch("https://api.myjson.com/bins/naqps")
    .then(response => {
      // console.log(response)
      return response.json()
    })
    .then(json => {
    // console.log(json)
    this.allMatches = json.matches;
    this.matchStatus = json.matches[0].status;
    // json.matches.status (FINISHED/SCHEDULED)
  //  json.matches.utcDate
  //   json.matches.score.winner
  //   json.matches.score.fullTime.homeTeam
  //    json.matches.score.fullTime.awayTeam
  //    json.matches.homeTeam.name
  //  json.matches.awayTeam.name  

    // console.log(this.allMatches);
  
    this.isLoading = false })
  }, 
  methods: {
    getTodaysDate: function() {
       return Date.now()
       console.log(Date.now)
    }
  }

}

</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  background-color:#212121
}

#nav a.router-link-exact-active {
  color: white;
}

.v-footer {
  height: 80px !important;
  display: flex !important

}

/* .v-footer pa-3 theme--dark {
   display: flex !important;
   flex-direction: row !important;
} */

.footer-elements {
  display: flex !important;
  justify-content: space-around !important;
  flex-direction: row  !important;
  display:inline-block !important;
}

#chat-icon {
  flex-direction: row !important;
}

#heart-icon {
  flex-direction: row !important;
}
.header {
  padding:30px;
  background-color: #212121;
  height: 90px !important;
}
.header a {
   color: white;
   text-decoration: none;
   font-family: 'Arimo', sans-serif;
   font-size: 25px;
   /* font-weight: bold */
 }

 /* .v-toolbar__content { */
  /* align-self: center !important; */
  /* text-align: justify !important;
  justify-content: space-around !important;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
  height: 60px !important;
  background-color:#212121;
  vertical-align: middle;
} */

/* .v-toolbar__title {
  
  vertical-align: middle;
} */

body {
  padding: 0px;
  background-color: #212121;
}

#heart-icon {
  justify-content: center !important;
}

#chat-icon {
  justify-content: center !important;
}

#footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}


</style>
