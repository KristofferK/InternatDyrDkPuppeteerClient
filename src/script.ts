import { InternatDyrClient } from "./internat-dyr-client";
import { Animal } from "./animal";
import { Distance } from "./distance";

(async() => {
  const client = await InternatDyrClient.initialize();
  await client.acceptCookies();
  await client.search(8000, [Animal.Cats, Animal.Rabbits, Animal.Reptiles], Distance.Close);
  await client.screenshot('dump.jpg', true);
  for (let i = 0; i < 4; i++) {
    console.log('loaded', await client.loadMoreResults(), 'more rows');
  }
  await client.screenshot('dump2.jpg', true);
})();