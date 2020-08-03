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
    },

    getAndRemoveFirst: (guild, client) => {
        return new Promise((resolve, reject) => {
            if (!client.queue[guild] || client.queue[guild].length === 0) {
                reject('Queue is empty');
            } else {
                resolve(client.queue[guild].shift());
            }
        })
    }
}