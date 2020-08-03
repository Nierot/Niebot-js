module.exports = {
    queue: (type, link, user, guild, client) => {
        let song = {
            type: type,
            link: link,
            user: user
        }

        if (!client.queue[guild]) {
            client.queue[guild] = [song]; 
        } else {
            client.queue[guild].push(song);
        }

        console.log(`${user} added ${link} of type ${type} to the ${guild} queue`);
    }
}