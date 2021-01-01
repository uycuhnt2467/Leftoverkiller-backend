# Leftoverkiller_nodejs

This backend script is intialized according to https://ithelp.ithome.com.tw/articles/10195845.
The current server is deployed on AWS EC2, and is run by pm2 package. (http://3.12.253.9:3000/)

The server is mainly built up by utilizing Express.js, and respond to frontend application by returning recipe, ingredient, and user account information which is stored in MySQL. Thus, if you want to install this script in your own server, please don't forget to create one database.

The current version offers the following routes and the routes are mainly built up following RESTful api:
<ol>
   <li>Favorite: The routes are <b>only work for member who had logged in </b>.d,  and . 
    <ul>
      <li> /favorite GET: Members can get their favorite recor </li>
      <li> /favorite POST (should contain recipe id): Members can add new recipe into their favorite record </li>
      <li> /favorite DELETE: Members can delete the previous favorite record. </li>
    </ul>
  <li>Recipe: The routes are work for every user. 
    <ul>
      <li> /recipe GET: Users can get all recipe information </li>
      <li> /recipe/:recipe_id/ GET: Users can get recipe detail by recipes' id  </li>
      <li> /recipe/name POST (should contain recipe name): Users can get recipe detail by recipes' names </li>
    </ul>
  </li>
  <li>Ingredient: The routes are work for every user. User can get all ingredient information, and get ingredients' detail by either ingredients' id or ingredients' names.
    <ul>
      <li> /ingredient GET </li>
      <li> /ingredient/:ingredient_id/ GET </li>
      <li> /ingredient/name POST (should contain ingredient name) </li>
    </ul>
  <li>Pantry: The routes are <b> only work for member who had logged in </b>. Users can manage their pantry.
    <ul>
      <li> /pantry GET: Members can get all ingredients from their pantry. </li>
      <li> /pantry POST: Members can add new ingredient into their pantry (by ingredient name) </li>
      <li> /pantry/id POST: Members can add new ingredient into their pantry (by ingredient id) </li>
      <li> /pantry DELETE: Members can delete new ingredient into their pantry. </li>
    </ul>
  <li>User: The routes are work for every users.
    <ul>
      <li> /register POST: Users can regist as a member</li>
      <li> /login POST: Users can login</li>
    </ul>
  </li>
  <li>Search: The routes enable user to search what recipe they can make with their current ingredients in pantry.
    <ul>
      <li> /search POST (should contain ingredient information)
    </ul>
</ol>
