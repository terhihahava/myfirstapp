<template>
  <div class="team-menu">

    <v-container color="#212121" id="dropdown" align-content-center justify-content-center pa-0>
      <v-layout color="#212121" justify-content-center>
        
          <button id="button" pa-0 v-on:click="pickTeam()">
            <select id="selection" v-model="selectedTeam" color="#212121" justify-center>
              <option class="text-xs-center" align-content-center justify-content-center id="selectTeam" disabled value="">Select team </option>
              <option v-for="(team,index) in teamArray" v-bind:key="index">{{team}}</option>
              </select>
            <img id="dropdown-icon" alt="dropdown-icon" src='@/assets/dropdown_icon.png' width="20" height="20" >
            </button>  
       </v-layout>  
      </v-container>

       <div v-if="this.teamID=='5'">
            <v-container fluid grid-list-lg ma-0 pt-4 pb-0 pl-0 pr-0 color="#212121" v-for="(team,index) in filteredTeams()" v-bind:key="index">
            <v-card color="#212121">
              <v-layout pb-4 pl-1 pr-1>
                <v-flex id="imagebox" xs-3>
                  <v-img v-bind:src="team.crestUrl" width="100px" contain> </v-img>
                  </v-flex>
                <v-flex xs-9>
                  <div>
                      <div class="headline">{{team.name}}</div>
                      <p class="subtext">
                          <a :href="team.website" id="linktext"></a>
                        </p>
                      <div class="subtext">
                        <!-- <p><img alt="location icon" src='@/assets/location_icon.png' width="30" height="30" >&nbsp;&nbsp;{{team.venue}}</p> -->
                        <p><img alt="location icon" src='@/assets/location_icon.png' width="30" height="30" ><a class="subtext" href="http://www.google.com/maps/place/48.218993, 11.624643" target="_blank" rel="noopener noreferrer">&nbsp;&nbsp;{{team.venue}}</a></p>
                        </div>
                      <div>
                      <p> <img justify-end alt="empty heart icon" src='@/assets/heart_icon_full.png' width="30" height="30" > 
                      &nbsp;&nbsp; Add to favorites</p>
                      </div>
                    </div>
                </v-flex>        
                </v-layout>
              </v-card>
            </v-container>
        </div>

        <div v-else> 

          <v-container fluid grid-list-lg ma-0 pt-4 pb-0 pl-0 pr-0 color="#212121" v-for="(team,index) in filteredTeams()" v-bind:key="index">
            <v-card color="#212121">
              <v-layout pb-4 pl-1 pr-1>
                <v-flex id="imagebox" xs-3>
                  <v-img v-bind:src="team.crestUrl" width="100px" contain> </v-img>
                  </v-flex>
                <v-flex xs-9>
                  <div>
                      <div class="headline">{{team.name}}</div>
                      <p class="subtext">
                          <a :href="team.website" id="linktext"></a>
                        </p>
                      <div class="subtext">
                        <p><img alt="location icon" src='@/assets/location_icon.png' width="30" height="30" >&nbsp;&nbsp;{{team.venue}}</p>
                        </div>
                      <div>
                      <p> <img justify-end alt="empty heart icon" src='@/assets/heart_icon_full.png' width="30" height="30" > 
                      &nbsp;&nbsp; Add to favorites</p>
                      </div>
                    </div>
                </v-flex>        
                </v-layout>
              </v-card>
            </v-container>
          </div>

      <div class="player-section">

        <div v-if="this.teamID=='5'">
          <v-container ma-0 pt-20 color="#212121">
            <v-layout wrap>
              <v-flex  xs6 pb-4 pl-2 pr-2 v-for="(player,index) in teamPlayers" v-bind:key="index">
                <v-card color="#212121">
                  <div v-for="(bayernPlayer, index) in photoGallery" v-bind:key="index">
                    <div v-if="player.id==bayernPlayer.id">
                       <v-img v-bind:src="bayernPlayer.photo"></v-img> 
                      </div>  
                    </div>
                  <v-card-title>
                    <div>
                      <span class="headline">
                        {{player.name}}
                      </span><br>
                      <span class="subtext">Position: {{player.position}}</span><br>
                      <span class="subtext">Number: {{player.shirtNumber}}</span><br>
                      <span class="subtext">Born: {{player.dateOfBirth.slice(0,10)}}</span><br>
                      <span class="subtext">Nationality: {{player.nationality}}</span><br>
                      </div>
                   </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>           
            </v-container>
         </div>

        <div v-else>
          <v-container ma-0 pt-20 color="#212121" v-for="(player,index) in teamPlayers" v-bind:key="index">
            <v-layout pb-4 pl-2 pr-2>
              <v-flex xs6>
                <v-card color="#212121">
                  <v-card-title>
                    <div>
                      <span class="headline">
                        {{player.name}}
                      </span><br>
                      <span class="subtext">Position: {{player.position}}</span><br>
                      <span class="subtext">Number: {{player.shirtNumber}}</span><br>
                      <span class="subtext">Born: {{player.dateOfBirth.slice(0,10)}}</span><br>
                      <span class="subtext">Nationality: {{player.nationality}}</span><br>
                      </div>
                   </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>           
            </v-container>
         </div>
    </div>
   

   </div>

    
