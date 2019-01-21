<template>
    <div id="homepage">

        <v-container pt-4 align-content-center id="printDate">
          <v-layout align-content-center justify-space-between pa-2>
            
              <img alt="arrow-back" width="30" height="30" src="../assets/arrow_back.png" @click="currentMatchday--">
            
              <p id="dateSelector">{{getDateFromMatchDay}}</p>
            
              <img alt=" arrow-forward" width="30" height="30" src="../assets/arrow_forward.png" @click="currentMatchday++">
              
           </v-layout>
         </v-container>

      <div class="match-section"> 

          <v-container id="match-container1" v-for="(match, index) in matchList" v-bind:key='match.id'>
            <v-card id="v-card-match1" color=#212121 pa-3>
              <v-layout id="match-layout1" v-if="currentMatchday==match.matchday && match.status=='SCHEDULED'">
                   <v-flex xs3 class="emptyHeart" v-if="iconIsClicked">
                      <img alt="heart_icon_full" width="40" height="40" src="../assets/heart_selected.png" v-on:click="changeIcon(match.id)">
                      </v-flex>
                    <v-flex xs3 class="emptyHeart" v-else>
                      <img alt="heart_icon_full" width="40" height="40" src="../assets/heart_icon_full.png" v-on:click="changeIcon(match.id)">
                      </v-flex>

                    <v-flex xs7>
                      <p class="matchDate">{{match.utcDate.split('T')[0].slice(0,10)}}</p>
                      <p class="teamNames">{{match.homeTeam.name}}</p>
                      <p class="teamNames">{{match.awayTeam.name}}</p>
                      </v-flex>
                    <v-flex xs2>
                      <p class="matchDate">{{match.utcDate.split('T')[1].slice(0,5)}}</p>
                      </v-flex>
                  
                </v-layout>
              </v-card> 
            </v-container>

            <v-container v-for="(match, index) in matchList" v-bind:key="index">
              <v-card id="v-card-match2" color=#212121 pa-3>
                <v-layout id="match-layout2" v-if="currentMatchday==match.matchday && match.status=='FINISHED'">
                   <v-flex xs1 class="emptyHeart">
                      <!-- <img alt="heart_icon_full" width="40" height="40" src="../assets/heart_icon_full.png"> -->
                      </v-flex>
                    <v-flex xs9>
                      <p class="matchDate">{{match.utcDate.split('T')[0].slice(0,10)}}</p>
                      <div v-if="match.score.winner=='HOME_TEAM'">
                        <p class="teamNamesPink">{{match.homeTeam.name}}</p>
                        <p class="teamNames">{{match.awayTeam.name}}</p>
                        </div>
                      <div v-else-if="match.score.winner=='AWAY_TEAM'">
                        <p class="teamNames">{{match.homeTeam.name}}</p>
                        <p class="teamNamesPink">{{match.awayTeam.name}}</p>
                        </div>
                      <div v-else>
                        <p class="teamNames">{{match.homeTeam.name}}</p>
                        <p class="teamNames">{{match.awayTeam.name}}</p>
                        </div>
                      </v-flex>
                    <v-flex xs2>
                      <p class="matchDate"> {{match.score.fullTime.homeTeam}} - {{match.score.fullTime.awayTeam}}</p>
                      </v-flex>
                    
                  </v-layout>
                </v-card>
              </v-container>

        </div>  


        <!-- <div v-for="(match, index) in matchList" v-bind:key="index">
            <li v-if="currentMatchday==match.matchday && match.status=='SCHEDULED'">{{match.homeTeam.name}} | {{match.awayTeam.name}} | {{match.utcDate.split('T')[1].slice(0,5)}}</li>
            <li v-if="currentMatchday==match.matchday && match.status=='FINISHED'">{{match.homeTeam.name}} | {{match.awayTeam.name}} | {{match.score.fullTime.homeTeam}} - {{match.score.fullTime.awayTeam}}</li>
        </div> -->
    </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import GameSchedule from '@/components/GameSchedule.vue'
import moment from 'moment'

export default {
  name: 'games',
  components: {
    MainHeader,
    GameSchedule
  },
  data() {
    return {
      matchList: this.$parent.$data.allMatches,
      currentDate: moment().format('ll'),
      currentMatchday:  this.$parent.$data.allMatches[0].season.currentMatchday,
      iconIsClicked: false
      // dateFromMatchDay: this.getDateFromMatchDay(this.$parent.$data.allMatches[0].season.currentMatchday)
     
      // currentDateISO: new Date().toISOString().split('T')[0]

      // matchStatus: this.$parent.$data.allMatches.status,
      // matchDate: this.matchList.utcDate,
      // matchWinner: this.matchList.score.winner,
      // homeTeamScore: this.matchList.score.fullTime.homeTeam,
      // awayTeamScore: this.matchList.score.fullTime.awayTeam,
      // homeTeamName: this.matchList.homeTeam.name,
      // awayTeamName: this.matchList.awayTeam.name,
      // todaysMatches: this.matchList..season.currentMatchday
    }
  },
  created () {
 
   console.log(this.matchList);
  //  console.log(this.currentDateNew.split('.')[0] + 'Z')
   
  
  //  console.log(this.currentDateNew.split('T')[0])
  

   },
   computed:{
       getDateFromMatchDay(){
          let filteredArray = this.matchList
                          .filter(matchday => matchday.matchday == this.currentMatchday)
                          .map(matchday => matchday.utcDate.split('T')[0])
          console.log(filteredArray)
          return filteredArray[0] + " - " + filteredArray[filteredArray.length-1]
    }
   },

  methods:{

    test(){
      console.log(this.matchList)
     let future = this.matchList.filter(oneMatch => oneMatch.status == "SCHEDULED")
      console.log(future[0].utcDate)
      console.log(future[0].matchday)
      
      let close = 

      console.log(future.map(a => a.matchday))


      // this.matchList
    
    },
    
    changeIcon(id) {
       this.iconIsClicked = !this.iconIsClicked
    }

    
  
  }

 }  
</script>

<style scoped>

body {
  padding: 0px;
  background-color: #212121;
}

template {
  background-color: black;
  color: white
}

 p {
   color: white;
   margin-bottom: 0;
 }

 #homepage {
   color: white;
  background-color:#212121;
  
 }


 #printDate {
   color: white;
   font-family: 'Arimo', sans-serif;
   font-size: 25px;
   height: 70px !important;
   border-bottom-color: white;

 }

 .header a {
   color: white;
   text-decoration: none;
   font-family: 'Arimo', sans-serif;
   font-size: 25px;
   font-weight: bold
 }

 .v-toolbar__content {
  align-items: center;
  text-align: justify;
  justify-content: center
}

.vcard {
  background-color: black !important;
  color: white !important;
}

.container {
  padding: 0px !important;
}

#match-section{
  margin-left: 20px !important;
}

#match-container1{
  padding: 20px;
  border-color: white !important;
}

#match-layout1{
  padding: 20px !important;
  border-color: white !important;
}

#match-layout2{
  padding: 20px !important;
}

.matchDate{
font-size: 20px;
/* font-weight: bold; */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

}

.teamNames {
  font-size: 15px !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.teamNamesPink {
  font-size: 15px !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  color: #00838F !important;
  font-weight: bold !important;
}

.emptyHeart{
  position: relative !important;
  top: 15px !important;
}
#dateSelector {
  font-size: 20px;
  font-family: 'Arimo', sans-serif !important;

}

</style>