import axios from "axios"


export const firstLetterUppercase = (name) =>{
  return name.charAt(0).toUpperCase() + name.slice(1)
}
export const showThreeDigits = (number) => {
  let newNumber;
  if(number<10){ newNumber = `#00${number}`}
  if(number>=10 && number<100){ newNumber = `#0${number}`}
  if(number>=100){ newNumber = `#${number}`}
  return newNumber
}

/*
* @return { id,
            name,
            sprite,  // photo
            favorite // boolean
          }
*
*/

export const getPokemonList = async ( setIsLoading )=>{

  const results = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50`).then(res=> res.data.results);
  let promises = [];
  const pokemonList =[];
  results.forEach((pokemon, index)=>{
    promises.push(axios.get(pokemon.url))
  })
  Promise.all(promises).then(res=>{
    results.forEach((pokemon, index)=>{
      const stats = getStatsFromRes(res, index);
      pokemonList.push({
        id: index + 1,
        name: pokemon.name,  // all lowercase
        url: pokemon.url,
        stats: stats
      })
    })
    setIsLoading(false)
  })

  return pokemonList
}
/**
 * @param: { response from the API, pokemon id}
 * @returns: { attach: ***, hp: ***, ... }
 * 
 * **/

const getStatsFromRes = (res, index) => {
  const stats = {}
  const newStats = res[index].data.stats;
    // const response = await axios.get(url);
    // const newStats = response.data.stats;
  newStats.forEach((item)=>{
    const statName = item.stat.name;
    stats[statName] = item.base_stat
  })
    return stats
}
// export const getPokemonList = async ()=>{

//   const results = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100').then(res=> res.data.results);
//   const pokemonList =[];
//   let newStats = {}
//   results.forEach((pokemon, index)=>{
//     getStats(pokemon.url).then(stats=>{
//       // pokemonList.push({
//       //   id: index + 1,
//       //   name: pokemon.name,  // all lowercase
//       //   url: pokemon.url,
//       //   stats: stats
//       // })
//       pokemonList[index] = {
//         id: index + 1,
//         name: pokemon.name,  // all lowercase
//         url: pokemon.url,
//         stats: stats
//       }
//     });
//   })
//   console.log(JSON.stringify(pokemonList));
//   return pokemonList
// }

// const getStats = async (url) => {
//   try{
//     const stats = {}
//     const response = await axios.get(url);
//     const newStats = response.data.stats;
//     newStats.forEach((item)=>{
//       const statName = item.stat.name;
//       stats[statName]=item.base_stat
//     })
//     return stats
//   }catch(error){
//     console.log(error);
//   }
// }
