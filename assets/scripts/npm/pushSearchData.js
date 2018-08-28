const path              = require('path');
const PostExportActions = require('./modules/postExportActions');
const AlgoliaActions    = require('./modules/algoliaActions');

//ignore series dir as these will be bundled with the related post in the
//tutorial dir
const postsDir       = path.join(__dirname, '../../../_posts');
const postCategories = [
    'devbytes',
    'tutorials'
];
let cacheNeedsUpdate = false;

const postActions    = new PostExportActions();
const algoliaActions = new AlgoliaActions('posts');


//fulfill each promise in postCategories at the same time and wait till both
//are resolved before writing out the cache file
//https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
const startExport = async () => {
    await Promise.all(postCategories.map(async category => {
        const categoryPath = path.join(postsDir, category);

        try {
            //get all posts paths in a category folder
            const posts = await postActions.getPostsInFolder(categoryPath);
            
            for(let post of posts) {
                const postPath = path.join(postsDir, category, post);
                //matter will only contain properties the need to be indexed, large
                //properties will have been removed to keep to algolia limits
                const matter = await postActions.getFrontMatter(postPath);
                
                //if the post is part of a series then combine the matter of all the
                //related series posts and add to this posts matter
                if(matter.serieslink) {
                    const seriesMatter = await combineSeriesMatter(matter.serieslink);
                    matter.seriesposts = seriesMatter;
                }

                const indexed = postActions.isPostIndexed(matter);

                //if the post exists and is unmodified in our local cache then it has
                //already been indexed, so don't query algolia
                if(indexed.exists && indexed.modified) {
                    //the post has been modified so update the algolia index
                    console.log('Post exists but is modified:', matter.title);
                    const updateIndex = await algoliaActions.updateExistingObjects(
                        [matter]
                    );
                    console.log(updateIndex);
                    //now update our local cache
                    postActions.addNewPostToIndex(matter);
                    cacheNeedsUpdate = true;
                } else if(!indexed.exists) {
                    //the post has yet to be indexed
                    console.log('Post does not exist:', matter.title);
                    const newIndex = await algoliaActions.addNewObjects(
                        [matter]
                    );
                    console.log(newIndex);
                    postActions.addNewPostToIndex(matter);
                    cacheNeedsUpdate = true;
                }
            }
        } catch(err) {
            console.error(err);
        }

    }));

    //write out update cache to file
    if(cacheNeedsUpdate) {
        postActions.writeOutIndex();
    } else {
        console.log('All posts are cached locally');
    }

}

async function combineSeriesMatter(seriesLink) {
    const seriesPath = path.join(postsDir, `series/${seriesLink}`);
    const seriesPosts = await postActions.getPostsInFolder(seriesPath);
    let matterForAllPostInSeries = {};

    for(let seriesPost of seriesPosts) {
        const seriesPostPath = path.join(seriesPath, seriesPost);
        const seriesMatter = await postActions.getFrontMatter(seriesPostPath);

        matterForAllPostInSeries[seriesMatter.objectID] = {};
        matterForAllPostInSeries[seriesMatter.objectID]['title'] = 
            seriesMatter.title;
        matterForAllPostInSeries[seriesMatter.objectID]['url'] = 
            seriesMatter.url
    }

    return matterForAllPostInSeries;
}


startExport();
