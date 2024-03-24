CREATE DATABASE leftoverkiller;
\c leftoverkiller
-- Table structure for table `accounts`
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  hash_password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  nick_name VARCHAR(100)
);

-- Table structure for table `ingredient`
DROP TABLE IF EXISTS ingredient;
CREATE TABLE ingredient (
  ingredient_id SERIAL PRIMARY KEY,
  ingredient_name VARCHAR(100) NOT NULL,
  imageURL TEXT
);

-- Table structure for table `recipe`
DROP TABLE IF EXISTS recipe;
CREATE TABLE recipe (
  recipe_id SERIAL PRIMARY KEY,
  recipe_name VARCHAR(100) NOT NULL,
  popularity INT,
  imageURL TEXT,
  instruction TEXT
);

-- Table structure for table `recipe_ingredient`
DROP TABLE IF EXISTS recipe_ingredient;
CREATE TABLE recipe_ingredient (
  pair_id SERIAL PRIMARY KEY,
  recipe_id INT,
  ingredient_id INT,
  CONSTRAINT fk_recipeIngredient_recipeId FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_recipeIngredient_ingredientId FOREIGN KEY (ingredient_id) REFERENCES ingredient (ingredient_id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (recipe_id, ingredient_id)
);


-- Table structure for table `user_ingredient`
DROP TABLE IF EXISTS user_ingredient;
CREATE TABLE user_ingredient (
  pair_id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  ingredient_id int NOT NULL,
  CONSTRAINT fk_userIngredient_ingredientId FOREIGN KEY (ingredient_id) REFERENCES ingredient (ingredient_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_userIngredient_userId FOREIGN KEY (user_id) REFERENCES accounts (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);



-- Create table user_recipe
DROP TABLE IF EXISTS user_recipe;
CREATE TABLE user_recipe (
  pair_id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  recipe_id int NOT NULL,
  CONSTRAINT fk_userRecipe_recipeId FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_userRecipe_userId FOREIGN KEY (user_id) REFERENCES accounts (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);






-- Disable triggers
ALTER TABLE ingredient DISABLE TRIGGER ALL;

-- Insert data into ingredient
INSERT INTO ingredient (ingredient_id, ingredient_name, imageURL) VALUES 
(1,'salt',NULL),(2,'paprika',NULL),(3,'cardamom',NULL),(4,'coriander',NULL),
(5,'ground black pepper',NULL),(6,'grapeseed oil',NULL),(7,'maple syrup',NULL),
(8,'salmon fillet',NULL),(9,'butter',NULL),(10,'brown sugar',NULL),(11,'soy sauce',NULL),
(12,'lemon juice',NULL),(13,'white wine',NULL),(14,'garlic',NULL),(15,'olive oil',NULL),
(16,'new york strip steaks',NULL),(18,'balsamic vinegar',NULL),(19,'red wine',NULL),(20,'fresh rosemary',NULL),
(21,'adobo seasoning',NULL),(22,'marsala wine',NULL),(23,'ketchup',NULL),(24,'kosher salt',NULL),(25,'dried rosemary',NULL),
(26,'black pepper',NULL),(27,'skirt steak',NULL),(28,'vegetable oil',NULL),(29,'red wine vinegar',NULL),
(30,'worcestershire sauce',NULL),(31,'jar prepared dijon-style mustard',NULL),(32,'flank steak',NULL),
(33,'carbonated beverage',NULL),(34,'coffee',NULL),(35,'rice vinegar',NULL),(36,'hot sauce',NULL),
(37,'cayenne pepper',NULL),(38,'stick butter',NULL),(39,'beef top round',NULL),(40,'onions',NULL),
(41,'all purpose flour',NULL),(42,'pinch paprika',NULL),(43,'beef',NULL),(44,'water',NULL),(45,'fresh parsley',NULL),
(46,'stalk celery',NULL),(47,'bay leaves',NULL),(48,'dried marjoram',NULL),(49,'yukon gold potatoes',NULL),(50,'carrots',NULL),
(51,'tomato paste',NULL),(52,'whole kernel corn',NULL),(53,'burgundy wine',NULL),(54,'ginger',NULL),(55,'ham steak',NULL),
(56,'all-purpose flour',NULL),(57,'round steak',NULL),(58,'vegetable shortening',NULL),(59,'can whole peeled tomatoes',NULL),
(60,'large green bell pepper',NULL),(61,'demi-glace ',NULL),(62,'beef tenderloin',NULL),(63,'stick unsalted butter',NULL),
(64,'shallot',NULL),(65,'cognac',NULL),(66,'heavy cream',NULL),(67,'fresh chives',NULL),(68,'top sirloin',NULL),
(69,'garlic powder',NULL),(70,'cube beef bouillon',NULL),(71,'cornstarch',NULL),(72,'can stewed tomatoes',NULL),(73,'white sugar',NULL),
(74,'submarine/hoagie/sandwich roll',NULL),(75,'slice cheese, mozzarella, part skim milk',NULL),(76,'submarine or hoagie or sandwich roll',NULL),
(77,'onion powder',NULL),(78,'cider vinegar',NULL),(79,'ground ginger',NULL),(80,'fillet salmon',NULL),(81,'peanut oil',NULL),
(82,'green onions',NULL),(83,'dried red pepper flakes',NULL),(84,'sesame oil',NULL),(85,'rice wine vinegar',NULL),(86,'chili paste',NULL),
(87,'fresh ginger root',NULL),(88,'leaf fresh basil',NULL),(89,'frozen green peas',NULL),(90,'juice',NULL),(91,'honey',NULL),
(92,'dry bread crumbs',NULL),(93,'pecans',NULL),(94,'lemon',NULL),(95,'cedar plank',NULL),(96,'pineapple juice',NULL),
(97,'drop distilled white vinegar',NULL),(98,'dried basil',NULL),(99,'tomatoes',NULL),(100,'parmesan cheese',NULL),(101,'bunch cilantro',NULL),
(102,'garlic salt',NULL),(103,'leeks',NULL);
ALTER SEQUENCE ingredient_ingredient_id_seq RESTART WITH 103;
-- Enable triggers
ALTER TABLE ingredient ENABLE TRIGGER ALL;





ALTER TABLE recipe DISABLE TRIGGER ALL;

-- Insert data into recipe
INSERT INTO recipe (recipe_id, recipe_name, popularity, imageUrl, instruction) VALUES 
(1,'cardamom maple salmon',18,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5375740.jpg&w=596&h=596&c=sc&poi=face&q=85','Stir salt, paprika, cardamom, coriander, and black pepper together in a bowl. add oil and maple syrup and stir until evenly combined.\r\npreheat a non-stick frying pan over medium-high heat, about 350 degrees f (175 degrees c).\r\nDredge salmon pieces through the maple syrup mixture until evenly coated on all sides.\r\nCook salmon in the preheated pan until fish flakes easily with a fork, 5 to 7 minutes per side.'),
(2,'salmon tango',17,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1120230.jpg','In a medium glass bowl, mix together the melted butter, brown sugar, soy sauce, lemon juice, and white wine. stir until brown sugar has dissolved. reserve a small amount to use as a basting sauce; the remainder is used as a marinade.\r\nPlace salmon fillets in a large resealable plastic bag. pour in marinade, seal, and turn to coat salmon. refrigerate at least 1 hour, turning once.\r\nPreheat grill for medium-high heat.\r\nlightly oil grill grate. place salmon on grill, and discard marinade. cook salmon for 3 to 4 minutes per side, or until easily flaked with a fork. baste with reserved sauce while grilling.'),
(5,'garlic steak with garlic',28,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6714082.jpg','Whisk minced garlic, olive oil, salt, and black pepper in a bowl, then pour into a resealable plastic bag. add the steaks, coat with the marinade, squeeze out excess air, and seal the bag. marinate in the refrigerator for 8 hours or overnight.\r\nCombine 12 garlic cloves and 1 cup olive oil in a small saucepan over low heat. cook, stirring occasionally, until garlic is golden and tender, about 30 minutes. set aside.\r\npreheat an outdoor grill for high heat, and lightly oil the grate. Remove steaks from bag, wiping off excess marinade with paper towels. generously season steaks with salt and black pepper.\r\nCook the steaks on the prepared grill until they start to firm and are reddish-pink and juicy in the center, about 5 minutes per side. an instant-read thermometer inserted into the center should read 130 degrees f (54 degrees c). remove steaks to a plate and let rest for 5 minutes.\r\nDrizzle balsamic vinegar over steaks, then spoon a few cloves of oil-roasted garlic on top.'),
(6,'rosemary steak',30,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5523647.jpg','Combine the red wine, salt and rosemary in a small bowl. let stand at room temperature for 2 to 3 hours.\r\nHeat a large griddle or cast-iron skillet over high heat. place the steaks on the hot pan, and cook for about 8 minutes per side, or to desired degree of doneness. the internal temperature should be at least 145 degrees f (62 degrees c) for medium rare. pour in the wine mixture, and allow it to boil for a minute. Serve steaks with sauce on a deep platter.'),
(7,'argentinean skirt steaks',4,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F2019113.jpg','Season skirt steak pieces all over with adobo seasoning.\r\nHeat olive oil and butter in a large skillet over medium-high heat. Cook steak in hot oil and butter, turning often, until steak begins to firm, and is reddish-pink and juicy in the center, 6 to 8 minutes.'),
(11,'marsala marinated skirt steak',19,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3590847.jpg','Whisk marsala wine, ketchup, garlic, kosher salt, rosemary, and black pepper together in a large glass or ceramic bowl. Add skirt steak and turn to evenly coat. Cover the bowl with plastic wrap, and marinate in the refrigerator, 8 hours to overnight. preheat an outdoor grill for high heat, and lightly oil the grate. Remove steak from marinade, shake off excess, and discard marinade. Cook steak on the preheated grill until meat shines, 3 to 4 minutes per side. An instant-read thermometer inserted into the center should read 130 degrees f (54 degrees c). Transfer meat to a plate and let rest at least 5 minutes before slicing against the grain.'),
(12,'marinated flank steak',22,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1836556.jpg','In a medium bowl, mix the oil, soy sauce, vinegar, lemon juice, worcestershire sauce, mustard, garlic, and ground black pepper. Place meat in a shallow glass dish. Pour marinade over the steak, turning meat to coat thoroughly. Cover, and refrigerate for 6 hours. Preheat grill for medium-high heat. oil the grill grate. Place steaks on the grill, and discard the marinade. Grill meat for 5 minutes per side, or to desired doneness.'),
(13,'grilled coffee and cola skirt steak',23,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1130028.jpg','Place garlic into a nonreactive bowl and whisk in cola, coffee, rice vinegar, ketchup, black pepper, 1 teaspoon salt, rosemary, and hot sauce until thoroughly combined. Unroll the skirt steak and cut into 6-inch lengths with the grain, using a kitchen scissors. Submerge the meat totally in the marinade; place a piece of plastic wrap onto meat and marinade surface. Marinate 8 to 12 hours in refrigerator or overnight. Preheat an outdoor grill for medium-high heat. Remove meat from marinade; save the marinade. Pat meat thoroughly dry with paper towels. Season both sides of meat with salt and cayenne pepper to taste. Pour marinade into a saucepan over medium heat and simmer until slightly thickened, about 10 minutes. Strain through a fine-mesh sieve into a bowl. Grill meat on the preheated grill until steak pieces are still pink inside and meat has good grill marks, about 4 minutes per side. Place thin cooked pieces onto thicker pieces of meat to prevent thin ones from overcooking. When the surface of the meat looks shiny and wet from juices being forced  up to the surface, the meat is medium-rare to medium in doneness. An instant-read meat thermometer inserted into the center of a piece should read 125 to 130 degrees F (52 to 54 degrees C). Remove meat to a platter and let rest for at least 5 minutes before slicing thinly across the grain to serve. Drizzle servings with reduced coffee-cola marinade.'),
(14,'steak soup',20,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F488609.jpg','Melt butter and oil in a large skillet over medium heat until the foam disappears from the butter, and stir in the steak cubes and onion. Cook and stir until the meat and onion are browned, about 10 minutes. While beef is cooking, mix together flour, paprika, salt, and pepper in a bowl. Sprinkle the flour mixture over the browned meat, and stir to coat. In a large soup pot, pour in the beef broth and water, and stir in the parsley, celery leaves, bay leaf, and marjoram. Stir in beef mixture, and bring to a boil. Reduce heat to medium-low, cover the pot, and simmer, stirring occasionally, until meat is tender, about 45 minutes. Mix in the potatoes, carrots, celery, tomato paste, and corn; bring the soup back to a simmer, and cook uncovered, stirring occasionally, until the vegetables are tender and the soup is thick, 15 to 20 minutes. Remove bay leaf and serve hot.'),
(16,'teriyaki flank steak',1,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3644909.jpg','In a large resealable plastic bag, mix the wine, soy sauce, olive oil, brown sugar, ginger, garlic, and pepper. Place steak in the bag, seal, and refrigerate 8 hours, or overnight. Preheat an outdoor grill for medium-high heat. Remove steaks from the bag, and discard marinade. Place steaks on the grill and cook 6 to 8 minutes per side, to your desired degree of doneness. The internal temperature should be at least 145 degrees F (63 degrees C) for rare. Allow the steaks to sit about 5 minutes before slicing against the grain, and serving.'),
(17,'brown sugar ham steak',4,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F2218609.jpg','Cook ham steak in a large skillet over medium heat until browned, 3 to 4 minutes per side. Drain and remove ham. Heat butter in the same skillet until melted; stir in brown sugar. Return ham to skillet and cook over medium-low heat until heated through and brown sugar is dissolved, turning steak often, about 10 minutes.'),
(18,'swiss steak',17,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1052666.jpg','Mix flour, 1/2 teaspoon salt, and 1/4 teaspoon black pepper together in a bowl. Sprinkle half the flour mixture on one side of round steak pieces; pound steak until coating is absorbed. Flip steak and coat with remaining flour mixture; pound steak until coating is absorbed. Cut steak into 6 pieces. Melt shortening in a large skillet over medium heat; place steak pieces in the hot shortening. Cook until browned,  7 to 10 minutes per side. Cover and simmer until tender, about 1 hour, adding water as needed. Turn steak pieces over and add tomatoes, onion, and green bell pepper to the skillet. Season with salt and black pepper. Simmer until vegetables are tender, about 30 more minutes.'),
(20,'round steak sauerbraten',12,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F340785.jpg','Heat the oil in a large saucepan over medium heat. Add the sliced meat and brown well. Remove meat. Add the gravy mix and water and bring to a boil, stirring constantly. Stir in the onion powder, brown sugar, vinegar, Worcestershire sauce, ginger, bay leaf and salt, and ground black pepper to taste. Return the meat to the pan, reduce heat to low, cover and simmer for one hour, or until meat is tender. Remove bay leaf. Note: You could also transfer to a casserole dish and bake covered at 350 degrees F (175 degrees C) for 1 1/2 hours.'),
(21,'firecracker grilled alaska salmon',10,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F997347.jpg','Place salmon filets in a medium, nonporous glass dish. In a separate medium bowl, combine the peanut oil, soy sauce, vinegar, green onions, brown sugar, garlic, ginger, red pepper flakes, sesame oil and salt. Whisk together well, and pour over the fish. Cover and marinate the fish in the refrigerator for 4 to 6 hours. Prepare an outdoor grill with coals about 5 inches from the grate, and lightly oil the grate. Grill the fillets 5 inches from coals for 10 minutes per inch of thickness, measured at the thickest part, or until fish just flakes with a fork. Turn over halfway through cooking.'),
(22,'fast salmon with a ginger glaze',11,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3454021.jpg','Preheat grill for medium heat and lightly oil the grate. Season salmon fillets with salt. Place salmon on the preheated grill; cook salmon for 6 to 8 minutes per side, or until the fish flakes easily with a fork. Combine water, rice vinegar, brown sugar, chile paste, ginger, garlic, and soy sauce in a small saucepan over medium heat. Bring mixture to a boil, reduce heat to medium and simmer until barely thickened, about 2 minutes. Sprinkle basil on top of salmon; spoon glaze over basil.'),
(23,'paper salmon',27,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F31624.jpg','Preheat the oven to 425 degrees F (220 degrees C). Place each piece of salmon on a large (12 inch)  circle of parchment paper so that they are 1 inch from the center.  Cover each with a spoonful of peas, a clove of crushed garlic, a squeeze of lemon juice and a drizzle of olive oil. Fold the paper over into a packet and seal the edges by crimping and folding like a pasty. Place on a baking sheet. Bake for 15 minutes in the preheated oven, or until fish is able to flake with a fork. To serve, place the packets onto serving plates and cut open the center in the shape of a cross.'),
(24,'baked dijon salmon',12,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F877476.jpg','Preheat oven to 400 degrees F (200 degrees C). In a small bowl, stir together butter, mustard, and honey. Set aside. In another bowl, mix together bread crumbs, pecans, and parsley. Brush each salmon fillet lightly with honey mustard mixture, and sprinkle the tops of the fillets with the bread crumb mixture. Bake salmon 12 to 15 minutes in the preheated oven, or until it flakes easily with a fork.  Season with salt and pepper, and garnish with a wedge of lemon.'),
(25,'pepper-honey cedar plank salmon',7,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1132673.jpg','Soak the cedar planks in warm water for 1 to 2 hours. Add a splash of bourbon to the water if desired. Bring the pineapple juice, soy sauce, vinegar, lemon juice, olive oil, and honey to a simmer in a saucepan over medium-high heat. Reduce the heat to medium-low, and stir in the sugar, 1 teaspoon black pepper, cayenne pepper, paprika, and garlic powder. Simmer, stirring occasionally, until the sauce has reduced to a syrupy consistency, about 15 minutes. Set the sauce aside. Preheat an outdoor grill for medium heat. Place the planks on the grate. They are ready to cook on when they start to smoke and crackle just a little. Season the salmon with a light sprinkling of salt and pepper. Place the fillets onto the smoking cedar planks, close the lid of the grill, and cook for 10 minutes. Spoon a small amount of the sauce over the salmon fillets, and continue cooking until the fish turns opaque in the center, about 5 minutes more. Serve with the remaining sauce.'),
(27,'tomato basil salmon',28,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F691788.jpg','Preheat oven to 375  degrees F (190 degrees C). Line a baking sheet with a piece of aluminum foil, and spray with nonstick cooking spray. Place the salmon fillets onto the foil, sprinkle with lemon pepper, garlic powder, and salt, and dot with 1 tablespoon butter. Bake in the preheated oven until the salmon is opaque in the center, and the lemon pepper seasoning has formed a golden brown crust, about 20 minutes. Serve sprinkled with chopped fresh basil leaves and lemon zest.'),
(28, 'charbroiled salmon', 28, 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7557276.jpg', 'Combine soy sauce, red wine, ginger, and black pepper in a large, resealable plastic bag. Seal, and shake vigorously to mix ingredients. Add salmon steaks, squeeze out excess air, and seal. Refrigerate, turning frequently to keep all sides in contact with the liquid, for no less than 2 hours. Preheat an outdoor grill for medium high heat. Cook on a hot grill for about 5 minutes per side, basting freely with extra marinade. Serve with parsley garnish and lemon slices.');
ALTER SEQUENCE recipe_recipe_id_seq RESTART WITH 29;
ALTER TABLE recipe ENABLE TRIGGER ALL;

ALTER TABLE recipe_ingredient DISABLE TRIGGER ALL;

-- Insert data into recipe_ingredient
INSERT INTO recipe_ingredient (pair_id, recipe_id, ingredient_id) VALUES 
(167,1,1),(168,1,2),(169,1,3),(170,1,4),(171,1,5),(172,1,6),(173,1,7),(174,1,8),
(175,2,8),(176,2,9),(177,2,10),(178,2,11),(179,2,12),(180,2,13),(181,5,1),(182,5,5),
(183,5,14),(184,5,15),(185,5,16),(186,5,18),(187,6,1),(188,6,16),(189,6,19),(190,6,20),
(191,7,1),(192,7,9),(193,7,15),(194,7,16),(197,11,14),(195,11,22),(196,11,23),(198,11,24),
(199,11,25),(200,11,26),(201,11,27),(203,12,11),(205,12,12),(208,12,14),(209,12,26),(202,12,28),
(204,12,29),(206,12,30),(207,12,31),(210,12,32),(217,13,1),(211,13,14),(215,13,23),(218,13,25),(216,13,26),
(220,13,27),(212,13,33),(213,13,34),(214,13,35),(219,13,36),(221,13,37),(228,14,1),(229,14,26),(223,14,28),
(222,14,38),(224,14,39),(225,14,40),(226,14,41),(227,14,42),(230,14,43),(231,14,44),(232,14,45),(233,14,46),
(234,14,47),(235,14,48),(236,14,49),(237,14,50),(238,14,51),(239,14,52),(243,16,10),(241,16,11),(245,16,14),
(242,16,15),(246,16,26),(247,16,32),(240,16,53),(244,16,54),(250,17,10),(249,17,38),(248,17,55),(259,18,1),
(252,18,26),(257,18,40),(255,18,44),(251,18,56),(253,18,57),(254,18,58),(256,18,59),(258,18,60),(269,20,1),
(264,20,10),(270,20,26),(261,20,28),(266,20,30),(262,20,44),(268,20,47),(260,20,68),(263,20,77),(265,20,78),
(267,20,79),(281,21,1),(276,21,10),(273,21,11),(277,21,14),(274,21,18),(278,21,79),(271,21,80),(272,21,81),
(275,21,82),(279,21,83),(280,21,84),(283,22,1),(286,22,10),(290,22,11),(289,22,14),(284,22,44),(282,22,80),
(285,22,85),(287,22,86),(288,22,87),(291,22,88),(294,23,14),(296,23,15),(292,23,80),(293,23,89),(295,23,90),
(304,24,1),(298,24,31),(297,24,38),(302,24,45),(303,24,80),(299,24,91),(300,24,92),(301,24,93),(305,24,94),
(319,25,1),(316,25,2),(313,25,10),(308,25,11),(310,25,12),(311,25,15),(314,25,26),(315,25,37),(317,25,69),
(318,25,80),(312,25,91),(306,25,95),(307,25,96),(309,25,97),(323,27,15),(320,27,80),(321,27,98),(322,27,99),
(324,27,100),(325,28,11),(326,28,19),(328,28,26),(330,28,45),(327,28,79),(329,28,80),(331,28,94);
ALTER SEQUENCE recipe_ingredient_pair_id_seq RESTART WITH 332;
-- Enable triggers
ALTER TABLE recipe_ingredient ENABLE TRIGGER ALL;