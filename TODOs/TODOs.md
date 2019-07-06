1. ~~Refactor <Router path="/review/:id"/> to pass in only id. ~~
2. ~~Refactor Review.js to take in game id and query the game from inside the component~~
3. Repeat step 1/2 for Game.js to ensure client can enter in url params for game/reviews they want to look at.
4. Store token safer
5. ~~Retrieve Developer~~
6. Retrieve game collection / dlcs / tags / expansions href for user to query.
7. get game screenshots and videos


<
Note: Reason why singular game page doesnt have its own link because API limit is 10k a month. We dont want user to make uncessary query through gameid/game name.
>