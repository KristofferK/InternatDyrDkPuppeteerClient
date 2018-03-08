import { InternatDyrClient } from "./internat-dyr-client";
import { Animal } from "./animal";
import { Distance } from "./distance";

(async() => {
    const client = await InternatDyrClient.initialize();
    await client.search(5000, [Animal.Cats, Animal.Rabbits, Animal.Reptiles], Distance.Close);
    await client.screenshot('dump.jpg', true);
})();