export const fetchRecipe = async ({ group, searchValue = '' }) => {
  let result;

  const INGREDIENTS_MAX = 20;

  if (group !== 'random') {
    let linkLetter;
    switch (group) {
      case 'category':
        linkLetter = 'c';
        break;
      case 'ingredient':
        linkLetter = 'i';
        break;
      default:
        linkLetter = 'a';
    }

    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?${linkLetter}=${searchValue}`
    );
    let filterResult = await response.json();

    if (filterResult?.meals) {
      let mealId = filterResult.meals[0]?.idMeal;
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      result = await response.json();
    }
  } else {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    result = await response.json();
  }

  let data = {};
  if (result?.meals) {
    let recipe = result.meals[0];

    let ingredients = [];
    for (let i = 1; i <= INGREDIENTS_MAX; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(recipe[`strIngredient${i}`]);
      }
    }

    let instructions = recipe.strInstructions?.split('\r\n') ?? [];
    instructions = instructions.map((line) => line.trim()).filter((line) => line.length);

    data = {
      name: recipe.strMeal,
      tags: recipe.strTags?.split(',') ?? [],
      country: recipe.strArea,
      ingredients,
      instructions,
      img: recipe.strMealThumb,
      video: recipe.strYoutube?.replace('watch?v=', 'embed/'),
    };
  }

  return data;
};
