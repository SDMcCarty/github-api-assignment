'use strict';

const searchURL = 'https://api.github.com/users/';


function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length & i<maxResults ; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].full_name}">${responseJson[i].full_name}</a></h3>
      <p>${responseJson[i].owner.url}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(user) {
  const url = searchURL + user + '/repos';

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const user = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getRepos(user, maxResults);
  });
}

$(watchForm);