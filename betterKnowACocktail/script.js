// create namespace
const cocktailApp = {};

//saved info & reusable data
(cocktailApp.cocktailUrl = `http://www.thecocktaildb.com/api/json/v1/1`),
	// API - random drink

	(cocktailApp.cocktailRandom = () => {
		$.ajax({
			url: `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
			dataType: 'json',
			method: 'GET',
		}).then((res) => {
			console.log(res.drinks[0]);
			const randomDrink = res.drinks[0];

			// The following would have been impossible without the help of Darshana and Lauren.

			$('h2').text(randomDrink.strDrink);
			const preview = randomDrink.strDrinkThumb;
			$('#glass').attr('src', `${preview}/preview`);

			$('p.drinkInfo').text(randomDrink.strInstructions);

			$('p.strIngredient').text();

			for (drinkProperty in randomDrink) {
				let strIngredient = drinkProperty.includes('strIngredient');
				if (strIngredient) {
					if (randomDrink[drinkProperty]) {
						$('ul.ingredients').append(
							`<li>${randomDrink[drinkProperty]}</li>`
						);
					}
				}
			}
		});
	});

//API search by letter

cocktailApp.grabCocktails = (query) => {
	$.ajax({
		url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php`,
		dataType: 'json',
		method: 'GET',
		data: {
			i: query,
		},
	}).then((typeRes) => {
		console.log(typeRes.drinks);

		const typeDrink = typeRes.drinks;
		typeDrink.forEach((object) => {
			console.log(object.strDrink);
			$('ul.drinkType').append(`<a href=""><li>${object.strDrink}</li></a>`);
		});
	});
};

// API search by name

cocktailApp.fetchCocktailRecipe = (query) => {
	$.ajax({
		url: `https://www.thecocktaildb.com/api/json/v1/1/search.php`,
		dataType: 'json',
		method: 'GET',
		data: {
			s: query,
		},
	}).then((chosenRes) => {
		//console.log(chosenRes.drinks);

		const chosenDrink = chosenRes.drinks[0];
		$('h2').text(chosenDrink.strDrink);
		const preview = chosenDrink.strDrinkThumb;
		$('#glass').attr('src', `${preview}/preview`);

		console.log(chosenDrink.strDrinkThumb);
		$('p.drinkInfo').text(chosenDrink.strInstructions);

		$('p.strIngredient').text();

		for (drinkProperty in chosenDrink) {
			let strIngredient = drinkProperty.includes('strIngredient');
			if (strIngredient) {
				if (chosenDrink[drinkProperty]) {
					$('ul.ingredients').append(`<li>${chosenDrink[drinkProperty]}</li>`);
				}
			}
		}
	});
};

//place listener on *random*poison*init*about* to activate .popup and to fetch repsective info

//create init
cocktailApp.init = () => {
	$('.random').on('click', () => {
		$('.popup').toggleClass('hidden');
		$('.drinkName, .ingredients, .drinkInfo, .drinkType').empty();
		cocktailApp.cocktailRandom();
	});

	$('.poison').on('click', () => {
		$('.popup').toggleClass('hidden');
		$('.drinkName, .ingredients, .drinkInfo, .drinkType').empty();
		cocktailApp.grabCocktails($('input[name="poison"]').val());
	});

	$('.drinkType').on('click', (e) => {
		e.preventDefault();
		$('ul.drinkType').empty();
		console.log(e.target);
		cocktailApp.fetchCocktailRecipe(e.target.innerText);
	});

	$('.ings').on('click', () => {
		$('.popup').toggleClass('hidden');
		$('.drinkName, .ingredients, .drinkInfo, .drinkType').empty();
		cocktailApp.fetchCocktailRecipe($('input[name="ings"]').val());
	});
	// I couldn't find a way to clear this field when clicking another button, so a refresh of the page is neccessary

	// Also, the images do not clear on the pick you poison tab.  if the class is added to the .empty() the whole page breaks *sad face*
	$('.about').on('click', () => {
		$('.popup').toggleClass('hidden').html(`<h2>Hello</h2>
      <p>Better know a Cocktail was completed  with great help from Darshana, Lauren, Esther, Ana and Oksana.  Thank you!</p>`);
		$('.drinkName, .ingredients, .drinkInfo, .drinkType').empty();
	});
};
$(function () {
	cocktailApp.init();
});
//JavaScript is very difficult, a lot more time and practice needed.
