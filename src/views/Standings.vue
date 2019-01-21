<template>

<div class="standings-page">   
  <table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">Team</th>
        <th scope="col">GP</th>
        <th scope="col">W</th> 
        <th scope="col">D</th>
        <th scope="col">L</th>
        <th scope="col">Pts</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <tr v-for="(team, index) in allStandings" :key="index">
              <td class="column1"> {{team.position}}. {{team.team.name}}</td>
              <td class="column2">{{team.playedGames}}</td> 
              <td class="column2">{{team.won}}</td> 
              <td class="column2">{{team.draw}}</td>
              <td class="column2">{{team.lost}}</td>
              <td class="column2">{{team.points}}</td> 
            </tr> 
    </tbody>
    </table>

  </div>

</template>

<script>
export default {
  name: 'standings',
  data() {
    return {
    allStandings: [],
    isLoading: true

    }
  },
  created() {

fetch("https://api.myjson.com/bins/17i1l4")
    .then(response => {
      // console.log(response)
      return response.json()
    })
    .then(json => {
    this.allStandings = json.standings[0].table;
    // json.standings.table.position 
      // json.standings.table.team.name
      // json.standings.table.team.crestUrl
      // json.standings.table.playedGames
      // json.standings.table.won
      // json.standings.table.draw
      // json.standings.table.lost
      // json.standings.table.points
    
    console.log(this.allStandings);
    this.isLoading = false 
    })
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
.standings-page {
  background-color:#212121;
  color: white
}


#nav a.router-link-exact-active {
  color: white;
}

.t01 {
  background-color: black;
  width:100%;
  table-layout: fixed;

}

table, th, td {
  border: 1px solid black;
  color: white;
},

th {
  font-weight: bold;
 }
th{
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 15px;
  color: #fff;
  text-transform: uppercase;
}
td{
  padding: 15px;
  text-align: left;
  vertical-align:middle;
  font-weight: 300;
  font-size: 15px;
  color: #fff;
  border-bottom: solid 1px rgba(255,255,255,0.1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.column1{
  width: 700px;
}

.header {
  align-self: center;
}

.v-toolbar__content {
  align-items: center;
  text-align: justify;
  justify-content: center
}

.header a {
   color: white;
   text-decoration: none;
   font-family: 'Arimo', sans-serif;
   font-size: 25px;
   font-weight: bold
 }
</style>
