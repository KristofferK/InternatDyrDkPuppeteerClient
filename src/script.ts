import { InternatDyrClient } from "./internat-dyr-client";
import { Animal } from "./animal";

(async() => {
    const client = await InternatDyrClient.initialize();
    await client.search(5000, [Animal.Cats, Animal.Rabbits, Animal.Reptiles], 50);
    await client.screenshot('dump.jpg', true);
})();