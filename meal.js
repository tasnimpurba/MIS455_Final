document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const mealList = document.getElementById('mealList');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            mealList.innerHTML = ''; 
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
                const data = await response.json();
                displayMeals(data.meals);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    });

    function displayMeals(meals) {
        if (!meals) {
            const noResults = document.createElement('p');
            noResults.textContent = 'No meals found.';
            mealList.appendChild(noResults);
            return;
        }
        const mealCount = Math.min(meals.length, 5); 
        meals.slice(0, mealCount).forEach(meal => {
            const mealDiv = createMealDiv(meal);
            mealList.appendChild(mealDiv);
        });
        if (meals.length > 5) {
            const showAllButton = document.createElement('button');
            showAllButton.textContent = 'SHOW ALL';
            showAllButton.addEventListener('click', () => {
                meals.slice(5).forEach(meal => {
                    const mealDiv = createMealDiv(meal);
                    mealList.appendChild(mealDiv);
                });
                showAllButton.style.display = 'none';
            });
            mealList.appendChild(showAllButton);
        }
    }

    function createMealDiv(meal) {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal');

        mealDiv.innerHTML = `
            <p>ID: ${meal.idMeal}</p>
            <p>Name: ${meal.strMeal}</p>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>Category: ${meal.strCategory}</p>
            <p>Instructions: ${meal.strInstructions}</p>
        `;
        return mealDiv;
    }
});
