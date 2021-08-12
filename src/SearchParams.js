import React from 'react';
import { useState, useEffect } from 'react';
import Pet from './Pet';

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("dog");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    )
    const json = await res.json();

    console.log(json);
    setPets(json.pets);
  }
  const BREEDS = [];

  function adLocation(e) {
    setLocation(e.target.value);
    console.log(e);
  }
  return (
    <div className="search-params" >
      <form>
        <label htmlFor="location" >
          Location <input id="location" onChange={adLocation} value={location} placeholder="Location" />
        </label>
        <label htmlFor="animal">Animal
          <select id="animal" value={animal} onChange={e => setAnimal(e.target.value)} onBlur={e => setAnimal(e.target.value)}>
            <option />
            {
              ANIMALS.map(animal => (<option value={animal} key={animal}> {animal} </option>))
            }
          </select>
        </label>
        <label htmlFor="breed">Breed

          <select id="breed" value={breed} onChange={e => setBreed(e.target.value)} onBlur={e => setBreed(e.target.value)}>
            <option />
            {
              BREEDS.map(breed => (<option value={breed} key={breed} >{breed}</option>))
            }
          </select>
        </label>
        <button> Submit </button>
      </form>
      {
        pets.map((pet) =>
        (<Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
        )
        )
      }
    </div>
  );

};

export default SearchParams;