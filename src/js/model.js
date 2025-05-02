import { async } from 'regenerator-runtime';

const state = {
  recipe: {},
};

const loadRecipe = async function (id) {
  try {
    // Loading Recipe
    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(
        `Recipe not found: (${data.message}) (${response.status})`
      );

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      SourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err}`);
  }
};

export { state, loadRecipe };