</template>

<script>

import axios from 'axios'

export default {
  name: 'teams',
  data() {
    return {
    allTeams: [],
    isLoading: true,
    teamArray: [],
    selectedTeam:"",
    teamID: '',
    teamPlayers: [],
    photoGallery:[],
    matchList: this.$parent.$data.allMatches,
    }
  },
  created() {
     fetch("https://api.myjson.com/bins/18wrz4")
        .then(response => {
          // console.log(response)
          return response.json()
        })
        .then(json => {
          this.allTeams = json.teams,
          // this.getTeamId()
          // json.teams.name 
          // json.teams.venue (home stadium name)
          // json.teams.crestUrl (logo)
        
        
       this.teamArray = this.createTeamDropdown(this.allTeams);
       console.log(this.selectedTeam);
        this.isLoading = false;
       
      });

        
  },

  methods: {

  getData () {
    //  this.getTeamId(); 
    //  console.log(this.teamID)
     axios
       .create({
         headers: {
           'X-Auth-Token': 'dd2cdfd65d734c248805d027ecc390c9'
         }
       })
       .get(
        //  'https://api.football-data.org/v2/teams/2')
         'https://api.football-data.org/v2/teams/' + this.teamID)
       .then(response => {
         this.teamPlayers = response.data.squad
         this.loading = false
       })
       .catch(function (error) {
         console.log(error)
       });

      //  console.log(this.teamPlayers)
      },

  getPlayerPhotos() {
     axios
       .get(
         'https://api.myjson.com/bins/wgk90')
       .then(response => {
         this.photoGallery = response.data.squad
       })
       .catch(function (error) {
         console.log(error)
       });

       console.log(this.photoGallery)
      },

  createTeamDropdown() {

                let teamArray = this.allTeams.map(team => {
                    return team.name
                
                })

                return teamArray
      },

    pickTeam() {
      this.getTeamId();
      this.getPlayerPhotos();
       return this.selectedTeam
       console.log(this.photoGallery)
    },

    filteredTeams(){

    return this.allTeams.filter (team =>{
      var teamFilter = team.name.includes(this.selectedTeam) 

      return teamFilter
      })
        
      },
    
    getTeamId(){
        if(this.selectedTeam !== "" && this.allTeams.length>0){
          let chosenTeamId = this.allTeams.filter(team => team.name === this.selectedTeam)[0].id
          console.log(chosenTeamId)
          this.teamID = chosenTeamId
          this.getData()
        } else {
          console.log("teamID = ''")
          this.teamID = ""
        }
      }
   
    
  },


}

</script>

<style>

.team-menu{
  background-color: #212121
}
body {
  padding: 0px;
  background-color: #212121;
}

template {
  background-color:#212121;
  color: white
}

#dropdown {
  height: 80px;
}

#button {
  font-size: 25px;
  font-family: 'Arimo', sans-serif;
  color:white;
  background-color:#212121;
 position: relative;
 right: 14px;
}

 select {
   color: white !important;
   justify-content: center !important;
   text-align: center !important;
   width: 100% !important;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";;
   align-self: center!important;
   justify-self: center!important;
   justify-items: center!important;

 }

 option {
   color: black;
   justify-content: center !important;
   text-align: center !important;
 }

  .header a {
   color: white;
   text-decoration: none;
   font-family: 'Arimo', sans-serif;
   font-size: 25px;
   font-weight: bold
 }

 #selectTeam{
   text-align: center;
   color: white !important;
 }

 .v-toolbar__content {
  align-items: center;
  text-align: justify;
  justify-content: center
}

.headline {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: normal !important;
  color: white !important;
  font-size: 20px !important;
}

.subtext {
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
color: white !important;
}

#linktext {
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
color: white !important;
}

.v-responsive v-image {
  vertical-align: -webkit-baseline-middle !important;
}


.grey.lighten-3 {
  background-color:#212121!important;
}

.container fluid grid-list-lg {
    background-color:#212121!important;
}

.layout row wrap {
  background-color:#212121!important;
}

.v-card__title--primary {
padding-top: 5px !important;
}
p {color:white;}

#imagebox {
  max-width: 130px !important;
  padding-left: 20px !important;
  padding-top: 20px !important;
}

.nobr { white-space: nowrap }

#selection {
  font-family: 'Arimo', sans-serif !important;
color: white !important;
justify-content: center;
font-size: 20px

}
.player-section
{
padding-top: 20px;  
}

#dropdown-icon{
  position: relative;
  bottom: 37px;
  left: 115px;
}
</style>

