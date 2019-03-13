const algoliasearch = require('algoliasearch');


module.exports = class AlgoliaSearchUtils {
    constructor(index, searchOnly = false) {
        const appId = 'J62GWLVE45'; let apiKey;

        if(searchOnly) {
            apiKey = '24b43a212f579a9d2e79b4f6f73b0097'; //search only key
        } else {
            apiKey = process.env.ALGOLIA_ADMIN_API_KEY;
        }

        this.client = algoliasearch(appId, apiKey);
        this.index  = this.client.initIndex(index);
    }

    // ------ PUBLIC METHODS ------

    addNewObjects(objects) {
        let prom = new Promise((resolve, reject) => {
            this.index.addObjects(objects, (err, content) => {
                if(err) reject(err);
                else {
                    const success = 'Added record to Algolia: ' + JSON.stringify(content);
                    resolve(success);
                }
            });
        });
        return prom;
    }

    updateExistingObjects(objects) {
        let prom = new Promise((resolve, reject) => {
            this.index.saveObjects(objects, (err, content) => {
                if(err) reject(err);
                else {
                    const success = 'Updated record in Algolia: ' + JSON.stringify(content);
                    resolve(success);
                }
            });
        });
        return prom;
    }

    searchIndex(searchObj) {
        let prom = new Promise((resolve, reject) => {
            if(typeof searchObj !== 'object' && searchObj.constructor !== Object) {
                reject(new Error('You must pass an object containing query parameters.'));
            }
            this.index.search(searchObj, (err, content) => {
                if(err) reject(err);
                else resolve(content);
            });
        });
        return prom;
    }
}
