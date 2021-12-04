ROUTEN:

//TEST ROUTEN
GET http://localhost:3000/users
###
GET http://localhost:3000/user/bilge.m01@htlwienwest.at

//ROUTE UM EINEN NEUEN USER ZU ERSTELLEN
POST http://localhost:3000/user/createNewOne
content-Type: application/json

{
    "email": "woalfsberger.r03@htlwienwest.at",
    "firstname": "Raphael",
    "lastname": "Wolfsberger",
    "password": "test123"
}
###
GET http://localhost:3000/getCompetitions/1
###
POST http://localhost:3000/createNewCompetition
content-Type: application/json

{
    "title": "CRUD-POST-Competition",
    "starting_money": null, //DARF NICHT NULL SEIN, wenn es keinen Wert gibt einfach das Feld weglassen NICHT starting_money:null senden
    "end_date": null,
    "user_id": "4"
}
###
GET http://localhost:3000/competitions/0
