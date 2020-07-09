module.exports = {
    url: (dbName, dbUser, dbPassword, dbPort) => {
        return `mongodb://${ dbUser }:${ dbPassword }@ds031925.mlab.com:${ dbPort }/${ dbName }`;
    }
}