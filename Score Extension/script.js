async function getMatchData() {

      let apiUrl = 'https://api.cricapi.com/v1/currentMatches?apikey=a172333a-8e3c-4106-8879-1a972a60b3fd&offset=0';
      return await fetch(apiUrl)
      .then(data => data.json())
      .then(data => {
                  if (data.status != 'success') return;
                  const matchesList = data.data;
                  
                  if (!matchesList) return [];
                  const relevantData = matchesList.filter(match => match.series_id == "24c36b5a-0ae1-40cf-8cf5-dd0b9d1be6bd").map(match => `${match.name}, ${match.status}`);

                  console.log( {relevantData} );

                  document.getElementById("matches").innerHTML = relevantData.map(match => `<li>${match} </li><br>`).join('');

                  return relevantData;

            })
            .catch(e => console.log(e));

}

getMatchData();