import { InternatDyrClient } from "./internat-dyr-client";

(async() => {
    const client = await InternatDyrClient.initialize();
    await client.search(5000, [4,5], 50);
    await client.screenshot('dump.jpg', true);
})();